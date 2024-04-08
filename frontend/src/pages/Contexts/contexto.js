import React, { createContext, useState } from 'react'
import apiLocal from '../../API/apiLocal/apiLocal'

export const Context = createContext()

export default function AuthContext({ children }) {

    const [token, setToken] = useState(false)
    const autenticado = !!token  //nega duas vezes para ser verdadeiro

  

    return (
        <Context.Provider value={{ autenticado }}>
            {children}
        </Context.Provider>
    )
}