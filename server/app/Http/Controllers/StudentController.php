<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;


class StudentController extends Controller
{
    // GET all students
    public function index()
    {
        return Student::all(); // Returns all students
    }

    // GET a single student by ID
    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json($student);
    }

    // POST (Create) a new student

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',  // Ensure email is unique
            'dob' => 'required|date',
            'course_id' => 'required|exists:courses,id',
        ]);

        // Create the student record
        $student = Student::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'dob' => $validated['dob'],
            'course_id' => $validated['course_id'],
        ]);

        // Return a response with the student data and a success message
        return response()->json([
            'message' => 'Student created successfully',
            'student' => $student
        ], 201);  // 201 indicates resource was created
    }


    // PUT (Update) a student by ID
    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }


        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:students,email,' . $student->id,  // Optional email, ensure it's unique
            'dob' => 'required|date',
            'course_id' => 'required|exists:courses,id',
        ]);

        $student->update($validated);

        return response()->json([
            'message' => 'Student Updated Successfully',
            'student' => $student
        ]);
    }

    // DELETE a student by ID
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}
