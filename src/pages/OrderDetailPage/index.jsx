import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import { formatPrice } from "../../utils/fomatPrice";
import formatDate from "../../utils/fomatDate";
import OrderStatus from "../../types/order.type";
import huydev from "../../json/address.json";

export default function OrderDetailPage() {
  const { slug } = useParams();
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isSlug, setSlug] = useState(null);
  
  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, [slug]);
  
  useEffect(() => {
    setProvinces(huydev.provinces);
    setDistricts(huydev.districts);
    setWards(huydev.wards);
  }, []);

  const { data: isOrder, isloading: loadingOrder } = useQuery({
    queryKey: ["detailOrder", isSlug],
    queryFn: () => orderService.fetchOrderByCode(isSlug),
    staleTime: 500,
    enabled: !!isSlug,
  });
  function getOrderStatusIndex(status) {
    const statusList = [
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.APPROVED,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
    ];

    return statusList.indexOf(status);
  }

  function getOrderStatus(status, label) {
    const currentStatusIndex = getOrderStatusIndex(isOrder?.orderStatus);
    const statusIndex = getOrderStatusIndex(status);
    const isActive = currentStatusIndex >= statusIndex;
    let timeDisplay = null;
    switch (status) {
      case OrderStatus.PENDING:
        timeDisplay = isOrder?.createdAt
          ? formatDate(isOrder.createdAt)
          : "00:00 0-0-0000";
        break;
      case OrderStatus.APPROVED:
        timeDisplay = isOrder?.approvedAt
          ? formatDate(isOrder.approvedAt)
          : "00:00 0-0-0000";
        break;
      case OrderStatus.PROCESSING:
        timeDisplay = isOrder?.processingAt
          ? formatDate(isOrder.processingAt)
          : "00:00 0-0-0000";
        break;
      case OrderStatus.SHIPPED:
        timeDisplay = isOrder?.shippedAt
          ? formatDate(isOrder.shippedAt)
          : "00:00 0-0-0000";
        break;
      case OrderStatus.DELIVERED:
        timeDisplay = isOrder?.deliveredAt
          ? formatDate(isOrder.deliveredAt)
          : "00:00 0-0-0000";
        break;
      default:
        break;
    }

    return (
      <div>
        <div className="relative">
          <div
            className={`w-16 h-16 border-4 ${
              isActive ? "border-green-500" : "border-gray-300"
            } rounded-full p-3 flex-shrink-0 order-first ml-5`}
          >
            <img src={getImageUrl(status)} alt="" />
          </div>
          <div
            style={{
              left: getLeftPosition(status),
            }}
            className={`absolute top-1/2 w-[${getWidth(status)}px] h-1 ${
              isActive ? "bg-green-500" : "bg-gray-300"
            } transform -translate-y-1/2`}
          ></div>
        </div>
        <div className="flex flex-col mr-2 items-center">
          <p
            className={`font-bold ${
              isActive ? "text-green-500" : "text-gray-500"
            }`}
          >
            {label}
          </p>
          {timeDisplay && <p className="text-gray-500">{timeDisplay}</p>}
        </div>
      </div>
    );
  }
  function getImageUrl(status) {
    switch (status) {
      case OrderStatus.PENDING:
        return "https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/orders-icon.png";
      case OrderStatus.PROCESSING:
        return "https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/orders-icon.png";
      case OrderStatus.APPROVED:
        return "https://icon-library.com/images/money-order-icon/money-order-icon-14.jpg";
      case OrderStatus.SHIPPED:
        return "https://cdn.iconscout.com/icon/premium/png-256-thumb/successful-delivery-1786644-1522008.png";
      case OrderStatus.DELIVERED:
        return "https://cdn.iconscout.com/icon/premium/png-256-thumb/order-received-3112928-2602187.png?f=webp";
      default:
        return "";
    }
  }

  function getLeftPosition(status) {
    switch (status) {
      case "PENDING":
        return 80;
      case "PROCESSING":
        return 80;
      case "APPROVED":
        return 80;
      case "SHIPPED":
        return 80;
      case "DELIVERED":
        return 0;
      default:
        return 0;
    }
  }

  function getWidth(status) {
    switch (status) {
      case "PENDING":
        return 170;
      case "PROCESSING":
        return 170;
      case "APPROVED":
        return 180;
      case "SHIPPED":
        return 170;
      case "DELIVERED":
        return 0;
      default:
        return 0;
    }
  }

  return (
    <Layout>
      {loadingOrder ? (
        <Loading />
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <div className="page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10">
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
                        <a href="/cart">
                          <span className="mx-1 capitalize">Đơn hàng</span>
                        </a>
                        <span className="sperator">/ {isOrder?.code}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <h1 className="text-2xl font-semibold text-black">
                    Mã Đơn Hàng [{isOrder?.code}]
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div class="max-w-6xl mx-auto">
            <div class="w-full screen-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md flex items-center space-x-4">
              <div class="flex items-center space-x-28 ml-8">
                {getOrderStatus(OrderStatus.PENDING, "Đã đặt hàng")}
                {getOrderStatus(OrderStatus.PROCESSING, "Đã xác nhận đơn")}
                {getOrderStatus(OrderStatus.APPROVED, "Đã giao cho ĐVVC")}
                {getOrderStatus(OrderStatus.SHIPPED, "Đang Giao Hàng")}
                {getOrderStatus(OrderStatus.DELIVERED, "Đã nhận được hàng")}
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
                          Sản phẩm
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          màu sắc
                        </td>

                        <td className="py-4 whitespace-nowrap text-center">
                          giá
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          số lượng
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          Tổng tiền
                        </td>
                        <td className="py-4 whitespace-nowrap text-right w-[114px]" />
                      </tr>
                      {isOrder?.products.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="pl-10 py-4 w-[380px]">
                            <div className="flex space-x-6 items-center">
                              <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
                                <span>
                                  <img
                                    alt="product"
                                    src={item.huydev.images[0].imagePath}
                                    className="w-full h-full object-contain"
                                    sizes="100vw"
                                  />
                                  <noscript />
                                </span>
                              </div>
                              <div className="flex-1 flex flex-col">
                                <p className="font-medium text-[15px] text-qblack">
                                  {item.huydev.nameProduct}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className=" flex justify-center items-center">
                              <span
                                style={{
                                  backgroundColor: item.color,
                                }}
                                className={`w-[20px] h-[20px] block rounded-full`}
                              />
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px] font-normal">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </td>

                          <td className=" py-4">
                            <div className="flex justify-center items-center">
                              <div className="w-[61px] h-[40px] px-[26px] flex items-center border border-qgray-border rounded-md">
                                <div className="flex justify-between items-center w-full">
                                  <span className="text-qblack">
                                    {" "}
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-4">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px]  text-blue-700 font-bold">
                                {formatPrice(
                                  item.price * item.quantity
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[635px] h-[250px] w-full border border-[#EDEDED] px-[30px] py-[26px] mr-auto">
                  <h2 className="text-2xl font-semibold">Địa chỉ nhận hàng</h2>
                  <div className="mt-3">
                    <p className="text-gray-800 text-xl font-bold mb-1">
                      {isOrder?.user.fullname}
                    </p>
                    <p className="text-gray-600  mb-1">
                      Email: {isOrder?.user.email}
                    </p>
                    <p className="text-gray-600  mb-1">
                      (+84): {isOrder?.user.phone}
                    </p>
                    <p className="text-gray-600">
                      Địa chỉ: {isOrder?.address.address},{" "}
                      {
                        wards.find(
                          (commune) => commune.id === Number(isOrder?.address.commune)
                        )?.name
                      }
                      ,{" "}
                      {
                        districts.find(
                          (district) => district.id === Number(isOrder?.address.district)
                        )?.name
                      }
                      ,{" "}
                      {
                        provinces.find((city) => city.id === Number(isOrder?.address.city))
                          ?.name
                      }
                     
                    </p>
                  </div>
                </div>
                <div className="sm:w-[500px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Tổng tiền hàng
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {formatPrice(isOrder?.totalPrice)}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Phí vận chuyển
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {formatPrice(0)}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Vocher của shop
                      </p>
                      <p className="text-[15px] font-medium text-qred">0</p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Thành tiền
                      </p>
                      <p className="text-[18px] font-bold text-blue-700">
                        {formatPrice(isOrder?.totalPrice)}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                  <div className="sub-total mb-3">
                    <div className=" flex justify-between mb-4">
                      <p className="text-[15px] font-medium text-qblack">
                        Phương thức thanh toán
                      </p>
                      <p className="text-[16px] font-bold text-blue-700">
                        {isOrder?.payment.namePayment}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
