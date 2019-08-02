import React from 'react'

class NavBar extends React.Component{
    state={
        title : "test",
        
    }
    
    render(){
        return(

            <React.Fragment>
                <nav className="navbar navbar-dark bg-dark">
                <p className="navbar-brand">{this.state.title}</p>
                </nav>

            </React.Fragment>
        )
    }
}

export default NavBar