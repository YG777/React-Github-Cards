import React from "react";
import "./App.css";

import axios from 'axios';

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card {...profile} key={profile.id} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile" style={{ margin: "1rem" }}>
        <img src={profile.avatar_url}></img>
        <div
          className="info"
          style={{ display: "inline-block", marginLeft: 10 }}
        >
          <div className="name" style={{ fontSize: "125%" }}>
            {profile.name}
          </div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {
    userName: "",
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label></label>
        <input
          type="text"
          value={this.state.userName}
          onChange={(e) => this.setState({ userName: e.target.value })}
          placeholder="gitHub Username"
          required
        ></input>
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
addNewProfile = (profileData) => {
 this.setState(prevState => ({
   profiles:[...prevState.profiles, profileData]
 }));
}
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
