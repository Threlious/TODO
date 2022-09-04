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


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'todos': [],
            'projects': [],
            'token': ''
        }
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
                                { this.is_auth() ? <button onClick={() => {this.logout()}}> Logout </button>: <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<AuthorList authors={this.state.authors}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/login' element={<LoginForm get_token={(username, password) => {
                            this.get_token(username, password)
                        }}/>}/>


                        <Route path='/authors'>
                            <Route index element={<AuthorList authors={this.state.authors}/>}/>
                            <Route path=':authorId' element={<TodosAuthor todos={this.state.todos}/>}/>
                        </Route>
                        {/*<Route path='/author/:id'>*/}
                        {/*    <TodosAuthor todos={this.state.todos}/>*/}
                        {/*</Route>*/}
                        {/*<Route path='*' element={<NotFound404/>}/>*/}
                    </Routes>
                </BrowserRouter>
                {/*<Footer/>*/}
            </div>
        )
    }
}

export default App;
