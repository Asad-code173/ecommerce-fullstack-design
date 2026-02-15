import Router from "express"
import { 
    insertCategory,
    getCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory } from "../Controllers/Category.js"
import { isAdmin,verifyJWT } from "../Middleware/Authmiddleware.js"

const router = Router();

router.route('/insert-category').post(verifyJWT,isAdmin,insertCategory)
router.route('/update-category/:id').put(verifyJWT,isAdmin,updateCategory)
router.route('/get-category').get(getCategory)
router.route('/get-single-category/:slug').get(getSingleCategory)
router.route('/delete-category/:id').delete(verifyJWT,isAdmin,deleteCategory)


export default router
