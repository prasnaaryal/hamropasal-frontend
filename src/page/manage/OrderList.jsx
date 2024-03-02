import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataOrder } from "../../redux/orderSlice"; // Adjust this import path as necessary

const OrderList = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("No token found");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/order/get-all-orders`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const resData = await res.json();
        dispatch(setDataOrder(resData));

        // Check if pidx and orderId are present in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const pidx = urlParams.get("pidx");
        const orderId = urlParams.get("purchase_order_id");
        if (pidx && orderId) {
          const confirmPaymentRes = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/order/confirm-order-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ pidx, orderId }),
            }
          );
          if (!confirmPaymentRes.ok)
            throw new Error("Failed to confirm order payment");
          // Handle success response if needed
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrders();
  }, [dispatch]);

  const orderData = useSelector((state) => state.order.orderList);
  const productData = useSelector((state) => state.product.productList); // Assuming you have this in your Redux state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to find a product's name by its id
  const findProductNameById = (productId) => {
    const product = productData.find((product) => product._id === productId); // Assuming the product ID is stored in "_id" field
    return product ? product.name : "Product not found";
  };

  const findProductImageById = (productId) => {
    const product = productData.find((product) => product._id === productId); // Assuming the product ID is stored in "_id" field
    return product ? product.image : "Product not found";
  };

  if (error) return <div>Error fetching orders: {error}</div>;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">Order List</h1>

      <div className="flex justify-center my-10">
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text text-black uppercase bg-gray-50 dark:bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={index} className={`bg-white border-b`}>
                  <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={findProductImageById(order.products[0].product)} // Assuming product ID is stored in "product" field
                      alt={findProductNameById(order.products[0].product)}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {findProductNameById(order.products[0].product)}
                  </th>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                    Rs {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-amber-500 text-white px-4 py-2 rounded-md disabled:bg-amber-200 disabled:text-gray-400"
        >
          Previous
        </button>

        <span>{currentPage}</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= orderData.length}
          className="bg-amber-500 text-white px-4 py-2 rounded-md disabled:bg-amber-200 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
