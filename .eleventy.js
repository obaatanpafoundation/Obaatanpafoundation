module.exports = function (eleventyConfig) {
  // Files copied straight through, untouched
  ["styles.css", "site.js", "robots.txt", "admin", "images"].forEach(function (f) {
    eleventyConfig.addPassthroughCopy("src/" + f);
  });

  // Date helpers
  eleventyConfig.addFilter("readableDate", function (d) {
    return d ? new Date(d).toLocaleDateString("en-GB",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "";
  });
  eleventyConfig.addFilter("isoDate", function (d) {
    return d ? new Date(d).toISOString().slice(0, 10) : "";
  });
  eleventyConfig.addFilter("dayNum", function (d) {
    return d ? String(new Date(d).getUTCDate()) : "";
  });
  eleventyConfig.addFilter("monShort", function (d) {
    return d ? new Date(d).toLocaleDateString("en-GB",
      { month: "short", timeZone: "UTC" }).toUpperCase() : "";
  });
  eleventyConfig.addFilter("yearNum", function (d) {
    return d ? String(new Date(d).getUTCFullYear()) : "";
  });

  // Take the first N items of a list
  eleventyConfig.addFilter("limit", function (arr, n) {
    return (arr || []).slice(0, n);
  });
  // Strip spaces so tel: links work
  eleventyConfig.addFilter("telLink", function (s) {
    return String(s || "").replace(/\s+/g, "");
  });

  // Collections, newest news first, soonest events first
  eleventyConfig.addCollection("posts", function (c) {
    return c.getFilteredByGlob("src/news/*.md").sort(function (a, b) {
      return b.data.date - a.data.date;
    });
  });
  eleventyConfig.addCollection("events", function (c) {
    return c.getFilteredByGlob("src/events/*.md").sort(function (a, b) {
      return a.data.date - b.data.date;
    });
  });
  eleventyConfig.addCollection("upcomingEvents", function (c) {
    return c.getFilteredByGlob("src/events/*.md")
      .filter(function (e) { return e.data.upcoming; })
      .sort(function (a, b) { return a.data.date - b.data.date; });
  });
  eleventyConfig.addCollection("pastEvents", function (c) {
    return c.getFilteredByGlob("src/events/*.md")
      .filter(function (e) { return !e.data.upcoming; })
      .sort(function (a, b) { return b.data.date - a.data.date; });
  });
  eleventyConfig.addCollection("executives", function (c) {
    return c.getFilteredByGlob("src/executives/*.md").sort(function (a, b) {
      return (a.data.order || 99) - (b.data.order || 99);
    });
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
