// This code was tested on node.js version v16.13.1

// It accepts a list of names along with their points and organises those names
// according to the sum of their their points. In the case of a points tie the
// names will be listed alphabetically.

// To use this script run 'node app.js' followed by the names and points separated by commas.
// For example: node app.js Lions 3, Snakes 3, Tarantulas 1, FC Awesome 0, Lions 1, FC Awesome 1, Tarantulas 3, Snakes 1, Lions 4, Grouches 0
// Will result in   1. Lions 8
//                  2. Snakes 4
//                  2. Tarantulas 4
//                  4. FC Awesome 1
//                  5. Grouches 0

// From the stdin accept and process input from the second argument onwards
// once processed into an array, join into string and split by ',' 
const args = process.argv.slice(2).join(" ").split(",");

// Initialising arrays.
let arrayOfNamesAndPoints = [];
let arrayOfNames = [];
let arrayOfPoints = [];
let finalList = [];

// For each element in the array trim the whitespace.
args.forEach(function(element, index)
{
    arrayOfNamesAndPoints.push(element.trim());
});

// Sorting the array alphabetically.
arrayOfNamesAndPoints.sort();

// From arrayOfNamesAndPoints add names to arrayOfNames and to arrayOfPoints add points.
arrayOfNamesAndPoints.forEach(function(element, index)
{
    arrayOfNames.push(element.slice(0,element.length - 2));
    arrayOfPoints.push(element.slice(element.length - 2));
});

// The 'countOccurrences' is a function used to count the occurrences of a given value.
const countOccurrences = (array, value) => array.reduce((previousValue, currentValue) => (currentValue === value ? previousValue + 1 : previousValue),0);

// From arrayOfNames and arrayOfPoints take the elements from there and use those to
// form the final list.
while(arrayOfNames.length > 0)
{
    // Counting the occurrences.
    const count = countOccurrences(arrayOfNames, arrayOfNames[0]);

    // Initialising objectOfNameAndPoints.
    let objectOfNameAndPoints = {rank: 0, name: arrayOfNames[0], points: 0};

    // Adding up the points.
    for(let step = 0; step < count; step++)
    {
        objectOfNameAndPoints.points = parseInt(objectOfNameAndPoints.points) + parseInt(arrayOfPoints[step]);
    }

    // Popping the first elements of arrayOfNames and arrayOfPoints.
    for(let step = 0; step < count; step++)
    {
        arrayOfNames.shift();
        arrayOfPoints.shift();
    }

    // Building the final list.
    objectOfNameAndPoints.rank++;
    finalList.push(objectOfNameAndPoints);
}

// Organising the list by descending order.
finalList.sort((a, b) => {
    return b.points - a.points;
});

// Printing the elements in the final list accordingly with their 
// rank, name and points respectively.
finalList.forEach(function(element, index)
{
    // Check for the first element.
    if(index > 0)
    {
        // Check if the previous element is equal on points to this element.
        if(element.points === finalList[index-1].points)
        {
            // If the previous element's rank === 1 it means that this is 
            // the first element to match on points. 
            if(finalList[index-1].rank === 1)
            {
                // Set the element's rank to the index.
                element.rank = index;
                console.log((element.rank)+". "+element.name+" "+element.points);
            }else
            {
                // If the previous element's rank != 1 it means that this is 
                // not the first element to match on points. Which means that 
                // this element should inherit its rank. 
                element.rank = finalList[index-1].rank;
                console.log((element.rank)+". "+element.name+" "+element.points);
            }
        }else
        {
            // If the previous element is not equal on points to this element
            // print rank === index+1
            console.log((index+1)+". "+element.name+" "+element.points);
        }
    }else
    {
        // If element is the first in the list print by default with rank === 1.
        console.log((index+1)+". "+element.name+" "+element.points);
    }
});