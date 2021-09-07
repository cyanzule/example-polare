<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $access_admin = \App\Models\Permission::create(['name' => 'access-admin', 'description' => 'Access Admin Interface']);
        $access_secret = \App\Models\Permission::create(['name' => 'access-secret', 'description' => 'Access Secret Page']);

        \App\Models\Role::create(['name' => 'user', 'description' => 'User']);
        $admin = \App\Models\Role::create(['name' => 'admin', 'description' => 'Admin']);
        $secret = \App\Models\Role::create(['name' => 'secret', 'description' => 'Superuser']);

        $secret->permissions()->saveMany([$access_secret]);

        \App\Models\User::factory(3)->create();
        \App\Models\User::factory(2)->unverified()->create();
        $secretUsers = \App\Models\User::factory(2)->create();
        $adminUsers = \App\Models\User::factory(1)->create();

        foreach ($secretUsers as $user) {
            $user->roles()->attach($secret);
        }
        foreach ($adminUsers as $user) {
            $user->roles()->attach($admin);
        }
    }
}
