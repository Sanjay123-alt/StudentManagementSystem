<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // GET all courses
    public function index()
    {
        // Fetch all courses
        $courses = Course::all();

        return response()->json($courses);
    }

    // GET a single course by ID
    public function show($id)
    {
        // Find course by ID
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json($course);
    }

    // POST (Create) a new course
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Create new course
        $course = Course::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Return success response
        return response()->json([
            'message' => 'Course Created Successfully',
            'course' => $course
        ], 201);
    }

    // PUT (Update) a course by ID
    public function update(Request $request, $id)
    {
        // Find course by ID
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        // Validate incoming request
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ]);

        // Update course
        $course->update([
            'name' => $validated['name'] ?? $course->name,
            'description' => $validated['description'] ?? $course->description,
            'updated_at' => now(),
        ]);

        // Return success response
        return response()->json([
            'message' => 'Course Updated Successfully',
            'course' => $course
        ]);
    }

    // DELETE a course by ID
    public function destroy($id)
    {
        // Find course by ID
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        // Delete the course
        $course->delete();

        // Return success response
        return response()->json(['message' => 'Course deleted successfully']);
    }
}
