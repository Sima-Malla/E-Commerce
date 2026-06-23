import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <VerticalCardProduct category={"men's shoes"} heading={"Men's Shoes"} />
      <VerticalCardProduct
        category={"women's shoes"}
        heading={"Popular Women's Shoes"}
      />

      <VerticalCardProduct category={"kids' shoes"} heading={"Kids' Shoes"} />
      <VerticalCardProduct category={"sports"} heading={"Sports Shoes"} />
      <VerticalCardProduct category={"boots"} heading={"Boots"} />
      <VerticalCardProduct
        category={"formal & office wear"}
        heading={"Formal & Office wears Shoes"}
      />
      <VerticalCardProduct
        category={"sandals & slippers"}
        heading={"Sandals & Slippers"}
      />
    </div>
  );
};

export default Home;
