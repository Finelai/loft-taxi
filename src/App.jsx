import React from 'react';
import Header from "./Components/Header";
import Login from "./Components/Login";
import Reg from "./Components/Reg";
import Map from "./Components/Map";
import Profile from "./Components/Profile";

import './App.css';

const PAGES = {
  login: <Login />,
  reg: <Reg />,
  map: <Map />,
  profile: <Profile />
}

class App extends React.Component {
  state = { currentPage: 'login' };

  changePage = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div className="App">
        < Header changePage={(page) => this.changePage(page)} />
        <main>
          <section>
            { PAGES[this.state.currentPage] }
          </section>
        </main>
      </div>
    );
  }
}

export default App;
