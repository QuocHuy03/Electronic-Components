import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "./../../services/blog.service";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import formatDate from "../../utils/fomatDate";
import Pagination from "../../components/Pagination";

export default function BlogPage() {
  const { data, isLoading } = useQuery(
    ["blog"],
    () => blogService.fetchAllBlogs(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );

  const renderBlogItem = (item, index) => {
    return (
      <div key={index} className="p-4 shadow-sm flex">
        {/* Ảnh (nằm ngoài cùng bên trái) */}
        <img
          src={`${item.imageBlog}`}
          alt="Mô tả ảnh"
          className="w-full lg:w-[200px] h-[190px] lg:mr-5 rounded-md object-cover mb-4 lg:mb-0 mx-auto"
        />

        {/* Phần thông tin tin tức (tiêu đề, tác giả, nội dung) */}

        <div>
          <div className="bg-blue-700 text-white py-0.5 px-1 mb-2 w-[60px] rounded-md text-center">
            Tin tức
          </div>
          {/* Tiêu đề tin tức */}
          <Link to={`/tin-tuc/${item.slugBlog}`}>
            <h2 className="text-xl lg:text-2xl font-semibold mb-2">
              {item.titleBlog}
            </h2>
          </Link>

          {/* Thông tin người viết */}
          <p className="text-gray-600 mb-1">
            Tác giả: <b>{item.userBlog}</b> | Ngày: {item.updatedAt}
          </p>

          {/* Nội dung tin tức */}
          <Link to={`/tin-tuc/${item.slugBlog}`}>
            <p
              className="text-[18px] lg:text-base line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: item?.contentBlog,
              }}
            ></p>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full  pt-[0px] pb-[0px]">
        <div className="blogs-wrapper w-full-width">
          <div className="title-bar">
            <div className="page-title-wrapper bg-[#D3EFFF] w-full h-[173px] py-10">
              <div className="max-w-6xl mx-auto">
                <div className="mb-5">
                  <div>
                    <div className="flex items-center font-[400] text-[13px] text-black mb-[23px]">
                      <a href="/" className="capitalize">
                        <img
                          src="https://i.imgur.com/FFjafxI.png"
                          alt=""
                          width="17"
                          height="17"
                          className="mx-1 mb-2"
                        />
                      </a>
                      <span className="sperator">/</span>
                      <span>
                        <a href="/blogs">
                          <span className="mx-1 capitalize">tin tức</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-qblack">
                    Tin tức
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-5 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="w-full">
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
                {/* Cột 1 (70%) */}
                <div className="w-full lg:w-9/12 pr-5 mb-4 lg:mb-0">
                  <div className="bg-white shadow-sm rounded-md pb-4">
                    {/* Hàng 1 */}
                    {isLoading ? (
                      <Loading />
                    ) : (
                      data?.length > 0 && (
                        <Pagination
                          data={data}
                          itemsPerPage={4}
                          renderItem={renderBlogItem}
                        />
                      )
                    )}
                  </div>
                </div>
                {/* Cột 2 (30%) */}
                <div className="w-full lg:w-3/12">
                  {/* Nội dung cột 2 */}
                  <div className="bg-white p-4 shadow-md flex flex-col rounded-md">
                    <p className="bg-blue-700 text-white py-0.5 px-1 mb-2 w-[256px] rounded-md text-center text-[23px]">
                      Tin tức nổi bật
                    </p>

                    <img
                      src="https://phongvu.vn/cong-nghe/wp-content/uploads/2023/11/danh-gia-laptop-msi-cyborg-300x300.png"
                      alt="Mô tả ảnh"
                      className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                    {isLoading ? (
                      <Loading />
                    ) : (
                      data
                        ?.filter(
                          (item) => item.outstandingBlog === "outstanding"
                        )
                        .map((item, index) => (
                          <div>
                            <ul
                              className="list-decimal text-gray-600 flex-1"
                              key={index}
                            >
                              <div className="flex mb-2">
                                <div className="w-5 h-5 bg-blue-700 text-white mr-2 flex items-center justify-center rounded-md mt-1">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <Link to={`/tin-tuc/${item.slugBlog}`}>
                                      <div>
                                        <b>{item.titleBlog}</b>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </ul>
                          </div>
                        ))
                    )}
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
