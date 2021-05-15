<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = ['subject', 'content'];
    protected $appends = ['author', 'agent'];

    public function getAuthorAttribute()
    {
        $user = User::find($this->author_id);
        if($user) {
            return $user->name;
        }
        return null;
    }

    public function getAgentAttribute()
    {
        $user = User::find($this->agent_id);
        if($user) {
            return $user->name;
        }
        return null;
    }

}
