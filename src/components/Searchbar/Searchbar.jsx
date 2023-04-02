import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import postsStore from "../../store/PostsStore";

const Searchbar = ({vantaEffect}) => {
    const {projects, filterPosts, filterPostsByInput, inputValue, setInputValue} = postsStore;
    const [select, setSelect] = useState('');

    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize();
        }
    }, [select, inputValue])

    const onChangeSelect = (e) => {
        setSelect(e.target.value);
        if (e.target.value === '0') {
            return
        }

        if (e.target.value === 'all') {
            filterPosts('all');
            return;
        }
        const projectId = projects.filter(project => project.name === e.target.value)[0]._id;
        filterPosts(projectId)
    }

    const onChangeInput = (e) => {
        setInputValue(e.target.value);
    }
    return (
        <div className='container'>
            <div className='searchbar'>
                <input value={inputValue} type="text" className="searchbar-input" placeholder='Введите название статьи'
                       onChange={onChangeInput}/>
                <select placeholder='Фильтрация по проектам' onChange={onChangeSelect} className="filter-select" name=""
                        id="">
                    <option value={0}>Фильтрация по проектам</option>
                    <option value="all">Все проекты</option>
                    {projects.map(project => {
                        return <option key={project._id} value={project.id}>{project.name}</option>
                    })}
                </select>
            </div>

        </div>
    );
};

export default observer(Searchbar);