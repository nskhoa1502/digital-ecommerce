import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis";
import { ProductCard } from "./";

const FeaturedProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const res = await apiGetProducts({
      limit: 9,
      totalRatings: 5,
    });
    // console.log(res.data.response);
    setProducts(res.data.response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el?._id}
            img={el?.thumb}
            title={el?.title}
            totalRatings={el?.totalRatings}
            price={el?.price}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[50%] "
        />

        <div className="flex flex-col justify-between w-[23%]">
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
            className=" h-[49%]"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
            className=" h-[49%]"
          />
        </div>
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-[25%] "
        />
      </div>
    </div>
  );
};

export default FeaturedProduct;
