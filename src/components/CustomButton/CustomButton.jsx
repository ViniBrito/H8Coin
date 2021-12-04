import Button from "@material-ui/core/Button";

const CustomButton = ({ children, href, onClick }) => {
  return (
    <Button
      className="click"
      style={{
        minWidth: "100%",
        flexShrink: "0",
        backgroundColor: "#2c3135",
      }}
      variant="contained"
      href={href}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
