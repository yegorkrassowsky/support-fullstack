<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;
    protected $fillable = ['content'];
    protected $appends = ['author', 'author_pos'];

    public function getAuthorAttribute()
    {
        $user = User::find($this->author_id);
        if($user) {
            return $user->name;
        }
        return null;
    }

    public function getAuthorPosAttribute()
    {
        $user = User::find($this->author_id);
        if($user) {
            if($user->hasRole('client')){
                return 'Client';
            }
            if($user->hasRole('agent')){
                return 'Agent';
            }
        }
        return null;
    }
}
