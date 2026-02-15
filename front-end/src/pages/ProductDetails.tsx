

import { useParams } from "react-router-dom"

import RelatedProducts from '../components/productDetails/RelatedProducts'
import ProductTabs from '../components/productDetails/ProductsTab'
import Discountbanner from '../components/productDetails/Discountbanner'
import ProductInformation from "../components/productDetails/ProductInformation"
const ProductDetails = () => {
  const { slug } = useParams()
  console.log("Product ID:", slug)

  return (
    <div className='mx-auto w-full max-w-[1180px] space-y-4 mt-6'>

      <ProductInformation/>
      <ProductTabs/>
      <RelatedProducts />
      <Discountbanner/>
    </div>
  )
}

export default ProductDetails


