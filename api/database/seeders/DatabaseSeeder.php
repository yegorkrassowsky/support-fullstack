<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Ticket;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Ticket::truncate();
        // $faker = \Faker\Factory::create();
        // for ($i = 0; $i < 50; $i++) {
        //     Ticket::create([
        //         'title' => $faker->sentence,
        //         'content' => $faker->text
        //     ]);
        // }

        // User::truncate();
        // User::factory(10)->create();
        User::create([
            'name' => 'Yegor',
            'email' => 'egorkryazh@gmail.com',
            'password' => Hash::make('pwdpwd'),
        ]);
    }
}
