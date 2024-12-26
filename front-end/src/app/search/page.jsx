import React from "react";
import ProductCard from "../components/ProductCard";

export const metadata = {
  title: "Sản phẩm",
  description:
    "iBook is a book shop that provides you with quality books that help boost your productivity and mood. Having a physical book is great. There is no doubt that you will enjoy these books more than others you have ever tasted.",
};

export default async function search(params) {
  const { searchParams } = params;
  console.log(searchParams);

  const res = await fetch(
    `http://localhost:3000/products/search/${searchParams.name}`
  );
  const productSearch = await res.json();

  return (
    <div className="container-product">
      <div className="content-product">
        <div className="left-categories">
          <h2 id="show-cate">Search Products</h2>

          <div className="bor-left-product">
            <div className="col-left-product">
              <div className="checkbox-cate">
                
              </div>
            </div>
          </div>
        </div>

        <div className="bor-right-product">
          <h3 id="result-search">
          Search results for keyword: {searchParams.name}
          </h3>
          <div className="col-right" style={{  marginTop:"50px"}}>
            <ProductCard data={productSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
