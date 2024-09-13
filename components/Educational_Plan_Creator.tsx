import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    Typography,
    Grid,
    Paper,
    Box,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    CircularProgress,
    ButtonBase
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import SavePlanForm from './Save_Edu_Plan';
import ClassDropdown from "@/components/Class_Dropdown";

const terms = ['Fall', 'Winter', 'Spring', 'Summer'] as const;

interface Course {
    id: number;
    class_name: string;
    class_section: string;
    credits: number;
    description: string;
    fulfill_major_requirements: string[];
    terms_offered: string[];
    class_day: string[];
    professor: string;
    class_size: number;
    class_category: string;
    class_start_time: string;
    class_end_time: string;
    current_enrollments: number;

}

interface SortableItemProps {
    id: number;
    content: string;
    isPlaceholder?: boolean;
    onDelete?: () => void;
}

type Term = typeof terms[number];

interface CoursesByTerm {
    [term: string]: {
        id: number;
        content: string;
        credits: number;
    }[];
}


const initialCourses: { [year: string]: CoursesByTerm } = {
    '2024-2025': {
        Fall: [],
        Winter: [],
        Spring: [],
        Summer: [],
    },
    '2025-2026': {
        Fall: [],
        Winter: [],
        Spring: [],
        Summer: [],
    },
    '2026-2027': {
        Fall: [],
        Winter: [],
        Spring: [],
        Summer: [],
    },
};

interface PlanBuilderProps {
    allCoursesByYear: { [year: string]: CoursesByTerm };
    setAllCoursesByYear: React.Dispatch<React.SetStateAction<{ [year: string]: CoursesByTerm }>>;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, content, isPlaceholder = false, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isPlaceholder ? 'transparent' : 'black',
        border: isPlaceholder ? '1px dashed black' : 'none',
        height: isPlaceholder ? '40px' : 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const handleMouseDownOnDelete = () => {
        setIsDeleteButtonClicked(true);
    };

    const handleMouseUpOnDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the click from being interpreted as a drag
        onDelete && onDelete();
        setIsDeleteButtonClicked(false);
    };

    const handleMouseUpOnItem = (e: React.MouseEvent) => {
        if (isDeleteButtonClicked) {
            e.stopPropagation();
            setIsDeleteButtonClicked(false);
        }
    };

    return (
        <Typography
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onMouseUp={handleMouseUpOnItem}
            sx={{ margin: '8px', padding: '8px', borderRadius: '4px', color: 'white' }}
        >
            {isPlaceholder ? 'Drag item here' : content}
            {!isPlaceholder && (
                <ButtonBase
                    sx={{ marginLeft: '8px' }}
                    onMouseDown={handleMouseDownOnDelete}
                    onMouseUp={handleMouseUpOnDelete}
                >
                    <Delete />
                </ButtonBase>
            )}
        </Typography>
    );
};

