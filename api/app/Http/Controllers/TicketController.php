<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Response;
use App\Models\User;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $user = $request->user();
        $limit = $request->has('limit') ? $request->get('limit') : 10;
        $status = $request->filled('status') ? $request->get('status') : false;
        $tickets = Ticket::when( $user->hasRole('agent') && ! $user->hasRole('admin'), function($q, $c) use ($user) {
                return $q->where('agent_id', $user->id)->orWhereNull('agent_id');
            } )
            ->when($status !== false, function($q, $c) use ($status) {
                return $q->where('status', $status);
            })
            ->when($user->hasRole('client'), function($q, $c) use ($user) {
                return $q->where('author_id', $user->id);
            })
            ->paginate($limit);
        return $tickets;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('client')){
            $validated = $request->validate([
                'subject' => 'required',
                'content' => 'required',
            ]);
            $ticket = new Ticket;
            $ticket->author_id = $user->id;
            $ticket->fill([
                'subject' => strip_tags($validated['subject']),
                'content' => $validated['content'],
            ]);
            $ticket->save();
            return response()->json($ticket, 201);
        }
        return response()->json(['error' => 'Forbidden'], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $ticket = Ticket::when($user->hasRole('client'), function($q, $c) use ($user) {
                return $q->where('author_id', $user->id);
            })
            ->findOrFail($id);

        $responses_limit = $request->has('limit') ? $request->get('limit') : 10;

        $responses = Response::where('ticket_id', $ticket->id)
        ->orderBy('created_at', 'asc')
        ->paginate($responses_limit);

        return response()->json(['ticket' => $ticket, 'responses' => $responses]);
    }

}
