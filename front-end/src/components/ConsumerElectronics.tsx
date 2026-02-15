import {ProductCard} from "../components/ProductCard";

import consumerservice from "../assets/Image/backgrounds/image 98.png";
import watchimage from "../assets/Image/tech/watchimage.png";
import laptop from "../assets/Image/tech/laptop.png";
import goProcamera from "../assets/Image/tech/goProcamera.png";
import headphones from "../assets/Image/tech/image 86.png";
import smartWatch from "../assets/Image/tech/image 85.png";
import gamingset from "../assets/Image/tech/headphones.png";
import smartphone from "../assets/Image/tech/image 32.png";
import electrickettle from "../assets/Image/tech/image 33.png";
import bluearrow from "../assets/Layout/Brand/bluearrow.png"

const electronicProducts = [
    { title: "Smart watches", price: "USD 19", image: watchimage },
    { title: "Cameras", price: "USD 89", image: goProcamera },
    { title: "Headphones", price: "USD 10", image: headphones },
    { title: "Smart watches", price: "USD 90", image: smartWatch },
    { title: "Gaming Set", price: "USD 35", image: gamingset },
    { title: "Laptops & PC", price: "USD 340", image: laptop },
    { title: "Smartphones", price: "USD 19", image: smartphone },
    { title: "Electric kettles", price: "USD 240", image: electrickettle },
];

const ConsumerElectronics = () => {
    return (
        <section className="w-full lg:max-w-[1180px] lg:mx-auto bg-white lg:rounded-md overflow-hidden lg:border lg:border-[#DEE2E7]">
            <div className="block lg:hidden">
            
                <div className="px-6 py-3 border-b border-[#DEE2E7]">
                    <h2 className="text-lg font-semibold text-[#1c1c1c] mb-2">
                        Consumer electronics
                    </h2>
                </div>

                
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex py-4">
                        {electronicProducts?.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-[140px] h-[180px] border border-[#DEE2E7]">
                                <ProductCard {...item} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Source Now Link */}
                <div className="px-6 pb-4 pt-4">
                    <button className="text-[#0D6EFD] text-sm font-medium inline-flex items-center gap-2 hover:text-[#0B5ED7] transition-colors">
                        Source now
                        <img src={bluearrow} alt="arrow icon" className="w-4 h-4 object-cover" />
                    </button>
                </div>
            </div>

            
            <div className="hidden lg:grid lg:grid-cols-4">
               
                <div
                    className="relative bg-cover bg-center p-6 min-h-[220px]"
                    style={{ backgroundImage: `url(${consumerservice})` }}
                >
                    <h2 className="text-xl text-[#1c1c1c] font-semibold mb-4 leading-[100%]">
                        Consumer <br/> electronics and <br/> gadgets
                    </h2>

                    <button className="bg-white text-[#1c1c1c] px-4 py-2 rounded-md text-sm shadow">
                        Source now
                    </button>
                </div>

            
                <div className="lg:col-span-3 grid grid-cols-4 divide-x divide-y divide-[#DEE2E7]">
                    {electronicProducts?.map((item, index) => (
                        <ProductCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsumerElectronics;