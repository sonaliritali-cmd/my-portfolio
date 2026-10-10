
/* =====================================
   MY DIGITAL SPACE — JAVASCRIPT
===================================== */

/* 1. DAY / NIGHT THEME */

const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const otherTheme = document.getElementById("otherTheme");

function applyTheme(theme) {
    document.body.classList.toggle("night", theme === "night");

    themeLabel.textContent = theme === "night" ? "NIGHT" : "DAY";
    otherTheme.textContent = theme === "night" ? "DAY" : "NIGHT";

    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        console.log("Theme preference could not be saved.");
    }
}

let savedTheme = "day";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "day";
} catch (error) {
    console.log("Using the default theme.");
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("night")
        ? "day"
        : "night";

    applyTheme(nextTheme);
});


/* 2. FULL-SCREEN MENU */

const menuOverlay = document.getElementById("menuOverlay");
const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");

function openMenu() {
    menuOverlay.classList.add("open");
    menuOverlay.setAttribute("aria-hidden", "false");
    menuOpen.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    menuClose.focus();
}

function closeMenu() {
    menuOverlay.classList.remove("open");
    menuOverlay.setAttribute("aria-hidden", "true");
    menuOpen.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    menuOpen.focus();
}

menuOpen.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        menuOverlay.classList.remove("open");
        menuOverlay.setAttribute("aria-hidden", "true");
        menuOpen.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 150);
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuOverlay.classList.contains("open")) {
        closeMenu();
    }
});


/* 3. ANIMATED HERO TEXT */

const changingRole = document.getElementById("changingRole");

const roles = [
    "FRONTEND DEVELOPER",
    "UI/UX ENTHUSIAST",
    "PROMPT ENGINEER",
    "CREATIVE CODER",
    "AI EXPLORER"
];

let roleIndex = 0;

function changeRole() {
    if (!changingRole) return;

    changingRole.style.opacity = "0";
    changingRole.style.transform = "translateY(5px)";

    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        changingRole.textContent = roles[roleIndex];
        changingRole.style.opacity = "1";
        changingRole.style.transform = "translateY(0)";
    }, 250);
}

changingRole.style.transition = "opacity 0.25s, transform 0.25s";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(changeRole, 2400);
}


/* 4. INTERACTIVE ORB */

const heroArt = document.getElementById("heroArt");
const orb = document.getElementById("orb");

if (heroArt && orb) {
    heroArt.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;

        const rect = heroArt.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        orb.style.transform =
            `translate(${x * 16}px, ${y * 16}px) rotateX(${-y * 16}deg) rotateY(${x * 18}deg)`;
    });

    heroArt.addEventListener("pointerleave", () => {
        orb.style.transform = "";
    });
}


/* 5. READ MORE ABOUT ME */

const readMore = document.getElementById("readMore");
const moreBio = document.getElementById("moreBio");

readMore.addEventListener("click", () => {
    const expanded = readMore.getAttribute("aria-expanded") === "true";

    readMore.setAttribute("aria-expanded", String(!expanded));
    moreBio.hidden = expanded;

    readMore.innerHTML = expanded
        ? 'READ MORE <span>＋</span>'
        : 'READ LESS <span>−</span>';
});


/* 6. INTERACTIVE SKILL CONSTELLATION */

const skillData = {
    "HTML5": {
        description: "Structuring clear, semantic and accessible web pages.",
        tags: ["SEMANTIC HTML", "FORMS", "ACCESSIBILITY"]
    },

    "CSS3": {
        description: "Styling responsive websites with layouts, animations and visual details.",
        tags: ["FLEXBOX", "GRID", "ANIMATIONS", "RESPONSIVE"]
    },

    "JavaScript": {
        description: "Making web pages interactive with JavaScript fundamentals.",
        tags: ["DOM", "ES6+", "APIs", "ASYNC", "JSON"]
    },

    "React": {
        description: "Exploring component-based interfaces and reusable UI patterns.",
        tags: ["COMPONENTS", "PROPS", "STATE", "JSX"]
    },

    "Python": {
        description: "Learning programming fundamentals and practical problem-solving.",
        tags: ["VARIABLES", "FUNCTIONS", "OOP", "DATA STRUCTURES"]
    },

    "Java": {
        description: "Practising object-oriented programming and core Java concepts.",
        tags: ["CLASSES", "OBJECTS", "INHERITANCE", "METHODS"]
    },

    "SQL": {
        description: "Learning how to organize, retrieve and manage structured data.",
        tags: ["SELECT", "JOINS", "FILTERS", "DATABASES"]
    },

    "Git": {
        description: "Tracking code changes and learning version-control workflows.",
        tags: ["COMMITS", "BRANCHES", "MERGE", "VERSION CONTROL"]
    },

    "GitHub": {
        description: "Managing repositories and sharing projects with others.",
        tags: ["REPOSITORIES", "README", "PULL REQUESTS", "PAGES"]
    },

    "UI/UX": {
        description: "Exploring user-centred interfaces, layouts and usability.",
        tags: ["WIREFRAMES", "USER FLOWS", "USABILITY", "LAYOUTS"]
    },

    "Figma": {
        description: "Exploring interface mockups, prototypes and collaborative design.",
        tags: ["FRAMES", "COMPONENTS", "PROTOTYPES", "AUTO LAYOUT"]
    },

    "Prompt Engineering": {
        description: "Writing structured instructions to guide AI tools towards useful outputs.",
        tags: [
            "AI WORKFLOWS",
            "PROMPT DESIGN",
            "LLM INTERACTION",
            "AI CONTENT",
            "TASK AUTOMATION"
        ]
    }
};

