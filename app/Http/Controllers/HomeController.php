<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
      //  $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('chat');
    }




    public function regex(Request $request)
    {
       $x= Validator::make($request->all(),[
            'value' => 'required|regex:/^\d{0,6}(.\d{1,2})?$/'
        ]);

        if ($x->fails()) {
            return $x->errors();
        }

        return "sent";
    }
}
