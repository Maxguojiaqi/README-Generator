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
// Questions

// User GitHub profile picture
// User GitHub email


const fs = require('fs')
const axios = require('axios')
const inquirer = require('inquirer')
const util = require('util')

const writeFilePromise = util.promisify(fs.writeFile)


async function readMeGenerator(){

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
        message: 'Descript how to install:',
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

    let {username,title,description,installation,usage,contributing,tests} = answerObj
    const queryUrl = `https://api.github.com/users/${username}`
    let responseObj = await axios.get(queryUrl);
    let {avatar_url : profileURL, bio, name} = responseObj.data

    let readmeTemplate = `
# Your Project Title

## Description

${description}

## Table of Content
    
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

${installation}

## Usage 

${usage} 

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.



## License

The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)


---

🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![ReadMe-Generator-Language](https://img.shields.io/github/languages/top/Maxguojiaqi/${title})
![ReadMe-Generator-packageJSON](https://img.shields.io/github/package-json/v/Maxguojiaqi/${title})

## Contributing

${contributing}

## Tests

${tests}
## About User
![Shows the options](${profileURL})
### User Name:
${name}
### Email:
Hidden
### About:
${bio} 
    
`
    await writeFilePromise('README.md',readmeTemplate)
}

readMeGenerator()