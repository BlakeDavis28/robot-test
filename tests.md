```place(0, 0, 'north');
move();
console.log(report());
console.assert(report() === '0, 1, 'north); 
place(0, 0, 'north');
turn('left');
console.log(report());
console.assert(report() === '0, 0, 'west');
place(1, 2, 'east');
move();
move();
turn('left');
move();
console.log(report());
console.assert(report() === '3, 3, 'north');
place(-1, -1, 'north');```
