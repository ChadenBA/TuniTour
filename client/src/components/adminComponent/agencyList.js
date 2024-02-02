import React from "react";
import Slider from "react-slick";
import AgencyCard from "../../components/adminComponent/agency";

import "../../Styles/agency.css"
const AgencyList = ({ agencies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show four cards at a time
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="agency-slick-slider">
      
      {agencies.map((item) => (
        <AgencyCard key={item._id} agency={item} />
      ))}
    </Slider>
  );
};

export default AgencyList;
