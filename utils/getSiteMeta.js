const type = "website";
const url = "https://techsquidtv.com";
const title = "TechSquidTV - Developer Content Creator Blog";
const description =
  "Developer Content Creator - Learn about Docker, TypeScript, Hardware and Development.";
const mainImage = "/img/tstv-og-image-mobile.jpg";
const baseURL = "https://techsquidtv.netlify.app"
function getSiteMeta(meta) {
  return [
    {
      hid: "description",
      name: "description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (meta && meta.type) || type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (meta && (baseURL + meta.mainImage)) || baseURL + mainImage,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (meta && (baseURL + meta.mainImage)) || baseURL + mainImage,
    },
  ];
};
module.exports = { getSiteMeta, baseURL };