import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ScheduleModal = ({ isOpen, closeModal, onSubmit, type, schedule }) => {
  const [formData, setFormData] = useState({
    course_id: "", // Default empty, will be set based on student selection
    student_id: "", // Default empty
    schedule_date: new Date().toISOString().split("T")[0], // Default to today's date
    in_time: "09:00:00", // Default start time
    out_time: "17:00:00", // Default end time
  });


  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  // Fetch students and courses to populate dropdowns
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentResponse = await fetch("http://127.0.0.1:8000/api/students");
        const studentData = await studentResponse.json();
        setStudents(studentData);

        if (studentData.length > 0) {
          const studentCourseId = studentData[0].course_id; // Assuming first student initially
          setFormData((prev) => ({ ...prev, student_id: studentData[0].id }));

          // Fetch the courses
          const courseResponse = await fetch("http://127.0.0.1:8000/api/courses");
          const courseData = await courseResponse.json();
          setCourses(courseData);

          // Find the matching course
          const studentCourse = courseData.find((course) => course.id === studentCourseId);
          if (studentCourse) {
            setFormData((prev) => ({ ...prev, course_id: studentCourse.id }));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudents();
  }, []);

  // Set formData when editing a schedule
  useEffect(() => {
    if (schedule) {
      setFormData({
        course_id: schedule.course_id || "",
        student_id: schedule.student_id || "",
        schedule_date: schedule.schedule_date || "",
        in_time: schedule.in_time || "",
        out_time: schedule.out_time || "",
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (e) => {
    const selectedStudentId = e.target.value;
    setFormData((prev) => ({ ...prev, student_id: selectedStudentId }));

    // Find the student and update course_id accordingly
    const selectedStudent = students.find((student) => student.id == selectedStudentId);
    if (selectedStudent) {
      setFormData((prev) => ({ ...prev, course_id: selectedStudent.course_id }));
    }
  };

  const formatTime = (time) => {
    return time.length === 5 ? `${time}:00` : time; // Ensures format is "HH:MM:SS"
  };

  const handleSubmit = () => {
    // Ensure time fields are correctly formatted
    const formattedData = {
      ...formData,
      in_time: formatTime(formData.in_time),
      out_time: formatTime(formData.out_time),
    };

    // Basic validation
    if (!formattedData.course_id || !formattedData.student_id || !formattedData.schedule_date || !formattedData.in_time || !formattedData.out_time) {
      alert("Please fill in all fields.");
      return;
    }

    onSubmit(formattedData);
    closeModal(); // Close the modal after submit
    setFormData({
      course_id: "", // Default empty, will be set based on student selection
      student_id: "", // Default empty
      schedule_date: new Date().toISOString().split("T")[0], // Default to today's date
      in_time: "09:00:00", // Default start time
      out_time: "17:00:00", // Default end time
    })
  };


  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">{schedule ? `Edit ${type}` : `Add ${type}`}</h2>
          <div className="space-y-4">
            {/* Schedule Form */}
            <div>
              <label className="block text-sm font-medium">Student</label>
              <select
                name="student_id"
                value={formData.student_id}
                onChange={handleStudentChange}
                className="border border-gray-300 p-2 w-full rounded"
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Course</label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
                disabled
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Schedule Date</label>
              <input
                type="date"
                name="schedule_date"
                value={formData.schedule_date}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">In Time</label>
              <input
                type="time"
                name="in_time"
                value={formData.in_time}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Out Time</label>
              <input
                type="time"
                name="out_time"
                value={formData.out_time}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>

            <div className="flex space-x-4 justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-700 border rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                {schedule ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ScheduleModal;