const PlanBuilder: React.FC<PlanBuilderProps> = ({ allCoursesByYear, setAllCoursesByYear }) => {
    const [currentYear, setCurrentYear] = useState<string>('2024-2025');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
    const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    useEffect(() => {
        // Log or handle new courses loaded into PlanBuilder
        console.log('Courses by Year updated:', allCoursesByYear);
    }, [allCoursesByYear]);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoadingCourses(true);
            try {
                const response = await fetch('/api/classes');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data: Course[] = await response.json();
                setAvailableCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDragEnd = (event: { active: any; over: any }) => {
        const { active, over } = event;
        if (!over) return;

        const sourceIndex = terms.findIndex(term => allCoursesByYear[currentYear][term].some(course => course.id === active.id));
        const sourceContainer = terms[sourceIndex];
        const targetIndex = terms.findIndex(term => allCoursesByYear[currentYear][term].some(course => course.id === over.id) || `${term}-placeholder` === over.id);
        const targetContainer = terms[targetIndex];

        if (!sourceContainer || !targetContainer) return;

        if (sourceContainer === targetContainer) {
            const activeItems = [...allCoursesByYear[currentYear][sourceContainer]];
            const activeIndex = activeItems.findIndex(item => item.id === active.id);
            const overIndex = activeItems.findIndex(item => item.id === over.id);

            const [removed] = activeItems.splice(activeIndex, 1);
            activeItems.splice(overIndex, 0, removed);

            setAllCoursesByYear((prev) => ({
                ...prev,
                [currentYear]: {
                    ...prev[currentYear],
                    [sourceContainer]: activeItems,
                },
            }));
        } else {
            const activeItems = [...allCoursesByYear[currentYear][sourceContainer]];
            const targetItems = [...allCoursesByYear[currentYear][targetContainer]];

            const activeIndex = activeItems.findIndex(item => item.id === active.id);
            const overIndex = targetItems.findIndex(item => item.id === over.id);

            const [removed] = activeItems.splice(activeIndex, 1);

            if (overIndex === -1) {
                targetItems.push(removed);
            } else {
                targetItems.splice(overIndex, 0, removed);
            }

            setAllCoursesByYear((prev) => ({
                ...prev,
                [currentYear]: {
                    ...prev[currentYear],
                    [sourceContainer]: activeItems,
                    [targetContainer]: targetItems,
                },
            }));
        }
    };

    const handleYearChange = (event: React.ChangeEvent<{}>, newYear: string) => {
        setCurrentYear(newYear);
    };

    const calculateTotalCredits = (term: Term) => {
        return allCoursesByYear[currentYear][term].reduce((total, course) => total + course.credits, 0);
    };

    const handleAddCourseClick = (term: Term) => {
        setSelectedTerm(term);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedCourse(null);
    };

    const handleAddCourse = () => {
        if (!selectedTerm || selectedCourse === null) return;

        const course = availableCourses.find(c => c.id === selectedCourse);
        if (!course) return;

        const newCourseItem = {
            id: course.id,
            content: course.class_section,
            credits: course.credits,
        };

        setAllCoursesByYear((prev) => ({
            ...prev,
            [currentYear]: {
                ...prev[currentYear],
                [selectedTerm]: [...prev[currentYear][selectedTerm], newCourseItem],
            },
        }));

        handleDialogClose();
    };

    const handleDeleteCourse = (term: Term, courseId: number) => {
        setAllCoursesByYear((prevCourses) => ({
            ...prevCourses,
            [currentYear]: {
                ...prevCourses[currentYear],
                [term]: prevCourses[currentYear][term].filter(course => course.id !== courseId),
            },
        }));
    };

    // @ts-ignore
    return (
        <>
            <Box sx={{ marginBottom: 2 }}>
                <Tabs
                    value={currentYear}
                    onChange={handleYearChange}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {Object.keys(initialCourses).map((year) => (
                        <Tab key={year} label={year} value={year} />
                    ))}
                </Tabs>
            </Box>
            <Paper sx={{ padding: 2 }}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <Grid container spacing={2}>
                        {terms.map(term => (
                            <Grid item xs={3} key={term}>
                                <Paper sx={{ padding: 2, minHeight: 600, overflow: 'auto' }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6">{term}</Typography>
                                    </Box>
                                    <SortableContext items={allCoursesByYear[currentYear][term].map(course => course.id)}
                                                     strategy={verticalListSortingStrategy}>
                                        {allCoursesByYear[currentYear][term].length > 0 ? (
                                            allCoursesByYear[currentYear][term].map(course => (
                                                <SortableItem key={course.id} id={course.id} content={course.content}
                                                              onDelete={() => handleDeleteCourse(term, course.id)} />
                                            ))
                                        ) : (
                                            <SortableItem id={Number(`${term}-placeholder`)} content="Drag item here"
                                                          isPlaceholder={true} />
                                        )}
                                    </SortableContext>
                                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                                        <Typography variant="body1">Total Credits: {calculateTotalCredits(term)}</Typography>
                                    </Box>
                                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                                        <Button variant="outlined" onClick={() => handleAddCourseClick(term)}>
                                            + Add Course
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </DndContext>
                <Box sx={{ marginTop: 4, textAlign: 'right' }}>
                    <SavePlanForm allCoursesByYear={allCoursesByYear} />
                </Box>
            </Paper>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add Course</DialogTitle>
                <DialogContent>
                    {loadingCourses ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography>Course Name</Typography>
                                <ClassDropdown
                                    onSelectClass={(selectedCourseId) => setSelectedCourse(selectedCourseId)}
                                />
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography>Description</Typography>
                                <Typography variant="body2">
                                    {selectedCourse
                                        ? availableCourses.find(c => c.id === selectedCourse)?.description || 'No description available'
                                        : 'Select a course to see its description'}
                                </Typography>
                            </Box>
                            {selectedCourse && (() => {
                                const course = availableCourses.find(c => c.id === selectedCourse);

                                if (!course) return null;

                                return (
                                    <>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Major Requirements Fulfilled</Typography>
                                            <Typography variant="body2">
                                                {course.fulfill_major_requirements.length > 0
                                                    ? course.fulfill_major_requirements.join(', ')
                                                    : 'None'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Credits</Typography>
                                            <Typography variant="body2">
                                                {course.credits ?? '0'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Professor</Typography>
                                            <Typography variant="body2">
                                                {course.professor ?? 'Not available'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Terms Offered</Typography>
                                            <Typography variant="body2">
                                                {course.terms_offered.length > 0
                                                    ? course.terms_offered.join(', ')
                                                    : 'Not available'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Days</Typography>
                                            <Typography variant="body2">
                                                {course.class_day.length > 0
                                                    ? course.class_day.join(', ')
                                                    : 'Not specified'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Start Time</Typography>
                                            <Typography variant="body2">
                                                {course.class_start_time ?? 'Not available'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>End Time</Typography>
                                            <Typography variant="body2">
                                                {course.class_end_time ?? 'Not available'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Current Enrollment</Typography>
                                            <Typography variant="body2">
                                                {course.current_enrollments ?? '0'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginBottom: 2 }}>
                                            <Typography>Capacity</Typography>
                                            <Typography variant="body2">
                                                {course.class_size ?? '0'}
                                            </Typography>
                                        </Box>
                                    </>
                                );
                            })()}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddCourse} variant="contained" color="primary"
                            disabled={!selectedCourse}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default PlanBuilder;
