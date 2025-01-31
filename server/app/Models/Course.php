<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import SoftDeletes trait

class Course extends Model
{
    use HasFactory, SoftDeletes; // Use SoftDeletes trait

    // Specify the table associated with the model (optional, if not using the default naming convention)
    protected $table = 'courses';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'name',   // Add course name (or any other fields you want to be mass-assignable)
        'description', // For example, course description
    ];

    // Define the relationship between Course and Student (one course has many students)
    public function students()
    {
        return $this->hasMany(Student::class, 'course_id');
    }

    // Specify the date columns for soft deletes
    protected $dates = ['deleted_at'];
}
