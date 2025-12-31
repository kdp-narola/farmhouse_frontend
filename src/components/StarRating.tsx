import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const StarRating = ({ star }) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const floatIndex = index + 0.5;
    return (
      <div key={index}>
        {star >= index + 1 ? (
          <FaStar color="#ffbc0b" />
        ) : star >= floatIndex ? (
          <FaStarHalfAlt color="#ffbc0b" />
        ) : (
          <AiOutlineStar color="#ffbc0b" />
        )}
      </div>
    );
  });
  return <div style={{ display: "flex" }}>{ratingStar}</div>;
};

export default StarRating;