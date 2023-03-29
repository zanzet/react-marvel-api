import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data) =>{
    switch (process) {
        case 'waiting':
            return <Skeleton/>
        case 'loding':
            return <Spinner/>
        case 'complite':
            return <Component data={data}/>
        case 'error':
            return <Error/>
        default:
            return <h3>Ops</h3>
    }

}
export default setContent