
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
    loadUser()
}

function loadUser(){

}