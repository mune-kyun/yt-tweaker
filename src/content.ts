import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.youtube.com/*",
    "https://m.youtube.com/*",
  ]
}

let counter = 0;

const WRAPPER = "ytd-rich-grid-media";
const TITLE = "#details yt-formatted-string";
const IMG = "img";

const BLOCKED_TEXT = "hi";
const TITLE_REPLACE = "[RETRACTED]";

window.addEventListener("load", () => {
  mainFunc();
})


window.addEventListener("scroll", () => {
  mainFunc();
});

const mainFunc = () => {
  const allVideoWrapper = document.querySelectorAll(WRAPPER);
  const elLen = allVideoWrapper.length;

  if (elLen != counter) {
    allVideoWrapper.forEach((videoWrapper) => {
      const titleElement = videoWrapper.querySelector(TITLE);
      const titleText = titleElement.innerHTML;

      if (titleText.toLowerCase().includes(BLOCKED_TEXT)) {
        titleElement.innerHTML = TITLE_REPLACE;

        const imgElements = videoWrapper.querySelectorAll(IMG);
        imgElements.forEach((imgElement) => {
          imgElement.style.visibility = "hidden";
        });
      }
    });
  }
}