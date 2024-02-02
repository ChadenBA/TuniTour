import React from "react";
import Slider from "react-slick";
import EndroitCard from "../../components/adminComponent/endroit";
import { useMediaQuery } from "react-responsive";

const EndroitList = ({ endroits }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 992 });
  const isMediumScreen = useMediaQuery({ minWidth: 990, maxWidth: 520 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  let slidesToShow
  if (isMediumScreen) {
    slidesToShow = 2;
  } else if (isSmallScreen) {
     slidesToShow = 1;
  }else if (isLargeScreen) {
     slidesToShow = 4;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="placeList-slick-slider">
      {endroits.map((item) => (
        <EndroitCard key={item._id} endroit={item} />
      ))}
    </Slider>
  );
};

export default EndroitList;
