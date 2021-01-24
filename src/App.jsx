import React from "react";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Reg from "./Components/Reg";
import Map from "./Components/Map";
import Profile from "./Components/Profile";

class App extends React.Component {
  state = { currentPage: "login" };

  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const PAGES = {
      login: <Login onChangePage={(page) => this.changePage(page)} />,
      reg: <Reg onChangePage={(page) => this.changePage(page)} />,
      map: <Map />,
      profile: <Profile />,
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

export default App;
