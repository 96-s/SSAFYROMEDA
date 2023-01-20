const PhotoItem = (props) => {
    const { img, description, date } = props;

    return (
        <li>
            <h3>{img}</h3>
            <div className="photo">
                <span>{date}</span>
                <span>{description}</span>
            </div>

            <p>{description}</p>
        </li>
      );
}

export default PhotoItem;