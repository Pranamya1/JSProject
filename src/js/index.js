// sliding of sidebar in sml scr
const mobSidebarBtn = document.getElementById('mob_sidebar_slid-btn');
const mobSidebar = document.querySelector('.mob-sidebar');

mobSidebarBtn.addEventListener('click', () => {
    mobSidebar.classList.toggle('active'); // toggle sidebar visibility
});