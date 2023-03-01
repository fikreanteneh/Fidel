import React, { useState, useEffect } from "react";
import { NavBar } from "../../components/cexporter";
import Cookies from "universal-cookie";
import { useGlobalState } from "../../StateProvider";
import "./Myclass.css";
import axios from "axios";

const cookies = new Cookies();
const id = cookies.get("userId");

const Myclass = () => {
  const [{ user }, dispatch] = useGlobalState();
  const [Students, setStudent] = useState([]);
  const [formStyle, setFormStyle] = useState(false);
  const [activeClass, setActiveClass] = useState();
  const [activeStudent, setActiveStudent] = useState("submit");
  const [term, setTerm] = useState("term1");
  const [result, setResult] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleResultChange = (event) => {
    setResult(event.target.value);
  };
  const [myClasses, setMyClasses] = useState([]);
  useEffect(() => {
    user &&
      fetch(`http://localhost:5000/teacher/myclasses?teacherId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // fetch all classes that already exist and set it to the array
          setMyClasses(() => data);
        })
        .catch((error) => {
          console.log("No classes are there yet");
          console.warn(error);
        });
  }, []);

  const fetchStudentsClass = (e) => {
    const classID = e.target.textContent;
    fetch(`http://localhost:5000/student/class?classID=${classID}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // fetch all classes that already exist and set it to the array
        // setMyClasses(() => data);
        setStudent(() => data);
        setActiveClass(() => classID);
      })
      .catch((error) => {
        console.log("No classes are there yet");
        console.warn(error);
      });
  };

  // console.log(finish)

  return (
    <div>
      <NavBar />
      <h3
        style={{
          width: "70%",
          margin: "2rem auto",
        }}
      >
        My Classes
      </h3>

      <div className="class-screen">
        {myClasses?.map((myClass) => {
          return (
            <div
              className="class-one teacher-classes"
              onClick={fetchStudentsClass}
              key={myClass.subject_id}
            >
              {myClass.subject_id}
              {/* <span>{myClass.class_id}</span> */}
            </div>
          );
        })}
      </div>

      {Students && (
        <div className="students-list">
          {Students.map((student) => {
            return (
              <div key={student.user_id} id={student.user_id}>
                <p>
                  {"Full Name : "}
                  {student.first_name +
                    " " +
                    student.last_name +
                    " " +
                    student.sure_name}
                </p>

                <form
                  className="submissionForm"
                  style={{
                    display: `${formStyle ? "flex" : "none"}`,
                  }}
                >
                  <p>
                    {" "}
                    {student.first_name +
                      " " +
                      student.last_name +
                      " " +
                      student.sure_name}
                  </p>

                  <div>
                    <label>
                      Term:
                      <select value={term} onChange={handleTermChange}>
                        <option value="term1">Term 1</option>
                        <option value="term2">Term 2</option>
                      </select>
                    </label>
                  </div>
                  <div>
                    <label>
                      Result:
                      <input
                        type="text"
                        value={result}
                        onChange={handleResultChange}
                      />
                    </label>
                  </div>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const studentID = activeStudent;
                      const subject_id = activeClass;

                      const submitRes = await axios.post(
                        "http://localhost:5000/teacher/resultsubmission",
                        {
                          studentID,
                          subject_id,
                          result,
                          term,
                        }
                      );
                    }}
                  >
                    submit
                  </button>

                  <div onClick={() => setFormStyle((prevState) => !prevState)}>
                    close
                  </div>
                </form>
                <button
                  className="popBtn"
                  onClick={(e) => {
                    setFormStyle((prevState) => !prevState);
                    setActiveStudent(e.target.parentElement.id);
                  }}
                >
                  submit Grade
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Myclass;
