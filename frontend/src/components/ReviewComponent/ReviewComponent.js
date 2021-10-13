import React from 'react';
import {Link} from "react-router-dom";

const ReviewComponent = ({review}) => {
    return (
        <Link className='col-lg-4 col-sm-12' to={`/profile/${review.userId}`}>
        <div className="card shadow p-3  border rounded" style={{backgroundColor:""}}>
            <div className="card-body">
                <h5 className="text-white">{review.title}</h5>
                <p className="text-white">{review.body}</p>
                <br/>
                <p className="text-white">Written by {review.username}</p>
            </div>
        </div>
        </Link>
    )
}

export default ReviewComponent;