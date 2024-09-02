let current_user_id = 1;
let current_user_username = '';
let current_domain = "localhost";
let current_type_following = '';
let is_start_page = true;
window.onload = loadTrainings;
let posts = document.getElementById('posts');
let load_more_btn = document.querySelector('.load-more-div');
load_more_btn.addEventListener("click", loadMoreTrainings)
let error = document.getElementById('errorNotification');
let offset = 0;
let sendMessageBtn = document.querySelector('.send-message-btn');

function loadTrainings(id) {
    // let post_page = document.querySelector(".container");
    let url = `http://${current_domain}`;
    switch (id) {

        case 'me':
            url += '/v1/training/v1/findByUserId';
            break;
        case 'subscription':
            url += '/v1/training/v1/following';
            break;
        default:
            url += '/v1/trainings';
            break;
    }
    posts.innerHTML = '';
    fetch(url + `?user_id=${current_user_id}`, {
        method: "GET"
    })
        .then(response => {
                if (response.status === 200) {
                    offset = 10;
                    error.style.display = 'none';
                    return response.text()
                } else
                    throw new Error("Error for update data");
            }
        )
        .then(async data_ => {

            let data = (JSON.parse(await data_));
            let training_list = data['trainingList'];
            training_list.forEach(training => {
                posts.innerHTML += generateTrainingHTML(training);
            })
            if (data['hasNext']) {
                load_more_btn.style.display = 'block';
            } else {
                load_more_btn.style.display = 'none';
            }

            console.log(data)
        })
        .catch(_ => {
            error.style.display = 'block';
        });
}

function loadMoreTrainings() {
    console.log("Load more trainings");
    let url = `http://${current_domain}`;
    switch (current_type_following) {
        case 'me':
            url += '/v1/training/v1/findByUserId';
            break;
        case 'subscription':
            url += '/v1/training/v1/following';
            break;
        default:
            url += '/v1/trainings';
            break;
    }
    fetch(url + `?user_id=${current_user_id}&offset=${offset}`, {
        method: "GET"
    }).then(response => {
        if (response.status !== 200)
            throw new Error("Error for update data");
        return response.text();
    }).then(async data_ => {
        offset += 10;
        let data = (JSON.parse(data_));
        let training_list = data['trainingList'];
        training_list.forEach(training => {
            posts.innerHTML += generateTrainingHTML(training);
        })
        if (data['hasNext']) {
            load_more_btn.style.display = 'block';
        } else {
            load_more_btn.style.display = 'none';
        }
        error.style.display = 'none';
        console.log(data)
    }).catch(_ => {
        error.style.display = 'block';
    });
}

function sendLike(trainingId, btn) {
    let url = `http://${current_domain}/v1/training/v1/like?training_id=${trainingId}&user_id=${current_user_id}`;
    fetch(url, {
        method: 'PUT'
    })
        .then(response => {
                // console.log(response.text());
                return response.text()
            }
        )
        .then(data_ => {
            let data = JSON.parse(data_);
            console.log(data)
            let count_like_span = document.getElementById("likes_count_" + trainingId);
            let count_like = parseInt(count_like_span.textContent);
            if (data['is_likes']) {
                btn.src = 'content/like.svg';
                count_like++;
            } else {
                btn.src = 'content/unlike.svg';
                count_like--;
            }
            count_like_span.textContent = '' + count_like;
        })

    // console.log(userId, btn);
}


function highlight(id) {
    let btn = document.getElementById(id);
    btn.style.backgroundColor = "#00b1ff";
    btn.style.color = "#ffffff";
    console.log(document.dir)
    if (id === 'all') {
        let btn1 = document.getElementById('me');
        btn1.style.backgroundColor = "#dfdfdf";
        btn1.style.color = "#000000";
        let btn2 = document.getElementById('subscription');
        btn2.style.backgroundColor = "#dfdfdf";
        btn2.style.color = "#000000";
    } else if (id === 'me') {
        let btn1 = document.getElementById('all');
        btn1.style.backgroundColor = "#dfdfdf";
        btn1.style.color = "#000000";
        let btn2 = document.getElementById('subscription');
        btn2.style.backgroundColor = "#dfdfdf";
        btn2.style.color = "#000000";
    } else {
        let btn1 = document.getElementById('all');
        btn1.style.backgroundColor = "#dfdfdf";
        btn1.style.color = "#000000";
        let btn2 = document.getElementById('me');
        btn2.style.backgroundColor = "#dfdfdf";
        btn2.style.color = "#000000";
    }
    loadTrainings(id)
}

function reformatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('ru-RU', options);
}

function generateTrainingHTML(training) {
    console.log(training);
    let liked_src = training['liked'] === true ? 'content/like.svg' : 'content/unlike.svg';
    let html = `
    <div class="post">
            <div class="post-header">
                <span class="nickname">${training['username']}</span>
                <span class="time">${reformatDate(training['start_time'])}</span>
            </div>
            <div class="post-content">
                <img src="training-photo.jpg" alt="Фото тренировки">
            </div>
            <div class="post-info">
                <span><b>${training['distance']}</b> км</span>
                <span><b>${training['duration']}</b></span>
                <span><b>${training['pace']}</b> ${training['unit_of_meas']}</span>

            </div>
            <span>${training['comment']}</span>
            <div class="like">
                <div class="like-image">
                    <img src="${liked_src}" width="30"  onclick="sendLike(${training['training_id']}, this)">
                </div>
                <div id="likes_count_${training['training_id']}">${training['count_like']}</div>
            </div>
            <div class="comment-container">
                <div style="margin-bottom: 10px">
                    <span>Комментарии:</span>
                </div>
                   <div id="comments-${training['training_id']}">`;
    let comment_list = training['comment_list'];
    comment_list.forEach(el => {
        html += `<div>
                    <span><b>${el['username']}</b> ${el['text']}</span>
                </div>`;
    })
    html += `</div></div>
                <div class="send-message" style="display: flex; align-items: center">
                    <textarea id="text-comment-${training['training_id']}" oninput="input_message(this, ${training['training_id']})" placeholder="Введите комментарий..." rows="1"></textarea>

                    <button id="send-comment-${training['training_id']}" onclick="sendComment(${training['training_id']})" class="send-message-btn" disabled>Отправить</button>

                </div>
        </div>
    `;
    return html;
}

function generateCommentHTML(username, text) {
    let html = `
                <div>
                    <span><b>${username}</b> ${text}</span>
                </div>
    `;
    return html;
}

function input_message(text_area, trainingId) {
    let sendMessageBtn = document.getElementById('send-comment-' + trainingId)
    sendMessageBtn.disabled = text_area.value.trim() === '';
    console.log(sendMessageBtn);
    // Сбрасываем высоту, чтобы получить естественную высоту строки
    text_area.style.height = 'auto';
    // Высчитываем высоту с учетом прокрученного содержимого
    const scrollHeight = text_area.scrollHeight;

    // Если текст превышает одну строку, увеличиваем высоту
    if (scrollHeight > text_area.clientHeight) {
        text_area.style.height = scrollHeight + 'px';
    }
}

function sendComment(id) {
    let text = document.getElementById('text-comment-' + id).value;
    console.log(text);
    let url = `http://localhost/v1/training/v1/comment?training_id=${id}&user_id=${current_user_id}&text=${text}`
    fetch(url, {
        method: 'POST'
    })
        .then(response => {
            if (response.status !== 201)
                throw new Error('Error for send comment');
            return response.text()
        })
        .then(data_ => {
            let data = JSON.parse(data_);
            console.log(data)
            let comment_list = document.getElementById(`comments-${id}`)
            comment_list.innerHTML += generateCommentHTML(data['username'], data['text']);
            let text_area = document.getElementById(`text-comment-${data['training_id']}`);
            text_area.value = "";
            let send_comment_btn = document.getElementById(`send-comment-${data['training_id']}`);
            send_comment_btn.disabled = true;
            console.log(send_comment_btn + 'das')
        })
        .catch(error => {

        })
}
