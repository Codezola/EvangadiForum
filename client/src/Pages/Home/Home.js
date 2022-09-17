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
          Welcome to Evangadi Forum: {userData.user?.display_name}
        </h1>
      </div>
      <div
        className="flex justify-between"
      >
        <h2>Questions</h2>
        <input
        type="search"
        className="
          form-control
          block
          w-full
          px-2
          py-2
          text-base
          font-normal
          text-orange-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-orange-700 focus:bg-white focus:border-blue-200 focus:outline-none
        "
        id="exampleSearch"
        placeholder="Search Tittle"
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