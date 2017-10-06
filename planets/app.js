// EASY: Create a node application that will read all of the planets in the solar system from a text file and print them to the console.
// Text file: mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto (I still believe in you pluto)

const fs = require('fs');
var planets = fs.readFileSync('planets.txt', 'utf-8').toString().split(',');

planets.forEach(function(planet) {
    console.log(planet);
});
