"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/redux/slices/cartslice";
import { useMemo } from "react";
import "../globals.css";
import Link from "next/link";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart?.items) || [];
  console.log(cartItems);
  const dispatch = useDispatch();

  const total = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="container-cart">
      <div className="content-cart">
        <div className="box-left">
          <table id="table-cart">
            <thead>
              <tr>
                <th id="th-cart">ID</th>
                <th id="th-cart">Image</th>
                <th id="th-cart">Name</th>
                <th id="th-cart">Price</th>
                <th id="th-cart">Quantity</th>
                <th id="th-cart">Total</th>
                <th id="th-cart">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item._id}>
                  <td id="td-cart" >{index + 1}</td>
                  <td id="td-cart">
                  <img style={{ width: "50px" }} src={`http://localhost:3000/images/${item.image}`} />
                  </td>
                  <td id="td-cart">{item.name}</td>{" "}
                  <td id="td-cart">{item.price}</td>
                  <td id="td-cart">
                    <input
                      type="number"
                      className="qty"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateCartItemQuantity({
                            _id: item._id,
                            quantity: parseInt(e.target.value),
                          })
                        )
                      }
                    />
                  </td>
                  <td id="td-cart">{item.price * item.quantity}</td>{" "}
                  <td id="td-cart">
                    <button
                      className="delPro"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                     Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginLeft: "15px" }} className="box-right">
          
          <div className="total">
          <label htmlFor="voucher-code">Voucher</label>
            <br />
            <input
              className="inp-text"
              type="text"
              id="voucher-code"
              placeholder="Voucher"
            />
            <button className="but-apply" type="submit">
              Submit
            </button>
            <div style={{ marginBottom: "10px" }}>
              <span>Voucher: </span>
              <span style={{ float: "right" }}>0</span>
              <br />
            </div>
            <div style={{ marginBottom: "10px" }}>
              
              <span>Total payment: </span>
              <span id="sumMoney" style={{ float: "right" }}>
                {total}
              </span>
              <br />
            </div>
      
          </div>
        </div>
      </div>

      <div className="btn-choice">
        <button className="btn-shop" onClick={() => dispatch(clearCart())}>
          <i className="fa-solid fa-angle-left"></i> Remove all
        </button>

        <Link href="thanh_toan">
          <button className="btn-check">
            Payment <i className="fa-solid fa-chevron-right"></i>
          </button>
        </Link>
      </div>
      <div style={{ marginBottom: "30px" }} className="foot">
        <i className="fa-solid fa-truck-fast"></i> Free shipping this week
    
      </div>
    </div>
  );
}
