const tabBtn = document.querySelectorAll('.tab');
const tab = document.querySelectorAll('.tabshow');

function showTab(panelIndex) {
    tab.forEach(function (node) {
        node.style.display = "none"
    });
    tab[panelIndex].style.display = "block";
}

showTab(0);
l