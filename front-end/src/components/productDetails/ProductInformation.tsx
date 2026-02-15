import language from "../../assets/Layout/Brand/language.png"
import {
    StarIcon,
    HeartIcon,
} from "@heroicons/react/24/solid";
import verifiedseller from "../../assets/Layout/Brand/verfiedseller.png"
import germany from "../../assets/Layout1/Image/flags/DE@2x.png"
import grayshirt from "../../assets/Layout/alibaba/Image/cloth/gray-t-shirt.png"
import Button from "../Button";
import soldIcon from "../../assets/Layout/Brand/soldIcon.png"
import Message from "../../assets/Layout/icons/Message.png"
import { Check } from "lucide-react";



const ProductInformation = () => {
    const specs = [
        { label: "Price:", value: "Negotiable" },
        { label: "Type:", value: "Classic shoes" },
        { label: "Material:", value: "Plastic material" },
        { label: "Design:", value: "Modern nice" },
        { label: "Customization:", value: <>Customized logo and<br /> design custom packages</> },
        { label: "Protection:", value: "Refund Policy" },
        { label: "Warranty:", value: "2 years full warranty" },
    ];

    return (
        <div className="max-w-[1180px] mx-auto bg-white border border-[#DEE2E7] rounded-md p-6 flex flex-col lg:flex-row gap-6">

            {/* LEFT side */}
            <div className="w-full  lg:w-[380px]">
                <div className="border rounded-md border-[#DEE2E7] p-4 flex justify-center">
                    <img
                        src={grayshirt}
                        alt="Product"
                        className="w-full h-auto max-w-[345px] h-[345px] object-contain"
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-3 w-[380px]">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <div
                            key={i}
                            className="border rounded-md border-[#DEE2E7] p-2 w-14 h-14 flex justify-center items-center cursor-pointer"
                        >
                            <img
                                src={grayshirt}
                                alt="thumb"
                                className="h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CENTER: Product Info */}
            <div className="flex-1">
                <div className="flex items-center gap-2 text-green-600 text-sm">

                    <Check className="w-4 h-4" />
                    In stock
                </div>

                <h1 className="text-xl font-semibold mt-2">
                    Mens Long Sleeve T-shirt Cotton Base<br /> Layer Slim Muscle
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <div className="flex text-orange-400">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4" />
                        ))}
                    </div>
                    <span className="text-orange-500 font-medium">9.3</span>
                    <span className="ml-3">•</span>
                    <div className="flex items-center gap-2 ml-3 ">
                        <img src={Message} className="w-5 h-5 mt-1" />
                        <span className="text-base">32 reviews</span>

                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2 ">
                        <img src={soldIcon} className="w-5 h-5" />
                        <span className="text-base">154 sold</span>
                    </div>

                </div>


                <div className="flex rounded-md overflow-hidden mt-4 border border-[#FFE1CC]">
                    <div className="bg-[#FFF3E8] p-3  flex-1">
                        <p className="text-red-500 font-semibold">$98.00</p>
                        <p className="text-xs text-gray-500">50-100 pcs</p>
                    </div>



                    <div className="flex justify-center items-center self-center">
                        <div className="w-[1px] h-[40px] bg-[#BDC1C8]" />
                    </div>


                    <div className="bg-[#FFF3E8] p-3 flex-1">
                        <p className="font-semibold">$90.00</p>
                        <p className="text-xs text-gray-500">100-700 pcs</p>
                    </div>

                    <div className="flex justify-center items-center self-center">
                        <div className="w-[1px] h-[40px] bg-[#BDC1C8]" />
                    </div>

                    <div className="bg-[#FFF3E8] p-3 flex-1">
                        <p className="font-semibold">$78.00</p>
                        <p className="text-xs text-gray-500">700+ pcs</p>
                    </div>
                </div>

                {/* Specs */}
                <div className="mt-5 text-sm space-y-3">
                    {specs?.map((spec, index) => (
                        <div key={index}>
                            <div className="flex">
                                <span className="w-[152px] text-gray-500">{spec.label}</span>
                                <span className="text-gray-800">{spec.value}</span>
                            </div>

                            {/* Divider for selected specs */}
                            {["Price:", "Design:", "Warranty:"].includes(spec.label) && (
                                <div className="my-2 border-t border-gray-200" />
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* Right side Card */}
            <div className="w-full h-[325px] lg:w-[280px] border rounded-md p-4 border border-[#DEE2E7]">
                <div className="flex items-center gap-3">
                    <div className="bg-teal-100 text-[#4CA7A799] font-bold w-12 h-12 flex items-center justify-center rounded">
                        <p className="text-[28px]">R</p>
                    </div>
                    <div>
                        <p className="font-normal text-base leading-6">Supplier <br /> Guanjoi Trading LLC</p>
                    </div>
                </div>
                <div className="w-full border-t border-[#E0E0E0] mt-6" />


                <div className="text-base text-gray-600 mt-4 space-y-2">
                    <div className="flex gap-2 items-center">
                        <img src={germany} className="w-4 h-4/>" />
                        <p>Germany, Berlin</p>

                    </div>

                    <div className="flex gap-2 items-center">
                        <img src={verifiedseller} className="w-4 h-4/>" />
                        <p> Verified Seller</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src={language} className="w-4 h-4" />
                        <p>Worldwide shipping</p>
                    </div>
                </div>

                <Button className="w-full py-2 mt-4 hover:bg-blue-700">Send inquiry</Button>
                <Button className="w-full  text-blue-500 border border-[#DEE2E7] bg-white py-2 mt-2 hover:text-blue-700">Seller's profile</Button>

                <div className="flex items-center justify-center gap-2 mt-12 cursor-pointer">
                    <HeartIcon className="w-5 h-5 fill-none stroke-[#0D6EFD]" />
                    <p className="text-[#0D6EFD] text-base">Save for later</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;
