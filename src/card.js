import React from 'react'

function Card(props){
    return(
        <div className='card'>
            <h1>{props.course_id}: {props.course_name}</h1>
            {/* <h2>{props.quarter}</h2> */}
            <div className='description'>
                <h2>{props.quarter}</h2>
                <h2>Instructor: {props.instructor}</h2>
                {/* <h2>Rating: <strong>5/5</strong></h2> */}
            </div>
            <div className='rating'><h2>Rating: <strong>5/5</strong></h2></div>
            {/* <div>
                <p>TEXT</p>
            </div> */}
        </div>
    )
}

export default Card