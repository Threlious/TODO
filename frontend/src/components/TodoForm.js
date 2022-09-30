import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', project: '', author: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }


    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text"
                       value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                <select name='project' onChange={(event) => this.handleChange(event)}>
                    {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                </select>
                <select name='author' onChange={(event) => this.handleChange(event)}>
                    {this.props.authors.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>

                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default TodoForm