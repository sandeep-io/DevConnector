import React,{useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGithubRepos, repos, profile }) => {
    useEffect (() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);

    // Handle loading state
    if (repos === null && !profile.error) {
        return <Spinner />;
    }

    // Handle error state - repos is null and there's an error
    if (repos === null && profile.error) {
        const errorStatus = profile.error.status;
        const errorMsg = profile.error.msg;

        return (
            <div className="profile-github">
                <h2 className="text-primary my-1">Github Repos</h2>
                <div className="alert alert-warning">
                    {errorStatus === 404 ? (
                        <p>
                            <strong>GitHub user not found!</strong><br />
                            The GitHub username "{username}" does not exist on GitHub. 
                            Please update your profile with a valid GitHub username.
                        </p>
                    ) : errorStatus === 403 ? (
                        <p>
                            <strong>GitHub API rate limit exceeded.</strong><br />
                            Please try again later.
                        </p>
                    ) : (
                        <p>
                            <strong>Error:</strong> {errorMsg}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Handle empty repos
    if (!repos || repos.length === 0) {
        return (
            <div className="profile-github">
                <h2 className="text-primary my-1">Github Repos</h2>
                <p>No public repositories found for {username}</p>
            </div>
        );
    }

    return (
     <div className="profile-github">
        <h2 className="text-primary my-1">Github Repos</h2>
        {repos.map(repo => (
            <div key = {repo.id} className="repo bg-white p-1 my-1">
                <div>
                    <h4>
                        <a href= {repo.html_url}
                        target='_blank'
                        rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </h4>
                    <p>{repo.description}</p>
                </div>
                <ul>
                    <li className="badge badge-primary">
                        Stars: {repo.stargazers_count}
                        </li> 
                        <li className="badge badge-dark">
                        Watchers: {repo.watchers_count}
                        </li> 
                        <li className="badge badge-light">
                        Forks: {repo.forks_count}
                        </li> 
                </ul>
            </div>
            ))
        )}
    </div> 
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array,
    profile: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos,
    profile: state.profile
});

export default connect(mapStateToProps, {getGithubRepos }) (ProfileGithub);
