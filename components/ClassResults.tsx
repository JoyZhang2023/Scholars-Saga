import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Define the Class type with required fields
type Class = {
  id?: string;
  class_name?: string;
  class_day?: string;
  // Add other relevant fields here if needed
};

// Define the props type for the ClassResults component
type ClassResultsProps = {
  classes: Class[] | string; // Allow for either an array of classes or a string response
};

const ClassResults: React.FC<ClassResultsProps> = ({ classes }) => {
  if (classes === null || classes === undefined) {
    return <div>No data available.</div>;
  }

  if (typeof classes === 'string') {
    return (
      <Box mt={2}>
        <Card>
          <CardContent>
            <Typography variant="body1">{classes}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Handle array of classes
  return (
    <Box mt={2}>
      {classes.length > 0 ? (
        classes.map((cls, idx) => (
          <Card key={idx} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{cls.class_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Held on: {cls.class_day}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No classes found.</Typography>
      )}
    </Box>
  );
};

export default ClassResults;
