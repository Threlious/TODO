import logo from './logo.svg';
import './App.css';
import AuthorList from "./components/author";
import Menu from "./components/menu";
import Footer from "./components/footer";
import TodoList from "./components/todos";
import NotFound404 from "./components/404";
import TodosAuthor from "./components/TodosAuthor";
import ProjectList from "./components/projects";

import React from "react";
import axios from "axios";
import {Route, Link, BrowserRouter, Routes} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'todos': [],
            'projects': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors/').then(response => {
            this.setState(
                {
                    'authors': response.data.results
                }
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
            this.setState(
                {'todos': response.data.results}
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            this.setState(
                {'projects': response.data.results}
            )
        }).catch(error => console.log(error))
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
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<AuthorList authors={this.state.authors}/>}/>
                        <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/authors'>
                            <Route index element={<AuthorList authors={this.state.authors} />} />
                            <Route path=':authorId' element={<TodosAuthor todos={this.state.todos} />} />
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
