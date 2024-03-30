const mongoose = require('mongoose');
const Post = require('./models/Post.model');
const Parent = require('./models/ParentModel');
const School = require('./models/SchoolModel');
const Teacher = require('./models/TeacherModel');


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
            const { teacherName, email, subjectsTaught, phoneExtension, school } = args.teacher;
            
            const findSchool = await School.findById(school);
            if (!findSchool) {
                throw new Error('School with the provided ID not found.');
            }
            await Teacher.findByIdAndUpdate(args.id, { teacherName, email, subjectsTaught, phoneExtension, school: findSchool._id }, { new: true }).exec();
            const updatedTeacher = await Teacher.findById(args.id).populate('school').exec();
            return updatedTeacher;
        }
    }
}
module.exports = resolvers;