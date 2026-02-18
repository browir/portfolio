const projects = [
    {
        name: "Decision Support System – Best Goat Selection",
        method: "SMART (Simple Multi Attribute Rating Technique)",
        tech: ["PHP","HTML", "CSS", "MySQL", "JavaScript", "Bootstrap"],
        desc: "AI-driven decision support system for ranking livestock based on weighted criteria.",
        img: "img/goat.png"
    },
    {
        name: "Decision Support System – Best Cadre Selection",
        method: "SAW (Simple Additive Weighting)",
        tech: ["PHP","HTML", "CSS", "MySQL", "JavaScript", "Bootstrap"],
        desc: "Data-driven application to evaluate and select optimal candidates.",
        img: "img/cadre.png"
    },
    {
        name: "Decision Support System – Class Leader Selection",
        method: "MAUT (Multi-Attribute Utility Theory)",
        tech: ["PHP","HTML", "CSS", "MySQL", "JavaScript", "Bootstrap"],
        desc: "Utility-based decision support system for leadership selection.",
        img: "img/class_leader.png"
    },
    {
        name: "Decision Support System – Printer Selection",
        method: "SAW (Simple Additive Weighting)",
        tech: ["PHP","HTML", "CSS", "MySQL", "JavaScript", "Bootstrap"],
        desc: "Utility-based decision support system for selecting optimal printers.",
        img: "img/printer.png"
    },
    {
        name: "Hospital Virtual Assistant Chatbot",
        method: "RAG (Retrieval-Augmented Generation)",
        tech: ["Python", "Streamlit", "LangChain"],
        desc: "AI-powered chatbot for hospital information and assistance.",
        img: "img/chatbot.png"
    }
];

const container = document.getElementById("project-container");

projects.forEach(p => {
    container.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${p.img}" class="card-img-top" style="height:220px;object-fit:cover">
                <div class="card-body">
                    <h5 class="fw-bold text-light">${p.name}</h5>
                    <p class="text-muted mb-1"><strong>Method:</strong> ${p.method}</p>
                    <p class="text-muted">${p.desc}</p>
                    <small class="text-muted">
                        <strong>Tech:</strong> ${p.tech.join(", ")}
                    </small>
                </div>
            </div>
        </div>
    `;
});


const revealElements = document.querySelectorAll(".reveal, .card");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove("active"));
            if(link) link.classList.add("active");
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===== ANIMATED SKILLS =====
class SkillsAnimator {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.currentIndex = 0;
        this.interval = null;
        this.isAnimating = false;
    }

    start() {
        if (this.skillItems.length === 0) return;

        // Stop any existing animation first
        this.stop();

        // Reset state
        this.currentIndex = 0;
        this.isAnimating = false;

        // Clear any existing highlights
        this.skillItems.forEach(skill => {
            skill.classList.remove('highlight');
        });

        // Show all skills initially
        this.skillItems.forEach(skill => skill.classList.add('active'));

        // Start highlighting from first skill
        this.skillItems[0].classList.add('highlight');

        // Set up interval for moving highlight
        this.interval = setInterval(() => {
            this.nextSkill();
        }, 1500); // Move highlight every 1.5 seconds
    }

    nextSkill() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Remove current highlight
        this.skillItems[this.currentIndex].classList.remove('highlight');

        // Move to next skill
        this.currentIndex = (this.currentIndex + 1) % this.skillItems.length;

        // Add highlight to next skill
        this.skillItems[this.currentIndex].classList.add('highlight');

        this.isAnimating = false;
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize skills animation when skills section comes into view
const skillsSection = document.getElementById('skills');
const skillsAnimator = new SkillsAnimator();

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsAnimator.start();
        } else {
            skillsAnimator.stop();
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
