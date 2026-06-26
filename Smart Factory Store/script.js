function createFactory(name, price) {
  let stock = 0;

  return {
    name,
    price,

    buy(qty) {
      if (qty <= stock) {
        stock -= qty;
        return `✅ Bought ${qty}`;
      }
      return `❌ Only ${stock} left`;
    },

    restock(qty) {
      stock += qty;
      return `🔄 Restocked ${qty}`;
    },

    getStock() {
      return stock;
    },
  };
}

const products = [];

function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);

  if (!name || !price) {
    alert("Enter valid details");
    return;
  }

  const product = createFactory(name, price);
  products.push(product);

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";

  render();
}

function render() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");

    card.className = "bg-white p-5 rounded-xl shadow flex flex-col gap-3";

    card.innerHTML = `
      <h2 class="text-lg font-bold">${product.name}</h2>
      <p class="text-gray-600">₹${product.price}</p>
      <p class="font-semibold">Stock: ${product.getStock()}</p>

      <input id="qty-${index}" type="number" placeholder="Quantity"
        class="border p-2 rounded"/>

      <div class="flex gap-2">
        <button onclick="buyProduct(${index})"
          class="bg-green-500 text-white px-3 py-1 rounded w-full">
          Buy
        </button>

        <button onclick="restockProduct(${index})"
          class="bg-blue-500 text-white px-3 py-1 rounded w-full">
          Restock
        </button>
      </div>

      <p id="msg-${index}" class="text-sm"></p>
    `;

    container.appendChild(card);
  });
}

function buyProduct(index) {
  const qty = Number(document.getElementById(`qty-${index}`).value);
  const msg = document.getElementById(`msg-${index}`);

  if (!qty) return (msg.innerText = "⚠️ Enter quantity");

  msg.innerText = products[index].buy(qty);
  render();
}

function restockProduct(index) {
  const qty = Number(document.getElementById(`qty-${index}`).value);
  const msg = document.getElementById(`msg-${index}`);

  if (!qty) return (msg.innerText = "⚠️ Enter quantity");

  msg.innerText = products[index].restock(qty);
  render();
}
