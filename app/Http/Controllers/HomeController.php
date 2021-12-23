<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->user =  \Auth::user();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() {
        $bookmarks = array();

        if ( \Auth::check() ) {
            $bookmarks = Bookmark::where('user_id', \Auth::user()->id)->get();
        }

        return view('home')->with(['bookmarks' => $bookmarks ]);

    }
}
