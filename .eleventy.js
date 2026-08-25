const { HtmlBasePlugin } = require("@11ty/eleventy");

const Card = require("./src/_includes/components/Card");
// const PostBar = require("./src/_includes/components/PostBar");

const collectionApi = (module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");

  eleventyConfig.addShortcode("Card", Card);
  // eleventyConfig.addShortcode("PostBar", PostBar);

  eleventyConfig.addFilter("formatDate", function (date) {
    return new Date(date).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("recentPosts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/**/*.md")
      .sort((a, b) => b.date - a.date)
      .slice(0, 2);
  });

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/blog/posts/**/*.md");

    const tags = new Set();

    for (const post of posts) {
      for (const tag of post.data.tags ?? []) {
        tags.add(tag);
      }
    }

    return [...tags].sort();
  });

  return {
    // pathPrefix: "/11ty-blog/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
});
