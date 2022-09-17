import Axios from "./axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Login from "./Pages/Signin/SignIn";
import NewQuestion from "./Pages/Question/NewQuestion";
import Answer from "./Pages/Answer/Answer";
import NotFound from "./Pages/NotFound/NotFound";
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const axios = Axios();

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null || token === "") {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("/api/users", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
        config: {
          headers: { "x-auth-token": token },
        },
      });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/newquestion" element={<NewQuestion />} />
          <Route path="/answer/:id" element={<Answer />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;