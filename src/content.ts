import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.youtube.com/*",
    "https://m.youtube.com/*",
  ]
}

let counter = 0;

window.addEventListener("load", () => {
  mainFunc();
})


window.addEventListener("scroll", () => {
  mainFunc();
});

const mainFunc = () => {
  const elements = document.querySelectorAll("ytd-rich-grid-media");
  const elLen = elements.length;

  if (elLen != counter) {
    console.log(elLen);
    counter = elLen;
  }
}