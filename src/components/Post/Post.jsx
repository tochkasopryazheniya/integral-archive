import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import postsStore from "../../store/PostsStore";
import {observer} from "mobx-react-lite";
import Loader from "../Loader/Loader";
import {Helmet} from "react-helmet";

const Post = ({vantaEffect}) => {
    const {id} = useParams();
    const {isPostLoading, post, getOnePost} = postsStore;
    const [postName, setPostName] = useState('');

    useEffect(() => {
        getOnePost(id)
        if(vantaEffect) {
            vantaEffect.resize()
        }
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize()
        }
        setPostName(post.name)
    }, [post])



    return (
        <div className='container'>
            <Helmet>
                <title>{`${postName}`} - Интегральный архив</title>
            </Helmet>
            {isPostLoading ? <Loader/> : (
                <div className="post">
                    {post?.paragraphs.map(item => {
                        switch (item.type) {
                            case 'textBlock':
                                return (
                                    <div key={item.value} className='post-text'>{item.value}</div>
                                )
                            case 'titleH1':
                                return (
                                    <h1 key={item.value} className='post-title'>{item.value}</h1>
                                )
                            case 'titleH2':
                                return (
                                    <h2 key={item.value} className='post-subtitle'>{item.value}</h2>
                                )
                            case 'link':
                                return (
                                    <div key={item.value.url} className='link-wrapper'>
                                        <a className='post-link' href={item.value.url} target='_blank'>{item.value.textOnLink}</a>
                                    </div>
                                )
                            case 'imgUrl':
                                return (
                                    <div key={item.value} className='image-wrapper'>
                                        <img className='post-image' src={item.value} alt=""/>
                                    </div>
                                )
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default observer(Post);