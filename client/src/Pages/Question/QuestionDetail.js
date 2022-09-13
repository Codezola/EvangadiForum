import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "font-awesome/css/font-awesome.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

import '../Question/Question.css'

function QuestionDetail({ question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/answer/${question.question_id}`);
  };
  return (
    <div className="header_question">
      <div className="question_user" style={{ textAlign: "center" }}>
        <FaRegUserCircle style={{ width: "80%", height: "80%", margin: "auto" }} />
        <div style={{ width: "80%", height: "20%", margin: "auto" }}>
          {question ? question.user_name + "" : "New User"}{" "}
        </div>
      </div>
      <div className="question_title" onClick={handleClick}>
        <div className="question_content">
        <h4>Title</h4>
          {question ? question.title : "New Title"}
        </div>
        <div className='cursor-pointer hover:scale-200 duration-500 m-4'>
          <MdQuestionAnswer />
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;