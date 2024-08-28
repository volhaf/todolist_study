import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import {Theme} from "@mui/material/styles";
import {useTheme} from "@mui/material";

export default function ButtonAppBar() {

    const theme :Theme =useTheme();
    return (
        <Box sx={{ flexGrow: 1, paddingBottom:'80px' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <MenuButton color="inherit" background={theme.palette.secondary.main}> Login</MenuButton>
                    <MenuButton color="inherit">LogOut</MenuButton>
                    <MenuButton color="inherit">FAQ</MenuButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
