import React from 'react';
import {Link} from "react-router-dom";
import postsStore from "../../store/PostsStore";

const Card = ({data}) => {
    const {projects} = postsStore;

    const convertProjectIdToName = () => {
        return projects.filter(project => project._id === data.projectId)[0].name
    }
    return (
        <div className='card'>
            <Link className='card-projectType' to={`/projects/${data.projectId}`}>{convertProjectIdToName()}</Link>
            <div className="card-title">{data.name}</div>
            <div className="card-description">{data.description}</div>
            <Link className='card-btn' to={`posts/${data._id}`}>Подробнее</Link>
        </div>
    );
};

export default Card;