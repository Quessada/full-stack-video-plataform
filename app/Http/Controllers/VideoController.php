<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Category;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();
        $videos = Video::with('category')->where('user_id', $user->id)->paginate(10);

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
    public function edit(Video $video): Response
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

        //Get the original video data
        $originalData = $video->getOriginal();

        $shouldDeleteOldThumbnail = false;

        if ($data['isThumbUpdated']) {
            if (isset($data['thumbnail']) && ($data['thumbnail'] !== null) && is_file($data['thumbnail'])) {
                $thumbnailPath = $this->handleFilePath($data['thumbnail']);

                //Don't have the thumbnail already stored
                if (!Storage::disk('public')->exists($thumbnailPath)) {
                    //Put on the storage
                    $data['thumbnail'] = $this->handleFile($data['thumbnail'], 'images');
                    $shouldDeleteOldThumbnail = true; //No need to delete
                } else {
                    $shouldDeleteOldThumbnail = false; //No need to delete
                }
            }
        } else {
            $shouldDeleteOldThumbnail = false; //No need to delete
        }

        if (isset($data['thumbnail']) && ($data['thumbnail'] !== null) && is_file($data['thumbnail'])) {
        } else {
            $data['thumbnail'] = '';
        }

        // dd($data);
        //Checks if the new video is new or if already exists
        if (isset($data['file_reference']) && $data['file_reference'] !== null && is_file($data['file_reference'])) {
            $videoPath = $this->handleFilePath($data['file_reference']);

            if (!Storage::disk('public')->exists($videoPath)) {
                $data['file_reference'] = $this->handleFile($data['file_reference'], 'videos');
            } else {
                $deletedVideo = false; //No need to delete
            }
        }

        if ($video->update($data)) {

            $this->deleteOldFiles($originalData);

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
    public function handleFile($file, $type): string
    {
        if ($file->isValid()) {
            $fileName = $file->hashName();
            $storagedFile = Storage::putFileAs('public/' . $type, $file, $fileName);
        }

        return $storagedFile ?? '';
    }

    /**
     * Delete old files (image and video) if video updated
     *
     * @param mixed $data
     *
     * @return Bool
     */
    public function deleteOldFiles(mixed $data): Bool
    {
        $thumbnailPath = $this->handleFilePath($data['thumbnail']);
        $videoPath = $this->handleFilePath($data['file_reference']);

        $deletedThumbnail = $this->deleteFile($thumbnailPath);
        $deletedVideo = $this->deleteFile($videoPath);

        // Return true only if both thumbnail and video are deleted successfully
        return $deletedThumbnail && $deletedVideo;
    }

    /**
     * Perform the file deletion
     *
     * @param string $filePath
     * 
     * @return Bool
     */
    public function deleteFile(string $filePath): Bool
    {
        Log::info('Attempting to delete: ' . $filePath);

        if (Storage::disk('public')->exists($filePath)) {
            if (Storage::disk('public')->delete($filePath)) {
                Log::info('File deleted successfully: ' . $filePath);
                return true;
            } else {
                Log::info('File deletion failed: ' . $filePath);
                return false;
            }
        } else {
            Log::info('File does not exist: ' . $filePath);
            return false;
        }
    }

    /**
     * Return the direct path to the storage
     *
     * @param String $path
     *
     * @return string
     */
    public function handleFilePath(String $path): string
    {
        $directPath = explode("storage", $path);
        $directPath = $directPath[1];

        return $directPath;
    }
}
