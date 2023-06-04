import "./picture.styles.scss";

const Picture = ({ src }) => {
  return (
    <div className="character-picture">
      <img src={src} alt="preview" className="character-picture" />
    </div>
  );
};

export default Picture;
