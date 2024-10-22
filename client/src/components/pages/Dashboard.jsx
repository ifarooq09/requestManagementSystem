import Sidebar from "../layout/Sidebar.jsx"; // Updated import
import {
  Box,
  Toolbar,
  Container,
  Grid2,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import TotalDocuments from "../utils/TotalDocuments.jsx";
import TotalDirectorates from "../utils/TotalDirectorates.jsx";
import TotalUsers from "../utils/TotalUsers.jsx";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.mail.gov.af">
        IT Directorate - Ministry of Agriculture, Irrigation and Livestock
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar now contains the AppBar and Drawer on the right */}
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "100vh",
          overflow: "auto",
          direction: "rtl", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            mt: 2,
            mb: 4,
            direction: "rtl", 
          }}
        >
          <Grid2
            container
            spacing={3}
            justifyContent="center" 
          >
            {/* Total Users Component */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TotalUsers />
              </Paper>
            </Grid2>

            {/* Total Directorates Component */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TotalDirectorates />
              </Paper>
            </Grid2>

            {/* Total Documents Component */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TotalDocuments />
              </Paper>
            </Grid2>
          </Grid2>
          <Copyright sx={{ pt: 4, direction: "rtl" }} />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
