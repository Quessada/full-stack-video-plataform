<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = auth()->user();
        $categories = Category::where('user_id', $user->id)->paginate(10);

        return Inertia::render('Categories/All', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        if (Category::create($data)) {
            $response = [
                'message' => 'Category created successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while creating the category!',
                'status' => 'error',
            ];
        }

        return to_route('categories.index')->with($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        if ($category->update($data)) {
            $response = [
                'message' => 'Category updated successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while updating the category!',
                'status' => 'error',
            ];
        }

        return to_route('categories.index')->with($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->delete()) {
            $response = [
                'message' => 'Category deleted successfully!',
                'status' => 'success',
            ];
        } else {
            $response = [
                'message' => 'Something happened while deleting the category!',
                'status' => 'error',
            ];
        }

        return to_route('categories.index')->with($response);
    }

    public function getCategoriesForSelect() 
    {

        $user = auth()->user();
        $categories = Category::where('user_id', $user->id)->get(['id', 'name']);

        $categories = $categories->map(function ($category) {
            return[ 
                'value' => $category->id,
                'label' => $category->name
            ];
        });

        return $categories;
    }
}
