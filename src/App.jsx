import React from "react";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Reg from "./Components/Reg";
import Map from "./Components/Map";
import Profile from "./Components/Profile";
import { withAuth } from "./Components/AuthContext";
import { connect } from "react-redux";

class App extends React.Component {
  state = { currentPage: "login" };

  changePage = (page) => {
    // проверяем через пропс залогинен ли пользователь в переменной isLoggedIn в контексте AuthContext
    if (this.props.isLoggedIn) {
      this.setState({ currentPage: page });
    } else {
      this.setState({ currentPage: "login" });
    }
  };

  render() {
    const PAGES = {
      login: <Login onChangePage={(page) => this.changePage(page)} />,
      reg: <Reg onChangePage={(page) => this.changePage(page)} />,
      map: <Map />,
      profile: <Profile onChangePage={(page) => this.changePage(page)} />,
    };

    const { currentPage } = this.state;

    return (
      <div className="App">
        <Header changePage={(page) => this.changePage(page)} />
        <main>
          <section>{PAGES[currentPage]}</section>
        </main>
      </div>
    );
  }
}

export default withAuth(App);
