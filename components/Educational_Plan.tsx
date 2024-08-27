import React, { useState } from 'react';
import { Paper, Tab, Tabs, Box } from '@mui/material';
import PastCourses from './Past_Classes';
import FutureCourses from './Future_Classes';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const AcademicPlan: React.FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Past Courses" />
                <Tab label="Future Plan" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PastCourses />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FutureCourses />
            </TabPanel>
        </Paper>
    );
};

export default AcademicPlan;