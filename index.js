// The README will be populated with the following:

// At least one badge
// Project title
// Description
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// User GitHub profile picture
// User GitHub email


const fs = require('fs')
const axios = require('axios')
const inquirer = require('inquirer')
const util = require('util')
// turn call be function into a promise function
const writeFilePromise = util.promisify(fs.writeFile)


async function readMeGenerator(){
// Question to retrive information from user inputs
let answerObj = await inquirer.prompt([{
    message: 'Enter your GitHub username',
    name: 'username'
    },
    {
    message: 'Enter your Project title',
    name: 'title'
    },
    {
    message: 'Enter your Project Description',
    name: 'description'
    },

    {
    message: 'How to install:',
    name: 'installation'
    },
    {
    message: 'Enter your project usage',
    name: 'usage'
    },
    {
    message: 'Enter your project contributor',
    name: 'contributing'
    },
    {
    message: 'Enter your project test instruction',
    name: 'tests'
    }])
// destruct the object to obtain all the variables 
let {username,title,description,installation,usage,contributing,tests} = answerObj
const queryUrl = `https://api.github.com/users/${username}`
let responseObj = await axios.get(queryUrl);
let {avatar_url : profileURL, bio, name} = responseObj.data
// Using string template to fill up the skeleton of the readme file
    let readmeTemplate = `
# ${title}

## Description

${description}

## About User

![Shows the options](${profileURL})

### User Name:

${name}

### Email:

Hidden

### About:

${bio} 

## Table of Content
    
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

${installation}

## Usage 

${usage} 


## License

Copyright 2020 - Max Guo. Code released under the MIT license.

## Badges

![ReadMe-Generator-Language](https://img.shields.io/github/languages/top/Maxguojiaqi/${title})
![ReadMe-Generator-packageJSON](https://img.shields.io/github/package-json/v/Maxguojiaqi/${title})

## Contributing

${contributing}

## Tests

${tests}

    
`
// write data to readme
await writeFilePromise('README.md',readmeTemplate)
}

readMeGenerator()