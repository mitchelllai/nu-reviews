import React from 'react'
// import Checkbox from '@material-ui/core/Checkbox'
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//     root:{

//     },
//     icon:{
//         outline: "2px solid white",
//         width: '16px',
//         height: '16px',
//     },
//     checkedIcon:{
//         width: '16px',
//         height: '16px',
//         backgroundColor: 'white'
//     }
// })

function Filter(props){
    // const classes = useStyles()
    return(
        <div className='filter'>
            <div className='filter-wrap'>
                <div className='a-filter'>
                    <h1>School</h1>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('Bienen')}/>
                        <p>Bienen</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('Communication')}/>
                        <p>Communication</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('McCormick')}/>
                        <p>McCormick</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('Medill')}/>
                        <p>Medill</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('SESP')}/>
                        <p>SESP</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('Weinberg')}/>
                        <p>Weinberg</p>
                    </div>
                    {/* <Checkbox 
                        className={classes.root}
                        icon={<span className={classes.icon}/>}
                        checkedIcon={<span className={classes.checkedIcon}/>}/>
                    <Checkbox />
                    <Checkbox /> */}
                </div>

                <div className='a-filter'>
                    <h1>Quarter</h1>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('2021 Spring')}/>
                        <p>Spring 2021</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('2021 Winter')}/>
                        <p>Winter 2021</p>
                    </div>
                    <div className='check-wrapper'>
                        <input type='checkbox' className='check' onClick={() => props.handleFilters('2020 Fall')}/>
                        <p>Fall 2020</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// class Filter extends React.Component{
//     render(){
//         return(
//             <div className='filter'></div>
//         )
//     }
// }

export default Filter