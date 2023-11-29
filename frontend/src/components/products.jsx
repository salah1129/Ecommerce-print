// products.jsx :
import "../styles/products.css"
import { Link } from "react-router-dom";
const Products = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.jpg)`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
  };
    return ( 
      <Link to={"/products"}>
      <div id="productsPage">
          <div className="head" style={backgroundImageStyle}>
              <h1>Your One-Stop Printing Solution</h1>
              <h3>Elevate your brand with high-quality, customized printing services.</h3>
          </div>
          <div className="categories">
            <Link to={"/products/cards"}>
            <button>Cards</button>
            </Link>
          </div>
        </div>
      </Link>
     );
}
export default Products;
