import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./CustomGrid.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  overflow: "wrap",
  color: theme.palette.text.secondary,
}));

const CustomGrid = ({ children }) => {
  return (
    <Box className="container">
      <Grid container className="grid" spacing={2}>
        {children}
      </Grid>
    </Box>
  );
};

export { CustomGrid, Item };
