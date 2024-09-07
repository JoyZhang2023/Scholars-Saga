import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

interface ClassItem {
    id: number;
    class_section: string;
    class_name: string;
}

interface ClassDropdownProps {
    onSelectClass: (classId: number) => void;
}

const ClassDropdown: React.FC<ClassDropdownProps> = ({ onSelectClass }) => {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch classes when the component mounts or when the search term changes
    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/classes?search=${encodeURIComponent(searchTerm)}`);
                const data: ClassItem[] = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Failed to fetch classes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [searchTerm]);

    return (
        <Autocomplete
            fullWidth
            options={classes}
            getOptionLabel={(option) => `${option.class_section} - ${option.class_name}`}
            loading={loading}
            value={selectedClass}
            onChange={(event, newValue) => {
                setSelectedClass(newValue);
                if (newValue) {
                    onSelectClass(newValue.id); // Pass the selected class ID to the parent
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for a class"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default ClassDropdown;
