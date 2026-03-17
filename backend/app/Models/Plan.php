<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'features',
        'target_country',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
        'is_featured' => 'boolean',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
