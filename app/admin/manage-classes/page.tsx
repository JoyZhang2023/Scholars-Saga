'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Card, CardContent, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useAuth } from '../../../context/authContext';

interface Class {
  id: number;
  class_section: string;
  professor: string;
  class_category: string;
  class_day: string[];
  class_start_time: string | Date; // Update type to handle string or Date
  class_end_time: string | Date; // Update type to handle string or Date
  description: string;
  credits?: number;
  current_enrollments?: number;
  class_name: string;
  class_size?: number;
  fulfill_major_requirements?: string[];
  terms_offered?: string[];
}

const ManageClasses: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClass, setNewClass] = useState<Omit<Class, 'id'>>({
    class_section: '',
    professor: '',
    class_category: '',
    class_day: [],
    class_start_time: new Date(),
    class_end_time: new Date(),
    description: '',
    credits: 0,
    current_enrollments: 0,
    class_name: '',
    class_size: 0,
    fulfill_major_requirements: [],
    terms_offered: [],
  });


  const [editingClass, setEditingClass] = useState<Class | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    switch (name) {
      case 'class_day':
        // Convert comma-separated string to an array
        setNewClass(prevState => ({
          ...prevState,
          [name]: value.split(',').map(day => day.trim()),
        }));
        break;
  
      case 'class_start_time':
      case 'class_end_time':
        // Convert string to Date object
        setNewClass(prevState => ({
          ...prevState,
          [name]: new Date(value),
        }));
        break;
  
      case 'fulfill_major_requirements':
      case 'terms_offered':
        // Convert comma-separated string to an array
        setNewClass(prevState => ({
          ...prevState,
          [name]: value.split(',').map(item => item.trim()),
        }));
        break;
  
      default:
        // For all other fields, just update the value
        setNewClass(prevState => ({
          ...prevState,
          [name]: value,
        }));
    }
  };
  

  const handleAddClass = async () => {
    try {
      const { id, ...classData } = newClass; // Exclude id from the data being sent
      const response = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (response.ok) {
        alert('Class added successfully');
        fetchClasses(); // Refresh the list of classes
        setNewClass({
          class_section: '',
          professor: '',
          class_category: '',
          class_day: [],
          class_start_time: new Date(),
          class_end_time: new Date(),
          description: '',
          credits: 0,
          current_enrollments: 0,
          class_name: '',
          class_size: 0,
          fulfill_major_requirements: [],
          terms_offered: [],
        });
      } else {
        alert('Failed to add class');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      alert('An error occurred while adding the class');
    }
  };


  const handleEditClass = (cls: Class) => {
    setEditingClass(cls);
    setNewClass({
      class_section: cls.class_section,
      professor: cls.professor,
      class_category: cls.class_category,
      class_day: Array.isArray(cls.class_day) ? cls.class_day.join(', ') : '',  // handle case where class_day is undefined or not an array
      class_start_time: cls.class_start_time ? new Date(cls.class_start_time) : new Date(), 
      class_end_time: cls.class_end_time ? new Date(cls.class_end_time) : new Date(),
      description: cls.description || '', 
      credits: cls.credits ?? 0,  // use nullish coalescing to handle undefined or null
      current_enrollments: cls.current_enrollments ?? 0,  // use nullish coalescing for undefined or null
      class_name: cls.class_name || '',
      class_size: cls.class_size ?? 0,
      fulfill_major_requirements: Array.isArray(cls.fulfill_major_requirements)
        ? cls.fulfill_major_requirements.join(', ') 
        : '',  // convert array to string or handle empty
      terms_offered: Array.isArray(cls.terms_offered)
        ? cls.terms_offered.join(', ')
        : '',  // convert array to string or handle empty
    });
  };
  


  const handleUpdateClass = async () => {
    try {
      const response = await fetch(`/api/admin/classes/${editingClass?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        alert('Class updated successfully');
        fetchClasses();
        setEditingClass(null);
        setNewClass({
          id: 0,
          class_section: '',
          professor: '',
          class_category: '',
          class_day: [],
          class_start_time: new Date(),
          class_end_time: new Date(),
          description: '',
          credits: 0,
          current_enrollments: 0,
          class_name: '',
          class_size: 0,
          fulfill_major_requirements: [],
          terms_offered: [],
        });
      }
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  async function handleDeleteClass(classId: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this class?');
    
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/admin/classes?id=${classId}`, { method: 'DELETE' });
        const result = await res.json();
  
        if (res.ok) {
          alert('Class deleted successfully');
          // Optionally refresh the list of classes here
        } else {
          alert(result.error || 'Error deleting class');
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Failed to delete class');
      }
    }
  }

  // Function to safely convert values to Date and handle formatting
  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d instanceof Date && !isNaN(d.getTime()) ? d.toLocaleTimeString() : 'Invalid Date';
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Classes</Typography>

      <Box mb={4}>
        <TextField
          label="Class Name"
          name="class_name"
          value={newClass.class_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Class Section"
          name="class_section"
          value={newClass.class_section}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Professor"
          name="professor"
          value={newClass.professor}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Class Category"
          name="class_category"
          value={newClass.class_category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Class Days"
          name="class_day"
          value={newClass.class_day.join(', ')}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Time"
          name="class_start_time"
          value={newClass.class_start_time ? newClass.class_start_time.toISOString().slice(0, 16) : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="datetime-local"
        />
        <TextField
          label="End Time"
          name="class_end_time"
          value={newClass.class_end_time ? newClass.class_end_time.toISOString().slice(0, 16) : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="datetime-local"
        />
        <TextField
          label="Description"
          name="description"
          value={newClass.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Credits"
          name="credits"
          value={newClass.credits || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />

        <TextField
          label="Class Size"
          name="class_size"
          value={newClass.class_size || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Fulfill Major Requirements"
          name="fulfill_major_requirements"
          value={newClass.fulfill_major_requirements?.join(', ')}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Terms Offered"
          name="terms_offered"
          value={newClass.terms_offered?.join(', ')}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color={editingClass ? 'secondary' : 'primary'}
          onClick={editingClass ? handleUpdateClass : handleAddClass}
          fullWidth
        >
          {editingClass ? 'Update Class' : 'Add Class'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {classes.map(cls => (
          <Grid item xs={12} sm={6} md={4} key={cls.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{cls.class_name}</Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Section:</span> {cls.class_section}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Professor:</span> {cls.professor}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Category:</span> {cls.class_category}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Days:</span> {cls.class_day.join(', ')}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Start Time:</span> {formatDate(cls.class_start_time)}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>End Time:</span> {formatDate(cls.class_end_time)}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Description:</span> {cls.description}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Credits:</span> {cls.credits}
                </Typography>

                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Size:</span> {cls.class_size}
                </Typography>


                <Box mt={2}>
                  <IconButton color="primary" onClick={() => handleEditClass(cls)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClass(cls.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageClasses;
