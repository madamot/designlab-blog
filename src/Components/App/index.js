import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Blog from '../Blog';
import Blog_Detail from '../Blog_Detail';

import * as routes from '../../Constants/routes';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path={routes.BLOG} component={Blog} />
      <Route exact path={routes.BLOG_DETAIL} component={Blog_Detail}/>
    </Router>
  );
}

export default App;
