let field =document.querySelector('.items');
let li = Array.from(field.children);
let select = document.getElementById('sortOnPrice');
let ar = [];

// set price
for (let i of li) {
    const last = i.lastElementChild;
    const x = last.textContent.trim();
    const y = Number(x.substring(1));
    i.setAttribute('data-price', y);
    ar.push(i);
}

// sort on price
select.onchange = sortingValue;

function sortingValue() {
    if (this.value === 'Default') {
        while(field.firstChild) {
            field.removeChild(field.firstChild);
        }
        field.append(...ar);
    }
    if (this.value === 'prijsOplopend') {
        sortElem(field, li, true);
    }
    if (this.value === 'prijsAflopend') {
        sortElem(field, li, false);
    }
}

// sort function
function sortElem(field, li, asc) {
    let dm, sortLi;
    dm = asc ? 1 : -1;
    sortLi = li.sort((a, b) => {
        const ax = a.getAttribute('data-price');
        const bx = b.getAttribute('data-price');

        return ax> bx ? (1*dm) : (-1*dm);
    });
    while(field.firstChild) {
        field.removeChild(field.firstChild);
    }
    field.append(...sortLi);
}