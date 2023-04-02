import React, {useEffect} from 'react';
import ProjectCard from "./ProjectCard/ProjectCard";
import postsStore from "../../store/PostsStore";
import Loader from "../Loader/Loader";
import {observer} from "mobx-react-lite";
import {Helmet} from "react-helmet";

const Projects = ({vantaEffect}) => {
    const {projects, isLoading} = postsStore;

    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize();
        }
    }, [])

    if(isLoading) {
        return <Loader/>
    }
    return (
        <div className='container'>
            <Helmet>
                <title>Проекты - Интегральный архив</title>
            </Helmet>
            <div className="projects">
                {projects.map(project => {
                    return <ProjectCard key={project._id} data={project}/>
                })}
            </div>
        </div>
    );
};

export default observer(Projects);