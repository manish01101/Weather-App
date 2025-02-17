import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Appbar from "./components/Appbar.jsx";
import { Landing } from "./pages/Landing.jsx";
import { userState } from "./store/atoms/user.js";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "./config.js";
import { useEffect } from "react";
import Admin from "./pages/Admin.jsx";
import Course from "./pages/Course.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import User from "./pages/User.jsx";
import Courses from "./pages/Courses.jsx";
import PurchasedCourses from "./pages/PurchasedCourses.jsx";
import PurchasedCourse from "./pages/PurchasedCourse.jsx";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/courses/:courseId" element={<Course />} />
            <Route path="/admin/addcourse" element={<AddCourse />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/courses" element={<Courses />} />
            <Route path="/user/courses/:courseId" element={<Course />} />
            <Route
              path="/user/purchasedCourses"
              element={<PurchasedCourses />}
            />
            <Route
              path="/user/purchasedCourses/:courseId"
              element={<PurchasedCourse />}
            />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const role = localStorage.getItem("Role");
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/${role}/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
