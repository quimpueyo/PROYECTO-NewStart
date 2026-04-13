<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'NORUEGA',
                'flag_img' => '/assets/img/flags/norway.png',
                'cover_image' => '/assets/img/destinations/norway-fjord.jpg',
                'items' => [
                    ['name' => 'VIAJE Nº 1 (Oslo)', 'image' => '/assets/img/destinations/oslo.jpg'],
                    ['name' => 'VIAJE Nº 2 (Bergen)', 'image' => '/assets/img/destinations/bergen.jpg'],
                    ['name' => 'VIAJE Nº 3 (Stavanger)', 'image' => '/assets/img/destinations/stavanger.jpg']
                ]
            ],
            [
                'name' => 'ALEMANIA',
                'flag_img' => '/assets/img/flags/germany.png',
                'cover_image' => '/assets/img/destinations/germany-flag.jpg',
                'items' => [
                    ['name' => 'Berlin', 'image' => '/assets/img/destinations/berlin.jpg'],
                    ['name' => 'Bremen', 'image' => '/assets/img/destinations/bremen.jpg'],
                    ['name' => 'Lübeck', 'image' => '/assets/img/destinations/lubeck.jpg']
                ]
            ],
            [
                'name' => 'FRANCIA',
                'flag_img' => '/assets/img/flags/france.png',
                'cover_image' => '/assets/img/destinations/france-flag.jpg',
                'items' => [
                    ['name' => 'Marsella', 'image' => '/assets/img/destinations/marseille.jpg'],
                    ['name' => 'Toulouse', 'image' => '/assets/img/destinations/toulouse.jpg'],
                    ['name' => 'Tours', 'image' => '/assets/img/destinations/tours.jpg']
                ]
            ]
        ];

        foreach ($destinations as $destData) {
            $items = $destData['items'];
            unset($destData['items']);
            $destination = \App\Models\Destination::create($destData);
            foreach ($items as $item) {
                $destination->items()->create($item);
            }
        }
    }
}
