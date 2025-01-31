import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const StudentModal = ({ isOpen, closeModal, onSubmit, student }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    course_id: "",
  });
  const [courses, setCourses] = useState([]);

  // Fetch courses to populate the dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses");
        const courseData = await response.json();
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // If editing, set formData to the student data
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        dob: student.dob || "",
        course_id: student.course_id || "",
      });
    }
  }, [student]); // Runs when student is passed or changed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    closeModal(); // Close the modal after submit
    setFormData({
      name: "",
      email: "",
      dob: "",
      course_id: "",
    })
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">{student ? "Edit Student" : "Add Student"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Course</label>
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
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
                {student ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StudentModal;
