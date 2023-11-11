<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Category;
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
        $videos = Video::with('category')->where('user_id', $user->id)->get();

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

        if (isset($data['thumbnail']) && $data['thumbnail'] !== null) {
            $data['thumbnail'] = $this->handleFile($data['thumbnail'], 'images');
        }
        $data['file_reference'] = $this->handleFile($data['file_reference'], 'videos');
        
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
    public function update(UpdateVideoRequest $request, Video $video)
    {
        $data = $request->validated();
        // dd($data);
        if (isset($data['thumbnail']) && ($data['thumbnail'] !== null) && is_file($data['thumbnail'])) {
            $data['thumbnail'] = $this->handleFile($data['thumbnail'], 'images');
        }

        if (isset($data['file_reference']) && $data['file_reference'] !== null && is_file($data['file_reference'])) {
            $data['file_reference'] = $this->handleFile($data['file_reference'], 'videos');
        }

        if ($video->update($data)) {
            $response = [
                'message' => 'Video updated successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while updating the video!',
                'status' => 'error',
            ];
        }

        return to_route('videos.index')->with($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        if ($video->delete()) {
            $response = [
                'message' => 'Video deleted successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while deleting the video!',
                'status' => 'error',
            ];
        }

        return to_route('videos.index')->with($response);
    }

    /**
     * HandleFileVerification.
     */
    public function handleFile($file, $type) : string
    {
        if ($file->isValid()) {
            $fileName = uniqid()."_{$file->getClientOriginalName()}";
            $storagedFile = $file->storeAs($type, $fileName);
        }        
        
        return $storagedFile ?? '';
    }
}
