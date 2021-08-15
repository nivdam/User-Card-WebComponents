const templateInnerHtml = document.querySelector("#inner-html-template");

/* SLIDE UP */
let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    //alert("!");
  }, duration);
};

/* SLIDE DOWN */
let slideDown = (target, duration = 500) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") display = "block";
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");

  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

/* TOOGLE */
var slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

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

    .btn:hover {
      background-color: #b050e0;
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
      <button type="button" class="btn js-toggle_info _js">Hide Info js</button>
    </div>
  </div>  
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.isShowInfo = true;

    this.attachShadow({ mode: "open" }); // for styles

    // js template element
    this.shadowRoot.appendChild(templateJs.content.cloneNode(true));
    this.shadowRoot.querySelector(
      "#js-template-text h3"
    ).innerText = `${this.getAttribute("name")}`;
    Object.assign(this.shadowRoot.querySelector("#js-template-text img"), {
      alt: `${this.getAttribute("name")} user`,
      src: `${this.getAttribute("user-url")}`
    });
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".js-toggle_info._js")
      .addEventListener("click", (e) => {
        const _self = e.target;
        let _userInfoElem = _self.parentNode.querySelector(".user---info");
        this.isShowInfo = !this.isShowInfo;

        if (this.isShowInfo === true) {
          _self.innerText = "Hide Info";
          slideDown(_userInfoElem, 350);
        } else {
          _self.innerText = "Show Info Html";
          slideUp(_userInfoElem, 200);
        }
      });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector(".js-toggle_info").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);
