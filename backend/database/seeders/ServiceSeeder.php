<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Clases de Idiomas',
                'description' => 'Aprende español, francés o alemán con profesores nativos expertos.',
                'icon' => 'language',
                'category' => 'Idiomas',
            ],
            [
                'name' => 'Traducción de Documentos',
                'description' => 'Servicio profesional de traducción de documentos legales y personales.',
                'icon' => 'translate',
                'category' => 'Traducción',
            ],
            [
                'name' => 'Asesoramiento Profesional',
                'description' => 'Guía legal y administrativa para tu proceso de reubicación.',
                'icon' => 'gavel',
                'category' => 'Asesoria',
            ],
        ];

        foreach ($services as $service) {
            \App\Models\Service::create($service);
        }
    }
}
