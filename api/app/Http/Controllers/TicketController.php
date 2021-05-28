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
        $tickets = Ticket::when($status !== false, function($q, $c) use ($status) {
                return $q->where('status', $status);
            })
            ->when($user->hasRole('agent') && ! $user->hasRole('admin'), function($q, $c) use ($user) {
                return $q->where(function ($q) use ($user) {
                    return $q->where('agent_id', $user->id)->orWhereNull('agent_id');
                });
            })
            ->when($user->hasRole('client'), function($q, $c) use ($user) {
                return $q->where('author_id', $user->id);
            })
            ->orderBy('updated_at', 'desc')
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
            $ticket->status = 1;
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $user = $request->user();
        if ( $user->hasRole('client') && $user->id !== $ticket->author_id ) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        if ( ! $user->hasRole('admin') && $user->hasRole('agent') && $ticket->agent_id && $user->id !== $ticket->agent_id ) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        if ( ! $request->has('status') ) {
            return response()->json(['error' => 'Invalid data'], 400);
        }

        if ( empty( $ticket->agent_id ) && $user->hasRole('agent') ) {
            $ticket->agent_id = $user->id;
            $ticket->save();
        }
        $status = intval($request->get('status'));
        if ( in_array( $status, [0, 1] ) && $status !== $ticket->status ) {
            $ticket->status = $status;
            $ticket->save();
        }
        return response()->json($ticket, 200);
    }
}
