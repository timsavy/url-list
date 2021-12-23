<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Bookmark;

class BookmarkController extends Controller {

    public function index( $id ) {
        $bookmarks = Bookmark::where('user_id', $id)->get();
        return response()->json([
            'status' => '200',
            'data' => $bookmarks,
            'message' => 'Bookmark added'
        ], 200);
    }
    
    public function delete( $id, $bookmark_id ) {
        Bookmark::destroy($bookmark_id);
        $bookmarks = Bookmark::where('user_id', $id)->get();
        return response()->json([
            'status' => '200',
            'data' => $bookmarks,
            'message' => 'Bookmark deleted'
        ], 200);
    }
    
    public function create( Request $request ) {
        $payload = json_decode($request->getContent(), true);
        $url = $payload['url'];
        $id = $payload['user_id'];
        Bookmark::create([ 'url' => $url, 'user_id' => $id ]);
        $bookmarks = Bookmark::where('user_id', $id)->get();
        return response()->json([
            'status' => '200',
            'data' => $bookmarks,
            'message' => 'success'
        ], 200);
    }
}
