<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Básico',
                'price' => 49.99,
                'features' => ['Guía de bienvenida', 'Checklist de documentos', 'Soporte vía email'],
            ],
            [
                'name' => 'Pro',
                'price' => 149.99,
                'features' => ['Todo en Básico', '2h de asesoramiento personalizado', 'Traducción de 3 documentos'],
                'is_featured' => true,
            ],
            [
                'name' => 'Platinum',
                'price' => 399.99,
                'features' => ['Todo en Pro', 'Traducciones ilimitadas', 'Acompañamiento presencial', 'Alojamiento temporal'],
            ],
        ];

        foreach ($plans as $plan) {
            \App\Models\Plan::create($plan);
        }
    }
}
