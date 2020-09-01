import React, { useEffect } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import "./styles/index.css";
import logo from "./assets/temp_logo.png";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_USERINFO } from "../../actions/types";
import { getUserInfo } from "../../actions/userInfoActions";
const useStyles = makeStyles({
  label: {
    color: "#ffffff",
  },
  root: {
    color: "black !important ",
    backgroundColor: "white !important",
  },
});

export const Toolbar = () => {
  const [cookies, removeCookie] = useCookies(["access_info"]);
  let history = useHistory();
  const status = useSelector((state) => state.getUserInfoReducer.status);
  const classes = useStyles();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const excludedPaths = new Set(["/login", "/register", "/forgotPassword"]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // Your code here
    let accessInfo = cookies.access_info;
    if (accessInfo !== undefined) {
      ///user logged in
      dispatch(getUserInfo(accessInfo.userid, accessInfo.token));
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    history.push("/profile");
  };
  const handleLogOut = () => {
    removeCookie("access_info");
    dispatch({ type: RESET_USERINFO });
    history.push("/");
  };
  return excludedPaths.has(location.pathname) ? null : (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__login">
          {" "}
          <a href="/">
            <img src={logo} alt="logo" />{" "}
          </a>
        </div>
        <div className="toolbar__navigation-items">
          <ul>
            <li key="/login">
              <Link component={RouterLink} to="/login">
                Freelancer
              </Link>
            </li>
            <li key="/register">
              <Link component={RouterLink} to="/register">
                Visualizations
              </Link>
            </li>
            <li key="/jobs">
              <Link component={RouterLink} to="/jobs">
                Browse Jobs
              </Link>
            </li>
          </ul>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">
          {status === "ok" ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                classes={{ root: classes.root }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <ul>
              <li key="/login">
                <Link component={RouterLink} to="/login">
                  login
                </Link>
              </li>
              <li key="/register">
                <Link component={RouterLink} to="/register">
                  register
                </Link>
              </li>
              <li key="/dashboard">
                <Button
                  component={RouterLink}
                  variant="contained"
                  to="/dashboard"
                  color="primary"
                  classes={{ label: classes.label }}
                >
                  post a job
                </Button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};
