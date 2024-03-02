import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import review from "../assets/review.png";
import toast from "react-hot-toast";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleAddCartProduct = (e) => {
    if (isLoggedIn) {
      dispatch(
        addCartItem({
          _id: id,
          name: name,
          price: price,
          category: category,
          image: image,
        })
      );
    } else {
      toast("Please log in to add items to the cart");
    }
  };
  return (
    <div className="w-full h-auto p-4 rounded-lg bg-white  hover:shadow-lg drop-shadow-lg  cursor-pointer flex flex-col">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="flex flex-col gap-4">
              <img
                src={image}
                className="w-full object-cover h-52 rounded-lg "
              />
              <div className="flex flex-col gap-3">
                {/* <p className=" text-slate-500 text-xs font-medium">
                    {category}
                  </p> */}
                <div>
                  <h3 className="font-semibold text-black  capitalize text-lg whitespace-nowrap overflow-hidden">
                    {name}
                  </h3>
                  <p className=" font-bold">
                    <span className="text-slate-500">Rs</span>{" "}
                    <span>{price}</span>
                  </p>{" "}
                </div>
                <div className="flex gap-2 items-center">
                  <img src={review} className="h-5 w-24" alt="review" />
                  <p className="text-sm text-slate-300">|</p>{" "}
                  <p className="text-sm text-slate-400">125 reviews</p>
                </div>
              </div>
              <button
                className="bg-yellow-500 py-2 rounded-lg hover:bg-yellow-600 hover:bg-yellow-600 w-full"
                onClick={handleAddCartProduct}
              >
                Add cart
              </button>
            </div>
          </Link>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
