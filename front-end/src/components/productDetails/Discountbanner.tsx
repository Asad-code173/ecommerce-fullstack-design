import React from 'react'
import Button from '../Button'

const Discountbanner = () => {
    return (
        <div className="px-4 sm:px-8"> {/* Horizontal spacing for small screens */}
            <div className="bg-blue-500 rounded-md flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 gap-4 sm:h-[120px]">
                <div className="flex-1 text-center sm:text-left">
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold leading-snug sm:leading-8">
                        Super discount on more than 100 USD
                    </p>
                    <p className="text-white text-sm sm:text-base leading-tight mt-1">
                        Have you ever finally just write dummy info
                    </p>
                </div>
                <Button className="bg-orange-500 px-6 py-2 sm:mr-5">
                    Shop Now
                </Button>
            </div>
        </div>
    )
}

export default Discountbanner
