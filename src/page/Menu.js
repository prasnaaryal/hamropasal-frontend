import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";
import review from "../assets/review.png";

const Menu = () => {
  const { filterby } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  console.log({ productDisplay });

  const handleAddCartProduct = (e) => {
    // e.stopPropagation();
    dispatch(addCartItem(productDisplay));
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white p-10 grid grid-cols-12 gap-10">
        <div className="col-span-6 max-w-sm overflow-hidden w-full h-[30.5rem]">
          <img src={productDisplay?.image} className="h-full object-cover" />
        </div>
        <div className="flex flex-col gap-3 col-span-6">
          <div className="flex flex-col gap-1 items-center">
            <h3 className="font-semibold text-black capitalize text-2xl md:text-4xl">
              {productDisplay?.name}
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              {productDisplay?.category}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <img src={review} className="h-5 w-24" alt="review" />
            <p className="text-sm text-slate-300">|</p>{" "}
            <p className="text-sm text-slate-400">125 reviews</p>
          </div>

          <p className="font-semibold md:text-2xl">
            <span className="text-slate-500 ">Rs </span>
            <span>{productDisplay?.price}</span>
          </p>
          <div>
            <p className="text-slate-600 font-medium">Description :</p>
            <p>{productDisplay?.description}</p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              className="bg-yellow-500 px-4 py-2 mt-2 rounded hover:bg-yellow-600 w-full"
              onClick={handleAddCartProduct}
            >
              Add to cart
            </button>
          </div>
          <div className="border rounded mt-6 ">
            <div className="p-6 h-24">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_261_4843)">
                      <path
                        d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 11.8182H11.6667"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.81836 15.4545H8.48503"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 19.0909H11.6667"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4843">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="col-span-10 flex flex-col justify-center">
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-sm">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t-2 p-6 h-24">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_261_4865)">
                      <path
                        d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4865">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="col-span-10 flex flex-col justify-center">
                  <p className="font-semibold text-sm">Return Delivery</p>
                  <p className="text-sm">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
