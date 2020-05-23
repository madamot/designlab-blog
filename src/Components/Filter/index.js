import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import './style.css';

import Loading from '../Loading';

const GET_CATEGORIES = gql`
query GET_CATEGORIES {
  categories(where: {exclude: 1}) {
    edges {
      node {
        id
        databaseId
        name
      }
    }
  }
}
`;

const Filter = (props) => {


  const [categoryNotIn, setCategory ] = useState([]);

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;
  // console.log(data);


  const tick = "\u2705"
  const cross = "\u274C"

  // const symbol = (props.filters.includes(node.databaseId) ? "\u2705" : "\u274C")

  return (
    <div>
      <div>
        <h3>Filter by:</h3>
      </div>
      <div className="filterContainer">
        <ul>
          {data.categories.edges.map(({ node }) => (
            <li onClick={() => props.handler(node.databaseId)} className="filterButton" key={node.id}>
              {node.name} {props.filters.includes(node.databaseId) ? cross : tick}
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}


export default Filter;
