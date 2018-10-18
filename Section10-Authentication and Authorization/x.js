//WE BUILT THIS APIS
// /api/genres
// /api/movies
// /api/customers
// /api/rentals

// Authentication - IS THE PROCESS OF INDETIFYING IF THE USER IS WHO THEY CLAIM HE ARE
// Autorization - RIGHT PERMISSION TO DO WHAT HE WANT

//2 new endpoints
//Register: POST /api/users {name, email, password}
//Login: POST (Creating a new resource) /api/logins

email: {
    type: String,
    unique: true
}
