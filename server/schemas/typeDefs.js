const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        reviews: [Review]
        favBreweries: [Brewery]
        wishBreweries: [Brewery]
        friends: [User]
        friendCount: Int
    }

    type Brewery {
        _id: ID
        breweryId: String!
        reviews: [Review]
        avgRating: Int
        reviewCount: Int
    }

    type Review {
        reviewText: String
        starRating: Int!
        reviewAuthor: String!
        createdAt: String
        breweryId: Brewery
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        # breweries
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        # editUser()
        # addReview(): Auth
        # editReview()
        # addFriend(): User
        # removeFriend(): User
        # addFavBrewery()
        # removeFavBrewery()
        # addWishBrewery()
        # removeWishBrewery()
    }  
`;

module.exports = typeDefs;