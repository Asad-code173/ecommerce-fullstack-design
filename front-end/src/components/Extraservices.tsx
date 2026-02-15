
import industryhub from "../assets/Image/backgrounds/industy hub.png";
import product from "../assets/Image/backgrounds/customize your products.png";
import shipping from "../assets/Image/backgrounds/shipping.png";
import monitoring from "../assets/Image/backgrounds/monitoring.png";

import searchicon from "../assets/Layout/Brand/searchicon.png";
import inventory2 from "../assets/Layout/Brand/inventory2.png";
import arrow from "../assets/Layout/Brand/arrow.png";
import guard from "../assets/Layout/Brand/guard.png";

/* ===== Supplier Flags ===== */
import uae from "../assets/Layout1/Image/flags/uae.png";
import australia from "../assets/Layout1/Image/flags/australia.png";
import usa from "../assets/Layout1/Image/flags/usa.png";
import russia from "../assets/Layout1/Image/flags/russia.png";
import italy from "../assets/Layout1/Image/flags/italy.png";
import denmark from "../assets/Layout1/Image/flags/denmark.png";
import france from "../assets/Layout1/Image/flags/france.png";
import china from "../assets/Layout1/Image/flags/china.png";
import uk from "../assets/Layout1/Image/flags/GB@2x.png";


const extraservices = [
    { image: industryhub, title: <>Source from <br /> Industry Hubs</>, icon: searchicon },
    { image: product, title: <>Customize Your <br /> Products</>, icon: inventory2 },
    { image: shipping, title: <>Fast, reliable shipping <br /> by ocean or air</>, icon: arrow },
    { image: monitoring, title: <>Product monitoring <br /> and inspection</>, icon: guard },
];

const suppliers = [
    { flag: uae, country: "Arabic Emirates", domain: "shopname.ae" },
    { flag: australia, country: "Australia", domain: "shopname.ae" },
    { flag: usa, country: "United States", domain: "shopname.ae" },
    { flag: russia, country: "Russia", domain: "shopname.ru" },
    { flag: italy, country: "Italy", domain: "shopname.it" },
    { flag: denmark, country: "Denmark", domain: "denmark.com.dk" },
    { flag: france, country: "France", domain: "shopname.com.fr" },
    { flag: uae, country: "Arabic Emirates", domain: "shopname.ae" },
    { flag: china, country: "China", domain: "shopname.ae" },
    { flag: uk, country: "Great Britain", domain: "shopname.co.uk" },
];

const Extraservices = () => {
    return (
        <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <h1 className="font-semibold text-[#1c1c1c] text-xl sm:text-2xl mb-4 sm:mb-6">
                Our extra services
            </h1>

         
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
                {extraservices.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt="service"
                                className="w-full h-32 sm:h-36 lg:h-32 object-cover"
                            />

                       
                            <div className="absolute bottom-[-18px] right-4 w-10 h-10 rounded-full bg-[#D1E7FF] flex items-center justify-center text-sm shadow-sm">
                                <img
                                    src={item.icon}
                                    alt="icon"
                                    className="w-4 h-4 object-contain"
                                />
                            </div>
                        </div>

                        <div className="p-4 pt-7 text-sm sm:text-base font-medium text-[#1c1c1c]">
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>

        
            <h2 className="font-semibold text-[#1c1c1c] text-xl sm:text-2xl mb-4 sm:mb-5">
                Suppliers by region
            </h2>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-y-6 mb-6">
                {suppliers.map((supplier, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <img
                            src={supplier.flag}
                            alt={supplier.country}
                            className="w-7 h-6 rounded-sm flex-shrink-0"
                        />
                        <div className="text-sm leading-[100%] min-w-0">
                            <p className="text-[#1c1c1c] font-medium mb-1">
                                {supplier.country}
                            </p>
                            <p className="text-gray-400 text-xs truncate">
                                {supplier.domain}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Extraservices;