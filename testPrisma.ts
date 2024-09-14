// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     const classData = {
//       class_section: 'CS314',
//       professor: 'Test',
//       class_category: 'Computer Science',
//       class_day: ['Friday'],
//       class_start_time: new Date('2024-09-09T18:33:22.842Z'),
//       class_end_time: new Date('2024-09-09T19:33:00.000Z'),
//       description: 'A test class.',
//       credits: 5,
//       class_name: 'Test Class CS',
//       class_size: 25,
//       fulfill_major_requirements: ['Computer_Science'],
//       terms_offered: ['Fall', 'Spring'],
//     };

//     const newClass = await prisma.classes.create({
//       data: classData,
//     });

//     console.log('Class created:', newClass);
//   } catch (error) {
//     console.error('Error creating class:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();
