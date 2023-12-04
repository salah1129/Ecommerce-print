// products.jsx :
import "../styles/products.css"
import { Link } from "react-router-dom";
import Header from "./header"
import Footer from "./footer";
const Products = () => {
  const backgroundImageStyle = {
    backgroundColor : "gray",
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
  };
    return ( 
      <Link to={"/products"}>
        <Header />
      <div id="productsPage">
          <div className="head" style={backgroundImageStyle}>
              <h1>Your One-Stop Printing Solution</h1>
              <h3>Elevate your brand with high-quality, customized printing services.</h3>
          </div>
          <div className="categories">
            <div className="cards">
              <img src="/images/cards/backgroundCategory.jpg" alt="" />
              <div className="caption">
                <h1>custom-printed cards</h1>
                <p>Elevate your sentiments with our custom-printed cards. From heartfelt greetings to stylish invitations, make each message memorable with our quality printing. Celebrate moments, share joy, and leave a lasting impression with our diverse range of beautifully crafted cards.</p>
                <Link to={"/products/cards"}>Show products</Link>
              </div>
            </div>
          </div>
        </div>
         <Footer />
      </Link>
     );
}
export default Products;
