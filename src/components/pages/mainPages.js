import { useState } from "react";
import {Helmet} from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBounderi/ErrorBoundery";
import decoration from '../../resources/img/vision.png';
import CharSearch from "../charSearch/CharSearch"

const MainPage = () =>{

    const [ id, setId ] = useState(null)
    const onSelectedId = (id)=>{
        setId(id)
    }


    return(
        <>
            <Helmet>
                <title>Marvel information portal</title>
                <meta name="description"  content="Marvel information portal"/>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedId={onSelectedId}/>
                </ErrorBoundary>
                
                <div>
                    <ErrorBoundary>
                        <CharInfo id={id}/>
                    </ErrorBoundary>
                    
                    <ErrorBoundary>
                        <CharSearch/>
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}
export default MainPage