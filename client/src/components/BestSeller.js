import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import { CustomSlider } from "./";
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../store/thunks/productThunks";

const tabs = [
  {
    id: 1,
    name: "best seller",
  },
  { id: 2, name: "new arrival" },
  { id: 3, name: "tablet" },
];

const BestSeller = () => {
  const [bestSeller, setBestSellers] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);
  const { newProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiGetProducts({ sort: "-sold" });

        setBestSellers(response?.data?.response);
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
    dispatch(getNewProducts());
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
        <CustomSlider products={products} activeTab={activeTab} />{" "}
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
