import React from "react";
import Slider from "react-slick";
import CityCard from "../../components/adminComponent/city";


const CityList = ({ cities }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show four cards at a time
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="cityList-slick-slider">
      {cities.map((item) => (
        <CityCard key={item._id} city={item} />
      ))}
    </Slider>
  );
};

export default CityList;
