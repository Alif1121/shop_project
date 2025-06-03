 
function addProductRow() {
  const productList = document.getElementById("productList");

  const row = document.createElement("div");
  row.classList.add("product-row");
  row.innerHTML = `
    <label>Product Name 
      <input type="text" placeholder="Product Name" class="product-name" required />
    </label>
    <label>Quantity
      <input type="number" placeholder="Quantity" class="product-qty" required />
    </label>    
    <label>Unit Price
      <input type="number" step="0.01" placeholder="Unit Price" class="product-price" required />
    </label>
  `;
  productList.appendChild(row);
}

 
document.getElementById("voucherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const names = document.querySelectorAll(".product-name");
  const qtys = document.querySelectorAll(".product-qty");
  const prices = document.querySelectorAll(".product-price");

  const tbody = document.querySelector("#voucherTabletbody");
  tbody.innerHTML = "";

  let total = 0;

  for (let i = 0; i < names.length; i++) {
    const name = names[i].value.trim();
    const qty = parseInt(qtys[i].value);
    const price = parseFloat(prices[i].value);
 
    if (!name || isNaN(qty) || isNaN(price)) continue;

    const lineTotal = qty * price;
    total += lineTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${qty}</td>
      <td>${price.toFixed(2)}</td>
      <td>${lineTotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  }

  document.getElementById("totalAmount").textContent = total.toFixed(2);
  document.getElementById("voucher").style.display = "block";
  document.getElementById("finalInfo").style.display = "none";
});

 
function finalizeVoucher() {
  const total = parseFloat(document.getElementById("totalAmount").textContent);
  const cash = parseFloat(document.getElementById("cashInput").value);
  const change = cash - total;

  document.getElementById("changeAmount").textContent = change.toFixed(2);
  document.getElementById("finalInfo").style.display = "block";
}

 
function printVoucher() {
   
  const printContents = document.getElementById("voucher").innerHTML;

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Voucher</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          h2 {
            margin-bottom: 10px;
          }
          .cash-input, .final-info {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();

  
}
