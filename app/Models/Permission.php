<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    /**
     * The roles that grant this permission.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
