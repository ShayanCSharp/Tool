$(function () {
  let availableTags = [
    "Coffe",
    "Apple",
    "Pie",
    "Drink",
    "Pizza",
    "Burger",
    "Cycle",
    "Party",
    "Dinner",
    "Breakfust",
    "Tea",
    "Steak",
    "Hoodie",
    "Jacket",
    "Shoes",
    "Purse",
    "Makeup",
    "Shirts",
    "T-Shirts",
    "Wallet",
    "Watch",
    "Laundry",
  ];
  $("#Name").autocomplete({
    source: availableTags,
  });
});
let add = document.querySelector("#add");
let main = document.querySelector(".task-list ul");

// Load saved items from local storage when the page loads
loadItemsFromLocalStorage();

add.addEventListener("click", () => {
  addList();
});

let addList = () => {
  let name = document.querySelector("#Name");
  let price = document.querySelector("#price");
  let li = document.createElement("li");
  let getDate = new Date();
  let date = getDate.getDate();
  let month = getDate.getMonth() + 1; // Months are 0-indexed, so add 1.
  let year = getDate.getFullYear();
  
  if (name.value == "" || !isNaN(name.value) || isNaN(price.value) || price.value == '') {
    alert('Please enter valid information');
  } else {
    li.innerHTML = `
    <div class="date">${date}/${month}/${year}</div>
    <div class="show">
        <div class="show-name det">
            <span>Name:</span>
            <p>${name.value}</p>
        </div>
        <div class="show-price det">
            <span>Price:</span>
            <p>${price.value}</p>
        </div>
    </div>
    <i class="fa-solid fa-xmark del"></i>  
    `;


    li.querySelector(".del").addEventListener("click", () => {
      li.remove();
      saveItemsToLocalStorage(); // Update local storage when an item is removed
    });

    main.appendChild(li);
    saveItemsToLocalStorage(); // Update local storage when a new item is added

    name.value = ""; // Clear the input fields
    price.value = "";
  }
};

function saveItemsToLocalStorage() {
  const items = [];
  const itemList = main.querySelectorAll("li");
  itemList.forEach((item) => {
    const itemName = item.querySelector(".show-name p").textContent;
    const itemPrice = item.querySelector(".show-price p").textContent;
    items.push({ name: itemName, price: itemPrice });
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadItemsFromLocalStorage() {
  const storedItems = localStorage.getItem("shoppingList");
  if (storedItems) {
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
      let li = document.createElement("li");
      let getDate = new Date();
      let date = getDate.getDate();
      let month = getDate.getMonth() + 1;
      let year = getDate.getFullYear();

      li.innerHTML = `
            <div class="date">${date}/${month}/${year}</div>
            <div class="show">
                <div class="show-name det">
                    <span>Name:</span>
                    <p>${item.name}</p>
                </div>
                <div class="show-price det">
                    <span>Price:</span>
                    <p>${item.price}</p>
                </div>
            </div>
            <i class="fa-solid fa-xmark del"></i>  
            `;

      li.querySelector(".del").addEventListener("click", () => {
        li.remove();
        saveItemsToLocalStorage();
      });

      main.appendChild(li);
    });
  }
}
