import { useEffect, useRef, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const eyeRef = useRef();
  const buttonRef = useRef();
  // const passwordRef = useRef();
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [delay, setdelay] = useState(0);
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // Get Items from Local Storage on Website First Load
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
      // console.log(JSON.parse(passwords));
    }
  }, []);

  // Copy to Clipboard Function
  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
    navigator.clipboard.writeText(text);
  };

  // Toggle Password Visibility and Eye Animation
  const passwordVisibility = () => {
    if (eyeRef.current.state === "morph-cross") {
      setShowPassword(true);
      setdelay(3000);
      eyeRef.current.state = "hover-look-around";
      eyeRef.current.trigger = "loop";
    } else {
      setShowPassword(false);
      setdelay(0);
      eyeRef.current.state = "morph-cross";
      eyeRef.current.trigger = "in";
    }
  };

  // Form onChange function
  function handleFormChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  // Add Button Animation on Hover
  function buttonHover() {
    buttonRef.current.trigger = "in";
  }

  // Save Password on Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      savePassword();
    }
  };

  // Save Password Function
  function savePassword() {
    if (form.url !== "" && form.username !== "" && form.password !== "") {
      // console.log("Saved Credentials :",form);
      let newPassword = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(newPassword);
      localStorage.setItem("passwords", JSON.stringify(newPassword));
      setform({ url: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  }
  // Delete Password Function
  const deletePassword = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password Deleted!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };

  // Edit Password Function
  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((i) => i.id !== id));
  };

  return (
    <div
      className="container mx-auto max-w-4xl my-3 text-center text-white min-h-[88.7vh]"
      onKeyDown={handleKeyDown}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Flip}
      />
      <h1>
        <div className="logo font-bold text-3xl">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </div>
      </h1>
      <p className="text-2xl font-bold">Your own personal password manager</p>

      {/* Form Starts Here */}
      <div className="  text-white flex flex-col gap-4 my-10 text-xl items-center px-2 lg:px-0">
        <input
          name="url"
          value={form.url}
          placeholder="Enter website URL"
          type="text"
          onChange={handleFormChange}
          className="rounded-full border-green-400 border px-2 lg:w-full md:w-lg sm:w-md w-xs py-1"
        />
        <div className="flex gap-3 lg:w-full md:w-lg sm:w-md w-xs flex-col lg:flex-row">
          <input
            name="username"
            value={form.username}
            placeholder="Enter email or username"
            type="text"
            onChange={handleFormChange}
            className="border-green-400 border rounded-full lg:w-3/4 md:w-lg sm:w-md w-xs px-2 py-1"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              placeholder="Enter password"
              onChange={handleFormChange}
              className="border-green-400 border rounded-full lg:w-full md:w-lg sm:w-md w-xs px-2 py-1"
            />
            <span
              className="absolute right-2 top-1 cursor-pointer"
              onClick={passwordVisibility}
            >
              <lord-icon
                ref={eyeRef}
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger="in"
                delay={delay}
                state="morph-cross"
                colors="primary:#08a88a,secondary:#08a88a"
              ></lord-icon>
            </span>
          </div>
        </div>
        <button
          onMouseOver={buttonHover}
          onClick={savePassword}
          className="w-fit flex justify-center items-center gap-2 bg-green-500 rounded-full py-2 px-4 text-xl cursor-pointer hover:bg-green-600"
        >
          <lord-icon
            ref={buttonRef}
            src="https://cdn.lordicon.com/sbnjyzil.json"
            trigger=""
            colors="primary:#ffffff,secondary:#ffffff"
            stroke="bold"
          ></lord-icon>
          Add
        </button>
      </div>
      {/* Form Ends Here */}

      {/* Password List Start From Here */}
      <div>
        <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
        {passwordArray.length === 0 ? (
          <div>No Passwords to Show</div>
        ) : (
          <div className="px-4 overflow-x-auto">
            <table className="table-auto w-full  rounded-lg ">
              <thead className="bg-green-50 text-black">
                <tr>
                  <th className="py-2 border-e border-b border-gray-400">
                    Website URL
                  </th>
                  <th className="py-2 border-e border-b border-gray-400">
                    Username
                  </th>
                  <th className="py-2 border-e border-b border-gray-400">
                    Password
                  </th>
                  <th className="py-2 border-b border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-500">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border-e border-t border-gray-200 ">
                        <div className="flex item-center justify-around px-1 ">
                          <a
                            href={item.url}
                            target="_blank"
                            className="underline-offset-3 underline"
                          >
                            {item.url}
                          </a>
                        </div>
                      </td>
                      <td className="py-2 border-e border-t border-gray-200">
                        <div className="flex item-center justify-around px-1">
                          {item.username}
                          <lord-icon
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="https://cdn.lordicon.com/gsjfryhc.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border-t border-e border-gray-200 ">
                        <div className="flex item-center justify-around px-1">
                          <input
                            type="password"
                            disabled="disabled"
                            name=""
                            id=""
                            value={item.password}
                          />
                          <lord-icon
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="https://cdn.lordicon.com/gsjfryhc.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border-t border-gray-200">
                        <div className="flex item-center justify-around">
                          {/* Edit Button */}
                          <lord-icon
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="cursor-pointer"
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                          {/* Delete Button */}
                          <lord-icon
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="cursor-pointer"
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
