import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Blog from '../Blog';
import Blog_Detail from '../Blog_Detail';

import * as routes from '../../Constants/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
        <div className="App-main">
          <Route exact path={routes.BLOG}
            component={() => (
              <div className="App-content_large-header">
                <Blog />
              </div>
            )}
          />
          <Route exact path={routes.BLOG_DETAIL}
            component={() => (
              <div className="App-content_small-header">
                <Blog_Detail />
              </div>
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
