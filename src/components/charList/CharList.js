import './charList.scss';

import { useState, useEffect, useRef, useMemo } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import MarvelServes from '../../marvelServes/MarvelServes';
import Spinner from '../spinner/Spinner'
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

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [ offset, setPffset ] = useState(300);
    const [disable, setDisable ] = useState(false);
    const [ endedList, setEnddedList ] = useState(false);
    const focus = useRef([]);

    const { getAllChar, process, setProcess } = MarvelServes();

    useEffect(()=>{
        getCharList(offset,true)
    },[])

    const getCharList = (offset, inicial) =>{
        inicial ? setDisable(false) : setDisable(true)
        getAllChar(offset)
            .then(onLodingList)
            .then(()=>setProcess('complite'))
    }

    const onLodingList = (list) =>{
        let end = false;
        if(list.length < 9){
            end = true
        }

        setCharList([...charList, ...list]);
        setDisable(false)
        setPffset(offset=> offset + 9)
        setEnddedList(end)
    }
    
    const onFocusList = (id) =>{
        focus.current.forEach(item =>{item.classList.remove('char__item_selected')});
        focus.current[id].classList.add('char__item_selected');
        focus.current[id].focus()
    }
    
    const renderList = list =>{
        const herois = list.map(
            (item,i) =>{
                let objStyle =  {'objectFit' : 'cover'};
                if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                objStyle =  {'objectFit' : 'contain'}
                }
                return(
                    <CSSTransition key={item.id} timeout={500} classNames="char__item">
                        <li className="char__item" 
                            key={item.id}
                            tabIndex={0}
                            ref={el => focus.current[i] = el}
                            onClick={()=>{
                                props.onSelectedId(item.id)
                                onFocusList(i);
                            }}
                        >
                            <img src={item.thumbnail} alt="abyss" style={objStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    </CSSTransition>
                )
            }
        )
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {herois} 
                </TransitionGroup>   
            </ul>
            
        )
    }
    const element = useMemo(()=> {
        return setContent(process, ()=> renderList(charList), disable)
    },[process])
    return (
        <div className="char__list">
            {element}
            <button className="button button__main button__long"
                disabled={disable}
                onClick={()=>{
                    getCharList(offset)
                }}
                style={{'display': endedList ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;