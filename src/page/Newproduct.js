import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from "react-hot-toast";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  //for image
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("enter required fields");
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl">Add New Product</h1>
      <form
        className="m-auto w-full max-w-xl shadow flex flex-col gap-4  px-6 py-8 bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type={"text"}
            name="name"
            className="bg-slate-200 p-2 rounded-lg"
            onChange={handleOnChange}
            value={data.name}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            className="bg-slate-200 p-2 rounded-lg"
            id="category"
            name="category"
            onChange={handleOnChange}
            value={data.category}
          >
            <option value={"other"}>Select Category</option>
            <option value={"Fruits"}>Fruits</option>
            <option value={"Vegetable"}>Vegetable</option>
            <option value={"Icecream"}>Icecream</option>
            <option value={"Dosa"}>Dosa</option>
            <option value={"Laptop"}>Laptop</option>
            <option value={"Bag"}>Bag</option>
            <option value={"Bottle"}>Bottle</option>
            <option value={"Clothes"}>Clothes</option>
            <option value={"Phone"}>Phone</option>
            <option value={"PC"}>PC</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image">
            Image
            <div className="h-40 w-full bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer">
              {/* conditions for image */}
              {data.image ? (
                <img src={data.image} className="h-full" />
              ) : (
                <span className="text-5xl">
                  <BsCloudUpload />
                </span>
              )}

              <input
                type={"file"}
                accept="image/*"
                id="image"
                onChange={uploadImage}
                className="hidden"
              />
            </div>
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Price </label>
          <input
            type={"text"}
            className="bg-slate-200 p-2 rounded-lg"
            name="price"
            onChange={handleOnChange}
            value={data.price}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description </label>
          <textarea
            rows={3}
            className="bg-slate-200 p-2 resize-none rounded-lg"
            name="description"
            onChange={handleOnChange}
            value={data.description}
          />
        </div>

        <button className="w-full max-w-[200px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-2 rounded-full mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
