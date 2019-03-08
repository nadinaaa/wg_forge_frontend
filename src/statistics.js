function countStatistics(men_check,women_check) {

    let tfoot = document.getElementsByTagName("tfoot")[0];
    let checks = women_check.concat(men_check).sort(function(a, b) {
        return a - b;
    });
    if (checks.length) {
        tfoot.rows[0].style.display = "none";
        tfoot.rows[1].cells[1].innerText = checks.length;
        let women_sum = women_check.reduce(function(s, current) {
            return s + current;
        }, 0);
        let men_sum = men_check.reduce(function(s, current) {
            return s + current;
        }, 0);
        tfoot.rows[2].cells[1].innerText = "$ " + Math.round(men_sum + women_sum);

        let median;
        if (checks.length % 2 == 0)
            median = Math.round((checks[checks.length / 2] + checks[(checks.length / 2) - 1]) / 2, -2);
        else
            median = checks[Math.floor(checks.length / 2)];
        tfoot.rows[3].cells[1].innerText = "$ " + median;

        tfoot.rows[4].cells[1].innerText = "$ " + Math.round((men_sum + women_sum) / checks.length, -2);
        if (women_check.length)
            tfoot.rows[5].cells[1].innerText = "$ " + Math.round(women_sum / women_check.length, -2);
        else
            tfoot.rows[5].cells[1].innerText = "n/a";

        if (men_check.length)
            tfoot.rows[6].cells[1].innerText = "$ " + Math.round(men_sum / men_check.length, -2);
        else
            tfoot.rows[6].cells[1].innerText = "n/a";

    } else {
        for (let i = 1; i < tfoot.rows.length; i++) {
            tfoot.rows[i].cells[1].innerText = "n/a";
        }
        tfoot.rows[0].style.display = "";
    }

}
export default countStatistics;