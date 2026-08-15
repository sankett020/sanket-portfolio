/*
============================================================
PROJECTS DATABASE — EDIT THIS FILE TO ADD YOUR PROJECTS
============================================================

For every new project:
1. Put the project screenshot inside images/projects/
2. Copy one project object below.
3. Change its information.
4. Set featured: true if it should appear on the Home page.

Categories:
- Web Development
- AI
- Design
- Content

Use "#" for liveUrl/githubUrl until you have a real link.
============================================================
*/

const projects = [

  {
    id: "gym-website",
    title: "Gym Website",
    category: "Web Development",
    description: "A modern responsive gym website built to showcase fitness programs, trainers, facilities, and services with an engaging user experience.",
    image: "images/projects/gym.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://sankett020.github.io/gym-website/",
    githubUrl: "https://github.com/sankett020/gym-website",
    featured: true
  },

  {
    id: "ai-website",
    title: "Saathi AI",
    category: "Web Development",
    description: "Saathi AI is an AI-powered virtual assistant built to deliver intelligent conversations, personalized responses, and helpful assistance through a modern, interactive interface.",
    image: "images/projects/Saathi.png",
    technologies: ["HTML", "CSS - Via Talwind CSS & Post CSS", "JavaScript", "Git", "Open AI", "Rest APIs", "Python", "C++" ],
    liveUrl: "https://saathibetaversion.vercel.app/",
    githubUrl: "#",
    featured: true
  },

  // {
  //   id: "business-landing-page",
  //   title: "Business Landing Page",
  //   category: "Web Development",
  //   description: "A responsive landing page designed to present a business clearly and professionally.",
  //   image: "images/projects/business.svg",
  //   technologies: ["HTML", "CSS", "JavaScript"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: true
  // },

  {
    id: "cafe-pink-hauz-khas",
    title: "Cafe Pink — Hauz Khas",
    category: "Web Development",
    description: "A modern, responsive website for Cafe Pink, designed to showcase its ambience, menu, gallery, reviews, and dining experience with interactive and engaging user interactions.",
    image: "images/projects/cafe.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://sankett020.github.io/cafe/",
    githubUrl: "https://github.com/sankett020/cafe",
    featured: true
  },

  // {
  //   id: "creative-content",
  //   title: "Creative Content",
  //   category: "Design",
  //   description: "Creative visuals and social media content designed to help brands communicate and grow.",
  //   image: "images/projects/creative.svg",
  //   technologies: ["Figma", "Canva", "Photoshop"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: true
  // }

  /*
  ------------------------------------------------------------
  ADD YOUR NEXT PROJECT LIKE THIS:

  ,


  ------------------------------------------------------------
  */
];

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card project-card-live";

  const tags = project.technologies
    .map(tech => `<i>${tech}</i>`)
    .join("");

  const live =
    project.liveUrl && project.liveUrl !== "#"
      ? `<a class="project-action primary-action" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Site ↗</a>`
      : `<span class="project-action disabled-action">Live Site</span>`;

  const github =
    project.githubUrl && project.githubUrl !== "#"
      ? `<a class="project-action" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
      : "";

  card.innerHTML = `
    <div class="project-image project-thumbnail">
      <img src="${project.image}" alt="${project.title} project thumbnail" loading="lazy">
      <div class="project-overlay">
        <span>Project Preview</span>
        <strong>↗</strong>
      </div>
    </div>

    <div class="project-body">
      <div class="project-title-row">
        <div>
          <h3>${project.title}</h3>
          <span>${project.category}</span>
        </div>
      </div>

      <p>${project.description}</p>

      <div class="tags">${tags}</div>

      <div class="project-actions">
        ${live}
        ${github}
      </div>
    </div>
  `;

  return card;
}

function renderFeaturedProjects() {
  const container = document.getElementById("featured-projects");
  if (!container) return;

  container.innerHTML = "";

  projects
    .filter(project => project.featured)
    .slice(0, 3)
    .forEach(project => {
      container.appendChild(createProjectCard(project));
    });
}

function renderAllProjects(filter = "All") {
  const container = document.getElementById("all-projects");
  if (!container) return;

  const visible =
    filter === "All"
      ? projects
      : projects.filter(project => project.category === filter);

  container.innerHTML = "";

  if (!visible.length) {
    container.innerHTML = `
      <div class="empty-projects">
        <h3>No projects in this category yet.</h3>
        <p>Add one in <strong>projects.js</strong>.</p>
      </div>
    `;
    return;
  }

  visible.forEach(project => {
    container.appendChild(createProjectCard(project));
  });
}

function setupProjectFilters() {
  const filters = document.querySelectorAll(".project-filter");

  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      renderAllProjects(button.dataset.filter);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProjects();
  renderAllProjects();
  setupProjectFilters();

  const count = document.getElementById("project-count");
  if (count) count.textContent = projects.length;
});
