import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {followed_posts} from '../../../actions/postAction'

export const FollowedPosts = () => {
    const post = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(followed_posts())
       
    }, [dispatch])
  return (
    <div className="container">
        {post.followed_posts.map(post => {
            return(
                <div className="post">
                <div>
                  <img
                    src={post.photo ? post.photo :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_QU8zQGtrQcit7VRrjrzY2LmK2eFCYloXw&usqp=CAU"}
                    alt=""
                  />
                </div>
                <div className="content">
                  <h5>title:{post.title}</h5>
          
                  <p>Content:{post.body}</p>
                  


                </div>
              </div>
            )
        }
           
        )}
    </div>
  );
};
