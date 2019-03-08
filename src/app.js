"use strict";
import orders from '../data/orders.json';
import companies from '../data/companies.json';
import users from '../data/users.json';
import sortOpt from './sort.js';
import tableSearch from './search.js';
import countStatistics from './statistics.js';
import $ from 'jquery';
let men_check = [];
let women_check = [];


export default (function() {

    let App = document.getElementById("app");
    let table = document.createElement('table');
    let thead = document.createElement('thead');

    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.appendChild(document.createTextNode("Search:"));
    tr.appendChild(th);
    let th1 = th.cloneNode(false);
    let input = document.createElement('input');
    input.type = "text";
    input.id = "search";
    input.onkeyup = function() {
        tableSearch();
    }
    th1.appendChild(input);
    tr.appendChild(th1);
    thead.appendChild(tr);


    let tr1 = tr.cloneNode(false);
    thead.appendChild(tr1);
    tr1.insertAdjacentHTML("afterBegin", "<th>Transaction ID</th><th>User Info</th><th>Order Date</th><th>Order Amount</th><th >Card Number</th><th>Card Type</th><th>Location</th>");


    let arrow = document.createElement('span');
    arrow.innerHTML = "&#8595;";

    if (tr1.hasChildNodes()) {
        let children = tr1.childNodes;
        for (let i = 0; i < children.length; ++i) {

            if (i != 4) {
                children[i].onclick = function() {
                    sortOpt(i);
                    children[i].insertBefore(arrow, null);
                };
                children[i].style.cursor = "pointer";

            }
        }
    }
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    let td0 = document.createElement('td');
    table.appendChild(tbody);
    let men = false,
        women = false;
    orders.forEach(function(item, i) {
        let tr_body = tr.cloneNode(false);
        tr_body.id = "order_" + item["id"];
        tbody.appendChild(tr_body);

        for (var j = 0; j < 7; j++) {

            let td = td0.cloneNode(false);
            tr_body.appendChild(td);
            switch (j) {
                case 0:
                    td.appendChild(document.createTextNode(item['transaction_id']));
                    break;
                case 1:
                    let search_user = item['user_id'];
                    let user = users.find(x => x.id === search_user);

                    if (user != undefined || user != null) {

                        let a_href = document.createElement('a');
                        let linkText;
                        if (user['gender'] == "Male") {
                            linkText = "Mr." + user['first_name'] + " " + user['last_name'];
                            men = true;

                        } else {
                            linkText = "Ms." + user['first_name'] + " " + user['last_name'];
                            women = true;
                        }
                        a_href.appendChild(document.createTextNode(linkText));
                        a_href.href = "#";
                        a_href.onclick = function() {
                            div_user_details.style.display = (div_user_details.style.display == 'block') ? 'none' : 'block';
                            return false;
                        };
                        td.appendChild(a_href);


                        td.className = "user-data";
                        let p = document.createElement('p');
                        let div_user_details = document.createElement('div');
                        div_user_details.className = "user-details";

                        if (user['birthday'] != undefined || user['birthday'] != null) {
                            let p1 = p.cloneNode(false);
                            let date_birth = new Date(+user['birthday'] * 1000);
                            p1.appendChild(document.createTextNode("Birthday: " + date_birth.toLocaleDateString('en-GB')));
                            div_user_details.appendChild(p1);
                        }

                        if (user['avatar'] != undefined || user['avatar'] != null) {
                            let p1 = p.cloneNode(false);
                            var img = document.createElement('img');
                            img.src = user['avatar'];
                            img.style.width = '100px';
                            p1.appendChild(img);
                            div_user_details.appendChild(p1);
                        }

                        if (user['company_id'] != undefined || user['company_id'] != null) {
                            var company = companies.find(x => x.id === user['company_id']);

                            let p1 = p.cloneNode(false);
                            let a_href = document.createElement('a');
                            a_href.appendChild(document.createTextNode("Company: " + company['title']));
                            a_href.href = company['url'];

                            a_href.onclick = function() {
                                window.open(company['url'], '_blank');
                                return false;
                            };
                            p1.appendChild(a_href);
                            div_user_details.appendChild(p1);

                            let p2 = p1.cloneNode(false);
                            p2.appendChild(document.createTextNode("Industry: " + company['industry'] + " / " + company['sector']));
                            div_user_details.appendChild(p2);

                        }

                        td.appendChild(div_user_details);
                        div_user_details.style.display = "none";

                    } else
                        td.appendChild(document.createTextNode(item['user_id']));
                    break;
                case 2:

                    let date_full = new Date(+item['created_at'] * 1000);
                    td.appendChild(document.createTextNode(date_full.toLocaleString('en-GB')))
                    break;
                case 3:
                    if (men) {
                        men_check.push(+item['total']);
                        men = false;

                    }
                    if (women) {
                        women_check.push(+item['total']);
                        women = false;
                    }
                    td.appendChild(document.createTextNode("$" + item['total']));
                    break;
                case 4:
                    td.appendChild(document.createTextNode(item['card_number'].split('').fill("*", 2, item['card_number'].length - 4).join('')));
                    break;
                case 5:
                    td.appendChild(document.createTextNode(item['card_type']));
                    break;
                case 6:       
                    $.get(" http://ip-api.com/json/"+item['order_ip'], function(response) {
                        td.appendChild( document.createTextNode(response.country+" ("+item['order_ip'] +")") ); 
                    }, "jsonp");

                    break;
                default:
                    console.log("ERR");

            }


        }


    });

    table.insertAdjacentHTML("beforeEnd", "<tfoot><tr><td colspan='7'>Nothing found</td></tr><tr><td>Orders Count</td><td colspan='6'></td></tr><tr><td>Orders Total</td><td colspan='6'></td></tr><tr><td>Median Value</td><td colspan='6'></td></tr><tr><td>Average Check</td><td colspan='6'></td></tr><tr><td>Average Check (Female)</td><td colspan='6'></td></tr><tr><td>Average Check (Male)</td><td colspan='6'></td></tr></tfoot>");
    App.appendChild(table);
    countStatistics(men_check,women_check);
    men_check = [], women_check = [];

}());








