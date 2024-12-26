"use client";
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import "../../globals.css";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/products/detail/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });
  const { data: relatedproduct } = useSWR(
    `http://localhost:3000/products/related/${params.id}/related`,
    fetcher,
    {
      refreshInterval: 6000,
    }
  );
  if (error) return <div>Failed to load product</div>;
  if (isLoading || !product) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row-content" id="showDetail">
        <div className="row-left">
          <img src={product.image_detail || product.image} alt={product.name} />
          <br />
        </div>
        <div className="row-right">
          
          <h3 id="name">{product.name}</h3>
          <div className="price_detail">
            <span id="price">{product.price}</span>
          </div>
          <p style={{ marginTop: "30px" }} id="description">
            {product.description}
          </p>
          <div className="quantity">
            <input
              className="number"
              type="number"
              min="1"
              max="100"
      
              value={quantity} onChange={(e) => setQuantity(e.target.value)}   />
          </div>
          <button type="submit" className="btn-cart" onClick={() => dispatch(addToCart({ item: product, quantity: quantity }))}>
            Add to cart
          </button>
        </div>
      </div>
      <div className="product">
        <p className="tieude">Related Products</p>
        <p className="in4-tieude">Related products for you</p>
        <div className="show-all-product">
        {relatedproduct ? (
            relatedproduct.map((product) => (
          <div className="product-box" key={product._id}>
            <div className="product-bg">
              <div className="add-cart">
                <i className="fa-solid fa-basket-shopping"></i>
              </div>
              <Link href={`/chitietsanpham/${product._id}`}  style={{ textDecoration: "none" }}>
                <div className="img-plant">
                <img src={`http://localhost:3000/images/${product.image}`} />
                </div></Link>
        
            </div>
            <div className="product-bottom">
              <div className="infor-product">
                <p id="category-pro">{product.category.categoryName}</p>
                <p id="name-pro">{product.name}</p>
                <p id="price-pro">{product.price}</p>
              </div>
            </div>
          </div>  ))
          ) : (
            <div>Không có</div>
          )}
        </div>
      </div>
    </div>
  );
}
