import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../Constants/routes';

const Navigation = () =>
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.BLOG}>Blog</Link>
      </div>
      <div className="Navigation-link">
        <Link to={routes.BLOG_DETAIL}>Blog_Detail</Link>
      </div>
    </header>


export default Navigation;
