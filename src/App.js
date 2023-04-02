import './assets/styles/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from "react";
import NET from 'vanta/dist/vanta.net.min';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import Projects from "./components/Projects/Projects";
import Post from "./components/Post/Post";
import ProjectItem from "./components/Projects/ProjectItem/ProjectItem";
import postsStore from "./store/PostsStore";
import {observer} from "mobx-react-lite";
import {Helmet} from "react-helmet";


function App() {
    const {posts, getAllInfo, isLoading} = postsStore
    const ref = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null)

    useEffect(() => {
        getAllInfo();
    }, [])

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: ref.current,
                mouseControls: false,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: '#d03b35',
                backgroundColor: '#141214',
                maxDistance: 24.00,
                spacing: 16.00
            }))
        }

    }, [vantaEffect])

    useEffect(() => {
        if(vantaEffect) {
            vantaEffect.resize();
        }
    }, [posts])
    return (
        <div ref={ref} className="App">
            <Helmet>
                <title>Лента - Интегральный архив</title>
            </Helmet>
            <div className='appWrapper'>
                <Header/>
                <Routes>
                    <Route path='/' element={<HomeComponent vantaEffect={vantaEffect}/>}/>
                    <Route path='/projects' element={<Projects vantaEffect={vantaEffect}/>}/>
                    <Route path='/posts/:id' element={<Post vantaEffect={vantaEffect}/>}/>
                    <Route path='/projects/:id' element={<ProjectItem vantaEffect={vantaEffect}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default observer(App);
