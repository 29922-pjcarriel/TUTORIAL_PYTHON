/**
 * Nested Dropdown Handler for Bootstrap 5
 * Python Academy - Mobile submenu toggle functionality
 */
document.addEventListener('DOMContentLoaded', function () {
    // Handle nested dropdowns on mobile
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu > a.dropdown-toggle');

    dropdownSubmenus.forEach(function (element) {
        element.addEventListener('click', function (e) {
            // Only prevent default on mobile
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();

                const parent = this.parentElement;
                const submenu = parent.querySelector('.dropdown-menu');

                // Close other open submenus at the same level
                const siblings = parent.parentElement.querySelectorAll('.dropdown-submenu.show');
                siblings.forEach(function (sibling) {
                    if (sibling !== parent) {
                        sibling.classList.remove('show');
                    }
                });

                // Toggle current submenu
                parent.classList.toggle('show');
            }
        });
    });

    // Close submenus when main dropdown closes
    const mainDropdowns = document.querySelectorAll('.navbar .dropdown');
    mainDropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('hidden.bs.dropdown', function () {
            const openSubmenus = this.querySelectorAll('.dropdown-submenu.show');
            openSubmenus.forEach(function (submenu) {
                submenu.classList.remove('show');
            });
        });
    });
});
