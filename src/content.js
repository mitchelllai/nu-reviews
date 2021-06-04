import React from 'react'
import Card from './card'

function Content(props){
    const cardList = props.searchResults.map((object) => {
        return <Card key={object._id} course_id={object.course_id} course_name={object.course_name} instructor={object.instructor} scores={object.scores} quarter={object.quarter}/>
    })
    return(
        <div className='content'>
            <div className='content-wrap'>
                {cardList}
            </div>
        </div>
    )
}

// class Content extends React.Component{
//     render(){
//         return(
//             <div className='content'></div>
//         )
//     }
// }

export default Content