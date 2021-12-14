import React, {Component} from 'react'
import { Link } from 'react-router-dom';

export class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, errorMessage: '', loading: true};
    }

    componentDidMount() {
        this.FetchUser(this.props.match.params.id);
    }

    renderUser(){
        var user = this.state.user;
        return(
            <div>
                <p>Id: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Password hash: {user.passwordHash}</p>
                <p>Email: {user.email}</p>
                <p>Date Created: {new Date(user.dateCreated).toLocaleDateString('lt')}</p>
                <Link to={{pathname: '../Edit/' + user.id, user: user}}>
                    <button type='button'>Edit</button>
                </Link>
            </div>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUser();
        return (
            <div>
                <h1>User</h1>
                { this.state.errorMessage && <h3 style={{color: 'red'}}> { this.state.errorMessage } </h3> }
                {contents}
            </div>
        );
    }

    async FetchUser(id) {
        try{
            const response = await fetch(process.env.REACT_APP_API_URL + "User/" + id);
            console.log(response);
            const data = await response.json();
            this.setState({ user: data, loading: false });
        }
        catch(err){
            this.setState({errorMessage: err.message});
        }
    }
}

export default UserCard
