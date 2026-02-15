import { ProductCard } from "../components/ProductCard";

import softchairs from "../assets/Image/interior/softchairs.png";
import sofaandchair from "../assets/Image/interior/sofaandchair.png";
import kitchendishes from "../assets/Image/interior/kitchendishes.png";
import smartwatches from "../assets/Image/interior/smartwatches.png";
import kitchenmixer from "../assets/Image/interior/kitchenmixer.png";
import blenders from "../assets/Image/interior/blenders.png";
import homeappliance from "../assets/Image/interior/homeappliance.png";
import cofeemaker from "../assets/Image/interior/cofeemaker.png";
import homeoutdoor from "../assets/Image/backgrounds/homeoutdoor.png";
import bluearrow from "../assets/Layout/Brand/bluearrow.png"

const homeProducts = [
    { title: "Soft chairs", price: "USD 19", image: softchairs },
    { title: "Sofa & chair", price: "USD 19", image: sofaandchair },
    { title: "Kitchen dishes", price: "USD 19", image: kitchendishes },
    { title: "Smart watches", price: "USD 19", image: smartwatches },
    { title: "Kitchen mixer", price: "USD 100", image: kitchenmixer },
    { title: "Blenders", price: "USD 39", image: blenders },
    { title: "Home appliance", price: "USD 19", image: homeappliance },
    { title: "Coffee maker", price: "USD 10", image: cofeemaker },
];

const HomeOutdoor = () => {
    return (
        <section className="w-full lg:max-w-[1180px] mx-4 lg:mx-auto bg-white lg:rounded-md overflow-hidden border border-[#DEE2E7]">

            {/* Mobile Layout */}
            <div className="block lg:hidden">
                {/* Header */}
                <div className="px-6 py-3 border-b border-[#DEE2E7]">
                    <h2 className="text-lg font-semibold text-[#1c1c1c] mb-2">
                        Home and outdoor
                    </h2>
                </div>

                {/* Horizontal Scrollable Products */}
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex">
                        {homeProducts.map((item, index) => (
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
                    style={{ backgroundImage: `url(${homeoutdoor})` }}
                >
                    <h2 className="text-xl text-[#1c1c1c] font-semibold mb-4 leading-[100%]">
                        Home and <br /> outdoor
                    </h2>

                    <button className="bg-white text-[#1c1c1c] px-4 py-2 rounded-md text-sm shadow">
                        Source now
                    </button>
                </div>


                <div className="lg:col-span-3 grid grid-cols-4 divide-x divide-y divide-[#DEE2E7]">
                    {homeProducts.map((item, index) => (
                        <ProductCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeOutdoor;