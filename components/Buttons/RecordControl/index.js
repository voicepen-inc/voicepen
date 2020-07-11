import PropTypes from "prop-types";
import styles from "./index.module.scss";

function RecordControl({ image, onClickHandler, title }) {
  return (
    <button
      className={styles.button}
      onClick={onClickHandler}
      title={title}
      type="button"
    >
      <img src={image} alt="" title={title} />
    </button>
  );
}

RecordControl.propTypes = {
  image: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecordControl;
