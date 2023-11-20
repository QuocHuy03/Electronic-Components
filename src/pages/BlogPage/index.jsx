import React from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "./../../services/blog.service";
import { Link } from "react-router-dom";
import { URL_CONSTANTS } from "../../constants/url.constants";
import Loading from "../../components/Loading";

export default function BlogPage() {
  const { data, isLoading } = useQuery(
    ["blog"],
    () => blogService.fetchAllBlogs(),
    {
      retry: 3,
      retryDelay: 1000,
    }
  );
  console.log(data);

  return (
    <Layout>
      <div className="w-full  pt-[0px] pb-[0px]">
        <div className="blogs-wrapper w-full-width">
          <div className="title-bar">
            <div className="page-title-wrapper bg-[#D3EFFF] w-full h-[173px] py-10">
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
                        <a href="/blogs">
                          <span className="mx-1 capitalize">blogs</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-3xl font-semibold text-qblack">
                    Our Blogs
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-[20px]">
          <div className="max-w-6xl mx-auto">
            <div className="w-full">
              <div className="max-w-6xl mx-auto flex">
                {/* Cột 1 (70%) */}
                <div className="w-9/12 pr-5">
                  <div className="bg-white mb-4 shadow-sm rounded-md">
                    {/* Hàng 1 */}
                    {isLoading ? (
                      <Loading />
                    ) : (
                      data?.map((item) => (
                        <div className="p-4 shadow-sm flex">
                          {/* Ảnh (nằm ngoài cùng bên trái) */}
                          <img
                            src={`${item.imageBlog}`}
                            alt="Mô tả ảnh"
                            className="w-[200px] h-[190px] object-cover mr-5 rounded-md"
                          />

                          {/* Phần thông tin tin tức (tiêu đề, tác giả, nội dung) */}

                          <div>
                            <div className="bg-blue-700 text-white py-0.5 px-1 mb-2 w-[60px] rounded-md text-center">
                              Tin tức
                            </div>
                            {/* Tiêu đề tin tức */}
                            <Link to={`/tin-tuc/${item.slugBlog}`}>
                              <h2 className="text-xl font-semibold mb-2">
                                {item.titleBlog}
                              </h2>
                            </Link>

                            {/* Thông tin người viết */}
                            <p className="text-gray-600 mb-1">
                              Tác giả: <b>{item.userBlog}</b> | Ngày:{" "}
                              {item.updatedAt}
                            </p>

                            {/* Nội dung tin tức */}
                            <Link to={`/tin-tuc/${item.slugBlog}`}>
                              <p
                                className="text-[18px] line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: item?.contentBlog,
                                }}
                              ></p>
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* Cột 2 (30%) */}
                <div className="w-3/12">
                  {/* Nội dung cột 2 */}
                  <div className="bg-white p-4 shadow-md flex flex-col rounded-md">
                    <p className="bg-blue-700 text-white py-0.5 px-1 mb-2 w-[256px] rounded-md text-center text-[23px]">
                      Tin tức xem nhiều
                    </p>

                    <img
                      src="https://phongvu.vn/cong-nghe/wp-content/uploads/2023/11/danh-gia-laptop-msi-cyborg-300x300.png"
                      alt="Mô tả ảnh"
                      className="w-full h-40 object-cover mb-4 rounded-md"
                    />
                    {isLoading ? (
                      <Loading />
                    ) : (
                      data?.map((item, index) => (
                        <div>
                          {/* Ảnh */}

                          {/* Danh sách bài viết tin tức */}
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
