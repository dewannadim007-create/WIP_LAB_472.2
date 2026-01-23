/**
 * Modern Banking Dashboard Scripts
 * Handles Theme Toggle and Sidebar Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Clear the hardcoded styles used for anti-flash so CSS variables take full control
    document.documentElement.style.backgroundColor = '';
    document.documentElement.style.color = '';

    // === Theme Toggle Logic REMOVED ===

    // === Sidebar Toggle Logic ===
    // === Sidebar Toggle Logic ===
    const sidebarToggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Check stored sidebar state
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'collapsed') {
        if (sidebar) sidebar.classList.add('collapsed');
        if (mainContent) mainContent.classList.add('expanded');
    }

    // Toggle Function
    const toggleSidebar = () => {
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            sidebar.classList.toggle('active'); // Mobile
            if (mainContent) mainContent.classList.toggle('expanded');

            // Save state
            if (sidebar.classList.contains('collapsed')) {
                localStorage.setItem('sidebarState', 'collapsed');
            } else {
                localStorage.setItem('sidebarState', 'expanded');
            }
        }
    };

    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }

    // NEW: Inject Floating Toggle (Arrow on middle side)
    if (sidebar && window.innerWidth > 768) { // Only inject on desktop
        const floatBtn = document.createElement('div');
        floatBtn.className = 'sidebar-floating-toggle';
        floatBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        floatBtn.title = "Toggle Sidebar";
        sidebar.appendChild(floatBtn);

        floatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // === Live Date Time ===
    function updateDateTime() {
        const dateElement = document.getElementById('liveDateTime');
        if (dateElement) {
            const now = new Date();
            // Format: Mon, Jan 01, 2026 12:00:00 PM
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            dateElement.innerText = now.toLocaleDateString('en-US', options);
        }
    }

    // Run immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
