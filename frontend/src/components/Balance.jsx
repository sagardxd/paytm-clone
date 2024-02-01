import React from 'react'

const Balance = ({balance}) => {
    
    return (
        <div className='w-full p-6 font-bold text-xl'>
            Your Balance $ {balance}
        </div>
    )
}

export default Balance
