import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({});
  const [error, setError] = useState("");
  const [classLevel, setClassLevel] = useState(null);
  const [creating, setCreating] = useState(false);
  const [alreadyAssignClasses, setAlready] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/teachers`)
      .then((res) => res.json())
      .then((data) => {
        setTeachers(() => data);
      })
      .catch((error) => {
        console.log("there are no available teachers in your database");
        console.warn(error);
      });
  }, []);

  const handleTeacherSelect = (subject, teacher) => {
    setSelectedTeachers({
      ...selectedTeachers,
      [subject]: teacher,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreating(() => true);
    const selectedData = {
      classLevel: classLevel,
      teachers: Object.entries(selectedTeachers).map(([subject, teacher]) => ({
        subject: subject,
        teacherUserId: teacher.user_id,
        teacherName: `${teacher.first_name} ${teacher.last_name}`,
      })),
    };
    console.log(selectedData);
    // send selectedData to backend
    const assign = await axios.post("http://localhost:5000/admin/placement", {
      selectedData,
    });
    setError(() => assign.data.success);
    setAlready((already) => {
      return [...already, classLevel];
    });
    setTimeout(() => {
      setCreating(() => false);
    }, 1000);
  };

  const TSFLEX = ({ subjectName, teachers }) => {
    return (
      <div className="subject-teacher-flex">
        <div className="subject-name">{subjectName}</div>
        <div style={{ display: "flex" }}>
          {teachers.length &&
            teachers
              .filter((teacher) => teacher.subject === subjectName)
              .map((teacher) => {
                return (
                  <div key={teacher.user_id}>
                    <label
                      htmlFor={teacher.user_id}
                    >{`${teacher.first_name} ${teacher.last_name}`}</label>
                    <input
                      required
                      type="radio"
                      name={subjectName}
                      value={`${teacher.first_name} ${teacher.last_name}`}
                      onChange={() => handleTeacherSelect(subjectName, teacher)}
                      checked={
                        selectedTeachers[subjectName]?.user_id ===
                        teacher.user_id
                      }
                    />
                  </div>
                );
              })}
        </div>
      </div>
    );
  };

  return (
    <div className="assign-wrapper">
      <form className="assign-actual-size" onSubmit={handleSubmit}>
        <h2
          onClick={() => {
            console.log(alreadyAssignClasses);
          }}
        >
          Placement Dashboard
        </h2>

        <div>
          <h2 className="no-class">{error}</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="classLevel">
            Grade:
            <input
              style={{
                width: "2rem",
                height: "1.5rem",
                marginLeft: "10px",
                fontSize: "1rem",
              }}
              type={"number"}
              min="9"
              max="12"
              required
              onChange={(event) => setClassLevel(event.target.value)}
            />
          </h3>
          <button className="createClassBtn" type="submit">
            Submit
          </button>
        </div>
        {
          // !
          // !
        }
        {creating ? (
          <div className="no-class">
            <h1> "assigning teachers . . ."</h1>
          </div>
        ) : (
          <div className="subjects-division">
            {[
              "English",
              "Amharic",
              "Afaan Oromo",
              "Mathematics",
              "Physics",
              "Chemistry",
              "Biology",
              "Geography",
              "History",
              "Civics",
            ].map((name) => {
              return (
                <TSFLEX key={name} subjectName={name} teachers={teachers} />
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default AssignTeachers;
