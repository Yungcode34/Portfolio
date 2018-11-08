import React from 'react'

const WorkLinks = (props) => {
  const projects = Object.keys(props.output);
  const work = props.output;
    return projects.map((project, idx) => {
        return (
          <div className="about" key={idx}>
            <br />
            <a className="anchor" target="_blank" href={work[project]}>
              {project}
            </a>
            <br />
          </div>
        );
    });
}

export default WorkLinks;
