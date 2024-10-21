import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Tooltip } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { SiAwsorganizations } from "react-icons/si";
import { MdDevicesOther } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom"; // Use useLocation for current path
import { SummarizeOutlined } from "@mui/icons-material";

const SideBarItems = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const [selectedItem, setSelectedItem] = useState(location.pathname); // State to track the selected item, initialized with current path

  // Update selected item when the route changes
  useEffect(() => {
    setSelectedItem(location.pathname); // Automatically select the item based on the current path
  }, [location.pathname]); // Runs whenever the pathname changes

  const menuItems = [
    {
      text: "داشبورد",
      icon: <DashboardIcon style={{ height: 20, width: 20 }} />,
      path: "/dashboard",
    },
    {
      text: "کاربران",
      icon: <FaRegUser style={{ height: 20, width: 20 }} />,
      path: "/users",
    },
    {
      text: "ریاست / معینیت",
      icon: <SiAwsorganizations style={{ height: 20, width: 20 }} />,
      path: "/directorates",
    },
    {
      text: "اسناد",
      icon: <MdDevicesOther style={{ height: 20, width: 20 }} />,
      path: "/documents",
    },
    {
      text: "راپور",
      icon: <SummarizeOutlined style={{ height: 20, width: 20 }} />,
      path: "/reports",
    },
  ];

  const handleClick = (item) => {
    setSelectedItem(item.path); // Set the selected item path when clicked
    navigate(item.path); // Navigate to the selected path
  };

  return (
    <>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={() => handleClick(item)}
          style={{
            backgroundColor: selectedItem === item.path ? "#2e7d32" : "transparent", // Change background color if selected
            color: selectedItem === item.path ? "#fff" : "inherit", // Change text color if selected
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={item.text} placement="right">
              <ListItemIcon
                style={{
                  color: selectedItem === item.path ? "#fff" : "inherit", // Change icon color if selected
                }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary={item.text} />
          </div>
        </ListItemButton>
      ))}
    </>
  );
};

export default SideBarItems;
