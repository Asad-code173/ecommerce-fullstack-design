import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { MdCategory, MdAccountCircle } from "react-icons/md";
import { AiOutlineUser, AiOutlineTag, AiOutlineQuestionCircle } from "react-icons/ai";
import type { IconType } from "react-icons"; // This type represents any react-icon component

// Define a TypeScript type for each menu item
interface SideMenuItem {
  url: string;
  text: string;
  Icon: IconType;
}

const useSideMenu = (): SideMenuItem[] => {
  const sideItems: SideMenuItem[] = [
    {
      url: "dashboard",
      text: "Dashboard",
      Icon: RiDashboardFill,
    },
    {
      url: "categories",
      text: "Categories",
      Icon: MdCategory,
    },
    {
      url: "products",
      text: "Products",
      Icon: RiShoppingBag3Fill,
    },
    {
      url: "users",
      text: "Users",
      Icon: AiOutlineUser,
    },
    {
      url: "customers",
      text: "Customers",
      Icon: MdAccountCircle,
    },
    {
      url: "coupon",
      text: "Coupon",
      Icon: AiOutlineTag,
    },
    {
      url: "enquiries",
      text: "Enquiries",
      Icon: AiOutlineQuestionCircle,
    },
  ];

  return sideItems;
};

export default useSideMenu;
