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
 * Toggles the visibility of the project detail section.
 * @param {string} projectId - The ID of the project (e.g., 'beautrip').
 * @param {Event} event - The click event object.
 */
function toggleProjectDetail(projectId, event) {
    if (event) event.preventDefault();
    
    const detailSection = document.getElementById(`${projectId}-detail`);
    const btnIcon = event.target.querySelector('i');
    
    if (detailSection.style.display === 'none') {
        detailSection.style.display = 'block';
        if (btnIcon) btnIcon.className = 'fas fa-chevron-up';
        
        // Scroll to the detail section comfortably
        setTimeout(() => {
            detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        detailSection.style.display = 'none';
        if (btnIcon) btnIcon.className = 'fas fa-chevron-down';
    }
}

/**
 * Switches the active tab in the project detail section.
 * @param {string} projectId - The ID of the project.
 * @param {string} tabName - The name of the tab to switch to (e.g., 'problem', 'strategy').
 */
function switchDetailTab(projectId, tabName) {
    // 1. Remove active class from all nav items in this project
    const navItems = document.querySelectorAll(`#${projectId}-detail .nav-item`);
    navItems.forEach(item => item.classList.remove('active'));
    
    // 2. Add active class to the clicked nav item
    // Note: We use the event.target, but since we call this inline, we need to find the specific button corresponding to the tab data if passed, 
    // or efficiently just assume the caller handles the UI state if we were using event listeners. 
    // However, since we are using inline onclick, we simply target the button text or index. 
    // A better approach for inline: use the event.currentTarget.
    // Let's refine the inline call in HTML to pass 'this' or handle it here via querySelector.
    // Simpler approach: Find the button that calls this function with specific arguments? 
    // Actually, let's fix the HTML to pass `this` effectively or just loop through buttons to find matching text/attribute.
    // To be robust, let's look for the specific button based on the function call logic or rely on the HTML structure I built.
    // The HTML is: onclick="switchDetailTab('beautrip', 'problem')"
    // We can just iterate the buttons and check their onclick attribute or use a data attribute approach. 
    
    // Let's assume the user clicks the button. WE need to visually update the button state.
    // Let's grab the button that triggered the event.
    const targetBtn = event.currentTarget; 
    if (targetBtn) targetBtn.classList.add('active');

    // 3. Hide all detail sections
    const sections = document.querySelectorAll(`#${projectId}-detail .detail-section`);
    sections.forEach(sec => sec.classList.remove('active'));
    
    // 4. Show the target section
    const targetSection = document.getElementById(`${projectId}-${tabName}`);
    if (targetSection) targetSection.classList.add('active');
}

