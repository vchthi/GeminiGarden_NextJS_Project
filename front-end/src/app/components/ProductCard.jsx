
"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import React from "react";
import Link from "next/link";

function ProductCard(props) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <>
      {props.data.map((product) => {
        const { _id, name, image, price,category, categoryName } = product;
        return (
          <div className="product-box">
            <div className="product-bg">
              <div className="add-cart" onClick={() => dispatch(addToCart({ item: product, quantity: quantity }))}>
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <Link href={`/chitietsanpham/${_id}`}  style={{ textDecoration: "none" }}>
              <div className="img-plant">
                <img src={`http://localhost:3000/images/${product.image}`} />
              </div></Link>
            </div>
            <div className="product-bottom">
              <div className="infor-product">
                <p id="category-pro">{category.categoryName}</p>
                <p id="name-pro">{name}</p>
                <p id="price-pro">{price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
