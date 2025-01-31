import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white p-2 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold tracking-wide">
          <span className="text-blue-400">Student</span> Management
        </div>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              to="/courses"
              className="hover:text-blue-400 transition duration-300"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="hover:text-blue-400 transition duration-300"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/schedules"
              className="hover:text-blue-400 transition duration-300"
            >
              Schedules
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
