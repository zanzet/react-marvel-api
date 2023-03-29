import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MarvelServes from '../../marvelServes/MarvelServes'
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBounderi/ErrorBoundery';
import setContent from '../../util/setContent';


const SinglePage = ({ Component, type }) => {

    const { id } = useParams()
    
    const [ data, setdata ] = useState(null);

    const { getComicsId, getChartId, process, setProcess, clearError } = MarvelServes();

    useEffect(()=>{
        getComicItem()
    }, [id])

    const getComicItem = () =>{
        clearError()

        switch (type) {
            case 'comics':
                getComicsId(id).then(onLoding).then(()=>setProcess('complite'))
                break;
        
            case 'herois':
                getChartId(id).then(onLoding).then(()=>setProcess('complite'))
        }   
    }
    
    const onLoding = item =>{
        setdata(item)

    }

   
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                {setContent(process,Component,data)}
            </ErrorBoundary>
        
        </>
        
    )
}


export default SinglePage;