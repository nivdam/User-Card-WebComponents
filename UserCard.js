const templateInnerHtml = document.querySelector("#inner-html-template");

const templateJs = document.createElement("template");
templateJs.innerHTML = `
  <style id="xcv">
    :host {
      display: block;
      margin-top: 15px;
    }
    
    .user---card {
      display: grid;
      width: 100%;
      max-width: 500px;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      font-family: "Arial", sans-serif;
      background-color: #f4f4f4;
      border-bottom: 5px solid darkorchid;
    }

    .user---card ~ .user---card {
      margin-top: 15px;
    }

    img {
      width: 100%;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li + li {
      margin-top: 12px;
    }

    .btn {
      cursor: pointer;
      color: white;
      padding: 5px 10px;
      border: 0;
      border-radius: 5px;
      background-color: darkorchid;
    }
  </style>

  <div class="user---card" id="js-template-text">
    <picture class="user--avatar"><img src="" alt=""></picture>
    <div class="user---content">
      <h3 class="user---title"></h3>

      <div class="user---info">
      <ul>
        <li><slot name="email" /></li>
        <li><slot name="phone" /></li>
      </ul>
      </div>
      <button type="button" class="btn js-toggle_info">Hide Info</button>
    </div>
  </div>  
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }); // for styles

    // inner html template
    this.shadowRoot.appendChild(templateInnerHtml.content.cloneNode(true));
    this.shadowRoot.querySelector(
      "#inner-html-text h3"
    ).innerHTML = `${this.getAttribute("name")} - html template`;
    Object.assign(this.shadowRoot.querySelector("#inner-html-text img"), {
      alt: `${this.getAttribute("name")} user`,
      src: `${this.getAttribute("user-url")}`
    });

    // js template element
    this.shadowRoot.appendChild(templateJs.content.cloneNode(true));
    this.shadowRoot.querySelector(
      "#js-template-text h3"
    ).innerText = `${this.getAttribute("name")} js tem`;
    Object.assign(this.shadowRoot.querySelector("#js-template-text img"), {
      alt: `${this.getAttribute("name")} user`,
      src: `${this.getAttribute("user-url")}`
    });
  }
}

window.customElements.define("user-card", UserCard);
