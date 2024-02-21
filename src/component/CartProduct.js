import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  deleteCartItem,
  increaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-2 flex items-center w-full justify-center">
            <div className="p-3 bg-white rounded overflow-hidden">
              <img src={image} className="h-28 w-40 object-cover" />
            </div>
          </div>

          <div className="col-span-2 flex items-center w-full justify-center">
            <h3 className="font-semibold text-slate-600 text-center capitalize text-lg md:text-xl">
              {name}
              <span>
                <p className="text-slate-500 font-medium text-xs">{category}</p>
              </span>
            </h3>
          </div>

          <div className="col-span-2 flex items-center w-full justify-center">
            <p className="font-bold text-base">
              <span className="text-red-500">Rs</span>
              <span>{price}</span>
            </p>
          </div>
          <div className="col-span-2 flex items-center w-full justify-center">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => dispatch(increaseQty(id))}
                  className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
                >
                  <TbPlus />
                </button>
                <p className="font-semibold p-1">{qty}</p>

                <button
                  className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
                  onClick={() => dispatch(decreaseQty(id))}
                >
                  <TbMinus />
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex items-center w-full justify-center">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <p>
                {" "}
                <span className="text-red-500">Rs</span>
                {total}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-center w-full justify-center">
            <div
              className="cursor-pointer text-slate-700 hover:text-red-500"
              onClick={() => dispatch(deleteCartItem(id))}
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
