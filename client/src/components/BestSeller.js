import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import { Product } from "../components";
import Slider from "react-slick";

const tabs = [
  {
    id: 1,
    name: "best seller",
  },
  { id: 2, name: "new arrival" },
  { id: 3, name: "tablet" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSeller, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Promise.all([
          apiGetProducts({ sort: "-sold" }),
          apiGetProducts({ sort: "-createdAt" }),
        ]);

        setBestSellers(response[0]?.data?.response);
        setNewProducts(response[1]?.data?.response);
        //   console.log(response);
        //   console.log(bestSeller);
        //   console.log(newProducts);
      } catch (error) {
        console.error(error?.response?.data || "Could not connect to server");
      }
      // console.log({ , newProducts });
      // if(response[0])
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (bestSeller && newProducts) {
      if (activeTab === 1) setProducts(bestSeller);
      if (activeTab === 2) setProducts(newProducts);
    }
  }, [activeTab, bestSeller, newProducts]);

  return (
    <div>
      <div className="flex text-[20px]  mx-[-32px] ">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase border-r px-8 border-black cursor-pointer ${
              activeTab === el.id ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-20px]  border-t-2 border-main">
        {" "}
        <Slider {...settings}>
          {products?.map((el) => (
            <React.Fragment key={el?._id}>
              <Product
                productData={el}
                isNew={activeTab === 1 ? false : true}
                pid={el?._id}
              />
            </React.Fragment>
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-4 justify-between">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;
