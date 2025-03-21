const manualBtn = document.querySelector(".manual-btn");
let cont = 1;
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

document.getElementById('radio1').checked = true;

const proximaImg = () => {
    cont++;

    if (cont > 4) {
        cont = 1;
    }

    document.getElementById(`radio${cont}`).checked = true;

}

const voltaImg = () => {
    cont--;

    if (cont < 1) {
        cont = 4;
    }

    document.getElementById(`radio${cont}`).checked = true;
}

setInterval(() => {
    proximaImg()
}, 5000);

prevBtn.addEventListener('click', () => {
    voltaImg();
})

nextBtn.addEventListener('click', () => {
    proximaImg();
})

