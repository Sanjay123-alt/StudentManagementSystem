<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\CourseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Students Routes
Route::get('/students', [StudentController::class, 'index']); // Get all students
Route::get('/students/{id}', [StudentController::class, 'show']); // Get a single student by ID
Route::post('/students', [StudentController::class, 'store']); // Create a new student
Route::put('/students/{id}', [StudentController::class, 'update']); // Update a student by ID
Route::delete('/students/{id}', [StudentController::class, 'destroy']); // Delete a student by ID

// Schedules Routes
Route::get('/schedules', [ScheduleController::class, 'index']); // Get all schedules
Route::get('/schedules/{id}', [ScheduleController::class, 'show']); // Get a single schedule by ID
Route::post('/schedules', [ScheduleController::class, 'store']); // Create a new schedule
Route::put('/schedules/{id}', [ScheduleController::class, 'update']); // Update a schedule by ID
Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']); // Delete a schedule by ID

// Courses Routes
Route::get('/courses', [CourseController::class, 'index']); // Get all courses
Route::get('/courses/{id}', [CourseController::class, 'show']); // Get a single course by ID
Route::post('/courses', [CourseController::class, 'store']); // Create a new course
Route::put('/courses/{id}', [CourseController::class, 'update']); // Update a course by ID
Route::delete('/courses/{id}', [CourseController::class, 'destroy']); // Delete a course by ID
