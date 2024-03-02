import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Homecard from "../component/Homecard";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import { useSearch } from "../context/SearchContext";
import Slider from "react-slick";
import Banner1 from "../assets/banner1.jpeg";
import Banner2 from "../assets/banner2.jpeg";
import Banner3 from "../assets/banner3.jpeg";
import Ads from "../assets/ad.png";

const Home = () => {
  const { searchResults } = useSearch();
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListvegetables = productData.filter(
    (el) => el.category === "Headphones",
    []
  );
  // console.log(homeProductCartListvegetables);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(4).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [Banner1, Banner2, Banner3];

  return (
    <div className="p-2 md:p-4">
      {searchResults.length && searchResults.length > 0 ? (
        <div>
          <h2>Search Results:</h2>
          <div className="grid grid-cols-12 gap-2 px-32">
            {searchResults.map((el) => (
              <div key={el.id} className="col-span-3">
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="lg:flex py-2">
            <div className="lg:w-1/2">
              <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
                <p className="text-sm font-medium text-slate-900">
                  Bike Delivery
                </p>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                  className="h-7"
                />
              </div>
              <h2 className="text-4xl md:text-7xl font-bold py-3">
                The fastest Delivery in{""}{" "}
                <span className="text-red-900">Your home </span>
              </h2>
              <p className="py-3 text-base">
                .............................................
              </p>
              <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md ">
                Order Now
              </button>
            </div>
            {/* right section */}
            <div className="lg:w-1/2 pr-4 pt-10">
              <Slider {...settings}>
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="">
            <div className="flex w-full items-center">
              <h2 className="font-bold text-2xl text-slate-800 mb-4">
                Hot Sales
              </h2>
            </div>
            <div className="ml-auto flex gap-4 pb-4 w-full justify-end">
              <button
                onClick={preveProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded-2xl"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded-2xl"
              >
                <GrNext />
              </button>
            </div>
          </div>

          <div
            className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideProductRef}
          >
            {homeProductCartListvegetables[0]
              ? homeProductCartListvegetables.map((el) => {
                  console.log({ el });
                  return (
                    <div className="min-w-[280px] max-w-[400px] w-full">
                      <CardFeature
                        key={el._id}
                        id={el?._id}
                        name={el.name}
                        category={el.category}
                        price={el.price}
                        image={el.image}
                      />
                    </div>
                  );
                })
              : loadingArrayFeature.map((el, index) => (
                  <CardFeature
                    loading="loading..."
                    key={index + "cartLoading"}
                  />
                ))}
          </div>

          <div className="py-6">
            <img src={Ads} className="w-full h-96 rounded-lg" alt="Ads" />
          </div>
          <AllProduct heading={"Browse By Category"} />
        </div>
      )}
    </div>
  );
};

export default Home;
