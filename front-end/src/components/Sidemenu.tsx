import React from 'react'
import Selection from './Selection'
import PriceRange from './PriceRange'
import Rating from './Ratings'

const Sidemenu = () => {
    return (

        <>
            <div className='hidden md:block w-60 h-[1448px] bg-gray-50'>
                <div className='flex flex-col'>
                    <Selection label="Category" options={['Mobile accessory', 'Electronics', 'SmartPhones', 'Moderntech']} variant="list" />
                    <Selection label="Brands" options={['Samsung', 'Apple', 'Huwaei', 'Poco', 'Lenovo']} />
                    <Selection label="Features" options={['Metallic', 'Plastic cover', '8GB Ram', 'Super Power', 'Large Memory']} />
                    <PriceRange />
                    <Selection label="Condition" options={['Any', 'Refurbished', 'Brand new', 'Old items']} variant='radio' />
                    <Rating />
                </div>
            </div>
        </>

    )
}

export default Sidemenu
