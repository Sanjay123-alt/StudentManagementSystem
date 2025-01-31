<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    // GET all schedules
    public function index()
    {
        return Schedule::all(); // Returns all schedules
    }

    // GET a single Schedule by ID
    public function show($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }

        return response()->json($schedule);
    }

    // POST (Create) a new Schedule
    public function store(Request $request)

    {
        $validated = $request->validate([
            'course_id' => 'required', // Ensuring course exists
            'student_id' => 'required', // Ensuring student exists
            'schedule_date' => 'required|date',
            'in_time' => 'required|date_format:H:i:s',
            'out_time' => 'required|date_format:H:i:s',
        ]);
        // return $validated;
        $schedule = Schedule::create([
            'course_id' => $validated['course_id'],
            'student_id' => $validated['student_id'],
            'schedule_date' => $validated['schedule_date'],
            'in_time' => $validated['in_time'],
            'out_time' => $validated['out_time'],
        ]);
        return response()->json([
            'message' => 'Schedule Created Successfully',
            'schedule' => $schedule
        ], 201);
    }

    // PUT (Update) a Schedule by ID
    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
        $validated = $request->validate([
            'course_id' => 'required',
            'student_id' => 'required',
            'schedule_date' => 'required|date',
            'in_time' => 'required',
            'out_time' => 'required',
        ]);

        $schedule->update($validated);

        return response()->json([
            'message' => 'Schedule Updated Successfully',
            'schedule' => $schedule
        ]);
    }

    // DELETE a Schedule by ID
    public function destroy($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }

        // Perform soft delete
        $schedule->delete();

        return response()->json(['message' => 'Schedule deleted successfully']);
    }
}
