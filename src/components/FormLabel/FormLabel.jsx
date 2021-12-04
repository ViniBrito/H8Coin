import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

const Custom = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#f8c300",
    },
  },
});

const FormLabel = ({ label, error, onChange, onBlur, value }) => {
  return (
    <Custom
      required
      style={{ padding: "1%" }}
      label={label}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      variant="outlined"
    />
  );
};

export default FormLabel;
