<?php

namespace App\Http\Controllers\Api;

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
}
