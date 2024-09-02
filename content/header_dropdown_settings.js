let show = true;
let settings = document.getElementById('account');
settings.addEventListener('click', showSettings)

function showSettings() {
    // console.log('show settings');
    let settings = document.querySelector(".dropdown-content");
    if (show) {
        settings.style.display = 'block';
        show = false;
    } else {
        settings.style.display = 'none';
        show = true;
    }
}
window.addEventListener('click', function (e) {
    if (!document.getElementById('settings').contains(e.target)) {
        show = false;
        showSettings();
    }
});
