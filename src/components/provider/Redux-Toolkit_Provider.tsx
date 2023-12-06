"use client"
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'


const ReduxToolkit_Provider = ({ children }: { children: React.ReactNode }) => {


    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxToolkit_Provider