/** Compass data in clockwise orientation for easy value swapping */
const compassOffsets = {
    north: [0, 1],
    east: [1, 0],
    south: [0, -1],
    west: [-1, 0],
};
// Stores the names of the directions for easy lookup
const compassNames = ['north', 'east', 'south', 'west'];
// Stores the current position of the robot
let currentPosition;

const place = (x, y, dir) => {
    const coordinates = [x, y, dir];
    const { valid, error } = validPlace(coordinates);
    if (!valid) throw error;
    currentPosition = coordinates; // making a record of the current position
};

const validPlace = (coordinates) => {
    const [x, y, direction] = coordinates;
    if (x > 5 || x < 0 || y > 5 || y < 0) {
        return {
            valid: false,
            error: new Error('You placed the robot out of bounds'),
        };
    }
    if (!compassNames.includes(direction)) {
        return {
            valid: false,
            error: new Error(`The direction must be one of the following: 'north', 'east', 'south', 'west'`),
        };
    }
    return { valid: true };
};

const move = () => {
    if (!currentPosition)
        throw new Error('You must first place the robot');
    const [compassX, compassY] = compassOffsets[currentPosition[2]]; // getting the offset to move
    const [x, y, direction] = currentPosition; // extracting current position
    const [newX, newY] = [x + compassX, y + compassY]; // calculating the new positions
    if (newX <= 5 && newX >= 0 && newY <= 5 && newY >= 0) {
        // validating if the new positions are in bounds
        currentPosition = [newX, newY, direction]; // overwriting the current position with new ones
    }
};

const turn = (dir) => {
    let nextDirection;
    const currentDirection = compassNames.indexOf(currentPosition[2]);
    const [x, y] = currentPosition;
    if (dir === 'left') {
        // using modulus so its a circular array
        // also + 3 is the same as -1 when using circular arrays
        nextDirection = (currentDirection + 3) % 4;
    }
    else if (dir === 'right') {
        nextDirection = (currentDirection + 1) % 4;
    }
    else {
        throw new Error('Pass a valid direction: `right` or `left`');
    }
    currentPosition = [x, y, compassNames[nextDirection]];
};

const report = () => currentPosition.join(',').toUpperCase();
