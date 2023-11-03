<?php

namespace App\Providers;

use App\Rules\UserAuthenticatedRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class CustomValidationRulesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //Auth validator
        Validator::extend('authenticated', [UserAuthenticatedRule::class, 'validate']);
    }
}