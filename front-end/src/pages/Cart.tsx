import CartTopSection from "../components/cart/CartTopSection";
import Discountbanner from "../components/productDetails/Discountbanner";
import CartExtraSection from "../components/cart/CartExtraSection";
import SavedForlater from "../components/cart/SavedForlater";


const Cart = () => {


  return (
    <>
      <div className="mx-auto w-full max-w-[1180px] space-y-4">
        <CartTopSection />
        <CartExtraSection/>
        <SavedForlater/>
        <Discountbanner />
      </div>

    </>
  );
};

export default Cart;
