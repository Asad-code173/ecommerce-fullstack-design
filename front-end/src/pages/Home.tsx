import React from 'react'
import SectionMain from '../components/SectionMain'
import SaleSection from '../components/SaleSection'
import HomeOutdoor from '../components/HomeOutdoor'
import ConsumerElectronics from '../components/ConsumerElectronics'
import SendQuoteSuppliers from '../components/SendQuoteSuppliers'
import RecommendedProducts from '../components/RecommendedProducts'
import Extraservices from '../components/Extraservices'

const Home = () => {
    return (
        <>

            <div className='space-y-4'>
                <SectionMain />
                <SaleSection />
                <HomeOutdoor />
                <ConsumerElectronics/>
                <SendQuoteSuppliers/>
                <RecommendedProducts/>
                <Extraservices/>
            </div>




        </>
    )
}

export default Home
