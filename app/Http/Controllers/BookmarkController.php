<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Bookmark;

class BookmarkController extends Controller {

    public function index() {
        if ( Auth::check() ) {
            $bookmarks = Bookmark::where('user_id', Auth::user()->id)->get();
            return view('bookmark.index')->with([ 'bookmarks' => $bookmarks ]);
        }
        return redirect('/');
    }
    
    public function delete( $id ) {
        // Bookmark::destroy($id);
        // return response('Successfull', 200);
    }
    
    public function create() {
        return view('bookmark.create');
    }
    
    public function upload( Request $request ) {
        if ( Auth::check() ) {
            $url = $request->url;
            Bookmark::create([ 'url' => $url, 'user_id' => Auth::user()->id ]);
        }
    }
}
