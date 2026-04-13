<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            PlanSeeder::class,
            ServiceSeeder::class,
            DestinationSeeder::class,
        ]);

        User::factory()->create([
            'username' => 'admin_user',
            'name' => 'Admin User',
            'email' => 'admin@newstart.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'plan_id' => 1,
        ]);
    }
}
