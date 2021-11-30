import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomGrid = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        width: "50%",
        marginLeft: "25%",
        backgroundColor: "black",
        padding: "2%",
      }}
    >
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );
};

export { CustomGrid, Item };
