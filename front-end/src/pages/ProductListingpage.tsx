
import Products from '../components/Products'
import Sidemenu from '../components/Sidemenu'

const ProductListingpage = () => {
    return (

        <>
            <div className='w-[1160px]  mx-auto flex mt-4 gap-6'>
                <Sidemenu/>
                <Products/>
            </div>
        </>

    )
}

export default ProductListingpage
