import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { BsCloudUpload } from "react-icons/bs";

const EditProduct = () => {
  const categoryData = useSelector((state) => state.category.categoryList);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("Product fetch failed");
        const productData = await response.json();
        setProduct({
          name: productData.name,
          category: productData.category,
          image: productData.image,
          price: productData.price,
          description: productData.description,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");
      toast.success("Product updated successfully");
      navigate("/manage/products");
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl">Edit Product</h1>
      <form
        className="m-auto w-full max-w-xl shadow flex flex-col gap-4 px-6 py-8 bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="bg-slate-200 p-2 rounded-lg"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            className="bg-slate-200 p-2 rounded-lg"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categoryData.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image">Image</label>
          <div className="h-40 w-full bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer">
            {product.image ? (
              <img src={product.image} alt="Product" className="h-full" />
            ) : (
              <BsCloudUpload className="text-5xl" />
            )}
            {/* Image upload input */}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            className="bg-slate-200 p-2 rounded-lg"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={3}
            className="bg-slate-200 p-2 resize-none rounded-lg"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full max-w-[200px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-2 rounded-full mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
