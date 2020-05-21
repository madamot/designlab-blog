import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../Constants/routes';

const Navigation = () =>
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.BLOG}>Blog</Link>
      </div>
    </header>


export default Navigation;
