//TRADE OFF BETWEEN QUERY PERFORMANCE VS CONSISTENCY



// USING REFERENCES (NORMALIZATION) -> CONSISTENCY
let author = {
    name: 'Mosh'
}

let course = {
    author: 'id',
}

// USING EMBEDDED DOCUMENTS (DENORMALIZATION) -> PERFORMANCE - NÃO PODE TER OS DOIS AO MESMO TEMPO
let course = {
    author: {
        name: 'Mosh'
    }
}

//HYBRID APPROUCH
let author = {
    name: 'Mosh'
    //50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Mosh'
    }
}