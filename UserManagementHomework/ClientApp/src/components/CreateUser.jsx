import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: ''};
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let user = {
            username: e.target.username.value,
            passwordHash: e.target.password.value,
            email: e.target.email.value,
        }

        fetch(process.env.REACT_APP_API_URL + 'User', {
            method: 'Post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                var url = window.location.origin;
                window.location.href = url + '/List';
              } else {
                this.setState({errorMessage: "Something went wrong"});
              }
        }).catch(err => {
            this.setState({errorMessage: err.message});
        });
    }

    renderUser(){
        return(
            <div>
                <form onSubmit={this.onSubmit} >
                    <p>Username: <input type='text' name="username" className='form-control'/></p>
                    <p>Password<input type='text' name="password" className='form-control'/></p>
                    <p>Email: <input type='text' name="email" className='form-control'/></p>
                    <p>Date Created: <input readOnly type='text' name="dateCreated" className='form-control' 
                                            defaultValue={new Date().toLocaleDateString('lt')}/></p>
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

export default CreateUser
