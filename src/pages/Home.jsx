import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Flash Card App</h1>
      <p>
        Hello, I'm Ravan Gozalov, a passionate junior Computer Science student
        at ADA University with a focus on front-end development and intermediate
        back-end skills. During my academic journey, I had the privilege of being an exchange student at ELTE University in Hungary, which enriched my cross-cultural experiences.
      </p>
      <div className="project-container">
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/FrontEnd-Nom-Nom">
            <strong>Project 1 - FrontEnd-Nom-Nom</strong>
          </a>
          <p>
            A front-end project focusing on user interface design and user experience. Check out the code on GitHub for a visually appealing web application with smooth navigation and interactive features.
          </p>
        </div>
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/BackEnd-Nom-Nom">
            <strong>Project 2 - BackEnd-Nom-Nom</strong>
          </a>
          <p>
            An intermediate back-end project, handling server-side logic and database interactions. Explore the codebase on GitHub for a deeper understanding of backend development, data management, and API integration.
          </p>
        </div>
      </div>
      <div className="project-container">
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/Cooking">
            <strong>Project 3 - Cooking</strong>
          </a>
          <p>
            A project related to cooking, with features designed for culinary enthusiasts. Find more details on GitHub and get inspired to create your own cooking-related applications, exploring recipes and sharing kitchen experiences.
          </p>
        </div>
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/Assignment2">
            <strong>Project 4 - Assignment2</strong>
          </a>
          <p>
            Another project showcasing a variety of coding assignments. Dive into the GitHub repository to explore different programming concepts, challenges, and solutions, gaining insights into problem-solving and coding techniques.
          </p>
        </div>
      </div>
      <div className="project-container">
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/Portfolio">
            <strong>Project 5 - Portfolio</strong>
          </a>
          <p>
            Check out my portfolio project on GitHub to see a collection of my work, skills, and experiences. A personal space reflecting my journey and expertise in the tech world, featuring dynamic content and responsive design.
          </p>
        </div>
        <div className="project">
          <a href="https://github.com/RevanGozelov4847/Card">
            <strong>Project 6 - Card</strong>
          </a>
          <p>
            Explore my card project on GitHub, showcasing a creative approach to design. See how visual elements combine with functionality to create a unique user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
