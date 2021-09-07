<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\User' => 'App\Policies\UserPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function (User $user){
            if($user->roles()->pluck('name')->contains('admin')){
                return true;
            }
        });

        Gate::define('access-admin', function(User $user) {
            return false;
        });

        Gate::define('access-secret', function(User $user) {
            return $user->permissions()->contains('access-secret');
        });
    }
}
