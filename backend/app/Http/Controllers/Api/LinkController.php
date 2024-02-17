<?php

namespace App\Http\Controllers\Api;

use App\Models\Click;
use App\Models\Link;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Sanctum\PersonalAccessToken;

class LinkController extends Controller
{
    private function getAuthUser($token)
    {
        $tokenModel = PersonalAccessToken::findToken($token);

        if ($tokenModel) {
            return User::find($tokenModel->tokenable_id);
        }

        return null;
    }

    public function getLink(Request $request, $id)
    {
        $link = Link::where('code', $id)->withCount('clicks')->first();

        if (!$link) return response()->json(['message' => 'Link not found'], 404);

        $click = new Click();
        $click->link_id = $link->id;
        $click->user_agent = $request->header('User-Agent');
        $click->ip = $request->ip();
        $click->save();

        if ($link) {
            if (!isset($link->user_id) && $link->clicks_count > 4) $link->delete();

            return response()->json($link, 200);
        }

        return response()->json(['message' => 'Link not found'], 404);
    }

    public function store(Request $request,)
    {
        $request->validate([
            'url' => 'required|url'
        ]);

        $link = new Link();
        $link->url = $request->url;
        $link->code = substr(md5(uniqid()), 0, 6);

        if ($request->bearerToken()) {
            $link->user_id = $this->getAuthUser($request->bearerToken())->id;
        } else {
            $link->user_id = null;
        }

        $link->save();

        return response()->json($link, 201);
    }

    public function getUrls(Request $request)
    {
        $user = $this->getAuthUser($request->bearerToken());

        if ($user) {
            $links = Link::where('user_id', $user->id)->with('clicks')->withCount('clicks')->get();
            return response()->json([
                'user' => $user,
                'links' => $links
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'url' => 'required|url'
        ]);

        $user = $this->getAuthUser($request->bearerToken());

        if ($user) {
            $link = Link::find($request->id);

            if ($link->user_id === $user->id) {
                $link->url = $request->url;
                $link->save();

                Click::where('link_id', $link->id)->delete();

                return response()->json($link, 200);
            }
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function delete(Request $request, $id)
    {
        $user = $this->getAuthUser($request->bearerToken());

        if ($user) {
            $link = Link::find($id);

            if ($link->user_id === $user->id) {
                $link->delete();

                return response()->json(['message' => 'Link deleted'], 200);
            }

            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
