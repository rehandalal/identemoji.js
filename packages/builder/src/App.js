import React from "react";

import ThemeBuilder from "./ThemeBuilder";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <nav />
        <main>
          <ThemeBuilder />
        </main>
      </div>
    );
  }
}

export default App;
