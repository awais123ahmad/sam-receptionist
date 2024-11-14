import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

import { FaUserInjured } from 'react-icons/fa';

import { Popover, Transition } from "@headlessui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";

import BadgeIcon from "@mui/icons-material/Badge";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WindowIcon from "@mui/icons-material/Window";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import WidgetsIcon from "@mui/icons-material/Widgets";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import {
  SESSION_IS_AUTHENTICATED,
  SESSION_USERINFO,
} from "../Utills/Constants";
//import { useDispatch } from "react-redux";
import { logout } from "../Api/Reducers/authReducer";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PortalLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };
  const route = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [out, setOut] = React.useState();
  const handleClick = () => setOut(!open);

  const [open1, setOpen1] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleSelection = (index) => {
    let op = [...open1];
    op[index] = !op[index];
    setOpen1(op);
  };

  const [auth, setAuth] = useState(
    sessionStorage.getItem(SESSION_IS_AUTHENTICATED)
  );
  console.log(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === "false") {
      route("/login");
    }
  }, []);

  //const dispatch = useDispatch();
  console.log("user info", sessionStorage.getItem(SESSION_USERINFO));

  // const handleLogout = () => {
  //   dispatch(logout())
  //   route('/login')
  // }

  return (
    <>
      {location.pathname === "/login" ? (
        children
      ) : (
        <>
          <div className=" !flex !items-center">
            <CssBaseline />
            <AppBar
              className={`!bg-white    !rounded-3xl !shadow-none mt-[-7px] ${
                open ? `!w-[84%]"` : `!w-[94%]`
              }`}
              sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
              open={open}
            >
              <Toolbar>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleDrawer}
                  edge="start"
                  sx={{ marginLeft: 1 }}
                >
                  <MenuIcon className="text-gray-600 mt-[4px] " />
                </IconButton>
                {/* <div className="w-[50%] m-auto relative mt-[16px]">
                                    <input
                                        type="search"
                                        className="w-full border-2 rounded-xl px-10 py-[4px] focus:outline-none text-gray-600"
                                        placeholder="Search"
                                    />
                                    <SearchIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-600 " />
                                </div> */}

                <div className="ml-auto flex gap-2 items-center">
                  <NotificationsIcon
                    className="text-gray-600 "
                    sx={{ fontSize: 20 }}
                  />

                  <div className="flex items-center gap-2">
                    <AccountCircleIcon
                      className="text-gray-600 "
                      sx={{ fontSize: 22 }}
                    />
                    <Popover className="ml-auto">
                      <Popover.Button
                        onClick={toggleMenu}
                        className="flex gap-2 outline-none md:mr-6 cursor-pointer text-gray-700"
                      >
                        <IoIosArrowDown
                          className={`w-4 h-4 ${
                            isOpen
                              ? "-rotate-180 duration-300"
                              : "rotate-0 duration-300"
                          }    `}
                        />
                      </Popover.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                      >
                        <Popover.Panel className="absolute right-10 bg-gray-50 border-2 border-gray-300 shadow-lg rounded-md  w-[150px] text-black">
                          <div>
                            <div
                              className="flex text-gray-600 gap-6 p-2 cursor-pointer"
                              //onClick={() => handleLogout()}
                            >
                              <PowerSettingsNewIcon className="text-gray-600" />
                              <h1>LogOut</h1>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              open={open}
              sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  borderWidth: 0,
                  boxSizing: "border-box",
                  borderTopRightRadius: 40,
                  borderBottomRightRadius: 40,
                  backgroundColor: "#F9F9F9",
                  zIndex: "9999",
                  boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
                },
                border: "none",
              }}
            >
              <div>
                <img
                  src={logo}
                  alt=""
                  className={`${
                    open ? "w-[5rem]" : "w-[3rem]"
                  }  ml-auto mr-auto my-4`}
                />
              </div>

              <div className="px-4">
                <div
                  onClick={() => route("/")}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                    location.pathname === "/"
                      ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                      : " mr-2 rounded-md"
                  }`}
                >
                  <SpaceDashboardIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem] ${
                      location.pathname === "/" ? "bg-white text-gray-600" : ""
                    } `}
                    sx={{
                      boxShadow:
                        location.pathname === "/"
                          ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                          : "",
                    }}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Dashboard
                  </span>
                </div>
                <div
                  class
                  onClick={() => handleSelection(0)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <FaUserInjured
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Patients
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[0]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>
                <ul className={`${open1[0] ? "" : "hidden"} w-[100%]`}>
                  <li>
                    <div
                      onClick={() => route("/patient/patients")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/patient/patients" ||
                        location.pathname === "/patient/patients/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/patient/patients"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/patient/patients"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Patients
                      </span>
                    </div>
                  </li>
                  {/* <li>
                    <div
                      onClick={() => route("/stock/category")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/category" ||
                        location.pathname === "/stock/category/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <WindowIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/category"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/category"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Category
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/stock/subCategory")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/subCategory" ||
                        location.pathname === "/stock/subCategory/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CategoryIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/subCategory"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/subCategory"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        SubCategory
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/stock/type")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/type" ||
                        location.pathname === "/stock/type/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <WidgetsIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/type"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/type"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Type
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/stock/size")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/size" ||
                        location.pathname === "/stock/size/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <AspectRatioIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/size"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/size"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Size
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/stock/measurementUnit")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/measurementUnit" ||
                        location.pathname === "/stock/measurementUnit/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <SquareFootIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/measurementUnit"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/measurementUnit"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Measure Unit
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/stock/warehouse")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/stock/warehouse" ||
                        location.pathname === "/stock/warehouse/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <WarehouseIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/stock/warehouse"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/stock/warehouse"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Warehouse
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/patient/patientset")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/patient/patientset" ||
                        location.pathname === "/patient/patientset/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <AutoAwesomeMotionIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/patient/patientset"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/patient/patientset"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Product Set
                      </span>
                    </div>
                  </li> */}
                </ul>

                <div
                  onClick={() => handleSelection(1)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <BadgeIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Dispensaries
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[1]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>

                <ul className={`${open1[1] ? "" : "hidden"} w-[100%]`}>
                  <li>
                    <div
                      onClick={() => route("/dispensaries/dispensary")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/dispensaries/dispensary"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/dispensaries/dispensary"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/dispensaries/dispensary"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Medical Store
                      </span>
                    </div>
                  </li>
                  {/* <li>
                    <div
                      onClick={() => route("/purchase/order")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/purchase/order" ||
                        location.pathname === "/purchase/order/add" ||
                        location.pathname === "/purchase/order/details"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <WindowIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/purchase/order"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/purchase/order"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Order
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/purchase/order/return")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/purchase/order/return"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CategoryIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/purchase/order/return"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/purchase/order/return"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Return
                      </span>
                    </div>
                  </li> */}
                </ul>

                {/* <div
                  onClick={() => handleSelection(2)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <BadgeIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Sales
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[2]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>

                <ul className={`${open1[2] ? "" : "hidden"} w-[100%]`}>
                  <li>
                    <div
                      onClick={() => route("/sale/customer")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/sale/customer"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <Inventory2Icon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/sale/customer"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/sale/customer"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Patients
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/sale/invoice")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/sale/invoice" ||
                        location.pathname === "/sale/invoice/add" ||
                        location.pathname === "/sale/invoice/details"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <WindowIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/sale/invoice" ||
                          location.pathname === "/sale/invoice/add" ||
                          location.pathname === "/sale/invoice/details"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/sale/invoice" ||
                            location.pathname === "/sale/invoice/add" ||
                            location.pathname === "/sale/invoice/details"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Invoice
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/sale/return")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/sale/return" ||
                        location.pathname === "/sale/return/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CategoryIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/sale/return"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/sale/return"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Return
                      </span>
                    </div>
                  </li>
                </ul> */}

                <div
                  onClick={() => handleSelection(3)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <AccountCircleIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Account
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[3]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>
                <ul className={`${open1[3] ? "" : "hidden"} w-[100%]`}>
                  {/* <li>
                    <div
                      onClick={() => route("/account/company")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/company" ||
                        location.pathname === "/account/company/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <AccountBalanceIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/company"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/company"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Company
                      </span>
                    </div>
                  </li> */}
                  <li>
                    <div
                      onClick={() => route("/account/income")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/income" ||
                        location.pathname === "/account/income/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CleanHandsIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/income"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/income"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Income
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/expense")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/expense" ||
                        location.pathname === "/account/expense/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PaidIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/expense"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/expense"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Expense
                      </span>
                    </div>
                  </li>
                  {/* <li>
                    <div
                      onClick={() => route("/account/receiptCredit")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/receiptCredit" ||
                        location.pathname === "/account/receiptCredit/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <ReceiptIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/receiptCredit"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/receiptCredit"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Receipt Credit
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/paymentDebit")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/paymentDebit" ||
                        location.pathname === "/account/paymentDebit/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <ReceiptLongIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/paymentDebit"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/paymentDebit"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Payment Debit
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600]  text-left ml-[2px] text-[13px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Transaction
                      </span>
                    </div>
                  </li> */}
                </ul>
                {/* <div
                  onClick={() => handleSelection(4)}
                  className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem]`}
                >
                  <AccountCircleIcon
                    className={`!text-5xl ${
                      open ? "mr-4" : "mr-auto ml-2 hover:!text-[3.5rem]"
                    } rounded-full p-[12px] ml-[-1.2rem]`}
                  />
                  <span
                    className={`flex-1 font-[600] text-left ml-[2px] text-[14px] ${
                      !open ? "hidden" : "block"
                    }`}
                  >
                    Reports
                  </span>
                  <IoIosArrowDown
                    className={`w-4 h-4 ${
                      open1[4]
                        ? "-rotate-180 duration-300"
                        : "rotate-0 duration-300"
                    }   ${!open ? "hidden" : "block"}  `}
                  />
                </div>
                <ul className={`${open1[4] ? "" : "hidden"} w-[100%]`}>
                  <li>
                    <div
                      onClick={() => route("/account/company")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/company" ||
                        location.pathname === "/account/company/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <AccountBalanceIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/company"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/company"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Profit/Loss
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/income")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/income" ||
                        location.pathname === "/account/income/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <CleanHandsIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/income"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/income"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Revenue
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/expense")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/expense" ||
                        location.pathname === "/account/expense/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PaidIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/expense"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/expense"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Sales
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/receiptCredit")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/receiptCredit" ||
                        location.pathname === "/account/receiptCredit/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <ReceiptIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/receiptCredit"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/receiptCredit"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Purchase
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/paymentDebit")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/paymentDebit" ||
                        location.pathname === "/account/paymentDebit/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <ReceiptLongIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/paymentDebit"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/paymentDebit"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Employees Summary
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Calculate Income
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Calculate Expense
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Stock
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Assets
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Statistics
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Top Customers
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Balance Sheet
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Top Suppliers
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Income vs Expense
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => route("/account/transaction")}
                      className={`flex items-center p-2 cursor-pointer  text-gray-600 mt-3 h-[2.6rem] ${
                        location.pathname === "/account/transaction" ||
                        location.pathname === "/account/transaction/add"
                          ? "bg-gray-800 text-white mr-2 rounded-md font-[600]"
                          : " mr-2 rounded-md"
                      }  ${open ? "ml-6" : "ml-0"}  `}
                    >
                      <PointOfSaleIcon
                        className={`!text-5xl ${
                          open ? "mr-2" : "mr-auto ml-2 hover:!text-[3.5rem]"
                        } rounded-full p-[12px] ml-[-1.2rem] ${
                          location.pathname === "/account/transaction"
                            ? "bg-white text-gray-600"
                            : ""
                        } `}
                        sx={{
                          boxShadow:
                            location.pathname === "/account/transaction"
                              ? "2px 5px 10px rgba(0, 0, 0, 0.2)"
                              : "",
                        }}
                      />
                      <span
                        className={`flex-1 font-[600] text-left text-[12.5px] ${
                          !open ? "hidden" : "block"
                        }`}
                      >
                        Top Selling
                      </span>
                    </div>
                  </li>
                </ul> */}
              </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
              <DrawerHeader />

              <div
                className={`${
                  location.pathname === "/login" || location.pathname === "/"
                    ? "p-4"
                    : "bg-gray-100 min-h-[80vh]  p-6 rounded-xl m-4"
                } `}
              >
                {children}
              </div>
            </Box>
          </div>
        </>
      )}
    </>
  );
}
