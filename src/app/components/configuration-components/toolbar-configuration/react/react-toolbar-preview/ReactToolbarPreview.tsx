import React, {forwardRef, useImperativeHandle} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {FormGroup} from "@angular/forms";
import {ToolbarConfigForm} from "../../model/ToolbarConfigForm";
import {ThemeColorOption} from "../../../../../model/enum/ThemeColorOption";
import {
  Box,
  Button,
  createTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
  ThemeProvider,
  Tooltip
} from '@mui/material';
import {Login, Logout, Menu as MenuIcon} from "@mui/icons-material";
import {WindowSizeClass} from "../../../../../model/enum/WindowSizeClass";
import {MenuConfigOption} from "../../enum/MenuConfigOption";
import {upperSnakeCaseToCamelCase} from "../../../../../util/upperSnakeCaseToCamelCase";
import {ThemeConfig} from "../../../../../model/ThemeConfig";
import {MenuTypeConfigOption} from "../../enum/MenuTypeConfigOption";

export interface ReactToolbarPreviewProps {
  toolbarConfig: FormGroup<ToolbarConfigForm>,
  selectedWindowSize?: WindowSizeClass,
  themeConfig?: ThemeConfig,
}

export interface ReactToolbarPreviewHandle {
  toggleDrawer: () => void;
  drawerOpen: boolean;
  toggleMenu: () => void;
  menuOpen: boolean;
}

const ReactToolbarPreview = forwardRef<ReactToolbarPreviewHandle, ReactToolbarPreviewProps>(
  ({toolbarConfig, selectedWindowSize, themeConfig}, ref) => {
    let theme: Theme | undefined;

    if (themeConfig) {
      theme = createTheme({
        palette: {
          primary: {
            main: themeConfig.primaryColor,
          },
          secondary: {
            main: themeConfig.secondaryColor,
          },
        },
      });
    }

    const getColorClass = (): 'primary' | 'secondary' | 'default' | 'inherit' | 'transparent' => {
      return toolbarConfig.controls.color.value === ThemeColorOption.PRIMARY ? 'primary' : 'secondary';
    };

    const [loggedIn, setLoggedIn] = React.useState(true);

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(menuAnchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setMenuAnchorEl(null);
    };

    const menuTargetAnchorRef = React.useRef<HTMLButtonElement>(null);
    const menuTargetAnchor = (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{mr: 1}}
        ref={menuTargetAnchorRef}
      >
        <MenuIcon/>
      </IconButton>
    )

    const toggleMenu = () => {
      if (menuOpen) {
        setMenuAnchorEl(null);
      } else if (menuTargetAnchorRef.current) {
        setMenuAnchorEl(menuTargetAnchorRef.current);
      }
    };

    const login = () => {
      setLoggedIn(true);
    }

    const logout = () => {
      setLoggedIn(false);
    }

    const showMenuButton = () => {
      if (!selectedWindowSize) return false;

      return toolbarConfig.controls.menuConfig.controls.menu.get(
        upperSnakeCaseToCamelCase(selectedWindowSize)
      )?.value === MenuConfigOption.MENU;
    }

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    useImperativeHandle(ref, () => ({
      toggleDrawer,
      drawerOpen,
      toggleMenu,
      menuOpen
    }));

    const isDropDownMenu = () => {
      if (!selectedWindowSize) return false;

      return toolbarConfig.controls.menuConfig.controls.menuType.get(
        upperSnakeCaseToCamelCase(selectedWindowSize)
      )?.value === MenuTypeConfigOption.DROPDOWN;
    }

    const Content = (
        <AppBar position="static" color={getColorClass()} id="previewToolbar">
          <Toolbar>
            {showMenuButton() && (
              <div>
                {isDropDownMenu() ? (
                  <div>
                    {menuTargetAnchor}
                    <Menu
                      id="basic-menu"
                      anchorEl={menuAnchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      className={'react-preview-menu'}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {toolbarConfig.controls.navItems.value.map((item) => (
                        <MenuItem onClick={handleMenuClose} key={item.id}>{item.name}</MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer}
                    sx={{mr: 1}}
                  >
                    <MenuIcon/>
                  </IconButton>
                )}
              </div>
            )}
            {!isDropDownMenu() && toolbarConfig.controls.navItems.value.length > 0 && (
              <Drawer open={drawerOpen}
                      onClose={toggleDrawer}
                      anchor="left"
                      id="previewSidenav">
                <List>
                  {toolbarConfig.controls.navItems.value.map((navItem) => (
                    <ListItem key={navItem.id} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={navItem.name}/>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            )}
            <Typography variant="h6" component="div" noWrap sx={{mr: 2, flexGrow: showMenuButton() ? 1 : 0}}>
              {toolbarConfig.controls.title.value}
            </Typography>
            {!showMenuButton() && (
              <Box sx={{flexGrow: 1, overflowX: 'auto', overflowY: 'hidden', display: 'flex'}}>
                {toolbarConfig.controls.navItems.value.map((item) => (
                  <Button
                    key={item.id}
                    sx={{
                      color: 'white',
                      display: 'block'
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
            {toolbarConfig.controls.showLoginButton.value && (
              loggedIn ? (
                <div>
                  <Tooltip title="Logout" className={'react-preview-menu'}>
                    <IconButton
                      size="large"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={logout}
                      color="inherit"
                    >
                      <Logout/>
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip title="Login">
                    <IconButton
                      size="large"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={login}
                      color="inherit"
                    >
                      <Login/>
                    </IconButton>
                  </Tooltip>
                </div>
              )
            )}
          </Toolbar>
        </AppBar>
      )
    ;

    return theme ? (
      <ThemeProvider theme={theme}>{Content}</ThemeProvider>
    ) : (
      Content
    );
  }
);


export default ReactToolbarPreview;
