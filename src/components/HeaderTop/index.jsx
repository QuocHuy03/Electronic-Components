import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";

export default function HeaderTop() {
  // const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-full bg-white h-10 border-b border-qgray-border quomodo-shop-top-bar">
      <div className="max-w-6xl mx-auto h-full">
        <div className="flex justify-between items-center h-full">
          <div className="topbar-nav">
            <ul className="flex space-x-6">
              <li>
                <span className="text-xs leading-6 text-qblack font-500">
                  Account
                </span>
              </li>
              <li>
                <span className="text-xs leading-6 text-qblack font-500">
                  Track Order
                </span>
              </li>
              <li>
                <span className="text-xs leading-6 text-qblack font-500">
                  Support
                </span>
              </li>
            </ul>
          </div>
          <div className="topbar-dropdowns sm:block hidden">
            <div className="flex space-x-6 items-center">
              <div className="country-select flex space-x-1 items-center">
                <div>
                  <img
                    src="https://shopo-next.vercel.app/assets/images/country-logo-16x16.png"
                    width={16}
                    height={16}
                    alt="country logo"
                    className="overflow-hidden rounded-full"
                  />
                </div>
                <div className="my-select-box w-fit">
                  <button type="button" className="my-select-box-btn ">
                    <span className="text-xs">United State</span>
                  </button>
                  {/* <div className="my-select-box-section ">
                    <ul className="list">
                      <li className="selected">United State</li>
                      <li className>Bangladesh</li>
                      <li className>India</li>
                    </ul>
                  </div> */}
                </div>
                <div className="pt-1">
                  <svg
                    width={10}
                    height={5}
                    viewBox="0 0 10 5"
                    fill="none"
                    className="fill-current qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9.18359"
                      y="0.90918"
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(135 9.18359 0.90918)"
                    />
                    <rect
                      x="5.08984"
                      y={5}
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(-135 5.08984 5)"
                    />
                  </svg>
                </div>
              </div>
              <div className="currency-select flex space-x-1 items-center">
                <div className="my-select-box w-fit">
                  <button type="button" className="my-select-box-btn ">
                    <span className="text-xs">USD</span>
                  </button>
                  {/* <div className="my-select-box-section ">
                    <ul className="list">
                      <li className="selected">USD</li>
                      <li className>BDT</li>
                    </ul>
                  </div> */}
                </div>
                <div className="pt-1">
                  <svg
                    width={10}
                    height={5}
                    viewBox="0 0 10 5"
                    fill="none"
                    className="fill-current qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9.18359"
                      y="0.90918"
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(135 9.18359 0.90918)"
                    />
                    <rect
                      x="5.08984"
                      y={5}
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(-135 5.08984 5)"
                    />
                  </svg>
                </div>
              </div>
              <div className="language-select flex space-x-1 items-center">
                <div className="my-select-box w-fit">
                  <button type="button" className="my-select-box-btn ">
                    <span className="text-xs">Bangla</span>
                  </button>
                  {/* <div className="my-select-box-section ">
                    <ul className="list">
                      <li className="selected">Bangla</li>
                      <li className>english</li>
                    </ul>
                  </div> */}
                </div>
                <div className="pt-1">
                  <svg
                    width={10}
                    height={5}
                    viewBox="0 0 10 5"
                    fill="none"
                    className="fill-current qblack"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="9.18359"
                      y="0.90918"
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(135 9.18359 0.90918)"
                    />
                    <rect
                      x="5.08984"
                      y={5}
                      width="5.78538"
                      height="1.28564"
                      transform="rotate(-135 5.08984 5)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
