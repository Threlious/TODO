import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', repository_link: '', authors: []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState(
                {'authors': []}
            )
            return
        }
        let authors = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            authors.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({'authors': authors})
    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.repository_link, this.state.authors)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name"
                       value={this.state.name} onChange={(event) => this.handleChange(event)}/>

                <input type="text" name="repository_link" placeholder="repository link"
                       value={this.state.repository_link} onChange={(event) => this.handleChange(event)}/>

                <select name='authors' multiple onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.authors.map((item) => <option value={item.id}>{item.username}</option>)}
                </select>

                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default ProjectForm