import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
// import { matBlack } from "../../constants/color"; // Will be replaced by theme

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          boxShadow: "none",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%", // Consider making this more dynamic or passed as a prop
          }}
          sx={(theme) => ({
            border: "none",
            ".table-header": { // This class name needs to be applied to the DataGrid's header elements
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            // To style the actual DataGrid header cells, you might need to target specific DataGrid classes
            // e.g., '& .MuiDataGrid-columnHeaders': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
            // For now, assuming ".table-header" is a custom class you apply or DataGrid picks up.
            // If not, we'll need to adjust how the header is styled.
            // A common way is to use the 'componentsProps' or 'slotProps' for header styling.
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontSize: '1rem', // Example: Adjust header font size
            },
            '& .MuiDataGrid-cell': {
              // Example: Add some padding to cells for better readability
              // padding: theme.spacing(1),
            },
            '& .MuiDataGrid-footerContainer': {
              // Example: Style the footer
              // backgroundColor: theme.palette.grey[200],
            }
          })}
        />
      </Paper>
    </Container>
  );
};

export default Table;