console.log('Before');

//setTimeout É UM EXEMPLO DE FUNÇÃO ASSINCRONA OU NON-BLOCKING FUNCTION
//setTimeout(()=>{
//    console.log('Reading a user from a database...');
//}, 2000);

//const user = getUser(1);
//console.log(user);

//EXEMPLO DE UM CALLBACK FUNCTION
//getUser(1, getRepositories);

getUser(1).then(user => getRepositories(user.gitHubUsername))
    .then(repositories => getCommits(repositories[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));


console.log('After');
//Async and Await approach
//ESPERA O RESULTADO
//INTERNAMENTE O PADRÃO Async and Await utiliza Promises, nosso código ainda continua assincrono
//MAS PARA E É FEITO A LEITURA DE FORMA SINCRONA
//NÃO EXISTE catch() NO ASYNC AND AWAIT, ENTÃO É UTILIZADO O try/catch
function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err) {
        console.log('Error', err.message);
    }
    
}

displayCommits();

function getRepositories(user){
    console.log('User', user);
    //GET THE REPOSITORIES
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repositories) {
    console.log('Repositories', repositories);
    //NÃO ESTOU CHAMANDO A FUNÇÃO, APENAS PASSANDO A REFERÊNCIA DELA
    getCommits(repositories, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

//3 PATTERNS PARA LIDAR COM CÓDIGOS ASSINCRONOS
//Callbacks
//Promises
//Async/await
//CALLBACK É UMA FUNÇÃO QUE SERÁ CHAMADA QUANDO UMA FUNÇÃO ASSINCRONA É FINALIZADA
//function getUser(id, callback) {
function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'mosh'});
            //callback({id: id, gitHubUsername: 'mosh'});
        }, 2000);

    });

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Getting repositories...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
    
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
    
}

//Asynchrnous implementation
//POR CONTA DOS CALLBACKS FICA DIFICIL DE ENTENDER
//E ISSO CHAMA CALLBACK HELL OU ÁRVORE DE NATAL
/*
console.log('Before');
getUser(1, ()=>{
    getRepositories(user.gitHubUsername, (repos)=>{
        getCommits(repo, (commits)=>{
            //CALLBACK HELL
        });
    });
});
console.log('After');
*/
//Synchronous implementation
//IMPLEMENTAÇÃO SINCRONO É FÁCIL DE LER E DE ENTENDER
/*
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');
*/