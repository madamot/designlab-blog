import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../Constants/routes';

const PostCard = (props) => {
  const { id, title, excerpt, uri } = props.posts;
  console.log(props.posts);
  return (
    <div className="postGrid">
      {props.posts.map(post => (
        <div className="post" key={post.id}>
          <div className="postImg"></div>
          <div className="postDes">
            <h5>{post.categories.nodes[0].name}</h5>
            <br />
            <h3>{post.title}</h3>
            <hr />
            {post.excerpt}
            <Link to={`posts/${post.uri}`}><h5>Read More...</h5></Link>
          </div>
        </div>
      ))}
    </div>
  )
}


export default PostCard;
