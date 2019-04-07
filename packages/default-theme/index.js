import colors from "./colors.json";

const theme = {
  colors,
  emojis: []
};

// Import all the SVG files and populate emojis array
function requireAll(r) {
  r.keys().forEach(k => {
    theme.emojis.push(r(k)["default"]);
  });
}
requireAll(require.context("./svg/", true, /\.svg$/));

export default theme;
