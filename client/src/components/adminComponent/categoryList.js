import React from "react";
import Slider from "react-slick";
import CategoryCard from "./category";


const CategoryList = ({ categories }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show four cards at a time
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="category-slick-slider">
      {categories.map((item) => (
        <CategoryCard key={item._id} category={item} />
      ))}
    </Slider>
  );
};

export default CategoryList;
