import { useEffect, useState } from "react";
import ScheduleModal from "../popup/ScheduleModel"; // Import Modal Component
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../utils/DateTimeConvert";

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState({});
  const [students, setStudents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null); // Track the schedule being edited

  // Fetch schedule data
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/schedules");
        const scheduleData = await response.json();
        setSchedules(scheduleData);

        // Fetch course and student names after schedules are fetched
        fetchCourseAndStudentNames(scheduleData);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchSchedules();
  }, []); // Runs once when the component mounts

  const fetchCourseAndStudentNames = async (scheduleData) => {
    const courseNames = {};
    const studentNames = {};

    // Fetch course names based on course_id
    for (const schedule of scheduleData) {
      if (!courseNames[schedule.course_id]) {
        try {
          const courseResponse = await fetch(`http://127.0.0.1:8000/api/courses/${schedule.course_id}`);
          const courseData = await courseResponse.json();
          courseNames[schedule.course_id] = courseData.name;
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      }

      // Fetch student names based on student_id
      if (!studentNames[schedule.student_id]) {
        try {
          const studentResponse = await fetch(`http://127.0.0.1:8000/api/students/${schedule.student_id}`);
          const studentData = await studentResponse.json();
          studentNames[schedule.student_id] = studentData.name;
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    }

    setCourses(courseNames);
    setStudents(studentNames);
  };

  // Handle the submission of new or updated schedule data
  const handleAddSchedule = async (newSchedule) => {
    try {
      if (editSchedule) {
        // Update existing schedule
        const response = await fetch(`http://127.0.0.1:8000/api/schedules/${editSchedule.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSchedule),
        });

        const data = await response.json();
        if (response) {
          setSchedules((prevSchedules) =>
            prevSchedules.map((schedule) =>
              schedule.id === editSchedule.id ? data : schedule
            )
          );
          toast("Schedule Edited Successfully!");
        }
      } else {
        // Add new schedule
        const response = await fetch("http://127.0.0.1:8000/api/schedules", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSchedule),
        });

        const data = await response.json();
        if (response.ok) {
          setSchedules((prevSchedules) => [...prevSchedules, data]);
          toast("Schedule Added Successfully!");
        }
      }
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error adding or updating schedule:", error);
    }
  };

  // Open the modal for adding or editing
  const openModal = (schedule = null) => {
    setEditSchedule(schedule);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditSchedule(null);
  };

  // Delete schedule
  const handleDeleteSchedule = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/schedules/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((schedule) => schedule.id !== id)
        );
        toast("Schedule Deleted Successfully!");
      } else {
        console.error("Failed to delete schedule.");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div className="p-6 shadow-xl border rounded-xl bg-white">
      <b className="text-balck-500">No of Schedule ({schedules?.length})</b>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Schedules</h2>
        <button
          onClick={() => openModal()}
          className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          + Add Schedule
        </button>
      </div>

      <div className="w-full overflow-hidden shadow-lg rounded-lg">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-500 text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">S:NO</th>
              <th className="px-4 py-3 border-b border-gray-200">Course Name</th>
              <th className="px-4 py-3 border-b border-gray-200">Student Name</th>
              <th className="px-4 py-3 border-b border-gray-200">Schedule Date</th>
              <th className="px-4 py-3 border-b border-gray-200">In Time</th>
              <th className="px-4 py-3 border-b border-gray-200">Out Time</th>
              <th className="px-4 py-3 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-72">
            {schedules.map((schedule, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-300">
                <td className="border-b border-gray-200 px-4 py-3">{index + 1}</td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {courses[schedule.course_id] || "Loading..."}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {students[schedule.student_id] || "Loading..."}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">{formatDate(schedule?.schedule_date)}</td>
                <td className="border-b border-gray-200 px-4 py-3">{formatTime(schedule?.in_time)}</td>
                <td className="border-b border-gray-200 px-4 py-3">{formatTime(schedule?.out_time)}</td>
                <td className="border-b border-gray-200 px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => openModal(schedule)}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding or editing schedule */}
      <ScheduleModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSubmit={handleAddSchedule}
        type="Schedule"
        schedule={editSchedule}
      />
    </div>
  );
};

export default ScheduleTable;
