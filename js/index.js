const xhttp =  new XMLHttpRequest()
const countries = document.getElementById('countries');
const monthlist = document.getElementById('monthlist');
const result = document.getElementById('result');
const monthListName = [
    "Janeiro",
    "Fevereiro" ,
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho"
]

let arrM = [];
let strM = ''
for (let i = 0; i < monthListName.length; i++) {
    const element = monthListName[i];
    arrM.push(`<option value="${i + 1}">${element}</option>`)
    strM = arrM.toString();
    monthlist.innerHTML = strM;
}

function splitMonth(strDate) {
    let date = new Date(strDate);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return ultimoDia.getDate();
}

monthlist.addEventListener('change', ()=>{
    let strDate = `2021-${monthlist.value}-`;
    concat = strDate + '1'
    let lastDay = splitMonth(concat);

    let url =  `https://api.covid19api.com/country/${countries.value}/status/confirmed?from=${strDate}1T00:00:00Z&to=${strDate}${lastDay}T00:00:00Z`;        

    xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let totalRes = res[res.length-1].Cases;
            result.innerHTML = `${totalRes} casos`
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});

countries.addEventListener('change', async () => {
    let strDate = `2021-${monthlist.value}-`;
    concat = strDate + '1'
    let lastDay = splitMonth(concat);

    let url =  `https://api.covid19api.com/country/${countries.value}/status/confirmed?from=${strDate}1T00:00:00Z&to=${strDate}${lastDay}T00:00:00Z`;        

    xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            let totalRes = res[res.length-1].Cases;
            result.innerHTML = `${totalRes} casos`
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
})