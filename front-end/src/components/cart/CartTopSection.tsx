import React from "react";
import newbag from "../../assets/Layout/alibaba/Image/cloth/newbag.png";
import greenshirt from "../../assets/Layout/alibaba/Image/cloth/greentshirt.png";
import bluecoat from "../../assets/Layout/alibaba/Image/cloth/bluecoat.png";
import Counter from "./Counter";

import jazzcash from "../../assets/Layout/icons/jazzcash.png"
import mastercard from "../../assets/Layout/icons/mastercard.png"
import nayapay from "../../assets/Layout/icons/nayapay.png"
import visa from "../../assets/Layout/icons/visa.png"
import Button from "../Button";
import Input from "../Input";
import whitearrow from "../../assets/Layout/Brand/whitearrow.png"


const CartTopSection = () => {
    const cartItems = [
    {
      img: newbag,
      price: "$78.99",
      seller: "Artel Market",
    },
    {
      img: greenshirt,
      price: "$39.00",
      seller: "Best factory LLC",
    },
    {
      img: bluecoat,
      price: "$170.50",
      seller: "Artel Market",
    },
  ];
  return (
    <>
     <div className="bg-[#F7FAFC] min-h-screen p-10 max-w-[1180px] mx-auto">
      <h2 className="text-lg font-semibold mb-4">My cart (3)</h2>

      <div className="flex gap-6">
       
        <div className="flex-1 bg-white rounded-lg border border-[#DEE2E7] p-4">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-[#DEE2E7] py-4 last:border-none"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16  object-cover rounded-md  border border-[#E0E0E0] bg-gray-100 bg-blend-multiply"
                  />
                </div>



                <div>
                  <h3 className="text-sm font-medium">
                    T-shirts with multiple colors, for men and lady
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Size: medium, Color: blue, Material: Plastic
                  </p>

                  <p className="text-xs text-gray-400">
                    Seller: {item.seller}
                  </p>

                  <div className="flex gap-3 mt-2">
                    <Button className="text-xs h-7 font-medium bg-white border border-[#DEE2E7] px-2 py-0.5 rounded 
                     text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200">
                      Remove
                    </Button>

                    <Button className="text-xs h-7 font-medium bg-white border border-[#DEE2E7] px-2 py-0.5 rounded 
                     text-[#0D6EFD] hover:bg-[#0D6EFD] hover:text-white transition-colors duration-200">
                      Save for later
                    </Button>
                  </div>

                </div>
              </div>

              <div className="text-right">
                <Counter />
                <p className="text-sm font-semibold mt-2">{item.price}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            
<Button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
  <img src={whitearrow} alt="Back" className="w-4 h-4" />
  Back to shop
</Button>


            <Button className="cursor-pointer text-sm text-blue-600 bg-white border border-[#DEE2E7] px-4 py-2 rounded">Remove all</Button>
          </div>
        </div>

        
        <div className="w-[280px]">
       
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 mb-4">
            <p className="text-base font-normal text-gray-600 mb-2">Have a coupon?</p>
            <div className="flex">
             
              <Input placeholder="Add coupon" className="py-1"/>
             
              <Button className="cursor-pointer border border-[#DEE2E7]
               rounded-r-none  bg-white text-blue-600 px-3 rounded 
               text-sm transition-all duration-300 ease-in-out hover:bg-blue-600
               hover:text-white hover:scale-105 hover:shadow-md">
                Apply
              </Button>



            </div>
          </div>

    
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal:</span>
              <span>$1403.97</span>
            </div>
            <div className="flex justify-between text-sm text-red-500 mb-2">
              <span>Discount:</span>
              <span>- $60.00</span>
            </div>
            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>Tax:</span>
              <span>+ $14.00</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>$1357.97</span>
            </div>
            <Button className="w-full cursor-pointer bg-[#00B515] text-lg  text-white py-2  rounded-lg mt-4 transition-all duration-300 ease-in-out hover:bg-[#00FF26] hover:scale-105 hover:shadow-lg">
              Checkout
            </Button>

            <div className="flex justify-center items-center gap-3 mt-4  rounded-md">
              <img
                src={visa}
                alt="Visa"
                className="w-6 h-5 object-contain cursor-pointer border border-[#F7F7F7]"
              />
              <img
                src={mastercard}
                alt="Mastercard"
                className="w-6 h-5 object-contain cursor-pointer border border-[#F7F7F7]"
              />
              <img
                src={jazzcash}
                alt="JazzCash"
                className="w-6 h-5 object-contain cursor-pointer border border-[#F7F7F7]"
              />
              <img
                src={nayapay}
                alt="Nayapay"
                className="w-6 h-5 object-contain cursor-pointer border border-[#F7F7F7]"
              />
            </div>



          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartTopSection
