import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import QuestionDetail from "../Question/QuestionDetail";
import Axios from "../../axios";
import { HiArrowNarrowRight } from 'react-icons/hi';

const Home = () => {
  const [userData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const axios = Axios();
  const [search, setSearcher] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    } else {
      loadQuestions();
    }
  }, [userData.user]);

  async function loadQuestions() {
    const response = await axios.get(
      "/api/question/getquestions",
      userData.config
    );
    setQuestions(response.data?.data);
  }

  const handleClick = () => {
    navigate("/newquestion");
  };

  useEffect(() => {
    setFilterData(
      questions.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, questions]);

  return (
    <section className="container">
      <div className="header_row">
        <button className='bg-[#6289e9] text-2xl text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600' onClick={handleClick}>
        Ask Question
        <span className='group-hover:rotate-90 duration-300'>
          <HiArrowNarrowRight className='ml-3 ' />
        </span>
      </button>
        <h1 className="header_border ">
          Welcome: {userData.user?.display_name}
        </h1>
      </div>
      <div
        className="search"
        style={{
          borderBottom: "0.1px solid",
          height: "50px",
          borderRadius: "5px",
          paddingTop: "0.1%",
          paddingRight: "0.1%",
          paddingBottom: "0.1%",
          marginBottom: "1%",
        }}
      >
        <h2>Questions</h2>
        <input
          className="search_bar"
          type="text"
          onChange={(e) => {
            setSearcher(e.target.value);
          }}
        />
      </div>
      <div>
        {filterData.length === 0 ? (
          <div>No Result Found</div>
        ) : (
          filterData.map((quest, index) => {
            return <QuestionDetail question={quest} key={index} />;
          })
        )}
      </div>
    </section>
  );
};

export default Home;