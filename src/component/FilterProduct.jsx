import React from "react";
import { BiCategoryAlt } from "react-icons/bi";

const FilterProduct = ({ category, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="flex text-3xl p-5 border-2 border-gray-300 hover:bg-yellow-500 rounded-lg cursor-pointer">
        <BiCategoryAlt className="w-12" />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
