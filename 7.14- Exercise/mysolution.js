/*
    - Exercise -

    Get all the published backend courses,
    sort them by their name,
    pick only their name and author,
    and display them.

*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({isPublished: true, tags:'backend'})
        .sort({name:1})
        //.select({name: 1, author: 1})
        .select('name author');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();
