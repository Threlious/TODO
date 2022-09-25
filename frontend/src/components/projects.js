import React, {useState} from "react";


const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repository_link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button type='button' onClick={() => delete_project(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {

    let [current_projects, setCurrentProjects] = useState(projects)

    const handleChange = (event) => {
        console.log(current_projects.filter((el) =>
            el.name.toLowerCase().includes(event.target.value.toLowerCase())
        ))
        setCurrentProjects(current_projects.filter((el) =>
            el.name.toLowerCase().includes(event.target.value.toLowerCase())
        ))
    }

    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Name
                </th>
                <th>
                    Repository link
                </th>
                <th>
                    Users
                </th>
                {projects.map((current_projects) => <ProjectItem project={current_projects} delete_project={delete_project}/>)}
            </table>
            <input type="text" name="password" placeholder="search pattern"
                        onChange={(event) => handleChange(event)}/>
        </div>
    )
}

export default ProjectList