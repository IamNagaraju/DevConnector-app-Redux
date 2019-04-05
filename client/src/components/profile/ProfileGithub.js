import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'dee31508c6f3787a8544',
      clientSecret: '2b34e19298535cbbaa8e42f16a1499a14fd3a529',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, clientId, clientSecret, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { repos } = this.state;
    const repoItem = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-3">Latest Github Repos</h3>
        {repoItem}
      </div>
    );
  }
}

export default ProfileGithub;
