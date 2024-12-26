'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const router = useRouter(); 
  const cartCount = cartItems.reduce(
    (count, item) => count + Number(item.quantity),
    0
  );
  useEffect(() => {
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
     
    }
  }, []);

  
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <img src="/images/gemini.png" alt="Gemini Logo" />
        </Link>
      </div>
      <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/sanpham">Shop</Link>
        
        <Link href="/giohang">
          Cart <span id="amount-cart">{cartCount}</span>
        </Link>
        {isLoggedIn  ? (
          <>
          
              <Link href="/info">Information</Link>
          
          
          
          </>
        ) : (
          <>
         <Link href="/dangnhap">Login</Link>
         <Link href="/dangky">Sign Up</Link>
          </>
        )}
     
      </nav>
      <form className="search-form" action="/search">
        <input
          type="text"
          name="name"
          className="search-input"
          placeholder="Search..."
        />
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </header>
  );
}

