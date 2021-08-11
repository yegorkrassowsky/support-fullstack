<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ZipArchive;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename'
    ];

    public static function uploadZip($files, $ticket_id = null, $response_id = null) {
        if($ticket_id || $response_id) {
            $zip_filename = 'attachments_' . str_replace(' ', '_', microtime()) . '.zip';
            $zip = new ZipArchive;
            if($zip->open(public_path('files/' . $zip_filename), ZipArchive::CREATE) === TRUE) {
                foreach ($files as $file) {
                    $name = str_replace(' ', '_', microtime()) . '.' . $file->extension();
                    $zip->addFile($file->path(), $name);
                }
                $zip->close();
                $file= new File();
                $file->filename = $zip_filename;
                if($ticket_id) {
                    $file->ticket_id = $ticket_id;
                }
                if($response_id) {
                    $file->response_id = $response_id;
                }
                $file->save();
            }
        }
    }
}
