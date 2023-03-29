import './charSearch.scss'

import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import MarvelServes from '../../marvelServes/MarvelServes';
import Error from '../error/Error'


const CharSearch = () =>{

    const [char, setChar] = useState(null)
    const [loadingChar, setloadingChar] = useState(false)
    const { getCharName,  error } = MarvelServes()

    const onLodingChar = (name)=>{
        setloadingChar(true)
        getCharName(name)
            .then(setCharItem)
    }

    const setCharItem = (item) =>{
        setChar(item)
        setloadingChar(false)
    }
    
    const errorMessage = error ? <div className="char__search-critical-error"><Error /></div> : null;
    const results = !char ? null : char.length > 0?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return(
        <div className="char__search">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    onLodingChar(charName);
                }}
              >
                  <Form>
                      <label className="char__search-title" htmlFor="charName">Or find a character by name:</label>
                      <div className="char__search-wrapper">
                            <Field 
                              id="charName" 
                              name='charName' 
                              type='text' 
                              placeholder="Enter name"
                              className="char__search-input"/>
                          <button 
                              type='submit' 
                              className="button button__main"
                              disabled={loadingChar}>
                              <div className="inner">find</div>
                          </button>
                      </div>
                      <ErrorMessage component="div" className="char__search-error" name="charName" />
                  </Form>
              </Formik>
              {results}
              {errorMessage}
        </div>
    )
}

export default CharSearch