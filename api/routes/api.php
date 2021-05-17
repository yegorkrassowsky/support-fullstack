<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('ticket', 'TicketController@index');
Route::middleware('auth:sanctum')->get('ticket/{id}', 'TicketController@show');
Route::middleware(['auth:sanctum', 'XssSanitizer'])->post('ticket', 'TicketController@store');
Route::middleware(['auth:sanctum', 'XssSanitizer'])->post('response', 'ResponseController@store');
Route::middleware('auth:sanctum')->put('ticket/{id}', 'TicketController@update');
