import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  //State
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  return (
    <div>
      <h1> Meow! Help! Emergency on Kitty Cat Island! </h1>
      <p>
        Tsunami has struck and many of our homes have been destroyed. We need
        your help to rebuild and care for all of our feline friends.
      </p>
      <p>
        Please donate what you can, every little bit helps. We need funds to
        provide food, shelter, and medical care.
      </p>
      <p>Purr-lease help! Meow!</p>
      <h3> Latest fundraisers </h3>
      <div id="project-list">
        {projectList.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
