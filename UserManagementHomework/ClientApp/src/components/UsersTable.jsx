import React, {Component} from 'react'

export class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = { users: this.props.users };
    }

    handleRowClick(userId){
        var url = window.location.origin;
        window.location.href = url + '/User/Details/' + userId;
    }

    handleDelete(event, userId){
        fetch(process.env.REACT_APP_API_URL + 'User/' + userId, {
            method: 'Delete'
        });
        window.location.reload(false);
        event.stopPropagation();
    }

    render() {
        return (
            <div>
                { <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Password Hash</th>
                            <th>Email</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return (
                                <tr key={index} onClick={() => this.handleRowClick(user.id)}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.passwordHash}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.dateCreated).toLocaleDateString('lt')}</td>
                                    <td>
                                        <button style={{color:'red'}} onClick={(event) => this.handleDelete(event, user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>
        );
    }
}

export default UsersTable