const skillNodes = document.querySelectorAll(".skill-node");
const skillTitle = document.getElementById("skillTitle");
const skillDescription = document.getElementById("skillDescription");
const skillTags = document.getElementById("skillTags");
const skillNumber = document.getElementById("skillNumber");

function showSkill(name) {
    const skill = skillData[name];

    if (!skill) return;

    skillNodes.forEach(node => {
        node.classList.toggle("active", node.dataset.skill === name);
    });

    skillTitle.textContent = name;
    skillDescription.textContent = skill.description;

    skillTags.replaceChildren();

    skill.tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        skillTags.appendChild(span);
    });

    const index = Object.keys(skillData).indexOf(name) + 1;
    skillNumber.textContent = String(index).padStart(2, "0");
}

skillNodes.forEach(node => {
    node.addEventListener("click", () => {
        showSkill(node.dataset.skill);
    });
});

showSkill("HTML5");


/* 7. PROJECT DATA
   Add as many projects as you want.
   Replace the sample URLs and details with your own.
*/

const projects = [
    {
        number: "01",
        title: "Personal Portfolio",
        description:
            "A responsive personal website to introduce my skills, learning journey and projects.",
        image: "",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/",
        demo: "#home",
        color: "#F5DDE7"
    },

    {
        number: "02",
        title: "Chat Application",
        description:
            "A messaging interface concept with conversation lists, message bubbles and responsive layouts.",
        image: "",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/",
        demo: "#projects",
        color: "#DDEFE5"
    },

    {
        number: "03",
        title: "Student Assignment Tracker",
        description:
            "A student-friendly interface concept for organizing subjects, assignment deadlines and progress.",
        image: "",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/",
        demo: "#projects",
        color: "#F9EEC8"
    },

    {
        number: "04",
        title: "AI Prompt Collection",
        description:
            "A collection of reusable prompts for coding practice, web design ideas and learning workflows.",
        image: "",
        technologies: ["AI", "Prompt Engineering", "Documentation"],
        github: "https://github.com/",
        demo: "#ai",
        color: "#E8E1F5"
    }
];

const projectDeck = document.getElementById("projectDeck");

function createProject(project) {
    const panel = document.createElement("article");
    panel.className = "project-panel";

    const info = document.createElement("div");
    info.className = "project-info";

    const number = document.createElement("span");
    number.className = "project-number";
    number.textContent = `PROJECT ${project.number}`;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("div");
    technologies.className = "project-tech";

    project.technologies.forEach(technology => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        technologies.appendChild(tag);
    });

    const links = document.createElement("div");
    links.className = "project-links";

    const githubLink = document.createElement("a");
    githubLink.href = project.github;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.textContent = "GITHUB ↗";

    const demoLink = document.createElement("a");
    demoLink.href = project.demo;
    demoLink.textContent = "VIEW PROJECT →";

    // A placeholder destination should not pretend to be a real project demo.
    if (
        !project.demo ||
        project.demo === "#" ||
        project.demo.startsWith("#")
    ) {
        demoLink.addEventListener("click", event => {
            event.preventDefault();
            alert("Add your real live project demo URL in script.js.");
        });
    } else {
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
    }

    links.append(githubLink, demoLink);

    info.append(number, title, description, technologies, links);

    const visual = document.createElement("div");
    visual.className = "project-visual";
    visual.style.setProperty("--project-bg", project.color || "#F5DDE7");

    // A custom screenshot can be added for each project.
    if (project.image) {
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = `${project.title} project screenshot`;
        image.loading = "lazy";

        image.addEventListener("load", () => {
            visual.classList.add("has-image");
        });

        image.addEventListener("error", () => {
            image.remove();
            visual.classList.remove("has-image");
        });

        visual.appendChild(image);
    }

    // A CSS preview is used until a real screenshot is provided.
    const windowPreview = document.createElement("div");
    windowPreview.className = "visual-window";

    const windowTop = document.createElement("div");
    windowTop.className = "visual-window-top";

    for (let i = 0; i < 3; i++) {
        windowTop.appendChild(document.createElement("i"));
    }

    const windowBody = document.createElement("div");
    windowBody.className = "visual-window-body";

    const side = document.createElement("div");
    side.className = "visual-side";

    const content = document.createElement("div");
    content.className = "visual-content";

    const line1 = document.createElement("div");
    line1.className = "visual-line short";

    const line2 = document.createElement("div");
    line2.className = "visual-line";

    const line3 = document.createElement("div");
    line3.className = "visual-line";

    const block = document.createElement("div");
    block.className = "visual-block";

    content.append(line1, line2, line3, block);
    windowBody.append(side, content);
    windowPreview.append(windowTop, windowBody);
    visual.appendChild(windowPreview);

    panel.append(info, visual);

    return panel;
}

