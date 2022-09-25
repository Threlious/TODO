import React from "react";


const TodoItem = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {String(todo.active)}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                <button type='button' onClick={() => delete_todo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, delete_todo}) => {
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
            {todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo}/>)}
        </table>
    )
}

export default TodoList