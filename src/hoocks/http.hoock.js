import { useState, useCallback } from "react";

const useHttp = () =>{

    const [ process, setProcess ] = useState('waiting')

    const controler = useCallback( async (api, metod='GET', obj= null) =>{

       
        setProcess('loding')
        const option = {
            metod: metod,
            headers: {
                'content-type':'aplication/json'
            }
        }

        if(obj){
            option.body = JSON.stringify(obj);
        }

        try {
            const response = await fetch(api, option),
                request = await response.json();

            
            return request
        } catch (e) {
            setProcess('error')
            throw e;
        }
    },[])
    
    const clearError = useCallback(() =>{
        setProcess('waiting')
    },[])

    return {controler, clearError, process, setProcess}
}
export default useHttp