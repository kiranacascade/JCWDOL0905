import NavBar from "../../component/NavBar";
import Delivered from "../../component/Delivered";
import Carousel from "../../component/StaticBanner";
import Footer from "../../component/Footer";


const LandingPage = () => {
  return (
    <div>
      <NavBar/>
      <Delivered/>
      <Carousel/>
      <Footer/>
    </div>
  );
};

export default LandingPage;