<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import SoftDeletes
use App\Models\Course;

class Student extends Model
{
    use HasFactory, SoftDeletes; // Use the SoftDeletes trait

    // Specify the table associated with the model (optional, if not using the default naming convention)
    protected $table = 'students';

    protected $fillable = [
        'name',      // Student's name
        'dob',       // Student's date of birth
        'email',       // Student's email
        'course_id', // Foreign key to the courses table
    ];

    // This tells Laravel to treat 'deleted_at' as a Carbon date
    protected $dates = ['deleted_at'];

    // Define the relationship with the Course model
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
