import React, { useState } from 'react'
import Header from './header'
import Search from './search'
import Filter from './filter'
import Content from './content'

// let BASE_URL = 'https://nu-reviews-api.herokuapp.com'
let BASE_URL = 'http://localhost:8080'

function App(props){

    const [searchResults, setSearchResults] = useState([])
    const [currentKey, setCurrentKey] = useState('')
    const [filters, setFilters] = useState(
        {
            schools : [],
            quarters : []
        })

    const handleSearch = (keyword) => {
        // console.log(keyword)
        setCurrentKey(keyword)
        // console.log(currentKey)
        let url = BASE_URL+`/courses?key=${keyword}&quarters=${JSON.stringify(filters.quarters)}&schools=${JSON.stringify(filters.schools)}`
        // console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(keyword === ''){
                    setSearchResults([])
                }
                else{
                    // console.log(data)
                    setSearchResults(data)
                }
            })
        // setSearchResults(keyword)
        // console.log(searchResults)
    }

    const handleFilters = (filter) => {
        // console.log(filters)
        let current = filters
        // console.log(current.schools)
        const schools = ['Bienen', 'Communication', 'McCormick', 'Medill', 'SESP', 'Weinberg']
        const quarters = ['2021 Spring', '2021 Winter', '2020 Fall']
        if (schools.includes(filter) && !(current.schools.includes(filter))){
            current.schools.push(filter)
            // console.log(current)
            setFilters(current)
        }
        else if (schools.includes(filter) && current.schools.includes(filter)){
            current.schools.splice(current.schools.indexOf(filter), 1)
            setFilters(current)
        }
        else if (quarters.includes(filter) && !(current.quarters.includes(filter))){
            current.quarters.push(filter)
            setFilters(current)
        }
        else if (quarters.includes(filter) && current.quarters.includes(filter)){
            current.quarters.splice(current.quarters.indexOf(filter), 1)
            setFilters(current)
        }
        // console.log(filters)
        handleSearch(currentKey)
    }

    // useEffect(() => {
    //     console.log(filters)
    // })

    return(
        <div className='wrapper'>
            <Header />
            <Search handleSearch={handleSearch}/>
            <Filter handleFilters={handleFilters}/>
            <Content searchResults={searchResults}/>
        </div>
    )
}

// class App extends React.Component{
//     render(){
//         return(
//             <div className='wrapper'>
//                 <Header />
//                 <Search />
//                 <Filter />
//                 <Content />
//             </div>
//         )
//     }
// }

export default App;