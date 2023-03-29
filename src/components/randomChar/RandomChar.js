import { useState, useEffect } from 'react'

import MarvelServes from '../../marvelServes/MarvelServes'
import setContent from '../../util/setContent';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    
    const [ data, setData ] = useState(null);
    

    const { getChartId, process, setProcess, clearError } = MarvelServes();

    useEffect(()=>{
        getCharData()
    },[])
    
    const getCharData = () =>{
        clearError()
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000 );
        getChartId(id)
            .then(onLoading)
            .then(()=>setProcess('complite'))
    }

    const onLoading = (char) =>{
        setData(char);
    }

    return (
        <div className="randomchar">
            <div className="randomchar__block">
              {setContent(process,View,data)}
              
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={getCharData}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) =>{
    const { name, description, thumbnail, homepage, wiki } = data;

    let objStyle =  {'objectFit' : 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        objStyle =  {'objectFit' : 'contain'}
    }

    return(
        <>
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={objStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )

}

export default RandomChar;