
/* Main functions */
import { showItemsByCategory } from "../main.js";
import { showReclutas } from "../main.js";

let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js", "");
export default class myAside extends HTMLElement {
  static utl = import.meta.url;
  static async components() {
    return await (await fetch(pathName.replace(".js", ".html"))).text();
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  handleEvent(e) {
    if (e.type === "click" && e.currentTarget.id !== "items") {
      const category = e.currentTarget.id;
      showItemsByCategory(category);
      addForm.classList.add('hidden')

      
    } else {
      showReclutas();
    }
    
    
  }
  worker() {
    
    let wk = new Worker("../storage/wkItems.js", { type: "module" });
    wk.postMessage({ message: "" });
    wk.addEventListener("message", (e) => {});
  }
  connectedCallback() {
    
    Promise.resolve(myAside.components()).then((html) => {
      this.shadowRoot.innerHTML = html;
      this.buttons = this.shadowRoot.querySelectorAll(".aside-btn");
      this.buttons.forEach((button) =>
        button.addEventListener("click", this.handleEvent.bind(this))
        
      );
    });
  }
  
}

customElements.define(name, myAside);
