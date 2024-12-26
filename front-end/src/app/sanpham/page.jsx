// import "../globals.css";

// export const metadata = {
//   title: "Sản phẩm",
//   description:
//     "iBook is a book shop that provides you with quality books that help boost your productivity and mood. Having a physical book is great. There is no doubt that you will enjoy these books more than others you have ever tasted.",
// };
"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryChange = (id) => {
    if (id === selectedCategory) {
      setCategoryId(null);
      setSelectedCategory(null);
    } else {
      setCategoryId(id);
      setSelectedCategory(id);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => { 
      let res;
      if (categoryId) {
        res = await fetch(
          `http://localhost:3000/products/category/${categoryId}`
        );
      } else {
        res = await fetch("http://localhost:3000/products");
      }

      
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [categoryId]);

  const categoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  // const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("asc");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products");
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  const handleSort = (products) => {
    return [...products].sort((a, b) => {
      if (sortOption === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  return (
    <div className="container-product">
      <div className="content-product">
        <div className="left-categories">
          <h2 id="show-cate">Categories</h2>
          <div className="bor-left-product">
            <div className="col-left-product">
              <div className="checkbox-cate">
                <div className="group">
                  <input
                    type="checkbox"
                    checked={selectedCategory === null}
                    onChange={() => handleCategoryChange(null)}
                  />
                  <label>All Products</label>
                </div>
                {categories.map((category) => (
                  <div className="group" key={category._id}>
                    <input
                      type="checkbox"
                      checked={selectedCategory === category._id}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <label>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    
        <div className="bor-right-product">
        <select  onChange={handleSortChange}>
            <option value="asc">Price increase</option>
            <option value="desc">Price decrease</option>
          </select>
          <div className="col-right">
            <ProductCard data={handleSort(products)} />
          </div>
        </div>
      </div>
    </div>
  );
}
