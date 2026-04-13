<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinationItem extends Model
{
    protected $fillable = [
        'destination_id',
        'name',
        'image',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
