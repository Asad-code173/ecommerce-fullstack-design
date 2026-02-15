import React from "react";
import { ShoppingCart } from "lucide-react";
import canonocameras from "../../assets/Image/tech/canoncameras.png";
import Button from "../Button";

const products = [
    { id: 1, img: canonocameras },
    { id: 2, img: canonocameras },
    { id: 3, img: canonocameras },
    { id: 4, img: canonocameras },
];

const SavedForlater = () => {
    return (
        <section className="w-full flex mx-auto max-w-[1120px] px-4 py-6 bg-white rounded-md border border-[#DEE2E7]">
            <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Saved for later</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.map((item) => (
                        <div
                            key={item.id}
                            className=" rounded-lg p-4 flex flex-col"
                        >
                          
                            <div className="rounded-md bg-gray-100 flex items-center overflow-hidden justify-center h-[160px] w-[203px] mb-3">
                                <img
                                    src={item.img}
                                    alt="product"
                                    className="h-full object-contain mix-blend-multiply p-4"
                                />
                            </div>


                            <p className="font-bold text-gray-900">$99.50</p>


                            <p className="text-sm text-gray-800 mt-1">
                                GoPro HERO6 4K Action
                            </p>


                            <p className="text-sm text-gray-500 mb-3">Camera – Black</p>


                            <Button className="mt-auto bg-white flex items-center justify-center gap-2 border border-[#DEE2E7] text-blue-600 text-base font-medium rounded-md hover:bg-blue-50 transition
                             w-full lg:w-[156px] lg:h-[40px]">
                                <ShoppingCart className="w-4 h-4" />
                                Move to cart
                            </Button>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SavedForlater;
