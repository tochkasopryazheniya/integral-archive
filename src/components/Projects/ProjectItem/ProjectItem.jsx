import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import postsStore from "../../../store/PostsStore";
import {observer} from "mobx-react-lite";
import Loader from "../../Loader/Loader";
import {Helmet} from "react-helmet";
import projects from "../Projects";

const ProjectItem = ({vantaEffect}) => {
    const {id} = useParams();
    const {project, getOneProject, isLoading} = postsStore;
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        getOneProject(id)
    }, [])


    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize()
        }
        setProjectName(project.name)
    }, [project])

    if(isLoading) {
        return <Loader/>
    }

    return (
        <>
            <Helmet>
                <title>{`${projectName}`} - Интегральный архив</title>
            </Helmet>
            {Object.keys(project).length ? (
                <div className='container'>
                    <div className="projectItem">
                        <div className="projectItem-header">
                            <img className='projectItem-image'
                                 src={project.posterURL}
                                 alt=""/>
                            <div className='projectItem-title'>{project.name}</div>
                            <div className='projectItem-description'><span>{project.startYear} - ...</span></div>
                        </div>


                        <div className='projectItem-description'><span>Управляющая команда:</span> {project.manageTeam}
                        </div>
                        <div className='projectItem-description'><span>Команда инициатор:</span> {project.initTeam}
                        </div>

                        <div style={{marginTop: '30px'}}>
                            <div className='projectItem-description'>
                                <span>Миссия проекта:</span> {project.projectInfo.mission}</div>
                            <div className='projectItem-description'>
                                <span>Цели проекта:</span> {project.projectInfo.targets.map(item => {
                                return <span className='thin' key={item}>{item}</span>
                            })}</div>
                        </div>

                        {project.channels.length ? (
                            <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                <div className='projectItem-subtitle'>Каналы</div>
                                <div className='projectItem-channels'>
                                    {project.channels.map(channel => {
                                        return (
                                            <a key={channel.url} href={channel.url} target='_blank'
                                               className='projectItem-channel'>
                                                <div className='projectItem-channelTitle'>{channel.name}</div>
                                                <div className='projectItem-channelDescr'>{channel.description}</div>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : ''}

                        {project.tools.length ? (

                            <>
                                <div className='projectItem-subtitle'>Инструменты</div>
                                <div className='projectItem-channels'>
                                    {project.tools.map(tool => {
                                        return (
                                            <a key={tool.url} href={tool.url} target='_blank'
                                               className='projectItem-channel'>
                                                <div className='projectItem-channelTitle'>{tool.name}</div>
                                                <div className='projectItem-channelDescr'>{tool.description}</div>
                                            </a>
                                        )
                                    })}
                                </div>
                            </>

                        ) : ''}
                    </div>
                </div>
            ) : ''}
        </>
    );
};

export default observer(ProjectItem);