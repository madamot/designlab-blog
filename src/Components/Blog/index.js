import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// import { Link } from 'react-router-dom';
// import * as routes from '../../Constants/routes';
import './style.css';

import Filter from '../Filter';
import Loading from '../Loading';
import PostCard from '../PostCard';

const GET_POSTS = gql`
query Posts($size: Int, $offset: Int, $filter: [ID], $cursor: String) {
    posts(after: $cursor, where: {offsetPagination: {offset: $offset, size: $size}, categoryNotIn: $filter } ) {
        pageInfo {
            offsetPagination{
                hasMore
                hasPrevious
            }
          	endCursor
          	startCursor
          	hasPreviousPage
          	hasNextPage
        }
        nodes{
            id
            title
            date
            uri
            slug
            excerpt
            featuredImage{
                id
                mediaItemUrl
            }
            categories {
                nodes {
                    name
                }
            }
        }
    }
}
`;

const Blog = () => {

  const [filters, addFilters] = useState([1,])

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { "size": 9, "filter": filters, "offset": 0 }
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  // console.log(data);
  // addPosts(data);

  const filterHandler = (id) => {
    if (filters.includes(id)) {
      const newArr = filters.filter(category => id != category);
      addFilters(newArr);
    } else {
      const notIn = [id, ...filters]
      addFilters(notIn);
    }

  }



  return (
    <div>
      <div>
        <Filter handler={filterHandler} filters={filters} />
      </div>
      <br />
      <div>
        <PostCard posts={data.posts.nodes}/>
      </div>
      <br />
      <hr />
      {data.posts.pageInfo.offsetPagination.hasMore ?
        <h5 onClick={() => {
          fetchMore({
            variables: {
              filter: filters,
              cursor: data.posts.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {

              // if (!fetchMoreResult) {
              //   return previousResult;
              // }
              // return {
              //   posts: {
              //     ...fetchMoreResult.posts.pageInfo,
              //     nodes: [...previousResult.posts.nodes, ...fetchMoreResult.posts.nodes],
              //
              //   }
              // }
              const newNodes = fetchMoreResult.posts.nodes;
              const pageInfo = fetchMoreResult.posts;

              return newNodes.length
                ? {
                  // Put the new comments at the end of the list and update `pageInfo`
                  // so we have the new `endCursor` and `hasNextPage` values
                  posts: {
                    ...pageInfo,
                    nodes: [...previousResult.posts.nodes, ...newNodes],

                  }
                }
                : previousResult;
            }
          })
        }} className="more">Read Previous News &#x2192;</h5>
      : null
      }

      {data.posts.pageInfo.offsetPagination.hasPreviousPage ?
        <h5 className="less">&#x2190; Read Latest News</h5>
      : null
      }
    </div>
  );
}


export default Blog;
