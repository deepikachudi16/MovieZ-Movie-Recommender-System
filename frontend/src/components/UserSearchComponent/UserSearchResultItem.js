import React from 'react';
import {Link} from "react-router-dom";
export const UserSearchResultItem = ({searchResult}) => {
    return (
        <Link className='col-12 mb-2' style={{ textDecoration: 'none' }} to={`/profile/${searchResult._id}`}>
            <li className='card shadow rounded' style={{backgroundColor:"rgba(0,0,0,0.25);",color:"white"}}>
                <div className="row no-gutters">
                    <div className="col-auto m-4">
                        <img src={"https://picsum.photos/90/90"} className={"rounded-circle"}/>
                    </div>
                    <div className="col">
                        <div className="card-block">
                            <h6 className="card-title m-4">{searchResult.username}</h6>
                        </div>
                        <div className="card-body">
                            <p /*className="black-title"*/>{searchResult.type.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    )
}