import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { transferAtom } from '../store/atoms/transfer';
import axios from 'axios';

const Sendmoney = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [transferAmount , setTransferMoney] = useRecoilState(transferAtom);
    console.log(searchParams.get('id'))


    const submitHandler = async() => {
        console.log(transferAmount)
        try {
            const res = await axios.post('http://localhost:3000/api/v1/account/transfer', {
                to: searchParams.get('id'),
                amount: transferAmount,
            }, {
                headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') }
            });
            console.log(res.data);
            // Handle the response or perform other actions
        } catch (error) {
            console.error(error);
            // Handle errors or send an appropriate response
        }
        
    }

    return (
        <div className='w-full min-h-screen bg-slate-200 flex justify-center items-center '>
            <div className='flex flex-col w-1/3 px-14 py-14  gap-2 rounded-md bg-white shadow-md'>
                <div className='text-center text-3xl font-bold pb-16'>Send Money</div>
                <div className='flex justify-start items-center gap-3'>
                    <div className='rounded-full bg-green-500 w-10 h-10 text-center inline-flex items-center justify-center text-xl text-white font-medium '>S
                    </div>
                    <h2 className='font-bold text-2xl'>{searchParams.get('name')}</h2>
                </div>
                <h3 className='text-sm font-semibold'>Amount(in Rs)</h3>
                <input
                    className='border border-gray-300 rounded-md p-2'
                    placeholder='Enter Amount'
                    value = {transferAmount}
                    onChange={(e)=> {setTransferMoney(e.target.value)}}
                />
                <button type='submit' onClick={submitHandler} className='w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600'>Initiate Transfer</button>
                </div>
        </div>
    )
}

export default Sendmoney
