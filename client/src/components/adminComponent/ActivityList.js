import React, { useEffect } from "react";
import Slider from "react-slick";
import ActivityCard from "../../components/adminComponent/activity";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiviy } from "../../redux/apiCalls/activityApiCall";


const ActivityList = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.activities);

  useEffect(() => {
    dispatch(fetchActiviy());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="activity-slick-slider">
      {activities.map((item) => (
        <ActivityCard key={item.id} activity={item} />
      ))}
    </Slider>
  );
};

export default ActivityList;
