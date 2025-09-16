let sec = document.getElementById('sec');
let table = document.getElementById('table');
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productAmount = document.getElementById('productAmount');
let productDiscount = document.getElementById('productDiscount');
let form = document.getElementById('form');
let btn = document.getElementById('btn');
let tbody = document.getElementById('tbody');
let tf = document.getElementById('tf');
let noPro = document.getElementById('noPro');
let search = document.getElementById('search');
let select = document.getElementById('select');

let arr = [];

let oldProIndex;
let btnMode = 'add';

//Create
form.onsubmit = function (event) {
    event.preventDefault();

    let proName = productName.value;
    let proPrice = parseFloat(productPrice.value);
    let proCategory = productCategory.value;
    let proAmount = parseInt(productAmount.value);
    let proDiscount = parseFloat(productDiscount.value);

    let products = {
        proName,
        proPrice,
        proCategory,
        proAmount,
        proDiscount
    }

    if (btnMode == 'add') {
        arr.push(products);
        displayProducts();
        cleanUpData();
    } else {
        arr[oldProIndex] = products;
        btnMode = 'add';
        btn.style.background = '#000';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.borderRadius = '20px';
        btn.innerText = 'Add Product';
        displayProducts();
        cleanUpData();
    }

    localStorage.setItem('arr', JSON.stringify(arr));

}

//Store
window.onload = function () {
    let store = JSON.parse(localStorage.getItem('arr'));
    if (store.length >= 0) {
        arr = store;
        displayProducts();
    }
}

//Read
function displayProducts() {
    let temp = '';
    let amountPrice = 0;
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        let finalPrice = arr[i].proPrice - (arr[i].proPrice * arr[i].proDiscount / 100);
        if (arr[i].proAmount > 0) {
            amountPrice += (finalPrice * arr[i].proAmount);
        } else {
            amountPrice = finalPrice;
            arr[i].proAmount = 1;
        }
        total += amountPrice;
        temp += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].proName}</td>
        <td>${arr[i].proCategory}</td>
        <td>${arr[i].proPrice}$</td>
        <td>${arr[i].proAmount}</td>
        <td>${arr[i].proDiscount}%</td>
        <td>${finalPrice}$</td>
        <td><button id="up" onclick="updateProduct(${i})">Update</button></td>
        <td><button id="del" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`;
    }
    tbody.innerHTML = temp;
    tf.innerText = `${total}$`;

    if (arr.length == 0) {
        table.style.display = 'none';
        search.style.display = 'none';
        select.style.display = 'none';
        noPro.style.display = 'block';

    } else {
        table.style.display = 'block';
        search.style.display = 'block';
        select.style.display = 'block';
        noPro.style.display = 'none';
    }
}

//Delete
function deleteProduct(index) {
    arr.splice(index, 1);
    localStorage.setItem('arr', JSON.stringify(arr));
    btnMode = 'add';
    btn.style.background = '#000';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '20px';
    btn.innerText = 'Add Product';
    displayProducts();
    cleanUpData();
}

//Clean up
function cleanUpData() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productAmount.value = '';
    productDiscount.value = '';
}

//Search
search.onkeyup = function () {
    let temp = '';
    let amountPrice = 0;
    let total = 0;
    if (select.value == 1) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].proName.trim().toLowerCase().includes(search.value.trim().toLowerCase())) {
                let finalPrice = arr[i].proPrice - (arr[i].proPrice * arr[i].proDiscount / 100);
                if (arr[i].proAmount > 0) {
                    amountPrice += (finalPrice * arr[i].proAmount);
                } else {
                    amountPrice = finalPrice;
                    arr[i].proAmount = 1;
                }
                total += amountPrice;
                temp += `<tr>
                <td>${i + 1}</td>
                <td>${arr[i].proName}</td>
                <td>${arr[i].proCategory}</td>
                <td>${arr[i].proPrice}$</td>
                <td>${arr[i].proAmount}</td>
                <td>${arr[i].proDiscount}%</td>
                <td>${finalPrice}$</td>
                <td><button id="up" onclick="updateProduct(${i})">Update</button></td>
                <td><button id="del" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
            }

        }
    } else if (select.value == 2) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].proCategory.trim().toLowerCase().includes(search.value.trim().toLowerCase())) {
                let finalPrice = arr[i].proPrice - (arr[i].proPrice * arr[i].proDiscount / 100);
                if (arr[i].proAmount > 0) {
                    amountPrice += (finalPrice * arr[i].proAmount);
                } else {
                    amountPrice = finalPrice;
                    arr[i].proAmount = 1;
                }
                total += amountPrice;
                temp += `<tr>
                <td>${i + 1}</td>
                <td>${arr[i].proName}</td>
                <td>${arr[i].proCategory}</td>
                <td>${arr[i].proPrice}$</td>
                <td>${arr[i].proAmount}</td>
                <td>${arr[i].proDiscount}%</td>
                <td>${finalPrice}$</td>
                <td><button id="up" onclick="updateProduct(${i})">Update</button></td>
                <td><button id="del" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
            }
        }
    }
    else if (select.value == 3) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].proPrice.toString().trim().includes(search.value.trim())) {
                let finalPrice = arr[i].proPrice - (arr[i].proPrice * arr[i].proDiscount / 100);
                if (arr[i].proAmount > 0) {
                    amountPrice += (finalPrice * arr[i].proAmount);
                } else {
                    amountPrice = finalPrice;
                    arr[i].proAmount = 1;
                }
                total += amountPrice;
                temp += `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].proName}</td>
                    <td>${arr[i].proCategory}</td>
                    <td>${arr[i].proPrice}$</td>
                    <td>${arr[i].proAmount}</td>
                    <td>${arr[i].proDiscount}%</td>
                    <td>${finalPrice}$</td>
                    <td><button id="up" onclick="updateProduct(${i})">Update</button></td>
                    <td><button id="del" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
            }

        }
    }

    if (temp == '') {
        table.style.display = 'none';
        noPro.style.display = 'block';
        noPro.innerText = 'No products found!';
    } else {
        tbody.innerHTML = temp;
        tf.innerText = `${total}$`;
        table.style.display = 'block';
        noPro.style.display = 'none';
        noPro.innerText = 'No products added yet!';
    }

    if (search.value.trim() === '') {
        displayProducts();
    }

}


//Update
function updateProduct(index) {
    oldProIndex = index;
    btnMode = 'update';
    btn.style.background = 'yellow';
    btn.style.color = 'red';
    btn.style.border = 'red 1px solid';
    btn.style.borderRadius = '0';
    btn.innerText = 'Update Product';
    productName.value = arr[index].proName;
    productPrice.value = arr[index].proPrice;
    productCategory.value = arr[index].proCategory;
    productAmount.value = arr[index].proAmount;
    productDiscount.value = arr[index].proDiscount;
}
