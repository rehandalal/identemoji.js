import Identemoji from "../core";
import { getHash } from "../core/utils";

import defaultTheme from "../theme/default";

const defaultSeed = "Identemoji";

const seedField = document.getElementById("seed");
const themeField = document.getElementById("theme");

const handleChange = async () => {
  const ie = new Identemoji(seedField.value, JSON.parse(themeField.value), 512);
  ie.draw();

  const fi = new Identemoji(seedField.value, JSON.parse(themeField.value), 32);
  await fi.draw();

  let link = document.querySelector('link[rel*="icon"]');
  if (link) {
    link.remove();
  }

  link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = await fi.toDataURL();
  document.getElementsByTagName("head")[0].appendChild(link);

  const pb = document.getElementById("preview-box");
  pb.innerHTML = "";
  pb.appendChild(ie.canvas);
};

seedField.addEventListener("input", handleChange);
themeField.addEventListener("input", handleChange);

seedField.value = defaultSeed;
themeField.value = JSON.stringify(defaultTheme, null, 2);
handleChange();

const randomButton = document.getElementById("random");

randomButton.addEventListener("click", async () => {
  const v = await getHash(Date.now());
  seedField.value = v.slice(0, 8);
  handleChange();
});
