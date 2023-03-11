import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard/ProjectCard";

function AllProjectsPage() {
  // State
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`) // making network request to url
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
        <h2>Dear Hoomans,</h2>
        <p>
          Many of us have ended up in shelters or on the streets, struggling to
          survive. That's why we are asking you to consider making a donation
          below.
        </p>
        <p>Your gift could make all the difference in the life of a cat.</p>
      </section>
      <h3 className="project-container">Discover all fundraisers</h3>
      <div className="project-container">
        <div id="project-list">
          {latestProject.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllProjectsPage;
