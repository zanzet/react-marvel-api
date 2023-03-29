import { Component } from "react";

import ErrorRender from "../error/Error";

class ErrorBoundary extends Component{
   
    state = {
        error: false
    }
    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
        this.setState({
            error: true
        })
    }
    render (){
        if(this.state.error){
            return (
                <ErrorRender/>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary