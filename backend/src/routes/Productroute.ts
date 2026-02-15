import Router from "express"
import { verifyJWT,isAdmin } from "../Middleware/Authmiddleware.js"
import { upload } from "../Middleware/multermiddleware.js"
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../Controllers/Product.js"

const router = Router()

router.route("/create-product").post(verifyJWT,isAdmin,upload.single('photo'),createProduct)
router.route("/get-products").get(getAllProducts)
router.route("/get-product/:slug").get(getProduct)
router.route("/update-product/:id").delete(verifyJWT,isAdmin,updateProduct)
router.route("/delete-product/:id").delete(verifyJWT,isAdmin,deleteProduct)
export default router