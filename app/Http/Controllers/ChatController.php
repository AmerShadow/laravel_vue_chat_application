<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }
        public function chat(Request $request)
    {
        return view('chat');
    }

    public function sendMessage(Request $request)
    {
        $user=Auth::user();
        event(new ChatEvent($request->message,$user));
        return "sent";
    }


    public function send()
    {
        $user=Auth::user();
        event(new ChatEvent("hello testing pusher works",$user));
        return "sent";

    }
}
