<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The permissions granted by the role.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * The users that have this role.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
