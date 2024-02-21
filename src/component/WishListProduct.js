import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteWishList } from "../redux/productSlice";

const WishListProduct = ({ id, name, image, category, price }) => {
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
            <div
              className="cursor-pointer text-slate-700 hover:text-red-500"
              onClick={() => dispatch(deleteWishList(id))}
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListProduct;
