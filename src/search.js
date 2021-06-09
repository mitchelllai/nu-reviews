import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: '90%',
        // "& .MuiInputLabel-outlined.Mui-focused": {
        //     color: "purple"
        // },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4E2A84"
        },
        // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        //     color: "purple"
        // },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4E2A84"
        },
    }
})

function Search(props){
    const classes = useStyles()
    return(
        <div className='search'>
            <TextField 
                onChange={(e) => props.handleSearch(e.target.value)}
                variant='outlined' 
                className={classes.root}
                InputProps={{
                    endAdornment: <InputAdornment position="end"><SearchIcon style={{color:'#4E2A84'}} /></InputAdornment>,
                }}/>
        </div>
    )
}

// class Search extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     render(){
//         return(
//             <div className='search'>
//                 <TextField 
//                     variant='outlined' 
//                     className='searchbar'
//                     InputProps={{
//                         endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
//                     }}/>
//             </div>
//         )
//     }
// }

export default Search