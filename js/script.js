// js/script.js (replace your current file with this)

document.addEventListener("DOMContentLoaded", () => {
  // --- Helpers & elements
  const sidebarLinks = document.querySelectorAll('.sidebar nav a');
  const darkToggle = document.getElementById('dark-mode-toggle');
  const toggleBtn = document.getElementById('toggle-tech');
  const techList = document.getElementById('tech-stack');

  // Projects + filters + modal elements (queried after DOM ready)
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

  const modal = document.getElementById("project-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalTags = document.getElementById("modal-tags");
  const modalLive = document.getElementById("modal-live");
  const modalSource = document.getElementById("modal-source");
  const closeBtn = document.querySelector(".modal .close");

  // --- Debug: print counts so you can see what's detected
  console.log("PROJECT DEBUG: total project-card elements found:", projectCards.length);
  const rsCount = projectCards.filter(c => c.classList.contains('rs-gis')).length;
  const webCount = projectCards.filter(c => c.classList.contains('webgis')).length;
  console.log(`PROJECT DEBUG: rs-gis=${rsCount}, webgis=${webCount}`);

  // If totals are not what you expect, list each card and its classes
  if (projectCards.length < 6) {
    console.warn("PROJECT DEBUG: fewer than expected project cards. Listing each card and classes:");
    projectCards.forEach((c, i) => console.log(i, c.dataset.title || c.querySelector('h3')?.textContent, c.className, c.dataset));
  }

  // --- Smooth scrolling for sidebar links
  sidebarLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Dark mode toggle (safe guard)
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // --- Collapsible Tech Stack (safe guard)
  if (toggleBtn && techList) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = techList.style.display === 'none';
      techList.style.display = isHidden ? 'block' : 'none';
      toggleBtn.textContent = isHidden ? '-' : '+';
    });
  }

  // --- Utility: show/hide projects by filter
  function applyFilter(filter) {
    // if "all", show all
    projectCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = ""; // let CSS decide (default)
      } else {
        card.style.display = "none";
      }
    });
  }

  // show all by default
  applyFilter('all');

  // --- Filter button handlers
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // active class
        const active = document.querySelector('.filter-btn.active');
        if (active) active.classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';
        applyFilter(filter);
      });
    });
  }

  // --- Modal logic
  function openModalFromCard(card) {
    if (!modal) return;
    modal.style.display = 'flex';
    modalImg.src = card.dataset.img || "";
    modalTitle.textContent = card.dataset.title || card.querySelector('h3')?.textContent || "";
    modalDesc.textContent = card.dataset.desc || "";
    modalLive.href = card.dataset.live || "#";
    modalSource.href = card.dataset.source || "#";

    // tags: clear then populate <span> elements
    modalTags.innerHTML = "";
    if (card.dataset.tags) {
      card.dataset.tags.split(',').forEach(t => {
        const span = document.createElement('span');
        span.textContent = t.trim();
        span.className = 'tag-pill';
        modalTags.appendChild(span);
      });
    }
  }

  // attach click handlers to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
  });

  // close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  }
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  // final log
  console.log('PROJECT SCRIPT: initialized');
});
