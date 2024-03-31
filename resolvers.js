const mongoose = require('mongoose');
const Post = require('./models/Post.model');
const Parent = require('./models/ParentModel');
const School = require('./models/SchoolModel');
const Teacher = require('./models/TeacherModel');
const Student = require('./models/StudentModel');
const Meeting = require('./models/MeetingModel');


const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World!';
        },

        getAllPosts: async () => {
            return await Post.find();
        },
        getPost: async (parent, args, context, info) => {
            return await Post.findById(args.id).exec()  // .exec() is used to return a promise;
        },

        // Parent Resolvers
        getAllParents: async () => {
            return await Parent.find().exec();
        },
        getParent: async (parent, args, context, info) => {
            return await Parent.findById(args.id).exec();
        },

        // School Resolvers
        getAllSchools: async () => {
            return await School.find().exec();
        },
        getSchool: async (parent, args, context, info) => {
            return await School.findById(args.id).exec();
        },

        // Teacher Resolvers
        getAllTeachers: async () => {
            return await Teacher.find().populate('school').exec();
        },
        getTeacher: async (parent, args, context, info) => {
            return await Teacher.findById(args.id).populate('school').exec();
        },

        // Student Resolvers
        getAllStudents: async () => {
            return await Student.find().populate('parent').exec();
        },
        getStudent: async (parent, args, context, info) => {
            return await Student.findById(args.id).populate('parent').exec();
        },

        // Meeting Resolvers
        getAllMeetings: async () => {
            return await Meeting.find().populate('school').populate('teacher').populate('parent').exec();
        },
        getMeeting: async (parent, args, context, info) => {
            return await Meeting.findById(args.id).populate('school').populate('teacher').populate('parent').exec();
        }
    },

    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save();
            return post;
            // return await Post.create(post);
        },
        deletePost: async (parent, args, context, info) => {
            const post = await Post.findOneAndDelete({ _id: args.id }).exec();
            return 'Post deleted successfully!';
        },
        updatePost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = await Post.findByIdAndUpdate(args.id, { title, description }, { new: true }).exec(); // { new: true } is used to return the updated document;
            return post;
        },

        // Parent Mutations
        createParent: async (parent, args, context, info) => {
            const { parentName, contactInfo, alternateContact, relationshipToStudent } = args.parent;
            const parentValue = new Parent({ parentName, contactInfo, alternateContact, relationshipToStudent });
            await parentValue.save();
            return parentValue;
        },
        deleteParent: async (parent, args, context, info) => {
            const parentValue = await Parent.findOneAndDelete({ _id: args.id }).exec();
            return 'Parent deleted successfully!';
        },
        updateParent: async (parent, args, context, info) => {
            const { parentName, contactInfo, alternateContact, relationshipToStudent } = args.parent;
            const parentUpdate = {};

            const parentValue = await Parent.findByIdAndUpdate(args.id, { parentName, contactInfo, alternateContact, relationshipToStudent }, { new: true }).exec();
            return parentValue;
        },

        // School Mutations
        createSchool: async (parent, args, context, info) => {
            const { schoolName, address, schoolContact, schoolType } = args.school;
            const school = new School({ schoolName, address, schoolContact, schoolType });
            await school.save();
            return school;
        },
        deleteSchool: async (parent, args, context, info) => {
            const school = await School.findOneAndDelete({ _id: args.id }).exec();
            return 'School deleted successfully!';
        },
        updateSchool: async (parent, args, context, info) => {
            const { schoolName, address, schoolContact, schoolType } = args.school;
            const school = await School.findByIdAndUpdate(args.id, { schoolName, address, schoolContact, schoolType }, { new: true }).exec();
            return school;
        },

        // Teacher Mutations
        createTeacher: async (parent, args, context, info) => {
            const { teacherName, email, subjectsTaught, phoneExtension, school } = args.teacher;
            // Assuming `schoolId` is a valid ID for an existing school
            const findSchool = await School.findById(school);

            if (!findSchool) {
                throw new Error('School with the provided ID not found.');
            }

            const teacher = await Teacher.create({
                teacherName: {
                    firstName: teacherName.firstName,
                    lastName: teacherName.lastName
                },
                email,
                subjectsTaught,
                phoneExtension,
                school: findSchool._id // Correctly assign the school's _id as a reference
            });
            await teacher.save();
            const createdTeacher = await Teacher.findById(teacher._id).populate('school').exec();

            return createdTeacher;
        },
        deleteTeacher: async (parent, args, context, info) => {
            const teacher = await Teacher.findOneAndDelete({ _id: args.id }).exec();
            return 'Teacher deleted successfully!';
        },
        updateTeacher: async (parent, args, context, info) => {
            const {id, teacher} = args;
            const existingTeacher = await Teacher.findById(id);
            if (!existingTeacher) {
                throw new Error('Teacher not found!');
            }

            existingTeacher.teacherName = teacher.teacherName;
            existingTeacher.email = teacher.email;
            existingTeacher.subjectsTaught = teacher.subjectsTaught;
            existingTeacher.phoneExtension = teacher.phoneExtension;
            existingTeacher.school = teacher.school;

            await existingTeacher.save();
            const updatedTeacher = await Teacher.findById(existingTeacher._id).populate('school').exec();
            return updatedTeacher;
        },

        // Student Mutations
        createStudent: async (parentinfo, args, context, info) => {
            const { studentName, grade, allergies, medicalConditions, parent } = args.student;
            const findParent = await Parent.findById(parent);
            if (!findParent) {
                throw new Error('Parent with the provided ID not found.');
            }
            const student = await Student.create({
                studentName: {
                    firstName: studentName.firstName,
                    lastName: studentName.lastName
                },
                grade,
                allergies,
                medicalConditions,
                parent: findParent._id
            });
            await student.save();
            const createdStudent = await Student.findById(student._id).populate('parent').exec();
            return createdStudent;
        },
        deleteStudent: async (parent, args, context, info) => {
            const student = await Student.findOneAndDelete({ _id: args.id }).exec();
            return 'Student deleted successfully!';
        },
        updateStudent: async (parentInfo, args, context, info) => {
            const {id, student} = args;
            const existingStudent = await Student.findById(id);
            if (!existingStudent) {
                throw new Error('Student not found!');
            }

            existingStudent.studentName = student.studentName;
            existingStudent.grade = student.grade;
            existingStudent.allergies = student.allergies;
            existingStudent.medicalConditions = student.medicalConditions;
            existingStudent.parent = student.parent;

            await existingStudent.save();
            const updatedStudent = await Student.findById(existingStudent._id).populate('parent').exec();
            return updatedStudent;
        },

        // Meeting Mutations
        createMeeting: async (parentinfo, args, context, info) => {
            const { title, attendees, description, school, teacher, parent, meetingDateTime, agenda, meetingType, duration, notes } = args.meeting;
            const findSchool = await School.findById(school);
            if (!findSchool) {
                throw new Error('School with the provided ID not found.');
            }
            const findTeacher = await Teacher.findById(teacher);
            if (!findTeacher) {
                throw new Error('Teacher with the provided ID not found.');
            }

            console.log(parent);
            console.log(typeof parent);
            const findParent = await Parent.findById(parent);
            if (!findParent) {
                throw new Error('Parent with the provided ID not found.');
            }
            const meeting = await Meeting.create({
                title,
                attendees,
                description,
                school: findSchool._id,
                teacher: findTeacher._id,
                parent: parent,
                meetingDateTime,
                agenda,
                meetingType,
                duration,
                notes
            });
            await meeting.save();
            const createdMeeting = await Meeting.findById(meeting._id).populate('school').populate('teacher').populate('parent').exec();
            return createdMeeting;
        },
        deleteMeeting: async (parent, args, context, info) => {
            const meeting = await Meeting.findOneAndDelete({ _id: args.id }).exec();
            return 'Meeting deleted successfully!';
        },
        updateMeeting: async (parentInfo, args, context, info) => {
            const {id, meeting} = args;
            const existingMeeting = await Meeting.findById(id);
            if (!existingMeeting) {
                throw new Error('Meeting not found!');
            }

            existingMeeting.title = meeting.title;
            existingMeeting.attendees = meeting.attendees;
            existingMeeting.description = meeting.description;
            existingMeeting.school = meeting.school;
            existingMeeting.teacher = meeting.teacher;
            existingMeeting.parent = meeting.parent;
            existingMeeting.meetingDateTime = meeting.meetingDateTime;
            existingMeeting.agenda = meeting.agenda;
            existingMeeting.meetingType = meeting.meetingType;
            existingMeeting.duration = meeting.duration;
            existingMeeting.notes = meeting.notes;

            await existingMeeting.save();
            const updatedMeeting = await Meeting.findById(existingMeeting._id).populate('school').populate('teacher').populate('parent').exec();
            return updatedMeeting;
        }
    }
}
module.exports = resolvers;