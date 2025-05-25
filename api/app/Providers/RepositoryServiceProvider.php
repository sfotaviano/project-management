<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\UserRepositoryInterface::class,
            \App\Repositories\Eloquent\UserRepository::class
        );
        $this->app->bind(
            \App\Repositories\TaskRepositoryInterface::class,
            \App\Repositories\Eloquent\TaskRepository::class
        );
        $this->app->bind(
            \App\Repositories\ProjectRepositoryInterface::class,
            \App\Repositories\Eloquent\ProjectRepository::class
        );
        $this->app->bind(
            \App\Repositories\ReportRepositoryInterface::class,
            \App\Repositories\Eloquent\ReportRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
