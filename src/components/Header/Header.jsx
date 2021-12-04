import { Item } from "../CustomGrid";

const Header = ({ children }) => {
  return (
    <Item
      style={{
        margiBottom: "1%",
        fontWeight: "bold",
        textAlign: "left",
        color: "#fff",
        fontSize: "20px",
        backgroundColor: "#000",
      }}
    >
      {children}
    </Item>
  );
};

export default Header;
