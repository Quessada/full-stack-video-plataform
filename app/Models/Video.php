<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'privacy',
        'thumbnail',
        'file_reference',
        'user_id',
        'category_id'
    ];

    /**
     * Video -> Category relationship
     *
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Video -> User relationship
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }


    /**
     * set privacy attribute to lowercase to match the database definition
     *
     * @param mixed $value
     */
    public function setPrivacyAttribute($value)
    {
        // Covert to lowercase before saving
        $this->attributes['privacy'] = strtolower($value);
    }

    /**
     * get thumbnail url
     *
     * @param mixed $value
     */
    public function getThumbnailAttribute($value)
    {
        return asset($value);
    }

    /**
     * get file_reference url
     *
     * @param mixed $value
     */
    public function getFileReferenceAttribute($value)
    {
        // return asset(Storage::url($value));
        return asset($value);
    }
}
