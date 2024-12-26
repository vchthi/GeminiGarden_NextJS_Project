import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="row-footer">
        <div className="col">
          <div id="tieude-footer">
            <img src="/images/gemini.png" alt="Gemini Logo" />
          </div>
        </div>
        <div className="col">
          <h3 id="tieude-footer">Policy</h3>
          <ul>
            <li><Link href="#">Return and Exchange Policy</Link></li>
            <li><Link href="#">Warranty Policy</Link></li>
            <li><Link href="#">Incentive Policy</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col">
          <h3 id="tieude-footer">About</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/sanpham">Products</Link></li>
            <li><Link href="/dangnhap">Login</Link></li>
            <li><Link href="/dangky">Sign Up</Link></li>
          </ul>
        </div>
        <div className="col">
          <h3 id="tieude-footer">Contact</h3>
          <ul>
            <li><Link href="#">+1 555-0100</Link></li>
            <li><Link href="#">something@temp-mail.org</Link></li>
            <li><Link href="#">your-username.github.io/your-repo</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
