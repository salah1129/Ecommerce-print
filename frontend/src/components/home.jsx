import Header from "./header";
import LandingPage from "./landingPage";
import Footer from "./footer";
import { Link } from "react-router-dom";
const Home = () => {
    return ( 
        <Link to={"/"}>
        <div className="home">
            <Header/>
            <LandingPage/>
            <Footer/>
        </div>
        </Link>
        
     );
}
 
export default Home;