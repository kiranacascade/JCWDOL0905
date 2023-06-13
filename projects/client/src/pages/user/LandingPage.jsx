import NavBar from "../../component/NavBar";
import Delivered from "../../component/Delivered";
import Carousel from "../../component/StaticBanner";
import Footer from "../../component/Footer";
import Suggested from "../../component/ProductSuggestion";
import { Category } from "../../component/category";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_GEO } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { setUsrLocation } from "../../redux/locationSlice";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";

const LandingPage = () => {
  const userLocation = useSelector(
    (state) => state.locationSlice.value.usrLocation
  );
  const userLat = useSelector((state) => state.locationSlice.value.usrLat);
  const userLng = useSelector((state) => state.locationSlice.value.usrLng);
  const user = useSelector((state) => state.userSlice)

  const currentLocation = { userLocation, userLat, userLng };

  const branchId = useSelector(
    (state) => state.branchSlice.branchId
  );

  const dispatch = useDispatch();

  const [branchs, setBranch] = useState([]);
  const [address, setAddress] = useState([]);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          console.log("Accuracy :", position.coords.accuracy);
          const urlGetLocation = `${URL_GEO}&q=${position.coords.latitude}%2C+${position.coords.longitude}`;
          const response = await axios.get(urlGetLocation);

          dispatch(
            setUsrLocation({
              usrLat: position.coords.latitude,
              usrLng: position.coords.longitude,
              usrLocation: response.data.results[0].components.city || response.data.results[0].components.county || response.data.results[0].components.municipality || response.data.results[0].formatted || "...",
            })
          );
        },
        (error) => console.log(error),
        { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true }
      );
    }
    getLocation();
  }, [user, branchId]);

  useEffect(() => {
    async function fetchData() {
      try{
        const responseBranch = await api.get(`branch`);
        const responseAddress = await api.get(`address/${user.id}`);
        const responseProduct = await api.get(`suggest/${branchId}`);
        const branchsData = responseBranch.data.data;
        const addressData = responseAddress.data.data;
        const productData = responseProduct.data.results;

        setBranch(branchsData);
        setAddress(addressData);
        setProduct(productData);
      }catch(error){
        toast.error("Fetch data failed");
      }
    }
    fetchData();
  }, [user, branchId]);

  return (
    <div>
      <NavBar />
      <Delivered
        currentLocation={currentLocation}
        branchsData={branchs}
        addressData={address}
      />
      <Carousel />
      <div className="mx-auto max-w-2xl py-1 px-4 sm:py-8 sm:px-6 md:max-w-4xl md:px-6 md:py-6 lg:max-w-7xl lg:px-8 md:py-6 bg-neutral-100">
        <Category/>
      </div>
      <Suggested productsData={products} />
      <Footer />
    </div>
  );
 
};

export default LandingPage;
