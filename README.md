<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://img.icons8.com/?size=512&id=Fpssohz57mWe&format=png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">TCR SYSTEM</h3>

  <p align="center">
    Building a management system for the graduation thesis registration process <br /> for information technology students at Can Tho University
    <br />
    <a href="https://github.com/vm-phung1134/thesis-course-registration-system/files/13791776/TCR-sytem-guidelines.pdf"><strong>Documents and utilize TCR Sytem »</strong></a>
    <br />
    <br />
    <p>
      The link website: 
      <a href="https://tcr-system.vercel.app">https://tcr-system.vercel.app</a>
    </p>
    
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction-about-the-project">Introduction about the project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li> 
        <li><a href="#preview">Preview</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Introduction about the project

<p align="justify">
  The goal of the system is to enhance the user experience through interactive
activities with the registration system, based on the functions of the thesis registration
process, and reduce the workload for stakeholders through functions such as
managing and assigning instructors, progress reporting, evaluation, and monitoring.
Additionally, the system will provide users with an intuitive, user-friendly, fast, and
convenient interface. 
Furthermore, genetic algorithms will be applied to the system
to schedule thesis presentations and committees.
</p>

### Built with

The major frameworks/libraries used to build the project:

![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-092749?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=000000)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React_Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

<!-- GETTING STARTED -->

## Getting Started

Here is a process that can help you get started with your thesis registration management system project:

### Prerequisites

This is how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  yarn global add npm@latest
  ```

### Installation

Step by step project installation:

1. Setup your api to get data from server: http://your-api-example/api in `redux/api`
2. Config Firebase Authentication: https://firebase.google.com/docs/auth/web/start
3. Clone the repo
   ```sh
   git clone https://github.com/vm-phung1134/thesis-course-registration-system.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Run project
   ```js
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7. Account testing
   ```sh
   Because this is a project developed for IT industry members, testing from outside the organization is limited.
   ```

### Preview

![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/e090bdfe-db15-4940-9c8b-7c0d7a950d17)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/2781918c-73b3-4c1e-9198-a6c6ca7699e0)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/a4077408-c0b7-4fcd-8396-270c6466c513)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/1a879c59-b640-41ae-aaef-3d0670473d34)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/bdf11f73-927d-4d5a-8980-d5236f89603a)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/09b5ba25-f032-4a5b-9da7-f81d3b95cf9f)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/b1c7c8d7-d054-478f-a1d7-baaaec3107b9)
![image](https://github.com/vm-phung1134/thesis-course-registration-system/assets/106596859/675a28b4-4e6b-4441-baa0-6831a24e971b)

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- ROADMAP -->

## Features

- [x] Register for a thesis research topic
- [x] Update progress reports by phase
- [x] Applying genetic algorithms to schedule reports and dissertation committees.
- [x] Evaluate and score students upon completing their thesis defense.
- [x] Manage and make a list of room schedules, number of students, number of instructors and thesis committee.
- [x] Submit progress reports according to regulations.
- [x] Register for the thesis group and instructors.
- [x] Dark mode Support
- [x] Multi-language Support
  - [x] Vietnam
  - [x] English
- More...

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Email - vmphung1134@gmail.com

Github - https://github.com/vm-phung1134

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org
