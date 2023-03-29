import Error from '../error/Error'
import { Link } from 'react-router-dom'

const Page404 = () =>{
    return(
        <>
            <Error/>
            <h2>Page not found</h2>
            <Link to="/">Go Back</Link>
        </>
    )
}

export default Page404