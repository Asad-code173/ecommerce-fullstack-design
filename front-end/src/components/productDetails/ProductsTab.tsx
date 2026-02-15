import  { useState } from "react"

import bluecoat from "../../assets/Layout/alibaba/Image/cloth/bluecoat.png"
import greentshirt from "../../assets/Layout/alibaba/Image/cloth/greentshirt.png"
import jacket from "../../assets/Layout/alibaba/Image/cloth/jacket.png"
import blueshirt from "../../assets/Layout/alibaba/Image/cloth/bluecoat.png"
import newbag from "../../assets/Layout/alibaba/Image/cloth/newbag.png"

const tabs = ["Description", "Reviews", "Shipping", "About seller"] as const

type TabType = (typeof tabs)[number]

interface RecommendedProduct {
  id: number
  title: string
  price: string
  image: string
}

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 1,
    title: "Men Blazers Sets Elegant Formal",
    price: "$7.00 - $99.50",
    image: bluecoat,
  },
  {
    id: 2,
    title: "Men Shirt Sleeve Polo Contrast",
    price: "$12.00 - $45.00",
    image: greentshirt,
  },
  {
    id: 3,
    title: "Winter Jacket Classic Fit",
    price: "$22.00 - $120.00",
    image: jacket,
  },
  {
    id: 4,
    title: "Casual Blue Shirt Cotton",
    price: "$9.00 - $39.00",
    image: blueshirt,
  },
  {
    id: 5,
    title: "New Summer Travel Bag",
    price: "$15.00 - $89.00",
    image: newbag,
  },
]

const ProductsTab = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Description")

  return (
    <div className="max-w-[1180px] mx-auto py-6">
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* LEFT */}
        <div className="bg-white border border-[#DEE2E7] rounded-md p-5">
          {/* Tabs */}
          <div className="border-b border-[#DEE2E7] flex gap-6 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "text-[#1C6EE8] border-b-2 border-[#1C6EE8] font-medium"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "Description" && (
            <>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              {/* Table */}
              <div className="mt-5 border border-[#DEE2E7] rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Model", "#8786867"],
                      ["Style", "Classic style"],
                      ["Certificate", "ISO-898921212"],
                      ["Size", "34mm x 450mm x 19mm"],
                      ["Memory", "36GB RAM"],
                    ].map(([key, value]) => (
                      <tr key={key} className="border-b last:border-b-0">
                        <td className="bg-gray-50 px-4 py-2 text-gray-600 w-1/3">
                          {key}
                        </td>
                        <td className="px-4 py-2 text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Features */}
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                {[
                  "Some great feature name here",
                  "Lorem ipsum dolor sit amet, consectetur",
                  "Duis aute irure dolor in reprehenderit",
                  "Some great feature name here",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab !== "Description" && (
            <div className="mt-4 text-sm text-gray-500">
              Content for {activeTab}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white border border-[#DEE2E7] rounded-md p-4">
          <h3 className="text-sm font-semibold mb-4">You may like</h3>

          <div className="space-y-4">
            {recommendedProducts?.map((product) => (
              <div key={product.id} className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover p-2 rounded-md border border-[#DEE2E7]"
                />
                <div>
                  <p className="text-sm text-gray-700 leading-snug line-clamp-2">
                    {product.title}
                  </p>
                  <p className="text-sm text-gray-400">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsTab
