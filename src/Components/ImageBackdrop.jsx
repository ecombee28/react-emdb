import style from "../styles/ImageBackdrop.module.css";
import ImagePaths from "../lib/ImagePaths";

export default function ImageBackdrop({ movie }) {
  return (
    <div className={style.backdrop}>
      <img
        src={`${ImagePaths.original}${movie.backdrop_path}`}
        className={style.img}
        alt="backdrop"
      />
    </div>
  );
}
