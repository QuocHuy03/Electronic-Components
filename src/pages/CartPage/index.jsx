import React from "react";
import Layout from "../../components/Layout";

export default function CartPage() {
  return (
    <Layout>
      <div className="w-full pt-0 pb-0">
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
              <div className="max-w-6xl mx-auto">
                <div className="mb-5">
                  <div>
                    <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px]">
                      <span>
                        <a href="/">
                          <span className="mx-1 capitalize">home</span>
                        </a>
                        <span className="sperator">/</span>
                      </span>
                      <span>
                        <a href="/cart">
                          <span className="mx-1 capitalize">cart</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-qblack">
                    Your Cart
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-[23px]">
            <div className="max-w-6xl mx-auto">
              <div className="w-full mb-[30px]">
                <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                        <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                          product
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          color
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          size
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          price
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          quantity
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          total
                        </td>
                        <td className="py-4 whitespace-nowrap text-right w-[114px]" />
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="pl-10 py-4 w-[380px]">
                          <div className="flex space-x-6 items-center">
                            <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
                              <span
                                style={{
                                  boxSizing: "border-box",
                                  display: "block",
                                  overflow: "hidden",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                  position: "absolute",
                                  inset: 0,
                                }}
                              >
                                <img
                                  alt="product"
                                  sizes="100vw"
                                  srcSet="/_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=640&q=75 640w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=750&q=75 750w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=828&q=75 828w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=1920&q=75 1920w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=2048&q=75 2048w, /_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=3840&q=75 3840w"
                                  src="/_next/image?url=%2Fassets%2Fimages%2Fproduct-img-1.jpg&w=3840&q=75"
                                  decoding="async"
                                  data-nimg="fill"
                                  className="w-full h-full object-contain"
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    boxSizing: "border-box",
                                    padding: 0,
                                    border: "none",
                                    margin: "auto",
                                    display: "block",
                                    width: 0,
                                    height: 0,
                                    minWidth: "100%",
                                    maxWidth: "100%",
                                    minHeight: "100%",
                                    maxHeight: "100%",
                                  }}
                                />
                              </span>
                            </div>
                            <div className="flex-1 flex flex-col">
                              <p className="font-medium text-[15px] text-qblack">
                                iPhone 12 Pro Max 128GB
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <div className=" flex justify-center items-center">
                            <span className="w-[20px] h-[20px] bg-[#E4BC87] block rounded-full" />
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <div className="flex space-x-1 items-center justify-center">
                            <span className="text-[15px] font-normal">
                              Small
                            </span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2">
                          <div className="flex space-x-1 items-center justify-center">
                            <span className="text-[15px] font-normal">$38</span>
                          </div>
                        </td>
                        <td className=" py-4">
                          <div className="flex justify-center items-center">
                            <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
                              <div className="flex justify-between items-center w-full">
                                <button
                                  type="button"
                                  className="text-base text-qgray"
                                >
                                  -
                                </button>
                                <span className="text-qblack">1</span>
                                <button
                                  type="button"
                                  className="text-base text-qgray"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4">
                          <div className="flex space-x-1 items-center justify-center">
                            <span className="text-[15px] font-normal">$38</span>
                          </div>
                        </td>
                        <td className="text-right py-4">
                          <div className="flex space-x-1 items-center justify-center">
                            <span>
                              <svg
                                width={10}
                                height={10}
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                  fill="#AAAAAA"
                                />
                              </svg>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full sm:flex justify-between">
                <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
                  <div className="flex-1 h-full">
                    <div className="input-com w-full h-full">
                      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                        <input
                          placeholder="Discount Code"
                          className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none "
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-[90px] h-[50px] bg-black text-white"
                  >
                    <span className="text-sm font-semibold">Apply</span>
                  </button>
                </div>
                <div className="space-x-2.5">
                  <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                    <span className="text-sm font-semibold">
                      Continue Shopping
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Total
                      </p>
                      <p className="text-[18px] font-medium text-qred">$365</p>
                    </div>
                  </div>
                  <div className="w-full h-[50px] bg-black text-white flex justify-center items-center">
                    <span className="text-sm font-semibold">
                      Proceed to Checkout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
