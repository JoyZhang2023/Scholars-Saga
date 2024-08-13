import React, { useState } from 'react';

import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer, IconButton,
    Link,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import {Box} from "@mui/system";
import {
     BookOpenTextIcon, BookTextIcon, BotIcon,
    CalendarDaysIcon, HomeIcon,
    UnlinkIcon, User2Icon
} from "lucide-react";



const drawerWidth = 240;
const iconNames = ['Home', 'Profile', 'Calendar', 'Catalog', 'EduPlan', 'AI Assistant']
const routes = ['/', '/profile', '/student-calendar', '/books', '/textbooks', '/bot'];

// Called prototype because I was messing around with the icons/routing and search, but that might not
// be located within the same file in the final implementation
export default function NavbarStudentPrototype() {
     return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" align={"center"}>
                        Student Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {iconNames.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <Link href= {routes[index]} underline="none">
                            <ListItemButton>
                                <ListItemIcon>
                                    {[<HomeIcon />, <User2Icon />, <CalendarDaysIcon />,
                                        <BookOpenTextIcon />, <BookTextIcon />, <BotIcon />][index]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <UnlinkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}





