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
import BarChartComponent from "../utils/BarChartComponent.jsx";
import PiChartComponent from "../utils/PiChartComponent.jsx";
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
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Grid2 container spacing={3}>
            {/* Total Users Component */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper>
                <TotalUsers />
              </Paper>
            </Grid2>

            {/* Total Directorates Component */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper>
                <TotalDirectorates />
              </Paper>
            </Grid2>

            {/* Bar Chart */}
            <Grid2 item xs={12} md={8} lg={9}>
              <Paper>
                <BarChartComponent />
              </Paper>
            </Grid2>

            {/* Pie Chart */}
            <Grid2 item xs={12} md={4} lg={3}>
              <Paper>
                <PiChartComponent />
              </Paper>
            </Grid2>
          </Grid2>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
