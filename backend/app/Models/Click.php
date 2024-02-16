<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    protected $table = 'clicks';
    protected $fillable = [
        'user_agent',
        'ip',
        'country',
        'link_id',
    ];
    protected $casts = [
        'link_id' => 'integer',
    ];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
