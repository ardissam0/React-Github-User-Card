import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import '../App.css';

class GithubUser extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            followers: []
        };
    }

    componentDidMount() {
        axios
        .get('https://api.github.com/users/ardissam0')
        .then(response => {
            console.log(response.data.followers_url);
            this.setState({
                user: response.data
            });
        })
        .catch(error => console.log(error));

        axios
        .get('https://api.github.com/users/ardissam0/followers')
        .then(response => {
            console.log(response.data);
            this.setState({
                followers: response.data
            });
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='user-cards'>
                <div className='main-card'>
                    {
                        <UserCard 
                        login={this.state.user.login}
                        id={this.state.user.id}
                        avatar_url={this.state.user.avatar_url}
                        location={this.state.user.location}
                        html_url={this.state.user.html_url}
                        />
                    }
                    
                    {this.state.followers.map(follower => (
                        <UserCard
                        login={follower.login}
                        id={follower.id}
                        avatar_url={follower.avatar_url}
                        location={follower.location}
                        html_url={follower.html_url}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default GithubUser;