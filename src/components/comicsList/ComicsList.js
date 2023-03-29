import './comicsList.scss';

import { Link } from 'react-router-dom';
import { CSSTransition,TransitionGroup } from 'react-transition-group';

import { useState, useEffect, useMemo } from 'react';
import MarvelServes from '../../marvelServes/MarvelServes';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error'

const setContent = (process, Component, disable) =>{
    switch (process) {
        case 'waiting':
            return 
        case 'loding':
            return !disable ? <Spinner/> : <Component/>
        case 'complite':
            return <Component/>
        case 'error':
            return <Error/>
        default:
            return <h3>Ops</h3>
    }
}

const ComicsList = () => {

    const [ data, setData ] = useState([]);
    const [ offset, setOffset ] = useState(300);
    const [disable, setDisable ] = useState(false);
    const [ endedList, setEnddedList ] = useState(false);  

    const {  getAllComics, process, setProcess } = MarvelServes();

    useEffect(()=>{
        getComics(offset, true)
    }, [])    

    const getComics = (offset, initial) =>{
        initial ? setDisable(false) : setDisable(true) 
        getAllComics(offset)
            .then(onLoadingList)
            .then(()=>setProcess('complite'))
    }

    const onLoadingList = (list)=>{
        let end = false;
        if(list.length < 8){
            end = true
        }

        setData([...data,...list])
        setDisable(false)
        setOffset(ofsset=>ofsset + 8)
        setEnddedList(end)
    }

    const renderComics = (comics) =>{
        let item = comics.map(
            (item, i) =>{
                return(
                    <CSSTransition key={i} timeout={500} classNames="comics__item">
                        <li className="comics__item" key={i}>
                            <Link to={`/comics/${item.id}`}>
                                <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                                <div className="comics__item-name">{item.name}</div>
                                <div className="comics__item-price">{item.price}</div>
                            </Link>
                        </li>
                    </CSSTransition>
                )
            }
        )
        return(
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                {item}
                </TransitionGroup>
            </ul>
        )
    }
    const element = useMemo(()=> {
        return setContent(process, ()=> renderComics(data), disable)
    },[process])

    return (
        <div className="comics__list">
            {element}
            <button 
                className="button button__main button__long"
                disabled={disable}
                onClick={()=>{
                    getComics(offset)
                }}
                style={{'display': endedList ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;