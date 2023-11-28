import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";

export default function HeaderTop() {
  // const user = useSelector((state) => state.auth.user);
  const dropdownRef = useRef();
  const [dropdownStates, setDropdownStates] = useState(false);

  const toggleMenu = () => {
    setDropdownStates(!dropdownStates);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownStates(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full bg-white h-10 border-b border-qgray-border quomodo-shop-top-bar">
      <div className="max-w-6xl mx-auto h-full">
        <div className="flex justify-between items-center h-full">
          <div className="topbar-nav">
            <ul className="flex space-x-6">
              <li>
                <Link to={URL_CONSTANTS.PROFILE}>
                  <span className="text-xs leading-6 text-qblack font-500">
                    Tài khoản
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-xs leading-6 text-qblack font-500">
                  Hỗ trợ
                </span>
              </li>
            </ul>
          </div>
          <div className="topbar-dropdowns sm:block hidden">
            <div className="flex space-x-6 items-center">
              <div className="country-select flex space-x-1 items-center">
                <div>
                  <img
                    src="https://i.imgur.com/MTZe0Sm.jpg"
                    width="42"
                    height="42"
                    alt="country logo"
                    class="overflow-hidden rounded-full"
                  />
                </div>
                <div className="my-select-box w-fit">
                  <button
                    ref={dropdownRef}
                    onClick={() => toggleMenu()}
                    type="button"
                    className="my-select-box-btn "
                  >
                    <span className="text-xs">Việt Nam</span>
                  </button>
                  {dropdownStates && <div class="click-away"></div>}
                  {dropdownStates && (
                    <div className="my-select-box-section open">
                      <ul className="list">
                        <li className="selected">Vietnam</li>
                        <li className>English</li>
                      </ul>
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
