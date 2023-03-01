import React, { useState, useEffect } from "react";
import "./Grade.css";
import Profile from "./../../assets/profile.jpg";
import ProfilePage from "./../Profile/ProfilePage.jsx";
import { NavBar, NoAccess } from "../../components/cexporter";
import { useGlobalState } from "../../StateProvider";

const Grade = () => {
  const [{ user }] = useGlobalState();
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    const id = user?.user_id;
    fetch(`http://localhost:5000/student/result?studentID=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setGrades(() => data);
      })
      .catch((error) => {
        console.log("No result are there yet");
        console.warn(error);
      });
  }, []);

  if (user?.role !== "Student") return <NoAccess />;
  // console.log(grades)
  return (
    <>
      <ProfilePage />
      <div className="grade__report">
        <h1 className="report__header">Grade Report</h1>
        <div className="report__container">
          <div className="subject__header">Subject</div>
          <div className="subject__header">
            1<sup>st</sup> Semiseter
          </div>
          <div className="subject__header">
            2<sup>nd</sup> Semiseter
          </div>
          <div className="subject__header">Average</div>
        </div>

        <div>
          {grades.length &&
            grades.map((result) => {
              const { term1, term2 } = JSON.parse(result.result);
              return (
                <div className="report__container">
                  <div className="subject__name">{result.subject_id}</div>
                  <div className="result">{term1 || 0}</div>
                  <div className="result">{term2 || 0}</div>
                  {/* <div className="result">{(term1 + term2 ) / 2}</div> */}
                </div>
              );
            })}
          <div style={{ marginBottom: "100px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Grade;
