<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Response;
use App\Models\User;
use App\Models\File;

class ResponseController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required',
            'files.*' => 'max:10240',
        ]);
        if( ! $request->has('ticket_id') ) {
            return response()->json(['error' => 'Invalid data'], 400);
        }
        $user = $request->user();
        $ticket_id = intval( $request->get('ticket_id') );
        $ticket = Ticket::findOrFail($ticket_id);

        if ( $user->hasRole('client') ) {
            if ( $ticket->author_id !== $user->id ) {
                return response()->json(['error' => 'Forbidden'], 403);
            }
            $ticket->status = 1;
        }
        if ( $user->hasRole('agent') ) {
            if ( empty( $ticket->agent_id ) ) {
                $ticket->agent_id = $user->id; // Assign the agent to not assigned ticket
            } elseif ( $ticket->agent_id !== $user->id ) {
                return response()->json(['error' => 'Forbidden'], 403);
            }
            $ticket->status = 2;
        }
        $ticket->save();
        $response = new Response;
        $response->author_id = $user->id;
        $response->ticket_id = $ticket_id;
        $response->fill([
            'content' => $validated['content'],
        ]);
        $response->save();
        if($request->hasFile('files')) {
            File::uploadZip($request->file('files'), null, $response->id);
        }

        return response()->json(['ticket' => $ticket, 'response' => $response]);

    }

}
