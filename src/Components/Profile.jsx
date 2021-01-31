import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "modules/user";

export class Profile extends Component {
  static propTypes = {
    onChangePage: PropTypes.func,
    logOut: PropTypes.func,
  };

  handleLogoutBtn = () => {
    this.props.logOut();
    this.props.onChangePage("login");
  };

  render() {
    return (
      <div className="profile">
        <h2>Профиль</h2>
        <button onClick={this.handleLogoutBtn}>Выйти</button>
      </div>
    );
  }
}

export default connect(
  null,
  { logOut }
)(Profile);
