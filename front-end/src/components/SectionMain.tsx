import banner from "../assets/Layout/Brand/banner.png";
import Avatar1 from "../assets/Layout/Brand/Avatar1.png";
import { useQuery } from "@tanstack/react-query";

const SectionMain = () => {

  interface Category {
    _id: string;
    name: string;
    slug: string;
  }

  // Fetch categories from API
  const { data: categoriesFromAPI, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/v1/categories/get-category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const result = await response.json();
      return result.data ;
    },
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories.</p>;

  

  return (
    <section className="bg-white flex gap-3 lg:gap-5 mx-auto w-full max-w-[1180px] h-auto lg:h-[400px] mt-6 md:rounded-md lg:px-0">

      {/* Left Sidebar */}
      <div className="hidden lg:block w-[250px] h-full">
        <ul className="h-full flex flex-col justify-between py-3">
          {categoriesFromAPI?.map((cat) => (
            <li
              key={cat._id}
              className="px-6 py-2 text-sm font-medium rounded cursor-pointer hover:bg-[#E3F0FF]"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Banner */}
      <div className="w-full lg:w-[665px] h-[250px] sm:h-[300px] lg:h-[382px] md:py-2">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-full mt-2 object-cover"
        />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[250px] h-[365px] space-y-3 py-4">
        <div className="bg-[#E3F0FF] w-52 h-36 rounded-md">
          <div className="flex items-center leading-[100%] gap-2 ml-2">
            <img src={Avatar1} className="w-11 h-11 mt-2" alt="Avatar" />
            <p className="mt-3">Hi, user <br /> let's get started</p>
          </div>
          <button className="rounded-md w-[180px] h-[30px] bg-[#127FFF] text-white ml-2 mt-2">
            Join Now
          </button>
          <button className="rounded-md w-[180px] h-[30px] bg-white text-blue-400 ml-2 mt-2">
            Login
          </button>
        </div>

        <div className="bg-[#F38332] w-52 h-24 rounded-md">
          <p className="text-[16px] text-white font-normal px-4 py-4 leading-[100%]">
            Get US $10 off <br /> with a new<br /> supplier
          </p>
        </div>

        <div className="bg-[#55BDC3] w-52 h-24 rounded-md">
          <p className="text-[16px] text-white font-normal px-4 py-4 leading-[100%]">
            Send quotes with supplier <br /> preferences
          </p>
        </div>
      </div>

    </section>
  );
};

export default SectionMain;
