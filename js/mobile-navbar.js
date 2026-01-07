document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.js-nav-link');
    const scrollLinks = document.querySelectorAll('.js-scroll-link');

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('is-open');
        body.style.overflowY = 'hidden';
        if (mobileIcon) mobileIcon.textContent = 'close';
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('is-open');
        body.style.overflowY = '';
        if (mobileIcon) mobileIcon.textContent = 'menu';
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('is-open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    function smoothScrollToTarget(targetId, event) {
        if (!targetId) return;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        if (event) event.preventDefault();

        const headerOffset = 80; // approximate header height
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        closeMobileMenu();
    }

    // Smooth scroll for nav links (desktop + mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const targetId = href.substring(1);
            smoothScrollToTarget(targetId, e);
        });
    });

    // Smooth scroll for CTA buttons with data-scroll-target
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = (link.getAttribute('data-scroll-target') || '').replace('#', '');
            smoothScrollToTarget(targetId, e);
        });
    });

    // Scroll spy: highlight nav item based on current section
    const sectionIds = Array.from(navLinks)
        .map(link => {
            const href = link.getAttribute('href') || '';
            return href.startsWith('#') ? href.substring(1) : null;
        })
        .filter((id, index, self) => id && self.indexOf(id) === index);

    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const targetId = href.startsWith('#') ? href.substring(1) : null;
            if (!targetId) return;
            if (targetId === activeId) {
                link.classList.add('nav-link-active');
            } else {
                link.classList.remove('nav-link-active');
            }
        });
    }

    if (sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                let mostVisibleEntry = null;

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                            mostVisibleEntry = entry;
                        }
                    }
                });

                if (mostVisibleEntry) {
                    const id = mostVisibleEntry.target.id;
                    setActiveLink(id);
                }
            },
            {
                root: null,
                threshold: [0.4, 0.6],
                rootMargin: '-20% 0px -40% 0px'
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    // Set initial active state (home)
    setActiveLink('home');
});
