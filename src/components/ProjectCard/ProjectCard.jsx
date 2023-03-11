import { Link } from "react-router-dom";

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <div className="project-card">
      <Link to={`/project/${projectData.id}`}>
        <img src={projectData.image} />
        <h2>{projectData.title}</h2>
      </Link>
      <p>
        Total raised: ${projectData.total} of ${projectData.goal} goal
      </p>
    </div>
  );
}

export default ProjectCard;
