/* Main functions */
import campersModule from "../api/getCampers.js";

campersModule.showAllCampers;

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
    campersModule.showAllCampers;
   
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
