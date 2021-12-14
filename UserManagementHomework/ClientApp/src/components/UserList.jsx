import React, {Component} from 'react'
import UsersTable from './UsersTable';
import { Link } from 'react-router-dom';

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], loading: true, errorMessage: '', file: null };
    }

    componentDidMount() {
        this.FetchAllUsers();
    }

    handleFile(e){
        let file;
        try{
            this.setState({file: e.target.files[0]});
        }catch(err){
            this.setState({errorMessage: err.message});
        }
    }

    handleUploadClick(){
        let data = new FormData();
        data.append('body', this.state.file);
        fetch(process.env.REACT_APP_API_URL + 'User/InsertFromFile', {
            method: 'Post',
            body: data,
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

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <UsersTable users={this.state.users}/>

        return (
            <div>
                <h1>Users</h1>
                { this.state.errorMessage && <h3 style={{color: 'red'}}> { this.state.errorMessage } </h3> }
                {contents}
                <Link to='User/Create'>
                    <button type='button'>Add New</button>
                </Link><br/>
                <div style={{float:'right'}}>
                    <label style={{marginRight:'5px'}}>Upload users from file</label>
                    <input type="file" name="file" onChange={(e) => this.handleFile(e)}/>
                    <button type='button' onClick={() => this.handleUploadClick()}>Upload</button>
                </div>
            </div>
        );
    }

    async FetchAllUsers() {
        try{
            const response = await fetch(process.env.REACT_APP_API_URL + "User");
            const data = await response.json();
            this.setState({ users: data, loading: false });
        }
        catch(err){
            this.setState({errorMessage: err.message});
        }
    }
}

export default UserList
