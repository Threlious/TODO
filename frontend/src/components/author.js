import React from "react";
import {Link} from "react-router-dom";


const AuthorItem = ({author}) => {
    return (
        <tr>
            <td>
                <Link to={`/authors/${author.id}`}>{author.first_name}</Link>
            </td>
            <td>
                {author.last_name}
            </td>
            <td>
                {author.email}
            </td>
            <td>
                {author.username}
            </td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <tr>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Username
                </th>
            </tr>
            {authors.map((author) => <AuthorItem author={author}/>)}
        </table>
    )
}

export default AuthorList