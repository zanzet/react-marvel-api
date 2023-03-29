import useHttp from "../hoocks/http.hoock";

const MarvelServes = () =>{
    const _api = 'https://gateway.marvel.com:443/v1/public/',
          _apiKey = 'apikey=97183fb86ab1d1f9a42fe18c871ea1d9',
          baseOffset = 200;
        
    const { controler, clearError, process, setProcess } = useHttp()

    //char fatching

    const getAllChar = async (offset=baseOffset) =>{
        const res = await controler(`${_api}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_charTransform)
    }

    const getChartId = async (id) =>{
        const res = await controler(`${_api}characters/${id}?${_apiKey}`);
        return _charTransform(res.data.results[0])
    }

    const getCharName = async (name) =>{
        const res = await controler(`${_api}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_charTransform)
    }

    const _charTransform = (char)=>{
        return {
            id: char.id,
            name: char.name,
            description: char.description? `${char.description.slice(0, 210)}...` : 'At the moment there is no description of the hero.',
            thumbnail: char.thumbnail.path+'.'+ char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    //comics fatching

    const getAllComics = async (offset=baseOffset) =>{
        const res = await controler(`${_api}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_comicsTransform)
    }

    const getComicsId = async (id) =>{
        const res = await controler(`${_api}comics/${id}?${_apiKey}`);
        return _comicsTransform(res.data.results[0])
    }

    const _comicsTransform = (comics)=>{
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {
        getAllChar, 
        getChartId,
        getCharName, 
        clearError, 
        getAllComics, 
        getComicsId,
        process, 
        setProcess
    }
}
export default MarvelServes