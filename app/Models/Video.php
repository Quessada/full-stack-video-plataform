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
     * [Description for setEnumFieldAttribute]
     *
     * @param mixed $value
     * 
     * @return [type]
     */
    public function setPrivacydAttribute($value)
    {
        // Covert to lowercase before saving
        $this->attributes['privacy'] = strtolower($value);
    }
}
