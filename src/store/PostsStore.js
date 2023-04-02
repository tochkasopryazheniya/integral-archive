import {makeAutoObservable, runInAction, toJS} from "mobx";
import {$API_URL} from "../http/http";
import axios from "axios";

class PostsStore {
    posts = [];
    filteredPosts = [];
    post = {};
    project = {};
    inputValue = '';

    isPostLoading = true;
    isLoading = true;

    projects = [];


    setInputValue = (value) => {
        this.inputValue = value;
    }
    setPost = (post) => {
        this.post = post;
    }

    setProject = (project) => {
        this.project= project;
    }

    setPosts = (posts) => {
        this.posts = posts;
    }
    setFilteredPosts = (posts) => {
        this.filteredPosts = posts;
    }

    filterPosts = (projectId) => {
        if(projectId === 'all') {
            this.setFilteredPosts(this.posts)
            return
        }
        const filteredPosts = this.posts.filter(post => post.projectId === projectId);
        this.setFilteredPosts(filteredPosts)
    }



    setProjects = (projects) => {
        this.projects = projects;
    }

    getPosts = async () => {
        axios.get(`${$API_URL}/posts`).then(({data}) => {
            this.setPosts(data)
            this.setFilteredPosts(data)
        }).then(() => {
            runInAction(() => {
                this.isLoading = false;
            })
        })
    }

    getProjects= async () => {
        axios.get(`${$API_URL}/projects`).then(({data}) => {
            this.setProjects(data)
        })
    }

    getAllInfo = async() => {
        await this.getProjects();
        await this.getPosts();
    }

    getOnePost = (id) => {
        runInAction(() => {
            this.isPostLoading = true
        })
        axios.get(`${$API_URL}/posts/${id}`).then(({data}) => {
            this.setPost(data);

        }).catch(e => {
            console.log(e)
        }).finally(() => {
            runInAction(() => {
                this.isPostLoading = false;
            })
        })
    }

    getOneProject = (id) => {
        this.isLoading = true;
        axios.get(`${$API_URL}/projects/${id}`).then(({data}) => {
            this.setProject(data)

        }).catch(e => {
            console.log(e)
        }).finally(() => {
            runInAction(() => {
                this.isLoading = false
            })
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new PostsStore();