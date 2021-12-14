import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { user: this.props.location.user, errorMessage:''};
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let user = {
            id: e.target.id.value,
            username: e.target.username.value,
            passwordHash: e.target.password.value,
            email: e.target.email.value,
        }

        fetch(process.env.REACT_APP_API_URL + 'User', {
            method: 'Put',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                var url = window.location.origin;
                window.location.href = url + '/User/Details/' + user.id;
              } else {
                this.setState({errorMessage: "Something went wrong"});
              }
        }).catch(err => {
            this.setState({errorMessage: err.message});
        });
    }

    renderUser(){
        var user = this.state.user;
        return(
            <div>
                <form onSubmit={this.onSubmit} >
                    <input type='hidden' name="id" className='form-control' defaultValue={user.id}/>
                    <p>Username: <input type='text' name="username" className='form-control' defaultValue={user.username}/></p>
                    <p>Password<input type='text' name="password" className='form-control' defaultValue={user.passwordHash}/></p>
                    <p>Email: <input type='text' name="email" className='form-control' defaultValue={user.email}/></p>
                    <p>Date Created: <input type='text' name="dateCreated" className='form-control' defaultValue={new Date(user.dateCreated).toLocaleDateString('lt')} readOnly/></p>
                    <button type='submit'>Save</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>User</h1>
                { this.state.errorMessage && <h3 style={{color: 'red'}}> { this.state.errorMessage } </h3> }
                {this.renderUser()}
            </div>
        );
    }
}

export default EditUser
