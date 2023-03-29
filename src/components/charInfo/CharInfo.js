import './charInfo.scss';

import { useState, useEffect } from 'react'

import MarvelServes from '../../marvelServes/MarvelServes';
import setContent from '../../util/setContent';


const CharInfo = (props) => {

    const [ data, setData ] = useState(null);

    const { getChartId, process, setProcess } = MarvelServes();

    useEffect(()=>{
        getCharData()
    },[props.id])

    const getCharData = () =>{
        if(!props.id){
            return
        }

        getChartId(props.id)
            .then(onLoading)
            .then(()=>setProcess('complite'))
        }
    
    const onLoading = (char) =>{
        setData(char);
    }

    return (
        <div className="char__info">
            {setContent(process,View,data)}
        </div>
    )
}

const View = ({data}) =>{

    const { name, description, thumbnail, homepage, wiki, comics } = data;

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                { comics.length > 0 ? null : 'There is no comics with this character'}  
                { comics.map(
                    (item, i) =>{
                        
                        // eslint-disable-next-line
                        if(i > 9) return
                        return(
                            <li className="char__comics-item " key={i}>
                                {item.name}
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )

}

export default CharInfo;