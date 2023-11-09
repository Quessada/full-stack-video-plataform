<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id'
    ];

    /**
     * Category -> Video relationship
     *
     * @return HasMany
     */
    public function video(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    /**
     * Category -> User relationship
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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
