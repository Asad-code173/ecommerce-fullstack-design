import React, { useState } from 'react'
import Button from '../Button'

const Counter = () => {
    const [counter, setCounter] = useState<number>(0)
    const increment = () => {
        setCounter((prev) => prev + 1)
    }
    const decrement = () => {
        if (counter > 0) {
            setCounter((prev) => prev - 1)
        }

    }
    return (
        <>
            <div className='w-[150px] h-10'>

                <Button onClick={increment} className=' cursor-pointer bg-white w-10 h-10 border border-[#DEE2E7] text-[#8B96A5] rounded-r-none'>+</Button>
                <Button className='bg-white w-14 h-10 text-black border-t-0 border-l-0 text-base border border-[#DEE2E7] rounded-none'>{counter}</Button>
                <Button onClick={decrement} className=' cursor-pointer bg-white w-10 h-10  border border-[#DEE2E7] text-[#8B96A5] rounded-l-none'>-</Button>

            </div>
        </>

    )
}

export default Counter
