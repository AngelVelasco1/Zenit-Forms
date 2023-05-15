/* DOM */
const emptyCart = document.querySelector("#empty-message");
const currentCart = document.querySelector("#current-cart");

const optionsCart = document.querySelector("#options-cart");
const clearBtn = document.querySelector("#clear-btn");

let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js", "");

export default class myCartAside extends HTMLElement {
  static utl = import.meta.url;
  static async components() {
    return await (await fetch(pathName.replace(".js", ".html"))).text();
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  handleEvent(e) {
    e.type === "click" ? console.log("") : undefined;
  }
  worker() {
    let wk = new Worker("../storage/wkItems.js", { type: "module" });
    wk.postMessage({ message: "Hola bebe " });
    wk.addEventListener("message", (e) => {});
  }
  connectedCallback() {
    Promise.resolve(myCartAside.components()).then((html) => {
      this.shadowRoot.innerHTML = html;
    });
    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    cartProducts = JSON.parse(localStorage.getItem("cart"));
    function updateCart() {
      if (cartProducts && cartProducts.length > 0) {
        emptyCart.classList.add("hidden");
        currentCart.classList.remove("hidden");
        currentCart.innerHTML = "";

        const template = cartProducts.map((camper) => {
          return `
  
                    <div class="current-item">
            <img class="item-img" src='${camper.image}' onerror="this.src='./img/usuario.png'  ">
                    <div class="item-title">
                        <small>Name</small>
                        <h3 class="item-name">${camper.name}</h3>
                    </div>
                    
                    <div class="item-price">
                        <small>Entry date</small>
                        <p>${camper.entry}</p>
                        <small>Birth</small>
                        <p>${camper.birth}</p>
                    </div>
                 
                    <div class="total">
                        <small>Qualified</small>
                        <p>${camper.qualified}</p>
                        <small>Skill</small>
                        <p>${camper.skill}</p>
                    </div>
                    <div class="total">
                    <small>Team</small>
                    <p>${camper.team}</p>
                </div>
                
                    <button class="delete-btn" id="${
                      camper.id
                    }"><i class="bi bi-trash-fill"></i></button>
                </div>
                          `;
        });
        currentCart.innerHTML += template.join(" ");
      } else {
        emptyCart.classList.remove("hidden");
        currentCart.classList.add("hidden");
        optionsCart.classList.add("hidden");
      }
    }
    function updateEachBtn() {
      let deleteBtn = document.querySelectorAll(".delete-btn");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", deleteEachItem);
      });
    }

    function deleteEachItem(e) {
      const idBtn = e.currentTarget.id;
      const index = cartProducts.findIndex(
        (product) => product.id === parseInt(idBtn)
      );
      cartProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      updateCart();
      updateEachBtn();
    }
    clearBtn.addEventListener("click", clearCart);

    function clearCart() {
      cartProducts.length = 0;
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      localStorage.clear();
      updateCart();
    }



    updateCart();
    updateEachBtn();
  }
}
customElements.define(name, myCartAside);
