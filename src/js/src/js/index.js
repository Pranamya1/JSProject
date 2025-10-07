    // sliding of sidebar in sml scr
    const dash_sidebar_sml = document.querySelector('.sidebar-sml'); 
    const sidebar = document.querySelector('.sidebar');

    dash_sidebar_sml.addEventListener('click', () => {
        sidebar.classList.toggle('active'); 
    });

