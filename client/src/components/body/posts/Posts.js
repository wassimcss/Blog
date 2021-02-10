import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Comment} from './Comment'
import {Link} from 'react-router-dom'

import {
  add_comment,
  like_post,
  load_posts,
  unlike_post,
} from "../../../actions/postAction";


export const Posts = () => {
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.authReducer.user);
  //const [comment, setComment] = useState("");
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_posts());
  }, [dispatch]);

  // const addComment = (id) => {
  //   const item = {
  //     text: comment,
  //     postId: id,
  //   };
  //   dispatch(add_comment(item));
  //   setBol(true)
  // };

  return (
    <div className="container">
      {post.posts.map((post,index) => {
        return (
          <div key={post._id}>
            <div className="post">
              <div>
                <img
                  src={
                    post.photo
                      ? post.photo
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_QU8zQGtrQcit7VRrjrzY2LmK2eFCYloXw&usqp=CAU"
                  }
                  alt=""
                />
              </div>

              <div className="content">
                <h5>Author:<Link to={`/user_profile/${post.postedBy._id}`}>{post.postedBy.name}</Link></h5>
                <h5>title:{post.title}</h5>
                <p>Content:{post.body}</p>
                Likes:{post.likes.length}
                {post.likes.includes(user._id) ? (
                  <i
                    className="fas fa-thumbs-down"
                    onClick={() => dispatch(unlike_post({ postId: post._id }))}
                  >
                    dislike
                  </i>
                ) : (
                  <i
                    className="fas fa-thumbs-up"
                    onClick={() => dispatch(like_post({ postId: post._id }))}
                  >
                    like
                  </i>
                )}
              </div>
              <br />
            </div>
            <div>
              <div className="input-group  mb-3 mt-2 mx-auto" style= {{ width:"700px "}}>
               <form onSubmit={e => {
                 e.preventDefault()
                 dispatch(add_comment({text:e.target[0].value,postId:post._id}))
                 e.target[0].value=""

               }}>
               <input
                  type="text"
                  className="form-control"
                  placeholder="Comment ..."
                  aria-label="Comment ..."
                  aria-describedby="basic-addon2"
                   
                   //onChange={(e) => setComment(e.target.value)}
                />
                <span className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    
                    type="submit"
                  >
                    Comment
                  </button>
                </span>
               </form>
              </div>
              <Comment comments={post.comments}/>
            </div>
          </div>
        );
      })}
    </div>
  );
};
