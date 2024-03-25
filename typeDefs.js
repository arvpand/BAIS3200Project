const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        description: String
    }

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

    
    type Query {
        hello: String
        getAllPosts: [Post]
        getPost(id: ID!): Post

        getAllParents: [Parent]
        getParent(id: ID!): Parent
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

    type Mutation {
        createPost(post: PostInput): Post
        deletePost(id: ID!): String
        updatePost(id: ID!, post: PostInput): Post

        createParent(parent: ParentInput): Parent
        deleteParent(id: ID!): String
        updateParent(id: ID!, parent: ParentInput): Parent
    }
`

module.exports = typeDefs;