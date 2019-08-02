import React from 'react'
import MyEditor from './editor'
import NavBar from './nav'

class MainPage extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <MyEditor/>

            </div>
        )
    }
}

export default MainPage