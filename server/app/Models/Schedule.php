<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import SoftDeletes trait
use App\Models\Student;
use App\Models\Course;

class Schedule extends Model
{
    use HasFactory, SoftDeletes; // Use SoftDeletes trait

    // Specify the table name (optional if you follow the default naming convention)
    protected $table = 'schedules';

    // Specify the fillable columns
    protected $fillable = [
        'course_id',
        'student_id',
        'schedule_date',
        'in_time',
        'out_time',
    ];

    // Specify the date columns for soft deletes
    protected $dates = ['deleted_at'];

    // Define relationships with Course and Student models
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
