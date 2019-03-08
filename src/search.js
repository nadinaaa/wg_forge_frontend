import countStatistics from './statistics.js';
let men_check = [],women_check = [];
function tableSearch() {
    men_check = [],women_check = [];

    let phrase = document.getElementById("search");
    let tbody = document.getElementsByTagName("tbody")[0];

    let regPhrase = new RegExp(phrase.value, 'i');
    let flag = false;

    for (let i = 0; i < tbody.rows.length; i++) {
        flag = false;
        for (let j = tbody.rows[i].cells.length - 1; j >= 0; j--) {

            flag = regPhrase.test(tbody.rows[i].cells[j].innerText);
            if (flag) {
                break;
            }
        }
        if (flag) {
            tbody.rows[i].style.display = "";
            countMen(i);
        } else {
            tbody.rows[i].style.display = "none";
        }

    }
    countStatistics(men_check,women_check);
}

function countMen(i) {
    let tbody = document.getElementsByTagName("tbody")[0];
    if (tbody.rows[i].cells[1].innerText.charAt(1) == 's') {
        women_check.push(+tbody.rows[i].cells[3].innerText.substring(1));
    } else {
        men_check.push(+tbody.rows[i].cells[3].innerText.substring(1));
    }
}
export default tableSearch;