function sortOpt(j) {
    let tbody = document.getElementsByTagName('tbody')[0];
    let table = tbody.parentNode;
    table.removeChild(tbody);

    let rows = [];


    for (let i = 0; i < tbody.children.length; i++) {
        let elem = tbody.children[i];
        rows.push({
            value: elem.childNodes[j].innerText,
            elem: elem
        });

    }

    if (j == 0 || j == 5 || j == 6) {
        rows.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    } else if (j == 2) {
        rows.sort(function(a, b) {
            let mass1 = a.value.split('/');
            let mass2 = b.value.split('/');

            [mass1[0], mass1[1]] = [mass1[1], mass1[0]];
            [mass2[0], mass2[1]] = [mass2[1], mass2[0]];
            let d1 = new Date(mass1.join('/'));
            let d2 = new Date(mass2.join('/'));

            return d1.getTime() - d2.getTime();
        });

    } else if (j == 3) {
        rows.sort(function(a, b) {
            return +a.value.substring(1) - +b.value.substring(1);
        });
    } else if (j == 1) {

        {
            rows.sort((a, b) => (a.value.substring(a.value.indexOf(".")) > b.value.substring(b.value.indexOf("."))) ? 1 : ((b.value.substring(b.value.indexOf(".")) > a.value.substring(a.value.indexOf("."))) ? -1 : 0));
        }
    }


    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i].elem);
    }

    table.appendChild(tbody);
}
export default sortOpt;