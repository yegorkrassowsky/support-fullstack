<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Ticket;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

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

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $create_tickets = Permission::create(['name' => 'create tickets']);
        $create_responses = Permission::create(['name' => 'create responses']);
        $view_tickets = Permission::create(['name' => 'view tickets']);

        $client_role = Role::create(['name' => 'client']);
        $client_role->givePermissionTo($create_tickets);
        $client_role->givePermissionTo($view_tickets);

        $agent_role = Role::create(['name' => 'agent']);
        $agent_role->givePermissionTo($create_responses);
        $agent_role->givePermissionTo($view_tickets);

        $agent = User::create([
            'name' => 'Yegor',
            'email' => 'egorkryazh@gmail.com',
            'password' => Hash::make('123'),
        ]);

        $agent->assignRole($agent_role);

        $clients = User::factory(10)->create()->each(function ($user) use ($client_role){
            $user->assignRole($client_role);
        });
        $client_ids = array_map(function($client){
            return $client['id'];
        }, $clients->toArray());

        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 50; $i++) {
            $created_at = $faker->dateTimeThisYear($max = 'now', $timezone = null);
            Ticket::create([
                'subject' => $faker->sentence,
                'content' => $faker->text,
                'author_id' => $faker->randomElement($client_ids),
                'created_at' => $created_at,
                'updated_at' => $created_at,
            ]);
        }

    }
}
