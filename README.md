<a src="https://www.udemy.com/nodejs-master-class/" target="_blank">Link to the course</a>

<h1>Seção 01 - Getting Started</h1>

<h2>What is Node</h2>

A runtime environment for executing JavaScript code;
We often use Node to build back-end services, also called Application Programming Interface.
Web App and Mobile App communicate with API

Node is Highly-scalable, data-intensive and real-time apps.
Great for prototyping and agile development.
Superfast and higly scalable.
JavaScript everywhere
Cleaner and more consistent codebase
Large ecosystem of open-source libs

PayPal use this

A Node APP - Built twice as fast with fewer people;
		- 33% fewer lines of code;
		- 40% fewer files;
		- 2x request/sec;
		- 35% faster response time;


<h2>Node Architecture</h2>

What is a runtime environment really? 
Before Node we used javascript only to build applications that run inside a browser. 

A browser has a Javascript engine that takes our code and converts into code that a computer can undertand

<img src="imgs/01.PNG"/>

JavaScript Engines of each Browser:

<img src="imgs/02.PNG"/>

It's because of these varieties of engines, that javascript codes can behave differently in one browser or another.

In 2009 Ryan Dahl, creator of Node. He took google's v8 engine, which is the fastest JavaScript engine, and embedded it inside a C++ program and called that program Node. Node is a runtime environment for javascript code.
Both Chrome and Node share de same Javascript Engine.

Node is not a programming language!
Node is not a framework
It's a runtime environment for executing JavaScript code


<h2>How Node Works</h2>

Node is a non-blocking or asynchronous architecture.
Node applications are asynchronous by default.
Node is ideal for I/O-intensive apps.

Do not use Node for CPU-intensive apps like video encoding or an image manipulation service. In these king of applications, we have a lot of calculations that should be done by CPU, and few operations that touch the file system or the network.


<h1>Node Module System</h1>


<h2>Events Module</h2>
* A signal that something has happened
* Class called http and has the event request, that is listened by the module HTTP.

<h1>Node Package Manager (NPM)</h1>

Share modules with NPM.
Command do install npm version 5.5.1
npm i -g npm@5.5.1

g for global

<h2>Package.json</h2>

* A json file that includes some basic information about your application or your project.

* run npm init
* or run npm init --yes (You dont need to answer the questions about your application)

<h2>Installing a node package</h2>
* npm install underscore or npm i underscore

<h2>Package Dependencies</h2>
* mongoose - We use this to store our data in MongoDB

<h2>NPM Packages and Source Control</h2>
* You do not need the node_modules folder, because all the dependencies are save in package.json. You just need run npm install to install all the modules to node_modules.





