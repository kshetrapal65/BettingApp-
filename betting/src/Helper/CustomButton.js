import React from "react";
import PropTypes from "prop-types"; // For prop validation

const CustomButton = ({
  text,
  height = "50px",
  width = "150px",
  bgColor = "#007bff",
  textColor = "#fff",
  border,

  onClick,
}) => {
  const buttonStyle = {
    height,
    width,
    backgroundColor: bgColor,
    color: textColor,
    border: border,
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

// PropTypes to validate props and ensure they're of the correct type
CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  border: PropTypes.string,
};

export default CustomButton;
