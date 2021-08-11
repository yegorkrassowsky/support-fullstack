<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;
    protected $fillable = ['content'];
    protected $appends = ['author', 'author_pos', 'attachments'];

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
    public function getAttachmentsAttribute()
    {
        $attachments = File::where('response_id', $this->id)->first();
        if($attachments) {
            return \URL::to('/api/files/' . $attachments->filename);
        }
        return null;
    }

}
