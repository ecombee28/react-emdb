import { Link } from "react-router-dom";
import searchStyles from "../styles/Search.module.css";

export default function CollectionComponent({
  dataObj,
  image,
  backColor,
  alt,
}) {
  return (
    <>
      <Link to={"/search/collections"} state={{ data: dataObj }}>
        <div
          className={`${searchStyles.search_posters} ${searchStyles.explore_posters} ${backColor}`}
        >
          <img
            src={image}
            alt={alt}
            className={`${searchStyles.explore_img} ${
              dataObj.name === "DC" && searchStyles.dc_img
            }`}
          />
          <p className={searchStyles.explore_text}>Movie Collection</p>
        </div>
      </Link>
    </>
  );
}
