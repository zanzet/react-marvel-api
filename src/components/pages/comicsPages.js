import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList'
import {Helmet} from "react-helmet";

const ComicsPage = () =>{
    return(
        <>
            <Helmet>
                <title>Comics page</title>
                <meta name="description"  content="Page vise list of our comics"/>
            </Helmet>
            <AppBanner/>
            <ComicsList/> 
        </>
    )
}
export  default ComicsPage