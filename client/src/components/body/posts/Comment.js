import React from 'react'

export const Comment = ({comments}) => {


    return (
        <div  style= {{ width:"700px "}} className="mx-auto">
            {comments.map(comment => {
                return(
                    <p key={comment._id}><strong>{comment.postedBy.name} : </strong>{comment.text}</p>
                )
            })}
        </div>
    )
}
