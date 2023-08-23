/*import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
//import Cookies from "js-cookie"; remove comment from it after adding backend api 

export const GlobalContext = createContext("Initial Value");
let data = {
   user : undefined,
   role : 'admin' ,
   
    //token: Cookies.get('token') || undefined
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);
 
    //remove this comment after add backend api to index.js 
    //useEffect(() => {
       // Cookies.set('token', state.token)
    //}, [state.token])

    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
*/
import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";

export const GlobalContext = createContext("Initial Value");
let data = {
    user: "user",
    token: Cookies.get('token') || undefined
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        Cookies.set('token', state.token)
    }, [state.token])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
