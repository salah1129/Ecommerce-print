import "../styles/landingPage.css"
import { Link } from "react-router-dom";
const LandingPage = () => {
    return ( 
        <div className="landingPage">
            <h1>landing page</h1>
            <Link to={"/products"}>
            <button>products</button>
            </Link>
        </div>
     );
}

export default LandingPage;