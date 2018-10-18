const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  //author: authorSchema
  //author: {
  //  type: authorSchema,
  //  required: true
  //}
  authors: [authorSchema]
}));

//async function createCourse(name, author) {
async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //const course = await Course.findById(courseId);
  const course = await Course.update({_id: courseId}, {
    //MUDA A PROPRIEDADE
    //$set: {
    //EXCLUI A PROPRIEDADE
    $unset: {
      'author' : ''
    }
  });
  //course.author.name = 'Mosh Hamedani';
  //course.save();
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
//updateAuthor('5bb77e47dad5fc2f501e64eb'); //ID DO CURSO
/*createCourse('Node Course', [
  new Author({name: 'Mosh'}),
  new Author({name: 'John'})
]);
*/
//addAuthor('5bb78213c6d6e020f047e221', new Author({name: 'Amy'}));
removeAuthor('5bb78213c6d6e020f047e221', '5bb783455df8650128ef70a2');