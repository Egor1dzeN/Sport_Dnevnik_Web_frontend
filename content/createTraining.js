let current_domain = "localhost";
let current_user_id = 1;
let form = document.getElementById('workoutForm');
let error = document.getElementById('errorNotification');
form.addEventListener('submit', sendTraining)

function sendTraining(event) {
    event.preventDefault();
    let url = `http://${current_domain}/v1/training`;
    const formData = new FormData(form);
    let status;
    fetch(url, {
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
                error.innerHTML = JSON.parse(data)['error_msg'];
            }
        })
        .catch(e => {
            console.error(e);
        })

    console.log(JSON.stringify(Object.fromEntries(formData.entries())))
}