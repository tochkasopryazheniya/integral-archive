import React from 'react';
import Card from "./Card";
import postsStore from "../../store/PostsStore";
import {observer} from "mobx-react-lite";

const AllCards = () => {
    const {filteredPosts, inputValue} = postsStore;
    return (
        <div className='container'>
            <div className='cards'>
                {filteredPosts.filter(post => post.name.toLowerCase().includes(inputValue.toLowerCase())).map(post => {
                    return <Card key={post._id} data={post}/>
                })}
            </div>
        </div>
    );
};

export default observer(AllCards);