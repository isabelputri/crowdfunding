import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm/PledgeForm";

function ProjectPage() {
  //State
  const [projectData, setProjectData] = useState({ pledges: [] });
  const [owner, setOwner] = useState([]);

  //Hook
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);

        //convert userid to username
        const userId = data.owner;
        return fetch(`${import.meta.env.VITE_API_URL}users/${userId}`);
      })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        return setOwner(data);
      });
  }, []);

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
                {owner.username} donated ${pledgeData.amount}
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
