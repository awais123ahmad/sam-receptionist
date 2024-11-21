// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { UserLogin } from "../../Api/Reducers/authReducer";
// import { SESSION_IS_AUTHENTICATED } from "../../Utills/Constants";

// const Login = () => {
//   // const [data, setData] = useState({ email: "", password: "" });

//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   // const handleSubmit = async () => {
//   //   dispatch(UserLogin(data)).then((response) => {
      
//   //     if (response?.payload?.result) {
//   //       toast.success("successfully login");
//   //       navigate('/')
//   //     } else {
//   //       toast.error("unexpected error occured");
//   //     }
//   //   });

//     // if (response?.data === "success") {
//     //   toast.success("Login Successfull");
//     // } else {
//     //   toast.error(response?.data);
//     // }
//   // };

//   return (
//     <div>
//       {/* <Toaster position="top-center" reverseOrder={true} /> */}
//       <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//           <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//             <div className="max-w-md mx-auto">
//               <div>
//                 <h1 className="text-2xl font-semibold text-center mb-6">
//                   Login{" "}
//                 </h1>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       // value={data.email}
//                       // onChange={(e) =>
//                       //   setData({ ...data, email: e.target.value })
//                       // }
//                       id="email"
//                       name="email"
//                       type="text"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="User name"
//                     />
//                     <label
//                       for="email"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       User Email
//                     </label>
//                   </div>
//                   <div className="relative top-2">
//                     <input
//                       autocomplete="off"
//                       id="password"
//                       // value={data.password}
//                       // onChange={(e) =>
//                       //   setData({ ...data, password: e.target.value })
//                       // }
//                       name="password"
//                       type="password"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Password"
//                     />
//                     <label
//                       for="password"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative top-2">
//                     <button
//                       // onClick={() => handleSubmit()}
//                       className="bg-blue-500 text-white rounded-md px-2 py-1"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react";
import { UserLogin } from "../../Api/Reducers/authReducer";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", role: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = ["Admin", "Officer", "User"]; // Define roles

  const handleSubmit = async () => {
    if (!data.role) {
      toast.error("Please select a role.");
      return;
    }

    dispatch(UserLogin(data)).then((response) => {
      if (response?.payload?.result) {
        toast.success("Successfully logged in");

        // Navigate based on the selected role
        if (data.role === "Admin") navigate("/");
        else if (data.role === "Patient") navigate("");
        else navigate("/");
      } else {
        toast.error("Unexpected error occurred.");
      }
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      autoComplete="off"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="User Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      User Email
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="relative top-2">
                    <input
                      autoComplete="off"
                      id="password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  {/* Role Dropdown */}
                  <div className="relative top-2">
                    <select
                      value={data.role}
                      onChange={(e) =>
                        setData({ ...data, role: e.target.value })
                      }
                      className="w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:ring focus:ring-blue-300 py-2"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="relative top-4">
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

