import logo from './logo.svg';
import './App.css';
import AuthorList from "./components/author";
import Menu from "./components/menu";
import Footer from "./components/footer";
import TodoList from "./components/todos";
import NotFound404 from "./components/404";
import TodosAuthor from "./components/TodosAuthor";
import ProjectList from "./components/projects";
import LoginForm from "./components/auth";


import React from "react";
import axios from "axios";
import {Route, Link, BrowserRouter, Routes} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'todos': [],
            'projects': [],
            'token': '',
            'project_search': [],
        }
    }

    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    create_todo(text, project, author) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: author, active: true}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    create_project(name, repository_link, users) {
        const headers = this.get_headers()
        const data = {name: name, repository_link: repository_link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    search_project(p) {
        const headers = this.get_headers()
        axios.get(`http://127.0.0.1:8000/api/projects/?name=${p}`, {headers}).then(response => {
            this.setState(
                {'project_search': response.data.results}
            )
        }).catch(error => console.log(error))
    }

    logout() {
        this.set_token('')
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState(
            {'token': token},
            () => this.load_data()
        )
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState(
            {'token': token},
            () => this.load_data()
        )
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/authors/', {headers}).then(response => {
            this.setState(
                {
                    'authors': response.data.results
                }
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(response => {
            this.setState(
                {'todos': response.data.results}
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            this.setState(
                {'projects': response.data.results}
            )
        }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div>
                {/*<Menu/>*/}
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Todos</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => {
                                    this.logout()
                                }}> Logout </button> : <Link to='/login'>Login</Link>}
                            </li>
                            <li>
                                <Link to='/todos/create'>Create Todos</Link>
                            </li>
                            <li>
                                <Link to='/projects/create'>Create Projects</Link>
                            </li>
                            {/*<li>*/}
                            {/*    <Link to='/projects/search'>Search Projects</Link>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<AuthorList authors={this.state.authors}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}
                                                                      delete_todo={(id) => this.delete_todo(id)}/>}/>

                        <Route exact path='/todos/create' element={
                            <TodoForm
                                authors={this.state.authors}
                                projects={this.state.projects}
                                create_todo={(text, project, author) => this.create_todo(text, project, author)}
                            />}
                        />

                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}
                                                                            delete_project={(id) => this.delete_project(id)}/>}/>

                        <Route exact path='/projects/create' element={
                            <ProjectForm
                                authors={this.state.authors}
                                create_project={(name, repository_link, users) => this.create_project(name, repository_link, users)}
                            />}
                        />
                        {/*<Route exact path='/projects/search' element={<ProjectList projects={this.state.projects}/>}/>*/}
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => {
                            this.get_token(username, password)
                        }}/>}/>


                        <Route path='/authors'>
                            <Route index element={<AuthorList authors={this.state.authors}/>}/>
                            <Route path=':authorId' element={<TodosAuthor todos={this.state.todos}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                {/*<Footer/>*/}
            </div>
        )
    }
}

export default App;
