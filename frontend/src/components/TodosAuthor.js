import React from "react";
import {useParams} from "react-router-dom";


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.active}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
        </tr>
    )
}

const TodosAuthor = ({todos}) => {
    let {authorId} = useParams()
    let filter_todos = todos.filter((todo) => todo.user === parseInt(authorId))
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Text
            </th>
            <th>
                Active
            </th>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            {filter_todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodosAuthor