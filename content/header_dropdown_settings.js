let show = true;
let settings = document.getElementById('account');
settings.addEventListener('click', showSettings)

document.getElementById('notification-btn').addEventListener('click', showNotifications)

function showNotifications() {
    console.log('Test');
    var notificationPanel = document.getElementById('notification-panel');
    notificationPanel.classList.add('show');
}

function hideNotifications() {
    var notificationPanel = document.getElementById('notification-panel');
    notificationPanel.classList.remove('show');
}

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


// Пример добавления уведомлений динамически
function addNotification(message) {
    var notificationsList = document.getElementById('notifications-list');
    var notificationItem = document.createElement('div');
    notificationItem.classList.add('notification-item');
    notificationItem.textContent = message;
    notificationsList.appendChild(notificationItem);
}

// Пример добавления уведомлений
addNotification('Notification 1');
addNotification('Notification 2');
addNotification('Notification 3');

window.addEventListener('click', function (e) {
    if (!document.getElementById('settings').contains(e.target)) {
        show = false;
        showSettings();
    }
    if (!document.getElementById('notification-btn').contains(e.target) && !document.getElementById('notification-panel').contains(e.target)) {
        console.log('close');
        hideNotifications();
    }
});
