import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Loading from '../Loading';

const Blog_Detail = (props) => {
  const slug = props.match.params.slug

  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: { slug }
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div >
      <h1>{data.postBy.title}</h1>
      <h5>{data.postBy.date}</h5>
      <p>{data.postBy.content}</p>
    </div>
  )
}

const FETCH_POST = gql`
query GET_POSTS($slug: String) {
    postBy(slug: $slug) {
        id
        title
        date
        content
        banner {
            banner {
                srcSet(size: LARGE)
            }
        }
        categories {
            nodes {
                name
            }
        }
        author {
            name,
            avatar(size: 96) {
                url,
                width,
                height
            }
        }
    }
}
`;


export default Blog_Detail;
