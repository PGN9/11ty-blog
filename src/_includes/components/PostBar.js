const { html } = require("common-tags");

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostBar(post) {
  return html`
    <div class="mycard">
      <li class="post-bar">
        <div class="post-bar__main">
          <a class="post-bar__title" href="${post.url}"> ${post.data.title} </a>

          <time class="post-bar__date">${formatDate(post.data.date)}</time>

          <div class="post-bar__tags">
            ${post.data.tags.map(
              (tag) => html`
                <a class="post-bar__tag" href="/blog/tag/${tag}"> ${tag} </a>
              `,
            )}
          </div>
        </div>
      </li>
    </div>
  `;
}

module.exports = PostBar;
