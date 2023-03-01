import React, { useState, useEffect } from "react";
import { NavBar, NoAccess } from "../../components/cexporter";
import "./Placement.css";
import AssignTeachers from "./AssignTeachers";
import axios from "axios";
import { useGlobalState } from "../../StateProvider";

const Placement = () => {
  const [created, setCreated] = useState(false);
  const [{ user }] = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/admin/classes`)
      .then((res) => res.json())
      .then((data) => {
        // fetch all classes that already exist and set it to the array

        setClasses(() => data);
      })
      .catch((error) => {
        console.log("No classes are yet to be created");
        console.warn(error);
      });
  }, [created]);

  // ! generates classes every year
  const generateClass = async () => {
    setLoading(() => true);
    const generate = await axios.post("http://localhost:5000/admin/classes");
    if (generate["number"] === 16) {
      setCreated(() => true);
      setLoading(() => false);
    }
  };

  if (user?.role === "Teacher" || user?.role === "Student") return <NoAccess />;

  return (
    <div className="placement-wrapper">
      <NavBar />

      <div className="admin-classView-wrapper">
        <h1 style={{ textAlign: "center", margin: "1.25rem auto" }}>
          {new Date().getFullYear()} Academic year
        </h1>
        {!classes.length && (
          <div className="class-header">
            <h1>Classes</h1>
            <button className="createClassBtn" onClick={generateClass}>
              Create Class
            </button>
          </div>
        )}

        <div className={classes?.length > 0 ? "class-screen" : ""}>
          {
            // map over the array and show classes
            classes.length > 0 ? (
              classes.map((item, index) => {
                return (
                  <div className="class-one" key={item.class_id}>
                    <i className="fa-brands fa-twitter"></i>

                    <p>{item.class_id}</p>
                  </div>
                );
              })
            ) : (
              <div className="no-class">
                {loading ? (
                  <h1> "Creating classes . . ."</h1>
                ) : (
                  <h1>No classes are created yet for this year!!</h1>
                )}
              </div>
            )
          }
        </div>
      </div>
      <AssignTeachers />

    </div>
  );
};

export default Placement;