function renderProjects() {
    projectDeck.replaceChildren();

    projects.forEach(project => {
        projectDeck.appendChild(createProject(project));
    });
}

renderProjects();


/* 8. PROMPT ENGINEERING SHOWCASE */

const promptExamples = {
    web: {
        prompt:
            "Act as a UI/UX design assistant. Suggest a clean, responsive portfolio layout for a BCA student. Use warm neutral colours, accessible typography, clear navigation and mobile-friendly sections.",
        title: "A Clear Website Blueprint",
        result:
            "A structured layout recommendation with a hero, profile, skills, projects, responsive navigation and contact section.",
        tags: ["LAYOUT", "RESPONSIVE DESIGN", "ACCESSIBILITY"]
    },

    coding: {
        prompt:
            "Explain how to create a beginner-friendly JavaScript to-do list. Break the task into small steps, use meaningful variable names and explain how adding, completing and deleting tasks work.",
        title: "A Guided Coding Plan",
        result:
            "A step-by-step implementation outline with DOM interactions, event handling and suggestions for testing.",
        tags: ["JAVASCRIPT", "DOM", "DEBUGGING"]
    },

    content: {
        prompt:
            "Help write a professional introduction for a BCA student seeking internships. Keep it concise, truthful, friendly and focused on current skills, learning goals and projects.",
        title: "A Professional Introduction",
        result:
            "A short introduction suitable for a portfolio, with space to add real skills, project experience and career interests.",
        tags: ["WRITING", "PERSONAL BRANDING", "EDITING"]
    },

    research: {
        prompt:
            "Compare three beginner-friendly frontend learning resources. Organize the findings by topics covered, prerequisites, hands-on practice and official documentation links. Flag anything that needs verification.",
        title: "An Organized Comparison",
        result:
            "A comparison framework that helps evaluate learning resources while identifying claims and links that should be checked.",
        tags: ["COMPARISON", "FACT CHECKING", "LEARNING"]
    },

    automation: {
        prompt:
            "Plan a simple assignment reminder workflow. Describe the required inputs, validation rules, reminder schedule, error cases and privacy considerations. Do not send messages automatically.",
        title: "A Practical Workflow Plan",
        result:
            "A proposed workflow covering assignment data, due dates, reminder logic and error handling, ready for human review.",
        tags: ["WORKFLOW", "VALIDATION", "PRIVACY"]
    }
};

const promptTabs = document.querySelectorAll(".prompt-tab");
const promptText = document.getElementById("promptText");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultTags = document.getElementById("resultTags");

function showPrompt(category) {
    const example = promptExamples[category];

    if (!example) return;

    promptTabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.prompt === category);
        tab.setAttribute(
            "aria-pressed",
            String(tab.dataset.prompt === category)
        );
    });

    promptText.textContent = example.prompt;
    resultTitle.textContent = example.title;
    resultText.textContent = example.result;

    resultTags.replaceChildren();

    example.tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        resultTags.appendChild(span);
    });
}

promptTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        showPrompt(tab.dataset.prompt);
    });
});

showPrompt("web");


/* 9. FOOTER YEAR */

document.getElementById("year").textContent = new Date().getFullYear();


/* 10. SUBTLE SCROLL REVEAL */

if ("IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-big, .about-content, " +
        ".skills-heading, .skill-layout, .projects-title-row, " +
        ".journey-item, .ai-heading, .prompt-workspace, " +
        ".contact-main, .contact-card"
    );

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        element.classList.add("reveal-ready");
        revealObserver.observe(element);
    });
}