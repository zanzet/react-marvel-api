import imgError from './error.gif';

const ErrorRender = () =>{
    return(
        <img src={imgError} alt="Error" style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "0 auto"}}/>
    )        
}

export default ErrorRender