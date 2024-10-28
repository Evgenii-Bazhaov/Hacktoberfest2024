import React from 'react'
import Header from '../../Components/Header'

const PrimaryLayout = ({children}) => {
    return (
        <div className='h-screen p-4 flex flex-col items-center mt-6'>
            <Header />
            <main className='w-full max-w-4xl'>
                {children}
            </main>
        </div>
    )
}

export default PrimaryLayout