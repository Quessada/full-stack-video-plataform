<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
     * get description attribute reduced characters
     *
     * @param mixed $value
     */
    public function getDescriptionAttribute($value)
    {
        $maxLength = 50;
        if (strlen($value) > $maxLength) {
            return substr($value, 0, $maxLength) . '...';
        } else {
            return $value;
        }
    }
}
