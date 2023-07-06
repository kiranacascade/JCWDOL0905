import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Suggested(props) {

  const productsData = props.productsData;

  function checkDiscount(item){
    const today = new Date()
    const start = new Date(item.start_date)
    const end = new Date(item.end_date)

    if(start <= today && end >= today){
      if(item.discount_type == 'percentage' || item.discount_type == 'amount'){
        return true
      }
    }

    return false
  }

  function showDiscount(item){
    if(item.discount_type == 'amount'){
      return item.product_price - item.discount_value
    } else if(item.discount_type == 'percentage'){
      return item.product_price - (item.discount_value/100 * item.product_price)
    }
  }

  const settings = {
    // fade: true,
    dots: false,

    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <>
          <Slider {...settings}>
            {productsData.map((product) => (
              <a href={`product/${product.id}`}>
                <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white drop-shadow-md">
                <div className=" bg-gray-200 group-hover:opacity-75 sm:aspect-none">
                  <div className="square-image-container">
                    <img src={product.product_image} alt={product.product_name} className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-4 py-3">
                  <h3 className="text-md font-medium text-gray-900 my-1">
                    {product.product_name}
                  </h3>

                  <p className="text-md text-gray-500 my-1">{product.weight} gram</p>

                  {checkDiscount(product) ?
                    <div>
                      <div className="flex">
                        <p className=" text-sm font-bold text-red-400 line-through flex-none mr-2">{rupiah(product.product_price)}</p>
                        <p className=" text-sm font-bold text-green-600 flex-none">{rupiah(showDiscount(product))}</p>
                      </div>
                      {/* <div className="flex flex-1 flex-col justify-end">
                        <p className=" text-sm font-bold text-green-600">{rupiah(product.product_price)}</p>
                      </div> */}
                    </div>
                    : 
                    <div className="flex flex-1 flex-col justify-end">
                      <p className=" text-sm font-bold text-green-600">{rupiah(product.product_price)}</p>
                    </div>
                  }
                </div>
              </div>
              </a>
            ))}
          </Slider>
    </>
  );
}
