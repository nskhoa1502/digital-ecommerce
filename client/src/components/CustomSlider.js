import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "./";
import { useSelector } from "react-redux";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
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
      )}
    </>
  );
};

export default memo(CustomSlider);
