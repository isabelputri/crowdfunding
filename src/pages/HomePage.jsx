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

  // sorting the created date in order
  function compare(a, b) {
    if (a.date_created < b.date_created) {
      return 1;
    }
    if (a.date_created > b.date_created) {
      return -1;
    }
    return 0;
  }
  // organizes project list in reverse order so it shows the latest project first
  const latestProject = projectList.sort(compare);

  return (
    <div>
      <section className="text-section">
        <img id="logo" src="https://i.postimg.cc/SsDMxVJX/KCI-Logo.png" />
        <h1> 😿 Meow! Help! Emergency on Kitty Cat Island! </h1>
        <p>
          Tsunami has struck and many of our homes have been destroyed. We need
          your help to rebuild and care for all of our feline friends.
        </p>
        <p>
          Please donate what you can, every little bit helps. We need funds to
          provide food, shelter, and medical care.
        </p>
        <p>Purr-lease help! Meow!</p>
      </section>
      <h2 className="text-section"> Latest fundraisers </h2>
      <div className="project-container">
        <div id="project-list">
          {projectList.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
