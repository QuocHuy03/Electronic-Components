import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { categoryService } from "./../../services/category.service";
import { brandService } from "./../../services/brand.service";
import RangeComponent from "../../components/Range";
import {
  calculateDiscountPercentage,
  formatPrice,
} from "../../utils/fomatPrice";
import { Empty } from "antd";

const sort = [
  {
    id: 1,
    name: "Giá tăng dần",
    sort: "SORT_BY_PRICE",
    order: "ASC",
  },
  {
    id: 2,
    name: "Giá giảm dần",
    sort: "SORT_BY_PRICE",
    order: "DESC",
  },
  {
    id: 3,
    name: "Sản phẩm mới nhất",
    sort: "SORT_BY_PUBLISH_AT",
    order: "SBPA",
  },
];

export default function FilterPage() {
  const { slug } = useParams();
  const [isSlug, setSlug] = useState(null);
  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, [slug]);

  const { data: isProducts, isloading: loadingProduct } = useQuery({
    queryKey: ["products", isSlug],
    queryFn: () => productService.fetchProductsByCategory(isSlug),
    staleTime: 500,
    enabled: !!isSlug,
  });

  const { data: isBrands, isloading: loadingBrand } = useQuery(
    ["brands"],
    () => brandService.fetchAllBrands(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  const [priceRange, setPriceRange] = useState([1000000, 100000000]);

  const handlePriceChange = (newPriceRange) => {
    if (
      newPriceRange[0] !== priceRange[0] ||
      newPriceRange[1] !== priceRange[1]
    ) {
      handleFilterChange("prices", `${newPriceRange[0]}-${newPriceRange[1]}`);
      setPriceRange(newPriceRange);
    }
  };

  const dataColors = [
    {
      id: 1,
      name: "black",
    },
    {
      id: 2,
      name: "red",
    },
    {
      id: 3,
      name: "yellow",
    },
    {
      id: 4,
      name: "white",
    },
  ];

  const initialFilters = {
    brands: [],
    colors: "",
    sorts: "",
    prices: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const querybrands = params.getAll("brands");
    const queryColors = params.get("colors");
    const querySorts = params.get("sorts");
    const queryPrices = params.get("prices");

    setFilters({
      brands: querybrands || [],
      sorts: querySorts || "",
      colors: queryColors || "",
      prices: queryPrices || "",
    });
  }, []);

  const handleFilterChange = (group, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (group === "brands") {
        if (updatedFilters.brands.includes(value)) {
          updatedFilters.brands = updatedFilters.brands.filter(
            (brand) => brand !== value
          );
        } else {
          updatedFilters.brands.push(value);
        }
      } else if (value === updatedFilters[group]) {
        delete updatedFilters[group];
      } else {
        updatedFilters[group] = value;
      }

      return updatedFilters;
    });
  };

  useEffect(() => {
    const hasFilters = Object.values(filters).some((value) =>
      Array.isArray(value) ? value.length > 0 : value !== ""
    );

    const queryArray = [];

    for (const [key, value] of Object.entries(filters)) {
      if (
        (Array.isArray(value) && value.length > 0) ||
        (value !== "" && key !== "sorts" && key !== "prices")
      ) {
        // If the value is an array with items, add multiple key-value pairs with the same key
        value.forEach((item) => {
          queryArray.push(`${key}=${encodeURIComponent(item)}`);
        });
      } else if (value !== "" && key !== "brands") {
        queryArray.push(`${key}=${encodeURIComponent(value)}`);
      }
    }

    // Join all key-value pairs with "&" to create the final query string
    const query = queryArray.join("&");

    const currentPath = window.location.pathname;
    const newUrl = hasFilters ? `${currentPath}?${query}` : currentPath;

    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  let filteredData = isProducts;
  if (isProducts && isProducts?.length > 0) {
    if (filters.sorts) {
      if (filters.sorts === "ASC") {
        filteredData = [...isProducts].sort(
          (a, b) =>
            parseInt(a.price_has_dropped) - parseInt(b.price_has_dropped)
        );
      } else if (filters.sorts === "DESC") {
        filteredData = [...isProducts].sort(
          (a, b) =>
            parseInt(b.price_has_dropped) - parseInt(a.price_has_dropped)
        );
      } else if (filters.sorts === "SBPA") {
        filteredData = [...isProducts].sort(
          (a, b) =>
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
      }
    }
    filteredData = filteredData?.filter((huydev) => {
      // console.log(huydev);
      if (Array.isArray(filters.brands) && filters.brands.length > 0) {
        if (!filters.brands.includes(huydev?.brand.nameBrand.toLowerCase())) {
          return false;
        }
      }

      if (filters.colors) {
        const selectedColors = filters.colors
          .split(",")
          .map((color) => color.trim());
        const productColors = huydev.nameColors
          .split(",")
          .map((color) => color.trim());

        const hasMatchingColor = selectedColors.some((selectedColor) =>
          productColors.includes(selectedColor)
        );

        if (!hasMatchingColor) {
          return false;
        }
      }
      if (filters.prices) {
        const [minSalary, maxSalary] = filters.prices.split("-");
        const priceProduct = parseInt(huydev.price_has_dropped);
        if (minSalary && priceProduct < parseInt(minSalary)) {
          return false;
        }
        if (maxSalary && priceProduct > parseInt(maxSalary)) {
          return false;
        }
      }
      return true;
    });
  }

  return (
    <Layout>
      <div className="w-full  pt-[30px] pb-[60px]">
        <div className="products-page-wrapper w-full">
          <div className="max-w-6xl mx-auto">
            <div>
              <div className="breadcrumb-wrapper font-400 text-[13px] text-black mb-[23px]">
                <span>
                  <a href="/">
                    <span className="mx-1 capitalize">home</span>
                  </a>
                  <span className="sperator capitalize">
                    / Filter / {isSlug}
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <div className="filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px]  hidden lg:block">
                  {Object.entries(filters).some(
                    ([key, value]) =>
                      value &&
                      key !== "sorts" &&
                      key !== "prices" &&
                      value.length > 0
                  ) ? (
                    <div className="filter-subject-item pb-4 border-b border-gray-border mt-5">
                      <h3 className="text-xs">Bộ lọc đã dùng</h3>
                      <hr className="my-4" />
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) =>
                          value &&
                          key !== "sorts" &&
                          key !== "prices" &&
                          value.length > 0 ? (
                            <React.Fragment key={key}>
                              {Array.isArray(value)
                                ? value.map((item, index) => (
                                    <React.Fragment key={index + 1}>
                                      <span
                                        className="opacity-1 capitalize inline-flex items-center px-2 bg-[rgb(255, 255, 255)] h-[24px] text-xs rounded-xl border border-solid border-[rgb(210, 210, 210)]"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div
                                          type="caption"
                                          color="textPrimary"
                                          className="mr-[0.25rem] "
                                        >
                                          {item}
                                        </div>
                                        <svg
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          size={16}
                                          className="css-9w5ue6"
                                          height={16}
                                          width={16}
                                          xmlns="http://www.w3.org/2000/svg"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleFilterChange(key, item)
                                          }
                                        >
                                          <path
                                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                            fill="#DFDFE6"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.90045 8.64594C9.60755 8.35305 9.13268 8.35305 8.83979 8.64594C8.54689 8.93883 8.54689 9.41371 8.83979 9.7066L11.0765 11.9433L8.83997 14.1798C8.54707 14.4727 8.54707 14.9476 8.83997 15.2405C9.13286 15.5334 9.60773 15.5334 9.90063 15.2405L12.1371 13.004L14.3737 15.2405C14.6666 15.5334 15.1414 15.5334 15.4343 15.2405C15.7272 14.9476 15.7272 14.4727 15.4343 14.1798L13.1978 11.9433L15.4345 9.7066C15.7274 9.41371 15.7274 8.93883 15.4345 8.64594C15.1416 8.35305 14.6667 8.35305 14.3738 8.64594L12.1371 10.8826L9.90045 8.64594Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </span>
                                    </React.Fragment>
                                  ))
                                : value.split(",").map((item, index) => (
                                    <div
                                      className="opacity-1 inline-flex items-center px-2 bg-[rgb(255, 255, 255)] h-[24px] rounded-xl border-solid border-[rgb(210, 210, 210)]"
                                      key={`${key}_${item}_${index}`}
                                    >
                                      <span
                                        className="css-cbubas"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div
                                          type="caption"
                                          color="textPrimary"
                                          className="capitalize"
                                        >
                                          {item}
                                        </div>
                                        <svg
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          size={16}
                                          className="css-9w5ue6"
                                          height={16}
                                          width={16}
                                          xmlns="http://www.w3.org/2000/svg"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleFilterChange(key, item)
                                          }
                                        >
                                          <path
                                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                            fill="#DFDFE6"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.90045 8.64594C9.60755 8.35305 9.13268 8.35305 8.83979 8.64594C8.54689 8.93883 8.54689 9.41371 8.83979 9.7066L11.0765 11.9433L8.83997 14.1798C8.54707 14.4727 8.54707 14.9476 8.83997 15.2405C9.13286 15.5334 9.60773 15.5334 9.90063 15.2405L12.1371 13.004L14.3737 15.2405C14.6666 15.5334 15.1414 15.5334 15.4343 15.2405C15.7272 14.9476 15.7272 14.4727 15.4343 14.1798L13.1978 11.9433L15.4345 9.7066C15.7274 9.41371 15.7274 8.93883 15.4345 8.64594C15.1416 8.35305 14.6667 8.35305 14.3738 8.64594L12.1371 10.8826L9.90045 8.64594Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </span>
                                    </div>
                                  ))}
                            </React.Fragment>
                          ) : null
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="filter-subject-item pb-5 border-b border-qgray-border mt-5">
                    <div className="subject-title mb-[30px]">
                      <h1 className="text-black text-base font-500">
                        Price Range
                      </h1>
                    </div>
                    <div className="price-range mb-5">
                      <div className="range-slider">
                        <RangeComponent
                          range={priceRange}
                          onPriceChange={handlePriceChange}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-black font-400">
                      Price:{" "}
                      {priceRange[0].toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      -{" "}
                      {priceRange[1].toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>

                  <div className="filter-subject-item pb-5 border-b border-gray-border mt-5">
                    <div className="subject-title mb-[30px]">
                      <h1 className="text-black text-base font-500">Brands</h1>
                    </div>
                    <div className="filter-items">
                      <ul>
                        {loadingBrand ? (
                          <Loading />
                        ) : (
                          isBrands?.map((item) => (
                            <li
                              key={item._id}
                              className="item flex justify-between items-center mb-2"
                            >
                              <div className="flex space-x-[14px] items-center">
                                <div>
                                  <div>
                                    <input
                                      onChange={() =>
                                        handleFilterChange(
                                          "brands",
                                          item.slugBrand
                                        )
                                      }
                                      checked={filters.brands.includes(
                                        item.slugBrand
                                      )}
                                      type="checkbox"
                                      name={item.nameBrand}
                                      id={item.nameBrand}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label
                                    htmlFor={item.nameBrand}
                                    className="text-xs font-400 capitalize"
                                  >
                                    {item.nameBrand}
                                  </label>
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="filter-subject-item pb-5 border-b border-gray-border mt-5">
                    <div className="subject-title mb-[30px]">
                      <h1 className="text-black text-base font-500">Storage</h1>
                    </div>
                    <div className="filter-items">
                      <div className="flex space-x-[5px] flex-wrap">
                        <span className=" font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px]  text-qgray ">
                          64GB
                        </span>
                        <span className=" font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px]  text-qgray ">
                          128GB
                        </span>
                        <span className=" font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px]  text-qgray ">
                          256GB
                        </span>
                        <span className=" font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px]  text-qgray ">
                          512GB
                        </span>
                        <span className=" font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px]  text-qgray ">
                          1024GB
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-10 h-10 fixed top-5 right-5 z-50 rounded lg:hidden flex justify-center items-center border border-qred text-qred"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="products-sorting w-full bg-slate-50 md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–
                      {filteredData ? filteredData?.length : 0} of{" "}
                      {isProducts?.length} results
                    </p>
                  </div>

                  <div className="flex space-x-1 items-center">
                    <select
                      onChange={(e) =>
                        handleFilterChange("sorts", e.target.value)
                      }
                      class="block w-full px-4 py-1 text-sm  border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:ring-gray-300 dark:focus:border-blue-300 "
                    >
                      <option selected>Vui lòng chọn</option>
                      {sort?.map((item, index) => (
                        <option key={index} value={item.order}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  {loadingProduct ? (
                    <Loading />
                  ) : (
                    filteredData?.map((item) => (
                      <div data-aos="fade-up" className="aos-init aos-animate">
                        <div
                          className="product-card-one w-full h-full bg-white relative group overflow-hidden"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
                          }}
                        >
                          <Link
                            to={`/product/${item.slugProduct}`}
                            className="p-img"
                          >
                            <img
                              className="product-card-img w-full p-[25px]"
                              src={item.images[0].imagePath}
                              alt="Product Image"
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                          <div className="product-card-details px-[30px] pb-[30px] relative">
                            <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
                              <button
                                type="button"
                                className="bg-yellow-400 items-center flex h-full w-full  opacity-1 justify-center"
                              >
                                <div className="flex items-center space-x-3">
                                  <span>
                                    <svg
                                      width={14}
                                      height={16}
                                      viewBox="0 0 14 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="fill-current"
                                    >
                                      <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                                    </svg>
                                  </span>
                                  <Link to={`/product/${item.slugProduct}`}>
                                    <span>Add To Cart</span>
                                  </Link>
                                </div>
                              </button>
                            </div>
                            <div className="reviews flex space-x-[1px] mb-3">
                              <span className="text-sm italic">
                                (Tiết kiệm:{" "}
                                {calculateDiscountPercentage(
                                  item?.initial_price,
                                  item?.price_has_dropped
                                )}
                                )
                              </span>
                            </div>
                            <Link
                              to={`/product/${item.slugProduct}`}
                              className="p-name"
                            >
                              <p className="title mb-2 text-[15px] font-600 text-neutral-950 font-bold leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                                {item.nameProduct}
                              </p>
                            </Link>
                            <p className="price">
                              <span className="main-price text-qgray line-through font-500 text-[15px]">
                                {formatPrice(item.initial_price)}đ
                              </span>
                              <span className="offer-price text-qred font-500 text-[15px] ml-2">
                                {formatPrice(item.price_has_dropped)} đ
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
