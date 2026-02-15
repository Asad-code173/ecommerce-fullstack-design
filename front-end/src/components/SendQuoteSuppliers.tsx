import image from "../assets/Image/backgrounds/Group 982.png";

const SendQuoteSuppliers = () => {
  return (
    <section className="max-w-[1180px] mx-auto md:rounded-md overflow-hidden">

      <div
        className="bg-cover bg-center min-h-[260px]"
        style={{ backgroundImage: `url(${image})` }}
      >

        <div className="h-full w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  p-6">


            <div className="ml-4 sm:ml-none text-white space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold pt-3">
                An easy way to send <br /> requests to all suppliers
              </h2>

              <p className="text-sm text-blue-100 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do eiusmod tempor incididunt.
              </p>
            </div>

            <div className="ml-4 sm:ml-none sm:hidden">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md transition"
              >
                Send inquiry
              </button>
            </div>


            <div className=" hidden sm:block bg-white rounded-lg p-5 shadow-lg w-full max-w-md mx-auto">

              <h3 className="font-semibold text-lg mb-3">
                Send quote to suppliers
              </h3>

              <div className="space-y-3">

                <input
                  type="text"
                  placeholder="What item you need?"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                />

                <textarea
                  placeholder="Type more details"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none outline-none"
                />

                <div className="flex gap-2">

                  <input
                    type="number"
                    placeholder="Quantity"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
                  />

                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>

                </div>

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md transition"
                >
                  Send inquiry
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SendQuoteSuppliers;
