<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->text('200'),
            'privacy' => fake()->randomElement(['listed', 'unlisted', 'private']),
            'thumbnail' => 'empty-thumbnail.jpg',
            'file_reference' => 'www.no-url-video.com',
            'user_id' => User::factory(),
            'category_id' => Category::factory()
        ];
    }
}
