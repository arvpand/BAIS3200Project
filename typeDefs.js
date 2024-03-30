const { gql } = require('apollo-server-express');
const {GraphQLString} = require('graphql');

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        description: String
    }

    # Parent Types
    type ParentName {
        firstName: String!
        lastName: String!
    }

    type ContactInfo {
        email: String!
        phone: String!
    }

    type AlternateContact {
        email: String
        phone: String
    }


    type Parent {
        id: ID!
        parentName: ParentName!
        contactInfo: ContactInfo!
        alternateContact: AlternateContact
        relationshipToStudent: String
    }

    # School Types
    type Address {
        street: String
        city: String
        province: String
        postalCode: String
    }

    type SchoolContact {
        email: String!
        phone: String!
    }

    type School {
        id: ID!
        schoolName: String!
        address: Address!
        schoolContact: SchoolContact!
        schoolType: String!
    }

    #Teacher Types
    type TeacherName {
        firstName: String!
        lastName: String!
    }

    type Teacher {
        id: ID!
        teacherName: TeacherName!
        email: String!
        subjectsTaught: [String]
        phoneExtension: Int,
        school: School
    }

    # Student Types
    type StudentName {
        firstName: String!
        lastName: String!
    }

    type Student {
        id: ID!
        studentName: StudentName!
        grade: Int!
        allergies: String
        medicalConditions: [String]
        parent: Parent
    }

    # Query 
    type Query {
        hello: String
        getAllPosts: [Post]
        getPost(id: ID!): Post

        # Parent Queries
        getAllParents: [Parent]
        getParent(id: ID!): Parent

        # School Queries
        getAllSchools: [School]
        getSchool(id: ID!): School

        # Teacher Queries
        getAllTeachers: [Teacher]
        getTeacher(id: ID!): Teacher

        # Student Queries
        getAllStudents: [Student]
        getStudent(id: ID!): Student
    }

    input PostInput {
        title: String!
        description: String
    }

    input ParentNameInput {
        firstName: String!
        lastName: String!
    }

    input ContactInfoInput {
        email: String!
        phone: String!
    }

    input AlternateContactInput {
        email: String
        phone: String
    }

    input ParentInput {
        parentName: ParentNameInput!
        contactInfo: ContactInfoInput!
        alternateContact: AlternateContactInput
        relationshipToStudent: String
    }

    input SchoolAddressInput {
        street: String
        city: String
        province: String
        postalCode: String
    }

    input SchoolContactInput {
        email: String!
        phone: String!
    }

    input SchoolInput {
        schoolName: String!
        address: SchoolAddressInput
        schoolContact: SchoolContactInput!
        schoolType: String!
    }

    input TeacherNameInput {
        firstName: String!
        lastName: String!
    }

    input TeacherInput {
        teacherName: TeacherNameInput!
        email: String!
        subjectsTaught: [String]
        phoneExtension: Int,
        school: ID
    }

    input StudentNameInput {
        firstName: String!
        lastName: String!
    }

    input StudentInput {
        studentName: StudentNameInput!
        grade: Int!
        allergies: String
        medicalConditions: [String]
        parent: ID
    }

    # Mutation 
    type Mutation {
        createPost(post: PostInput): Post
        deletePost(id: ID!): String
        updatePost(id: ID!, post: PostInput): Post

        # Parent Mutations
        createParent(parent: ParentInput): Parent
        deleteParent(id: ID!): String
        updateParent(id: ID!, parent: ParentInput): Parent

        # School Mutations
        createSchool(school: SchoolInput): School
        deleteSchool(id: ID!): String
        updateSchool(id: ID!, school: SchoolInput): School

        # Teacher Mutations
        createTeacher(teacher: TeacherInput): Teacher
        deleteTeacher(id: ID!): String
        updateTeacher(id: ID!, teacher: TeacherInput): Teacher

        # Student Mutations
        createStudent(student: StudentInput): Student
        deleteStudent(id: ID!): String
        updateStudent(id: ID!, student: StudentInput): Student
    }
`

module.exports = typeDefs;