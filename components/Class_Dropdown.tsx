import React, { useState, useEffect } from 'react';

interface ClassItem {
    id: number;
    class_section: string;
}

interface ClassDropdownProps {
    onSelectClass: (classId: number) => void;
}

const ClassDropdown: React.FC<ClassDropdownProps> = ({ onSelectClass }) => {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`/api/classes?search=${encodeURIComponent(searchTerm)}`);
                const data: ClassItem[] = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Failed to fetch classes:', error);
            }
        };

        fetchClasses();
    }, [searchTerm]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClassId = e.target.value;
        setSelectedClass(selectedClassId);
        onSelectClass(parseInt(selectedClassId, 10));
    };

    return (
        <div>
            <label htmlFor="classDropdown">Select Class:</label>
            <input
                type="text"
                placeholder="Search for a class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', display: 'block' }}
            />
            <select
                id="classDropdown"
                value={selectedClass}
                onChange={handleSelectChange}
            >
                <option value="">Select a class</option>
                {classes.map((classItem) => (
                    <option key={classItem.id} value={classItem.id.toString()}>
                        {classItem.class_section}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ClassDropdown;
