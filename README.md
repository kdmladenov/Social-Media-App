# Social Media Site

A Full-stack Facebook-like social media site that allows users to share stories, create posts, manage user profiles, save posts, and connect with friends.

A deployed version of the site can be accessed [here](https://social-media-app-99689.web.app/).

## Table of Contents

- [Social Media Site](#social-media-site)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Images](#images)

## Overview

This repository contains the source code for a Full-stack social media site with functionalities similar to Facebook. It provides users with the ability to share stories, create posts, manage their user profiles, save posts, and connect with friends. The site aims to provide a familiar user experience while leveraging modern web technologies. All of the component's code is fully custom and written from scratch without any 3rd party libraries (like Bootstrap).

## Features

1. **Stories**: Users can share short-lived stories with their friends. Stories can contain text and images.
2. **Posts**: Users can create posts to share with their friends. Posts can include text, images, emotions, tagged friends and places. Users can like, comment on the post or the specific post image.
3. **User Profile**: Each user has a dedicated profile page where they can update their personal information, profile picture and cover photo. They can view their photo gallery and their friends.
4. **Saved Posts**: Users can save posts that they find interesting or want to revisit later. Saved posts can be grouped in separate collections.
5. **Friends Page**: Users can search for and add friends to their network. They can send and receive friends requests, choose from suggested friends or search from all users. They can view the timelines of their friendship history and also the upcoming friend's birthdays.

## Technologies Used

- Front-end: React.js, JavaScript, TypeScript, HTML, CSS, Redux
- Back-end: Node.js, Express.js, TypeScript, MariaDB/ MySQL
- Authentication: JSON Web Tokens (JWT)
- Additional Libraries and Tools: Axios, React Router, Passport, Bcrypt, Googleapis, Nodemailer

## Installation

1. Clone the repository: `git clone https://github.com/kdmladenov/Social-Media-App.git`
2. Back-end: Install dependencies and compile TS in the backend folder: `npm i; npm run build`
3. Front-end: Install dependencies in the frontend folder: `npm i;`

## Usage

1. Start the backend API in the backend folder : `npm start`
1. Start the development server in the frontend: `npm start`
2. Access the site in your browser at `http://localhost:3000`

## License

This project is a restricted personal project of Krasimir Mladenov. All rights reserved. Unauthorized copying, reproduction, or distribution of this repository, either in its entirety or any part of it, is strictly prohibited. Modification or commercial use of the source code or any associated materials without explicit permission from Krasimir Mladenov is not allowed.

Please note that this license only applies to the specific project owned by Krasimir Mladenov and may not be applicable to any other projects or repositories.

## Images

Home screen
![](/assets/images/1.png)

Post create - images upload
![](/assets/images/2.png)


Post create - images uploaded & comment
![](/assets/images/3.png)

Post create - tag friends
![](/assets/images/5.png)

Post create - add a feeling
![](/assets/images/6.png)

Post create - tag a location
![](/assets/images/7.png)

Post comments and reactions
![](/assets/images/8.png)

Post Image Modal - comments and reactions
![](/assets/images/9.png)

Stories
![](/assets/images/10.png)

Stories create - add image and comment edit
![](/assets/images/11.png)

User Profile
![](/assets/images/12.png)

User Profile - info
![](/assets/images/13.png)

User Profile - info edit
![](/assets/images/14.png)

User Profile - friends
![](/assets/images/15.png)

User Profile - all photos
![](/assets/images/16.png)

Friends page - home + suggestions
![](/assets/images/17.png)

Friends page - all friends
![](/assets/images/18.png)

Friends page - timeline
![](/assets/images/19.png)

Saved posts page
![](/assets/images/20.png)

Mobile view - Home

![](/assets/images/21.png)

Mobile view - Stories

![](/assets/images/22.png)

Mobile view - Post image

![](/assets/images/23.png)

Mobile view - Profile

![](/assets/images/24.png)

Mobile view - All Friends

![](/assets/images/25.png)

Mobile view - Saved Posts

![](/assets/images/26.png)

Restore forgotten password

![](/assets/images/27.png)
