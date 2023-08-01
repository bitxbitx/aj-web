import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './MySideBar.module.css';

// Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import InboxIcon from '@mui/icons-material/Inbox';

const MySideBar = ({ children, ...rest }) => {
    const location = useLocation();
    const { collapseSidebar, toggleSidebar } = useProSidebar();
    const theme = useTheme();
    const [collapse, setCollapse] = React.useState(true);
    const [toggle, setToggle] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();

    const handleCollapseSidebar = () => {
        setCollapse(!collapse);
        collapseSidebar(collapse);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        // bring user back to landing page
        history.push("/");
      };
    const handleToggleSidebar = () => {
        setToggle(!toggle);
        toggleSidebar(toggle);
    }

    // Call collapseSidebar with true when the component is first rendered
    // React.useEffect(() => {
    //     collapseSidebar(true);
    // }, []);

    return (
        <div className={styles.container}>
            <div className={styles.topSideBar}>
                {isMobile && <div className={styles.toggleButton}><IconButton onClick={handleToggleSidebar}><MenuIcon /></IconButton> </div>}
                <Sidebar
                    transitionDuration={1000}
                    breakPoint='sm'
                    rootStyles={{
                        borderColor: 'grey',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        height: '100vh',
                    }}
                >
                    <div className={styles.logo}><img src={'http://localhost:8000/file/assets/logo.svg'} alt="logo" /> </div>
                    <Menu
                        // menuItemStyles={{
                        //     button: ({ level, active, disabled, hover }) => {
                        //         // only apply styles on first level elements of the tree
                        //         if (level === 0)
                        //             return {
                        //                 color: active ? "white" : theme.palette.primary.main,
                        //                 backgroundColor: active ? theme.palette.primary.main : undefined,
                        //                 borderRadius: '15px',
                        //                 '&:hover': {
                        //                     color: "black",
                        //                     backgroundColor: theme.palette.primary.main,
                        //                 },
                        //             };
                        //     },

                        // }}
                    >

                        {/* <MenuItem active={location.pathname === "/admin/"} icon={<GridViewOutlinedIcon />} component={<Link to="/admin" />}>Dashboard</MenuItem> */}
                        <MenuItem active={location.pathname === "/admin/accounts"} icon={<SupervisorAccountOutlinedIcon />} component={<Link to="/admin/accounts" />}>Accounts</MenuItem>
                        <MenuItem active={location.pathname === "/admin/notes"} icon={<Inventory2OutlinedIcon />} component={<Link to="/admin/notes" />}>Notes</MenuItem>
                        <MenuItem active={location.pathname === "/admin/transactions"} icon={<ViewListIcon />} component={<Link to="/admin/transactions" />}>Transactions</MenuItem>
                        <MenuItem active={location.pathname === "/admin/result"} icon={<InboxIcon />} component={<Link to="/admin/result" />}>Result</MenuItem>
                        <MenuItem active={location.pathname === "/admin/birthdays"} icon={<CakeIcon />} component={<Link to="/admin/birthdays" />}>Birthdays</MenuItem>
                        <MenuItem active={location.pathname === "/admin/me"} icon={<AccountCircleOutlinedIcon />} component={<Link to="/admin/me" />}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout} icon={<LogoutOutlinedIcon />}>Logout</MenuItem>
                        <MenuItem onClick={handleCollapseSidebar} icon={<ExpandCircleDownOutlinedIcon style={{ transform: collapse ? 'rotate(90deg)' : 'rotate(270deg)' }} />}>Collapse Menu</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </div>
    );
};

export default MySideBar;