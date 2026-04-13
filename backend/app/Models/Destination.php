<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = [
        'name',
        'flag_img',
        'cover_image',
    ];

    public function items()
    {
        return $this->hasMany(DestinationItem::class);
    }
}
