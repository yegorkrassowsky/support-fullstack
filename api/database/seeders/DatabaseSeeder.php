<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Response;
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

        $admin_role = Role::create(['name' => 'admin']);
        $admin_role->givePermissionTo($create_responses);
        $admin_role->givePermissionTo($view_tickets);

        $admin = User::create([
            'name' => 'Yegor',
            'email' => 'egorkryazh@gmail.com',
            'password' => Hash::make('123'),
        ]);

        $admin->assignRole($admin_role);
        $admin->assignRole($agent_role);

        $agent = User::create([
            'name' => 'Agent Smith',
            'email' => 'ykdevreact@gmail.com',
            'password' => Hash::make('123'),
        ]);

        $agent->assignRole($agent_role);

        $client = User::create([
            'name' => 'John Smith',
            'email' => 'qweg@mail.ru',
            'password' => Hash::make('123'),
        ]);

        $client->assignRole($client_role);

        $clients = User::factory(10)->create()->each(function ($user) use ($client_role){
            $user->assignRole($client_role);
        });
        $client_ids = array_map(function($client){
            return $client['id'];
        }, $clients->toArray());

        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 30; $i++) {
            $created_at = $faker->dateTimeThisYear($max = 'now', $timezone = null);
            $author_id = $i ? $faker->randomElement($client_ids) : $client->id; // First ticket by client explicitly
            $agent_id = $faker->randomElement([null, $agent->id, $admin->id]);
            $status = $faker->randomElement([0, 1, 2]);
            $ticket = Ticket::create([
                'subject' => $faker->sentence,
                'content' => $faker->text,
                'author_id' => $author_id,
                'agent_id' => $agent_id,
                'status' => $status,
                'created_at' => $created_at,
                'updated_at' => $created_at,
            ]);
            if($agent_id) { // Agent is set
                for ($j = 0; $j < 30; $j++) {
                    if ($j === 29) { // Last response replied by agent or client explicitly
                        $response_author_id = $status === 2 ? $agent_id : $author_id;
                    } else {
                        $response_author_id = $faker->randomElement([$author_id, $agent_id]);
                    }
                    Response::create([
                        'ticket_id' => $ticket->id,
                        'content' => $faker->text,
                        'author_id' => $response_author_id,
                    ]);
                }
            }

        }

    }
}
