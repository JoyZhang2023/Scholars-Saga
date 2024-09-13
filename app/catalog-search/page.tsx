'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { TextField, Button, Container, Typography, Card, CardContent, Grid, Box, IconButton, Drawer, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';  // Import Link from next/link

interface Class {
  id: number;
  class_section: string;
  professor: string;
  class_size?: number;
  class_category: string;
  class_day: string[];
  class_end_time: Date;
  class_name: string;
  class_start_time: Date;
  current_enrollments?: number;
  fulfill_major_requirements: string[];
  terms_offered: string[];
  description: string;
  credits?: number;
}

const ClassCatalog: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sectionNumber, setSectionNumber] = useState<number | ''>('');
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [registeredClasses, setRegisteredClasses] = useState<Set<number>>(new Set()); // Track registered classes
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedClasses = localStorage.getItem('registeredClasses');
    if (savedClasses) {
      setRegisteredClasses(new Set(JSON.parse(savedClasses)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('registeredClasses', JSON.stringify(Array.from(registeredClasses)));
  }, [registeredClasses]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/catalog-search');
      const data: Class[] = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.trim().toLowerCase();
    const numericSection = sectionNumber ? sectionNumber.toString() : '';

    const results = classes.filter(classItem => {
      const classNameMatches = classItem.class_name.toLowerCase().includes(searchTermLower);
      const sectionMatches = numericSection ? classItem.class_section.includes(numericSection) : true;
      return classNameMatches && sectionMatches;
    });

    setFilteredClasses(results);
    setSearchClicked(true);
  };

  const handleRegister = (classId: number) => {
    setRegisteredClasses(prev => {
      const updated = new Set(prev);
      if (updated.has(classId)) {
        updated.delete(classId); // Unregister if already registered
      } else {
        updated.add(classId); // Register if not registered
      }
      return updated;
    });
  };

  const isRegistered = (classId: number) => registeredClasses.has(classId);

  const formatTime = (time: Date) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleRegisterAll = async () => {
    if (registeredClasses.size === 0) {
      alert('No classes selected for registration.');
      return;
    }

    try {
      const response = await fetch('/api/catalog-search/register-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classIds: Array.from(registeredClasses),
          studentId: user?.id,
        }),
      });

      if (response.ok) {
        alert('All selected classes have been registered.');
        setRegisteredClasses(new Set());
        toggleDrawer();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to register classes.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while registering classes.');
    }
  };

  return (
    <Container maxWidth="md">
      {!isAuthenticated && mounted ? (
        // Redirect to login if not authenticated
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" gutterBottom>
            Please log in to view classes
          </Typography>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Go to Login
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Class Catalog
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={toggleDrawer}
            style={{ position: 'fixed', top: 16, right: 16 }}
          >
            <ShoppingCartIcon />
          </IconButton>

          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <Box p={2} width={300} position="relative">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={toggleDrawer}
                style={{ position: 'absolute', top: 8, right: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h5" gutterBottom>
                Registered Classes
              </Typography>
              <Divider style={{ marginBottom: '16px' }} />
              {Array.from(registeredClasses).map((classId) => {
                const classItem = classes.find(cls => cls.id === classId);
                return classItem ? (
                  <Box key={classId} mb={2}>
                    <Typography variant="body1"><strong>{classItem.class_name}</strong></Typography>
                    <Typography variant="body2">{classItem.description}</Typography>
                    <Typography variant="body2"><strong>Professor:</strong> {classItem.professor}</Typography>
                    <Typography variant="body2"><strong>Days:</strong> {classItem.class_day.join(', ')}</Typography>
                    <Typography variant="body2"><strong>Time:</strong> {formatTime(classItem.class_start_time)} - {formatTime(classItem.class_end_time)}</Typography>
                    <Divider style={{ margin: '8px 0' }} />
                  </Box>
                ) : null;
              })}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegisterAll}
                disabled={filteredClasses.length === 0} // Disables button if no classes are present
              >
                Register All
              </Button>
            </Box>
          </Drawer>

          <TextField
            label="Search for classes by name (e.g., Biology, History, Physics)"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Numeric Section"
            type="number"
            variant="outlined"
            value={sectionNumber}
            onChange={(e) => setSectionNumber(Number(e.target.value) || '')}
            fullWidth
            margin="normal"
            style={{ marginBottom: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            Search
          </Button>
          {filteredClasses.length === 0 && searchClicked && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Typography variant="body1" color="textSecondary">
                No classes found matching your criteria.
              </Typography>
            </Box>
          )}
          <Grid container spacing={3}>
            {filteredClasses.map((classItem) => (
              <Grid item xs={12} key={classItem.id}>
                <Card style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: isRegistered(classItem.id) ? 'lightgreen' : 'inherit', // Change color based on registration state
                  position: 'relative'
                }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {classItem.class_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {classItem.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Professor:</strong> {classItem.professor}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Days:</strong> {classItem.class_day.join(', ')}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Time:</strong> {formatTime(classItem.class_start_time)} - {formatTime(classItem.class_end_time)}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color={isRegistered(classItem.id) ? 'success' : 'primary'}
                    onClick={() => handleRegister(classItem.id)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      bottom: '10px'
                    }}
                  >
                    {isRegistered(classItem.id) ? 'Added' : 'Register'}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ClassCatalog;
