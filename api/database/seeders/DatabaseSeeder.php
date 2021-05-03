<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
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
        Schema::disableForeignKeyConstraints();
        Ticket::truncate();
        User::truncate();
        Schema::enableForeignKeyConstraints();

        User::factory(10)->create();
        User::create([
            'name' => 'Yegor',
            'email' => 'egorkryazh@gmail.com',
            'password' => Hash::make('123'),
        ]);

        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 50; $i++) {
            $created_at = $faker->dateTimeThisYear($max = 'now', $timezone = null);
            Ticket::create([
                'title' => $faker->sentence,
                'content' => $faker->text,
                'created_at' => $created_at,
                'updated_at' => $created_at,
            ]);
        }

    }
}
