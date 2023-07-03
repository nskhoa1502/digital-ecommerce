import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";

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
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const fetchProducts = async () => {
    try {
      const response = await Promise.all([
        apiGetProducts({ sort: "-sold" }),
        apiGetProducts({ sort: "-createdAt" }),
      ]);

      setBestSellers(response[0].data.response);
      setNewProducts(response[1].data.response);
      //   console.log(response);
      //   console.log(bestSeller);
      //   console.log(newProducts);
    } catch (error) {
      console.error(error.response.data);
    }
    // console.log({ , newProducts });
    // if(response[0])
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex text-[20px] pb-4 gap-8 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize border-r border-black text-gray-400 cursor-pointer ${
              activeTab === el.id ? "text-black" : ""
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
