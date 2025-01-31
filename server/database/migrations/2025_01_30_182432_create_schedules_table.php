<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade'); // Foreign key
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade'); // Foreign key
            $table->date('schedule_date');
            $table->time('in_time');
            $table->time('out_time');
            $table->softDeletes(); // Enables soft deletes
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('schedules');
    }
};
