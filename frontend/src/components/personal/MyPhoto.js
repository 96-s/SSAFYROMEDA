import PhotoItem from "./PhotoItem";
import { useSelector } from "react-redux";

const MyPhoto = () => {
    const photoHistory = useSelector((state) => state.gameHistory.photo);
    
    return (
      <div>
        {photoHistory.map((photo) => (
          <PhotoItem
            key={photo.id}
            id={photo.id}
            img={photo.img}
            date={photo.date}
            description={photo.description}
          />
        ))}
      </div>
    );
};

export default MyPhoto;