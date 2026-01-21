document.addEventListener('DOMContentLoaded', () => {
    
    // Email Copy Functionality
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = "imimsoomin@gmail.com"; // Hardcoded for safety or extract from href
            
            // Try to write to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show simple feedback
                const originalText = emailLink.textContent;
                emailLink.textContent = "Email Copied! 📧";
                setTimeout(() => {
                    emailLink.textContent = originalText;
                     // Optional: Open mail client after copy if user wants
                    window.location.href = `mailto:${email}`;
                }, 800);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                window.location.href = `mailto:${email}`;
            });
        });
    }

    // Floating Action Button Interaction
    const fab = document.querySelector('.fab');
    
    if (fab) {
        fab.addEventListener('click', () => {
            // Simple toggle animation or action
            fab.style.transform = 'scale(0.9)';
            setTimeout(() => {
                fab.style.transform = 'scale(1)';
            }, 100);

            // In a real app, this would open a menu
            alert('Menu button clicked! (Functional menu to be implemented)');
        });
    }

    // Scroll Animation for Timeline Items (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;

        observer.observe(card);
    });
});

/**
 * Toggles the visibility of the project detail card.
 * @param {string} projectId - The ID of the project.
 * @param {Event} event - The click event object.
 */
function toggleProjectCard(projectId, event) {
    // Prevent toggling if clicking inside the detail content area
    if (event.target.closest('.project-detail-content')) {
        return; // Don't toggle if clicking inside the expanded detail section
    }
    
    // Also prevent if clicking specific interactive elements
    if (event.target.closest('.view-more-btn') || event.target.closest('a') || event.target.closest('button')) {
        return; // Don't toggle if clicking a specific action button
    }

    const section = document.getElementById(projectId);
    const detailSection = document.getElementById(`${projectId}-detail`);
    const icon = section.querySelector('.toggle-icon');
    
    // Toggle state
    if (section.classList.contains('collapsed')) {
        // Expand
        section.classList.remove('collapsed');
        section.classList.add('expanded');
        detailSection.style.display = 'block';
        if(icon) icon.className = 'fas fa-chevron-up toggle-icon';
        
        // Optional: Scroll to card top if needed
    } else {
        // Collapse
        section.classList.remove('expanded');
        section.classList.add('collapsed');
        detailSection.style.display = 'none';
        if(icon) icon.className = 'fas fa-chevron-down toggle-icon';
    }
}

/**
 * Switches the active tab in the project detail section (for BeauTrip).
 */
function switchDetailTab(projectId, tabName) {
    // Prevent card toggle when clicking tab
    if(event) event.stopPropagation();

    // 1. Remove active class from buttons
    const navItems = document.querySelectorAll(`#${projectId}-detail .nav-item`);
    navItems.forEach(item => item.classList.remove('active'));
    
    // 2. Add active to clicked button
    if(event.currentTarget) event.currentTarget.classList.add('active');

    // 3. Hide all sections
    const sections = document.querySelectorAll(`#${projectId}-detail .detail-section`);
    sections.forEach(sec => sec.classList.remove('active'));
    sections.forEach(sec => sec.style.display = 'none'); // Ensure display none

    // 4. Show target
    const targetSection = document.getElementById(`${projectId}-${tabName}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
}

