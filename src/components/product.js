import React, { useState, useContext } from "react";
import { PackContext } from "./contexProvider";
import InputField from "../layout/InputField";

const Product = () => {
  const { products } = useContext(PackContext);

  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filterProducts = (data) => {
    return data.filter((item) => {
      const lowerCaseQuery = query.toLowerCase();
      const priceInRange =
        (!minPrice || item.price >= parseFloat(minPrice)) &&
        (!maxPrice || item.price <= parseFloat(maxPrice));
      const ratingInRange =
        (!minRating || item.rating.count >= parseFloat(minRating)) &&
        (!maxRating || item.rating.count <= parseFloat(maxRating));

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((selectedCategory) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

      return (
        item.title.toLowerCase().includes(lowerCaseQuery) &&
        priceInRange &&
        ratingInRange &&
        categoryMatch
      );
    });
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="container mx-auto p-4 flex">
      {/* Filtered content on the left (1/4 of the width) */}
      <div className="w-1/4 pr-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          {Array.from(new Set(products.map((item) => item.category))).map(
            (category, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <label className="text-left">{category}</label>
              </div>
            )
          )}
        </div>
        <h3 className="text-lg font-semibold mt-4">Price Range</h3>
        <div className="flex">
          <InputField
            type="number"
            placeholder="Min Price"
            onChange={setMinPrice}
            className="mr-2"
          />
          <InputField
            type="number"
            placeholder="Max Price"
            onChange={setMaxPrice}
            className="ml-2"
          />
        </div>
        <h3 className="text-lg font-semibold mt-4">Rating Range</h3>
        <div className="flex">
          <InputField
            type="number"
            placeholder="Min Rating"
            onChange={setMinRating}
            className="mr-2"
          />
          <InputField
            type="number"
            placeholder="Max Rating"
            onChange={setMaxRating}
            className="ml-2"
          />
        </div>
      </div>

      {/* Product display on the right (3/4 of the width) */}
      <div className="w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterProducts(products).map(({ title, price, rating }, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md p-4">
              <p className="text-xl font-bold mb-2">{title}</p>
              <p className="text-gray-700 mb-2">${price}</p>
              <p className="text-gray-700 mb-2">Rating: {rating.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
