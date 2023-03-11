import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm";

function ProjectPage() {
  //State
  const [projectData, setProjectData] = useState({ pledges: [] });

  //Hooks
  const { id } = useParams();
  
  const token = window.localStorage.getItem("token");
  
  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
        setCommentData(data);
      });
  }, []);

  // useEffect(() => {
  //   const fetchProject = async () => {
  //     try {
  //       const res = await fetch(
  //         `${import.meta.env.VITE_API_URL}projects/${id}`
  //       );
  //       const data = await res.json();
  //       setProject(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProject();
  // }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(projectData.date_created).toLocaleDateString(
    undefined,
    options
  );

  return (
    <div>
      <h2>{projectData.title}</h2>
      <p>{projectData.description} </p>
      <p>{`Data created: ${date}`}</p>
      {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              <p>
                {pledgeData.supporter} donated ${pledgeData.amount}
              </p>
              <p>Comment: "{pledgeData.comment}"</p>
            </li>
          );
        })}
      </ul>
      <PledgeForm project={projectData} />{" "}
    </div>
  );
}

export default ProjectPage;
