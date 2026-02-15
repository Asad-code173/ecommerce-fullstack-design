import mongoose from "mongoose"
export interface Product {
  name: string
  slug:string
  price: number
  image: string
  description: string
  category: mongoose.Types.ObjectId
  stock: number

  isFeatured: boolean       
  isDeal: boolean           
  isRecommended: boolean     
  discountPercentage?: number 
}
