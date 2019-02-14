/*
This file is used to create schema of New for bdd
*/

const config = require('../config');
const mongoose = require('mongoose')
const Schema = mongoose.Schema; //Create mongoose Schema

let schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    createdBy: {type: mongoose.ObjectId, required:true},
    createdOn: { type: Date, default: Date.now },
    commentaries: {type:Array, default: []}
})

module.exports = mongoose.model('News', schema, 'news');


