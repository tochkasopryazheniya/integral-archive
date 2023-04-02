import React from 'react';
import {Link} from "react-router-dom";
import Loader from "../../Loader/Loader";
import postsStore from "../../../store/PostsStore";

const ProjectCard = ({data}) => {
    return (
        <div className='project-card'>
            <div className="project-cardWrapper">
                <img className='project-cardImg'
                     src={data.posterURL} alt=""/>
                <div className="project-cardTitle">{data.name}</div>
            </div>

            <div className='project-cardDescription'>{data.description}</div>
            <Link className='card-btn' to={`/projects/${data._id}`}>Подробнее</Link>
        </div>
    );
};

export default ProjectCard;