import React from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";
import {
  calculateDiscountPercentage,
  formatPrice,
} from "../../utils/fomatPrice";
import brand from "../../json/brand.json";
import Slider from "../../components/Slider";
import "./style.css";
import { brandService } from "../../services/brand.service";
import { blogService } from "../../services/blog.service";
import Loading from "./../../components/Loading/index";
import Carousel from "../../components/Carousel";
import { SwiperSlide } from "swiper/react";

export default function HomePage() {
  const { data, isloading } = useQuery(
    ["product"],
    () => productService.fetchAllProducts(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  const { data: blogData, isLoading } = useQuery(
    ["blog"],
    () => blogService.fetchAllBlogs(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  console.log();

  return (
    <Layout>
      {/* Banner */}
      <div className="w-full banner-wrapper mb-[20px]" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px] mb-[30px]">
              <div className="w-full mt-[30px]">
                <Slider />
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="best-services bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-5 lg:py-0 py-10 aos-init"
            >
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H5.63636V24.1818H35"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M34.9982 1H11.8164V18H34.9982V1Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M11.8164 7.18164H34.9982"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Free Shipping
                    </p>
                    <p className="text-sm text-qgray">
                      When ordering over $100
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={34}
                        viewBox="0 0 32 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M30.7 2L29.5 10.85L20.5 9.65"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Free Return
                    </p>
                    <p className="text-sm text-qgray">
                      Get Return within 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={38}
                        viewBox="0 0 32 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Secure Payment
                    </p>
                    <p className="text-sm text-qgray">
                      100% Secure Online Payment
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width={32}
                        height={35}
                        viewBox="0 0 32 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M16 28V22"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                        />
                        <path
                          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                        <path
                          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                          stroke="#FFBB38"
                          strokeWidth={2}
                          strokeMiterlimit={10}
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Best Quality
                    </p>
                    <p className="text-sm text-qgray">
                      Original Product Guarenteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product */}

      <div className="section-style-one new-products mb-[20px]">
        <div className="section-wrapper w-full  ">
          <div className="max-w-6xl mx-auto rounded-md">
            <div className="relative flex justify-between px-4 items-center h-14 bg-white rounded-md">
              <Link
                className="no-underline text-transparent cursor-pointer"
                to={"/"}
              >
                <div
                  type="title"
                  className="border-l-1 border-gray-300 bg-opacity-70 text-gray-700 font-[500] text-lg leading-7 overflow-hidden whitespace-normal transition duration-300 ease-in-out delay-0s"
                >
                  SẢN PHẨM NỔI BẬT
                </div>
              </Link>
              <Link to={URL_CONSTANTS.FILTER}>
                <div className="flex space-x-2 items-center">
                  <p className="text-base font-[500] text-black">Xem thêm</p>
                  <span className="animate-right-dir">
                    <svg
                      width={17}
                      height={14}
                      viewBox="0 0 17 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0225 6.00243C13.9998 6.03738 13.9772 6.06941 13.9545 6.10436C13.8724 6.10727 13.7904 6.11601 13.7083 6.11601C9.93521 6.11601 6.16215 6.11601 2.38909 6.11601C1.87111 6.11601 1.35313 6.10728 0.835147 6.12475C0.351131 6.14514 0.00863998 6.51501 0.000148475 6.981C-0.00834303 7.45864 0.3483 7.83725 0.837977 7.8722C0.956858 7.88094 1.07857 7.87511 1.20028 7.87511C5.33565 7.87803 9.46818 7.87803 13.6035 7.88094C13.7253 7.88094 13.8498 7.88094 13.9715 7.88094C14.0026 7.93627 14.031 7.9887 14.0621 8.04403C13.9404 8.12267 13.7988 8.18383 13.697 8.28576C12.3355 9.67499 10.9797 11.0671 9.62669 12.4651C9.26155 12.8437 9.25306 13.3767 9.58423 13.732C9.91823 14.0902 10.4419 14.099 10.8127 13.7233C12.7855 11.702 14.7556 9.6779 16.7199 7.64794C17.0907 7.26351 17.0851 6.73053 16.7171 6.34901C14.7697 4.33652 12.8167 2.32987 10.858 0.329035C10.7278 0.195063 10.5466 0.0873038 10.3683 0.0319679C10.0088 -0.0757916 9.63235 0.116428 9.44554 0.451356C9.26438 0.78046 9.31533 1.20859 9.60687 1.51148C10.6768 2.62111 11.7524 3.72492 12.8308 4.82581C13.2271 5.2219 13.6262 5.60925 14.0225 6.00243Z"
                        fill="white"
                      />
                      <path
                        d="M14.0225 6.00241C13.6262 5.60923 13.2243 5.22188 12.8336 4.82288C11.7552 3.72199 10.6796 2.61818 9.60971 1.50855C9.31816 1.20566 9.26721 0.77753 9.44837 0.448427C9.63518 0.113498 10.0116 -0.0787213 10.3711 0.0290382C10.5466 0.0814617 10.7278 0.192134 10.8608 0.326105C12.8195 2.32694 14.7697 4.33359 16.7199 6.34608C17.0879 6.72469 17.0936 7.26058 16.7228 7.64501C14.7584 9.67497 12.7884 11.6991 10.8155 13.7203C10.4475 14.0989 9.92106 14.0873 9.58706 13.7291C9.25589 13.3737 9.26155 12.8408 9.62952 12.4622C10.9825 11.0642 12.3383 9.67206 13.6998 8.28284C13.8017 8.1809 13.9404 8.11974 14.0649 8.0411C14.0338 7.98577 14.0055 7.93334 13.9743 7.87801C13.8526 7.87801 13.7281 7.87801 13.6064 7.87801C9.47101 7.8751 5.33848 7.8751 1.20311 7.87218C1.0814 7.87218 0.962519 7.87801 0.840808 7.86927C0.3483 7.84015 -0.00834304 7.45862 0.00014847 6.98098C0.00863998 6.515 0.351131 6.14512 0.832316 6.12764C1.3503 6.10726 1.86828 6.11891 2.38626 6.11891C6.16215 6.11599 9.93521 6.11599 13.7083 6.11599C13.7904 6.11599 13.8724 6.10726 13.9574 6.10143C13.9772 6.0694 13.9998 6.03445 14.0225 6.00241Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap gap-1 place-content-start bg-gray-50 py-2">
              {data?.map((item) => (
                <div
                  data-aos="fade-up"
                  className="bg-white mb-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                >
                  <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
                    <div className="relative flex-1 flex-grow-0 flex-shrink-0 flex-basis-auto mb-2">
                      <div className="relative mb-1">
                        <div className="relative pb-[100%]">
                          <div
                            height="100%"
                            width="100%"
                            className="inline-block overflow-hidden h-full w-full transition-transform duration-300 ease-in-out absolute inset-0 object-contain"
                          >
                            <Link to={`/product/${item.slugProduct}`}>
                              <img
                                src={item.images[0].imagePath}
                                loading="lazy"
                                hover="zoom"
                                decoding="async"
                                alt="Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 (Ryzen 5 7535HS/RAM 8GB/RTX 4050/512GB SSD/ Windows 11)"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="mb-1">
                        <div
                          type="body"
                          color="textSecondary"
                          className="product-brand-name border-gray-300 opacity-100 text-gray-500 font-medium text-sm leading-[20px] overflow-hidden whitespace-nowrap overflow-ellipsis transition duration-300 ease-in-out delay-0s"
                          style={{
                            textTransform: "uppercase",
                            display: "inline",
                          }}
                        >
                          ACER
                        </div>
                      </div>
                      <div className="h-12">
                        <div
                          type="caption"
                          className="att-product-card-title  border-gray-300 opacity-100 text-gray-600 font-normal text-sm leading-4 overflow-hidden custom-line-clamp"
                          color="textPrimary"
                        >
                          <Link to={`/product/${item.slugProduct}`}>
                            <h3
                              title={item.nameProduct}
                              className="text-sm font-normal leading-4 inline"
                            >
                              {item.nameProduct}
                            </h3>
                          </Link>
                        </div>
                      </div>
                      <div className="relative mt-1 mb-1 pr-0 flex items-center">
                        <div className="flex flex-col items-start h-10">
                          <div
                            type="subtitle"
                            className="att-product-detail-latest-price opacity-100 text-blue-700 font-bold text-lg leading-6 overflow-hidden whitespace-normal overflow-ellipsis mt-1"
                            color="primary500"
                          >
                            {formatPrice(item.price_has_dropped)}đ
                          </div>
                          <div class="flex h-4">
                            <div
                              type="caption"
                              class="att-product-detail-retail-price m-0.25 opacity-100 text-gray-500 font-normal text-xs leading-4 overflow-hidden overflow-ellipsis line-through mt-1"
                              color="textSecondary"
                            >
                              {formatPrice(item.initial_price)} đ
                            </div>
                            <div
                              type="caption"
                              color="primary500"
                              class="opacity-100 text-blue-500 font-normal text-xs leading-4 overflow-hidden overflow-ellipsis ml-2 mt-1"
                            >
                              -{" "}
                              {calculateDiscountPercentage(
                                item?.initial_price,
                                item?.price_has_dropped
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-10">
                          <button
                            className="w-8 h-8 border-[1px] border-blue-400 rounded-full p-[11px] flex-shrink-0 order-first"
                            onClick={() => handleAddToCart()}
                          >
                            <img
                              src="https://i.imgur.com/ZCeBSHN.png"
                              alt=""
                              style={{ transform: "scale(2.5)" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop By Brand */}
      <div data-aos="fade-up" className="w-full mb-[20px] aos-init aos-animate">
        <div className="max-w-6xl mx-auto bg-white rounded-[8px]">
          <div className="relative flex justify-between items-center py-4 pl-4">
            <div
              type="title"
              color="textTitle"
              className="border-l-1 border-gray-300 bg-opacity-70 text-gray-700 font-[500] text-lg leading-7"
            >
              DANH MỤC NỔI BẬT
            </div>
          </div>
          <div
            className="flex flex-wrap gap-[16px] text-center items-center"
            style={{
              padding: "8px 16px 24px",
            }}
          >
            {brand?.map((item) => (
              <div className="flex flex-grow flex-shrink flex-1 items-center">
                <div className="relative inline-block overflow-hidden h-[56px] w-[56px]">
                  <img alt="logo" src={item.image} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tin tức */}
      <div className="mb-[20px]">
        <div className="max-w-6xl mx-auto rounded-8">
          <div class="relative flex justify-between items-center bg-white px-4 h-14">
            <Link
              className="no-underline text-transparent cursor-pointer"
              to={"/"}
            >
              <div
                type="title"
                className="border-l-1 border-gray-300 bg-opacity-70 text-gray-700 font-[500] text-lg leading-7 overflow-hidden whitespace-normal transition duration-300 ease-in-out delay-0s"
              >
                TIN TỨC
              </div>
            </Link>

            <Link to={URL_CONSTANTS.BLOG}>
              <a>
                <div className="flex space-x-2 items-center">
                  <p className="text-base font-[500] text-black">Xem thêm</p>
                  <span className="animate-right-dir">
                    <svg
                      width={17}
                      height={14}
                      viewBox="0 0 17 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0225 6.00243C13.9998 6.03738 13.9772 6.06941 13.9545 6.10436C13.8724 6.10727 13.7904 6.11601 13.7083 6.11601C9.93521 6.11601 6.16215 6.11601 2.38909 6.11601C1.87111 6.11601 1.35313 6.10728 0.835147 6.12475C0.351131 6.14514 0.00863998 6.51501 0.000148475 6.981C-0.00834303 7.45864 0.3483 7.83725 0.837977 7.8722C0.956858 7.88094 1.07857 7.87511 1.20028 7.87511C5.33565 7.87803 9.46818 7.87803 13.6035 7.88094C13.7253 7.88094 13.8498 7.88094 13.9715 7.88094C14.0026 7.93627 14.031 7.9887 14.0621 8.04403C13.9404 8.12267 13.7988 8.18383 13.697 8.28576C12.3355 9.67499 10.9797 11.0671 9.62669 12.4651C9.26155 12.8437 9.25306 13.3767 9.58423 13.732C9.91823 14.0902 10.4419 14.099 10.8127 13.7233C12.7855 11.702 14.7556 9.6779 16.7199 7.64794C17.0907 7.26351 17.0851 6.73053 16.7171 6.34901C14.7697 4.33652 12.8167 2.32987 10.858 0.329035C10.7278 0.195063 10.5466 0.0873038 10.3683 0.0319679C10.0088 -0.0757916 9.63235 0.116428 9.44554 0.451356C9.26438 0.78046 9.31533 1.20859 9.60687 1.51148C10.6768 2.62111 11.7524 3.72492 12.8308 4.82581C13.2271 5.2219 13.6262 5.60925 14.0225 6.00243Z"
                        fill="white"
                      />
                      <path
                        d="M14.0225 6.00241C13.6262 5.60923 13.2243 5.22188 12.8336 4.82288C11.7552 3.72199 10.6796 2.61818 9.60971 1.50855C9.31816 1.20566 9.26721 0.77753 9.44837 0.448427C9.63518 0.113498 10.0116 -0.0787213 10.3711 0.0290382C10.5466 0.0814617 10.7278 0.192134 10.8608 0.326105C12.8195 2.32694 14.7697 4.33359 16.7199 6.34608C17.0879 6.72469 17.0936 7.26058 16.7228 7.64501C14.7584 9.67497 12.7884 11.6991 10.8155 13.7203C10.4475 14.0989 9.92106 14.0873 9.58706 13.7291C9.25589 13.3737 9.26155 12.8408 9.62952 12.4622C10.9825 11.0642 12.3383 9.67206 13.6998 8.28284C13.8017 8.1809 13.9404 8.11974 14.0649 8.0411C14.0338 7.98577 14.0055 7.93334 13.9743 7.87801C13.8526 7.87801 13.7281 7.87801 13.6064 7.87801C9.47101 7.8751 5.33848 7.8751 1.20311 7.87218C1.0814 7.87218 0.962519 7.87801 0.840808 7.86927C0.3483 7.84015 -0.00834304 7.45862 0.00014847 6.98098C0.00863998 6.515 0.351131 6.14512 0.832316 6.12764C1.3503 6.10726 1.86828 6.11891 2.38626 6.11891C6.16215 6.11599 9.93521 6.11599 13.7083 6.11599C13.7904 6.11599 13.8724 6.10726 13.9574 6.10143C13.9772 6.0694 13.9998 6.03445 14.0225 6.00241Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="place-content-start py-2">
            <div className="w-full">
              {isLoading ? (
                <Loading />
              ) : (
                <Carousel
                  delay={4000}
                  navigation={false}
                  pagination={false}
                  spaceBetween={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {blogData?.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="bg-white p-2">
                        <a
                          target="_self"
                          className="no-underline text-current cursor-pointer"
                          href="https://phongvu.vn/cong-nghe/co-nen-mua-acer-nitro-phoenix-khong"
                        >
                          <div className="text-center">
                            <div
                              height={140}
                              width="100%"
                              className="relative inline-block overflow-hidden rounded-lg h-140 w-full transition-transform duration-300 ease-in"
                            >
                              <img
                                src={`${item.imageBlog}`}
                                loading="lazy"
                                hover="zoom"
                                decoding="async"
                                alt="Top 5 lý do học sinh sinh viên nên mua laptop gaming Nitro 16 Phoenix, RTX 4050"
                                style={{
                                  width: "100%",
                                  height: 140,
                                  objectFit: "cover",
                                }}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div
                              type="subtitle"
                              className="mt-4 border-gray-300 opacity-400 text-base leading-6 overflow-hidden line-clamp-1 transition-color duration-300 ease-in"
                            >
                              {item.titleBlog}
                            </div>
                          </div>
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
