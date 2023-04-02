import React, {useEffect} from 'react';
import Searchbar from "../Searchbar/Searchbar";
import AllCards from "../AllCards/AllCards";
import postsStore from "../../store/PostsStore";
import Loader from "../Loader/Loader";


const HomeComponent = ({vantaEffect}) => {
    const {isLoading} = postsStore;
    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize()
        }
    }, [])

    if(isLoading) {
        return <Loader/>
    }
    return (
        <>
            <Searchbar vantaEffect={vantaEffect}/>
            <AllCards/>
        </>
    );
};

export default HomeComponent;