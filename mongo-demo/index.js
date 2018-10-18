const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//CONSTROI UM SCHEMA PARA UM DOCUMENTO DO MONGO
//TIPOS QUE UM SCHEMA RECEBE
//	* String
//	* Number
//	* Date
//	* Buffer - Which we use for storing binary data
//	* Boolean
//	* ObjectID which is used for assigning unit identifiers
//	* Array
const courseSchema = new mongoose.Schema({
    //name: String,
    name : { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true, //CONVERTE PARA LOWERCASE
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true, //DEIXA ASSINCRONO E PRECISA DE UM CALLBACK NA FUNÇÃO
            validator: function(v, callback) { //CUSTOM VALIDATE / VALIDADOR CUSTOMIZADO
                setTimeout(()=>{
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
                
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v), //PEGA ARREDONDADO
        set: v => Math.round(v) //SETA O VALOR ARREDONDADO
    }
});

//Classes, Objects
//Human,    John
//Course,   nodeCourse

//Collection called Course
//Pascal Upper Case
//Significa que o que me retorna uma classe
//Cria uma collection com o schema
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: 'NodeJS Course',
        category: 'WEB',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    //ASSYNC OPERATION
    //RETURN A PROMISE
    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for(field in ex.errors){
            //PEGA CADA MENSAGEM DE FORMA SEPARADA
            console.log(ex.errors[field].message);
        }
        
        //console.log(ex.message);
    }
}

async function getCourses() {

    //eq (equal)
    //ne (not equal)
    //gt (greater tham)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin (not in)

    //LOGICAL OPERATOR
    //or
    //and

    const pageNumber = 2;
    const pageSize = 10;

    // /api/courses?pageNumber=2&pageSize=10

    //const courses = await Course.find();
    //ENCONTRA O AUTOR POR MOSH
    //ATÉ 10 DOCUMENTOS
    //ORDENA POR NOME (1 SIGNIFICA TRUE)
    //ENVIA APENAS NAME E TAGS
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip((pageNumber -1) * pageSize)
    //    .find({price: {$gte: 10, $lte: 20 } })
    //  .find({ price: { $in : [10, 15, 20] } })
        //.find()
        //.or([ {author: 'Mosh'}, {isPublished: true} ])
        //.and([])

        //Starts with Mosh
        //.find({author : /^Mosh/ } )
        
        //Ends with Hamedani
        //.find({ author : /Hamedani$/i } )
        
        //Contains Mosh
        //.find({autor: /.*Mosh.*/i } )
        
        //.limit(10)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1})
        //.count();
    
    //PAGINATION
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber-1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1})
        .select({ name: 1, tags: 1});
    console.log(courses);
}

async function updateCourse(id) {
    //APPROACH: QUERY FIRST
    //findById()
    //MODIFY ITS PROPERTIES
    //SAVE()
    /*
    const course = await Course.findById(id)
    if(!course) return;

    if(course.isPublished) return;
    course.isPublished = true;
    course.author = 'Another Author';

    course.set({
        isPublished: true,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
    */
    
    //APPROACH: UPDATE FIRST
    //UPDATE DIRECTLY
    //UPTIONALLY: GET THE UPDATED DOCUMENT
    //const result = await Course.update( { _id: id}, {
    const result = await Course.findByIdAndUpdate(id,{
        $set : {
            author: 'ewq',
            isPublished: false
        }
    }, {new: true}); // new SERVE PARA PEGAR O RESULTADO JÁ ALTERADO, SEM ELE É PEGO O DOCUMENTO ORIGINAL

    console.log(result);

}

async function removeCourse(id){

    //PROCURA O PRIMEIRO E DELETA
    //const result = await Course.deleteOne({_id : id});
    const course = await Course.findByIdAndRemove(id);
    
    //console.log(result);
    console.log(course);
}

createCourse();
//getCourses();
//updateCourse('5bb4d4616ef858221004e988');
//removeCourse('5bb4d4616ef858221004e988');