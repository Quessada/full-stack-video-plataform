<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
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
        $user = auth()->user();
        $videos = Video::where('user_id', $user->id)->get();

        return Inertia::render('Videos/All', [
            'videos' => $videos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Videos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoRequest $request)
    {
        $data = $request->validated();
        $data['thumbnail'] = $this->handleFile($data['thumbnail']);
        $data['file_reference'] = $this->handleFile($data['file_reference']);
        // dd($data);
        if (Video::create($data)) {
            $response = [
                'message' => 'Video created successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while creating the video!',
                'status' => 'error',
            ];
        }

        return to_route('videos.index')->with($response);
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

    /**
     * HandleFileVerification.
     */
    public function handleFile($file) : string
    {
        if ($file->isValid()) {
            $fileName = uniqid().time()."_{$file->getClientOriginalName()}";
            $storagedFile = $file->storeAs('videos', $fileName);
        }        
        
        return $storagedFile ?? '';
    }
}
