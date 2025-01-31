import { useEffect, useState } from "react";
import StudentModal from "../popup/StudentModel";
import { formatDate } from '../utils/DateTimeConvert'
import { toast } from "react-toastify";


const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState({});
  const [editStudent, setEditStudent] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await fetch("http://127.0.0.1:8000/api/courses");
      const data = await response.json();
      const courseMap = {};
      data.forEach(course => (courseMap[course.id] = course.name));
      setCourses(courseMap);
      setLoadingCourses(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddStudent = () => {
    setEditStudent(null);
    setIsModalOpen(true);
  };

  const handleSubmitStudent = async (formData) => {
    try {
      const method = editStudent ? "PUT" : "POST";
      const toastMsg = editStudent ? "Edited" : "Added";
      const url = editStudent
        ? `http://127.0.0.1:8000/api/students/${editStudent.id}`
        : "http://127.0.0.1:8000/api/students";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchStudents(); // 🔹 Refresh students list after adding/updating
        setIsModalOpen(false);
        toast(`Student ${toastMsg} Successfully!`);
        setEditStudent(null)
      } else {
        console.error("Failed to add/update student");
      }
    } catch (error) {
      console.error("Error adding/updating student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prev) => prev.filter((student) => student.id !== id));
        toast("Student Deleted Successfully!");
      } else {
        console.error("Error deleting student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // if(students.length === 0) return <Loading />;


  return (
    <div className="p-6 shadow-xl border rounded-xl bg-white">
      <b className="text-black-500">No of Students ({students?.length})</b>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <button
          onClick={handleAddStudent}
          className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          + Add Student
        </button>
      </div>
  
      <div className="w-full overflow-hidden shadow-lg rounded-lg">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-500 text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">S:NO</th>
              <th className="px-4 py-3 border-b border-gray-200">Name</th>
              <th className="px-4 py-3 border-b border-gray-200">Email</th>
              <th className="px-4 py-3 border-b border-gray-200">Date of Birth</th>
              <th className="px-4 py-3 border-b border-gray-200">Course Name</th>
              <th className="px-4 py-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-72">
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No students available
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-300"
                >
                  <td className="border-b border-gray-200 px-4 py-3">{index + 1}</td>
                  <td className="border-b border-gray-200 px-4 py-3">{student.name}</td>
                  <td className="border-b border-gray-200 px-4 py-3">{student.email}</td>
                  <td className="border-b border-gray-200 px-4 py-3">{formatDate(student.dob)}</td>
                  <td className="border-b border-gray-200 px-4 py-3">
                    {loadingCourses ? "Loading..." : courses[student.course_id] || "Unknown"}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditStudent(student);
                        setIsModalOpen(true);
                      }}
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
  
      <StudentModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleSubmitStudent}
        student={editStudent}
      />
    </div>
  );
  

};

export default StudentTable;
