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
    <div className="project-page">
      <div className="project-box">
        <img id="project-image" src={projectData.image} />
        <h1>{projectData.title}</h1>
        <p>
          Published by {owner.username} on {date}
        </p>
        <h3>{projectData.description} </h3>
      </div>
      <div className="pledge-box">
        <h2>Pledges:</h2>
        <ul className="pledge-list">
          {projectData.pledges.map((pledgeData, key) => {
            return (
              <li className="pledge-individual" key={key}>
                <p>
                  {owner.username} donated ${pledgeData.amount}
                </p>
                <p>Comment: "{pledgeData.comment}"</p>
              </li>
            );
          })}
        </ul>
        <p>
          Total raised: ${projectData.total} of ${projectData.goal} goal
        </p>

        <div class="pledge-form">
          <h2>Donate now:</h2>
          <PledgeForm project={projectData} />{" "}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
