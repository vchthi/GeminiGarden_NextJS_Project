"use client";
import { usePathname } from 'next/navigation'; 
import Header from "../header"; import Footer from "../footer";
const LayoutWrapper = ({ children }) =>{
const pathname = usePathname () ;
const noLayoutPages = ['/admindanhmuc','/adminsanpham','/capnhatdanhmuc','/capnhatsanpham','/themsanpham','/themdanhmuc'];
const isNoLayoutPage = noLayoutPages.includes (pathname) ;
return (
  <div>
    {!isNoLayoutPage && <Header/>}
    {children}
    {!isNoLayoutPage && <Footer/>}
  </div>
)
}
export default LayoutWrapper;