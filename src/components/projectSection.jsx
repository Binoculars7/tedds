import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
      <div className="projects" id="project_list">
        <div className="project-card" key={project.id}>
          <div
            className="project-image"
            style={{ background: `url('/uploads/${project.imageName}') no-repeat center center/cover` }}
          ></div>
          <div className="project-content">
            <h2>{project.title}</h2>
            <p>{project.about}</p>
            <div className="badges">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="badge">{tag}</span>
              ))}
            </div>
            <div className="buttons">
              <a href={project.liveLink} className="btn live-demo" target="_blank" rel="noreferrer">
                Live Demo ↗
              </a>
              <a href={project.sourceLink} className="btn view-source" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i> View Source
              </a>
            </div>
          </div>
        </div></div>
      ))}
    </div>
  );
};

export default ProjectsSection;
