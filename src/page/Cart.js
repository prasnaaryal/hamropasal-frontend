import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);

  return (
    <div className="p-2 md:p-4 min-h-[270px] h-full bg-white">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart items
      </h2>

      {productCartItem.length > 0 ? (
        <div className="my-10">
          {/* displaying cart items */}
          <div className="w-full">
            <div className="grid grid-cols-12 w-full py-6 border-b-2">
              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Product</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Name</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Price</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Quantity</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">SubTotal</p>
              </div>

              <div className="col-span-2 flex items-center w-full justify-center">
                <p className="font-semibold  w-full text-center ">Remove</p>
              </div>
            </div>
            {productCartItem.map((el) => {
              return (
                <div>
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                </div>
              );
            })}
          </div>

          {/* total cart items */}

          <div className=""></div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg text-gray-600">No items added</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
