let current_domain = "localhost";
let current_user_id = 1;
let form = document.getElementById('workoutForm');
let error = document.getElementById('errorNotification');
let loading_spinner = document.getElementById('loading-spinner');
form.addEventListener('submit', sendTraining)

async function sendTraining(event) {
    event.preventDefault();
    showLoadingSpinner();
    let url = `http://${current_domain}/v1/training`;
    const formData = new FormData(form);
    let status;
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    }).then(r => {
            if (r.status === 201 || r.status === 400)
                status = r.status;
            else
                throw new Error("Error");
            return r.text();
        }
    )
        .then(data => {
            console.log(status)
            if (status === 201) {
                console.log(data);
                error.style.display = 'none';
            } else if (status === 400) {
                console.log(JSON.parse(data))
                error.style.display = 'block';
                error.innerHTML = JSON.parse(data)['error_msg'] ;
            }
        })
        .catch(e => {
            error.style.display = 'block';
            error.innerHTML = 'Ошибка соединения с сервером. Попробуйте позже. &#129298';
            setTimeout(function() {
                error.style.display = 'none';
                error.innerHTML = '';
            }, 5 * 1000);

        });
    hideLoadingSpinner()
    console.log(JSON.stringify(Object.fromEntries(formData.entries())))
}

function showLoadingSpinner() {
    console.log('spin');
    loading_spinner.style.display = 'block';
}

//
// Функция для скрытия индикатора загрузки
function hideLoadingSpinner() {
    console.log('stop spin');
    loading_spinner.style.display = 'none';
}