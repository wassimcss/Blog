import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {get_myposts} from '../../../actions/postAction'

export const MyPosts = () => {
    const post = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_myposts())
       
    }, [dispatch])
  return (
    <div className="container">
        {post.my_posts.map(post => {
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
