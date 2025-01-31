import { useState, useEffect } from "react";
import CourseModal from "../popup/CourseModel"; // Import the modal component
import Loading from "../utils/Loading";
import { toast } from "react-toastify";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null); // Track the course being edited

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [courses]);

  // Handle the submission of a new course
  const handleAddCourse = async (newCourse) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();
      if (response.ok) {
        setCourses((prevCourses) => [...prevCourses, data]);
        closeModal(); // Close the modal after adding the course
        toast("Course Added Successfully!");
      } else {
        console.error("Error adding course:", data);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Handle the update of an existing course
  const handleUpdateCourse = async (updatedCourse) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${updatedCourse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });

      const data = await response.json();
      if (response.ok) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === updatedCourse.id ? updatedCourse : course
          )
        );
        setEditCourse(null); // Exit edit mode
        toast("Course Edited Successfully!");
      } else {
        console.error("Error updating course:", data);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        toast("Course Deleted Successfully!");
      } else {
        console.error("Error deleting course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Open the modal for adding a new course
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle input change for inline editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
  };

  // if (courses.length === 0) return <Loading />;

  return (
    <div className="p-6 shadow-xl border rounded-xl bg-white">
      <b className="text-balck-500">No of Courses ({courses?.length})</b>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
        <button
          onClick={openModal}
          className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          + Add Course
        </button>
      </div>

      <div className="w-full overflow-hidden shadow-lg rounded-lg">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-500 text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">S:NO</th>
              <th className="px-4 py-3 border-b border-gray-200">Course Name</th>
              <th className="px-4 py-3 border-b border-gray-200">Description</th>
              <th className="px-4 py-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-72">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={course.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-300"
                >
                  {editCourse && editCourse.id === course.id ? (
                    <>
                      <td></td>
                      <td className="border-b border-gray-200 px-4 py-3">
                        <input
                          type="text"
                          name="name"
                          value={editCourse.name}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3">
                        <textarea
                          name="description"
                          value={editCourse.description}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                          rows="4"
                        />
                      </td>
                      <td className="border-b border-gray-200 px-4 py-3 flex space-x-2">
                        <button
                          onClick={() => handleUpdateCourse(editCourse)}
                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditCourse(null)}
                          className="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b border-gray-200 px-4 py-3">{index+1}</td>
                      <td className="border-b border-gray-200 px-4 py-3">{course.name}</td>
                      <td className="border-b border-gray-200 px-4 py-3">{course.description}</td>
                      <td className="border-b border-gray-200 px-4 py-3 flex space-x-2">
                        <button
                          onClick={() => setEditCourse(course)}
                          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new course */}
      <CourseModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleAddCourse}
      />
    </div>
  );



};

export default CourseTable;
