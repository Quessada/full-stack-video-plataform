<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $videos = Video::all();

        return Inertia::render('Videos/All', [
            'videos' => $videos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video) : Response
    {
        return Inertia::render('Videos/Edit', [
            'video' => $video
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video) : void
    {
        $video->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video) : void
    {
        $video->delete();
    }
}
