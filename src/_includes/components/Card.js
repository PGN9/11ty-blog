// common JS import
const { html } = require("common-tags");

// BEM class naming convention
function Card({ title, link, linkText, raised }) {
  return html`
    <div
      class="${`card__container ${raised ? `card__container--raised` : ``}`}"
    >
      <h2 class="card__title">${title}</h2>
      <a class="card__link" href="${link}">${linkText}</a>
    </div>
  `;
}

// export the Card component
module.exports = Card;
