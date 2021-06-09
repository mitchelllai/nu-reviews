import React, { useState } from 'react'
import Card from './card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBrain, faChalkboardTeacher, faClock, faPencilRuler } from '@fortawesome/free-solid-svg-icons'

let BASE_URL = 'https://nu-reviews-api.herokuapp.com'
// let BASE_URL = 'http://localhost:8080'

function Content(props){
    const [featured, setFeatured] = useState(null);
    const [form, setForm] = useState(false);
    const [ratings, setRatings] = useState(
        {
            lectures: null,
            difficulty: null,
            assignments: null,
            time: null,
            text: null,
            user: 'anonymous'
        }
    )
    // const [reviews, setReviews] = useState(null);

    const handleFeatured = (featuredCourse) => {
        if (featuredCourse === null){
            setFeatured(null);
        }
        else{
            let url = BASE_URL + `/review?course_id=${featuredCourse.course_id}`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setFeatured([featuredCourse, data])
                })
        }
        // if (featuredCourse === null){
        //     setReviews(null)
        //     return
        // }
        // else{
        //     let url = BASE_URL + `/review?course_id=${featuredCourse.course_id}`
        //     fetch(url)
        //         .then(response => response.json())
        //         .then(data => {
        //             // console.log(data)
        //             setReviews(data)
        //         })
        // }
        // console.log(featured)
    }

    const handleForm = (course) => {
        setForm(course);
    }

    const handleRating = (category, score) => { 
        setRatings(
            {
                ...ratings,
                [category] : score
            })
    }

    const resetRating = () => {
        setRatings(
            {
                lectures: null,
                difficulty: null,
                assignments: null,
                time: null,
                text: null,
                user: 'anonymous'
            }
        )
    }

    const postRating = () => {
        let lectures = parseFloat(ratings.lectures);
        let difficulty = parseFloat(ratings.difficulty);
        let assignments = parseFloat(ratings.assignments);
        let time = parseFloat(ratings.time);
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let date_string = `${month}/${day}/${year}`
        fetch(BASE_URL + `/review`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                course_id: featured[0].course_id,
                user: ratings.user,
                lectures: lectures,
                difficulty: difficulty,
                assignments: assignments,
                time: time,
                date: date_string,
                text: ratings.text
            })
        }).then(() => {
            resetRating();
        }).then(() => {
            handleFeatured(featured[0]); 
        }).then(() => {
            handleForm(false);
        })
    }

    const cardList = props.searchResults.map((object) => {
        return <Card handleFeatured={handleFeatured} obj={object} key={object._id} course_id={object.course_id} course_name={object.course_name} instructor={object.instructor} scores={object.scores} quarter={object.quarter}/>
    })

    if (featured === null){
        return(
            <div className='content'>
                <div className='content-wrap'>
                    {cardList}
                </div>
            </div>
        )
    }
    else if (form){
        console.log(ratings)
        return(
            <div className='content'>
                <div className='featured-wrap'>
                    <div className='featured'>
                        <div className='back'>
                            <FontAwesomeIcon className='button' onClick={(e) => {handleForm(false); resetRating();}} icon={faArrowLeft} color='white' size='2x'/>
                        </div>
                        <h1>{featured[0].course_id}: {featured[0].course_name}</h1>
                        <div className='description'>
                            <h2>{featured[0].quarter}</h2>
                            <h2>Instructor: {featured[0].instructor}</h2>
                        </div>
                        <div className='form-wrapper'>
                            <div className='form-rating'> 
                                <div className='form-id'>
                                    <FontAwesomeIcon icon={faChalkboardTeacher} color='white' size='3x'/>
                                    <h1>Lectures</h1>
                                </div>
                                <input type='text' className='rating-input' placeholder='1 - 5' onChange={(e) => {handleRating('lectures', e.target.value)}}/>
                            </div>
                            <div className='form-rating'> 
                                <div className='form-id'>
                                    <FontAwesomeIcon icon={faBrain} color='white' size='3x'/>
                                    <h1>Difficulty</h1>
                                </div>
                                <input type='text' className='rating-input' placeholder='1 - 5' onChange={(e) => {handleRating('difficulty', e.target.value)}}/>
                            </div>
                            <div className='form-rating'> 
                                <div className='form-id'>
                                    <FontAwesomeIcon icon={faPencilRuler} color='white' size='3x'/>
                                    <h1>Assignments</h1>
                                </div>
                                <input type='text' className='rating-input' placeholder='1 - 5' onChange={(e) => {handleRating('assignments', e.target.value)}}/>
                            </div>
                            <div className='form-rating'> 
                                <div className='form-id'>
                                    <FontAwesomeIcon icon={faClock} color='white' size='3x'/>
                                    <h1>Time</h1>
                                </div>
                                <input type='text' className='rating-input' placeholder='hrs/wk' onChange={(e) => {handleRating('time', e.target.value)}}/>
                            </div>
                            <textarea className='text-review' placeholder='Leave a comment...' onChange={(e) => {handleRating('text', e.target.value)}}/>
                        </div>
                        <div className='add-review'>
                            <span title='Post Review'><div className='cancel-button' onClick={(e) => {handleForm(false); resetRating();}}><p>Cancel</p></div></span>
                            <span title='Post Review'><div className='post-button' onClick={(e) => {postRating();}}><p>Confirm</p></div></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        // let url = BASE_URL + `/review?course_id=${featured.course_id}`
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
                
        //     })
        console.log(featured)
        // console.log(reviews)
        let reviews = featured[1]
        
        if (reviews.length === 0){
            return(
                <div className='content'>
                    <div className='featured-wrap'>
                        <div className='featured'>
                            <div className='back'>
                                <FontAwesomeIcon className='button' onClick={(e) => {handleFeatured(null)}} icon={faArrowLeft} color='white' size='2x'/>
                            </div>
                            <h1>{featured[0].course_id}: {featured[0].course_name}</h1>
                            <div className='description'>
                                <h2>{featured[0].quarter}</h2>
                                <h2>Instructor: {featured[0].instructor}</h2>
                            </div>

                            <div className='ratings-wrapper'>
                                <div className='scores'>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faChalkboardTeacher} color='white' size='3x'/>
                                            <h2>Lectures</h2>
                                        </div>
                                        <h2>N/A /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faBrain} color='white' size='3x'/>
                                            <h2>Difficulty</h2>
                                        </div>
                                        <h2>N/A /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faPencilRuler} color='white' size='3x'/>
                                            <h2>Assignments</h2>
                                        </div>
                                        <h2>N/A /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faClock} color='white' size='3x'/>
                                            <h2>Time</h2>
                                        </div>
                                        <h2>N/A hrs/wk</h2>
                                    </div>
                                </div>
                                <div className='comments-na'>
                                    <h1>No reviews found...</h1>
                                </div>
                            </div>

                            <div className='add-review'>
                                <span title='Post Review'><div className='post-button' onClick={(e) => {handleForm(true)}}><p>Leave a Review</p></div></span>
                                {/* <span title='Leave a Review'><FontAwesomeIcon onClick={(e) => {handleForm(true)}} className='button' icon={faPlusCircle} color='white' size='2x'/></span> */}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            let lectScore = 0
            let diffScore = 0
            let assnScore = 0
            let timeScore = 0
            for (const review of reviews){
                lectScore += review.lectures;
                diffScore += review.difficulty;
                assnScore += review.assignments;
                timeScore += review.time
            }
            lectScore = (lectScore/reviews.length).toFixed(1)
            diffScore = (diffScore/reviews.length).toFixed(1)
            assnScore = (assnScore/reviews.length).toFixed(1)
            timeScore = (timeScore/reviews.length).toFixed(1)

            const commentList = reviews.map((review) => {
                return(
                    <div key={review._id} className='a-comment'>
                        <div className='comment-head'>
                            <p><strong>{review.user}</strong></p>
                            <p><strong>{review.date}</strong></p>
                        </div>
                        <p className='comment-text'>{review.text}</p>
                    </div>
                )
            })
            return(
                <div className='content'>
                    <div className='featured-wrap'>
                        <div className='featured'>
                            <div className='back'>
                                <FontAwesomeIcon className='button' onClick={(e) => {handleFeatured(null)}} icon={faArrowLeft} color='white' size='2x'/>
                            </div>
                            <h1>{featured[0].course_id}: {featured[0].course_name}</h1>
                            <div className='description'>
                                <h2>{featured[0].quarter}</h2>
                                <h2>Instructor: {featured[0].instructor}</h2>
                            </div>
                            <div className='ratings-wrapper'>
                                <div className='scores'>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faChalkboardTeacher} color='white' size='3x'/>
                                            <h2>Lectures</h2>
                                        </div>
                                        <h2>{lectScore} /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faBrain} color='white' size='3x'/>
                                            <h2>Difficulty</h2>
                                        </div>
                                        <h2>{diffScore} /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faPencilRuler} color='white' size='3x'/>
                                            <h2>Assignments</h2>
                                        </div>
                                        <h2>{assnScore} /5.0</h2>
                                    </div>
                                    <div className='a-score'>
                                        <div className='score-desc'> 
                                            <FontAwesomeIcon icon={faClock} color='white' size='3x'/>
                                            <h2>Time</h2>
                                        </div>
                                        <h2>{timeScore} hrs/wk</h2>
                                    </div>
                                </div>
                                <div className='comments'>
                                    {commentList}
                                </div>
                            </div>
                            <div className='add-review'>
                                <span title='Post Review'><div className='post-button' onClick={(e) => {handleForm(true)}}><p>Leave a Review</p></div></span>
                                {/* <span title='Leave a Review'><FontAwesomeIcon onClick={(e) => {handleForm(true)}} className='button' icon={faPlusCircle} color='white' size='2x'/></span> */}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

// class Content extends React.Component{
//     render(){
//         return(
//             <div className='content'></div>
//         )
//     }
// }

export default Content