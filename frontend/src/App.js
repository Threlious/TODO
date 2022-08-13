import logo from './logo.svg';
import './App.css';
import React from "react";
import AuthorList from "./components/author";
import axios from "axios";
import Menu from "./components/menu";
import Footer from "./components/footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors/').then(response => {
            this.setState(
            {'authors': response.data}
        )
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Menu/>
                <AuthorList authors={this.state.authors}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
