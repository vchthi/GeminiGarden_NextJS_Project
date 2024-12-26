

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
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

  return (
    <>
      <div className="banner">
        <img src="#" alt="" />
        <h1>Gemini Garden</h1>
        <h3>Find Your Favorite Plants Here.</h3>
        <p id="welcome">
          We have a wide variety of beautiful
          <br /> and good plant collections to beautify
          <br /> your home.{" "}
        </p>

        <Link href="sanpham">
          <button id="btn-banner">Shop</button>
        </Link>
      </div>
      <div className="container">
        <div className="category">
          <p className="tieude">Our categories</p>
          <p className="in4-tieude">Find what you are looking for</p>
          <div className="show-all-category">
            {categories.map((category) => (
              <Link
                href={`/sanpham`}
                key={category._id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="category-box"
                  onClick={() => handleCategoryChange(category._id)}
                >
                  <Image
                    id="img"
                    src={`/images/${category.image}`}
                    alt="Natural Plants"
                    width={500}
                    height={300}
                  />
                  <p id="name-cate">{category.name}</p>
                  <p id="description-cate">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="stories">
          <p className="tieude">Our Stories</p>
          <p className="in4-tieude">Find what you are looking for</p>
          <div className="show-all-stories">
            <div className="story-1">
              <img src="/images/banner2.jpg" alt="Story 1" />
            </div>
            <div className="story-2">
              <img id="img-1" src="/images/story2.png" alt="Story 2.1" />
              <img id="img-2" src="/images/story3.png" alt="Story 2.2" />
            </div>
          </div>
        </div>

        <div className="product">
          <p className="tieude">All Products</p>
          <p className="in4-tieude">All products for you</p>
          <div className="show-all-product">
            <ProductCard data={products} />
          </div>
        </div>

        <div className="about-us">
          <p className="tieude">About Us</p>
          <p className="in4-tieude">
            Order now and appreciate the beauty of nature
          </p>
          <div className="about-us-box">
            <div className="box-aboutus mr20">
              <div className="img-about">
                <img src="/images/plant.jpg" alt="Large Assortment" />
              </div>
              <p className="name-aboutus">Large Assortment</p>
              <p className="in4-aboutus">
                We offer many different types of products with fewer variations
                in each category.
              </p>
            </div>
            <div className="box-aboutus mr20">
              <div className="img-about">
                <img src="/images/box.jpg" alt="Fast & Free Shipping" />
              </div>
              <p className="name-aboutus">Fast & Free Shipping</p>
              <p className="in4-aboutus">
                4-day or less delivery time, free shipping and an expedited
                delivery option.
              </p>
            </div>
            <div className="box-aboutus mr20">
              <div className="img-about">
                <img src="/images/phone.jpg" alt="24/7 Support" />
              </div>
              <p className="name-aboutus">24/7 Support</p>
              <p className="in4-aboutus">
                Answers to any business-related inquiry 24/7 and in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
