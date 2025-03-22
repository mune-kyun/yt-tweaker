import type { PlasmoCSConfig } from "plasmo";
import { Storage } from "@plasmohq/storage";

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.youtube.com/*",
    "https://m.youtube.com/*",
  ]
}

const storage = new Storage();

let counter = 0;

const WRAPPER = "ytd-rich-grid-media";
const TITLE = "#details yt-formatted-string";
const IMG = "img";

const BLOCKED_TEXT_KEY = "blocked_text";
const TITLE_REPLACE = "[RETRACTED]";
let blockedText = null;

window.addEventListener("load", async () => {
  blockedText = await storage.get(BLOCKED_TEXT_KEY);
  mainFunc();
})

window.addEventListener("scroll", () => {
  mainFunc();
});

storage.watch({
  BLOCKED_TEXT_KEY: (c) => {
    blockedText = c.newValue;
    mainFunc();
  },
});

const mainFunc = () => {
  const allVideoWrapper = document.querySelectorAll(WRAPPER);
  const elLen = allVideoWrapper.length;

  if (elLen != counter && blockedText != null && blockedText.length != 0) {
    allVideoWrapper.forEach((videoWrapper) => {
      const titleElement = videoWrapper.querySelector(TITLE);
      const titleText = titleElement.innerHTML;

      if (titleText.toLowerCase().includes(blockedText)) {
        titleElement.innerHTML = TITLE_REPLACE;

        const imgElements = videoWrapper.querySelectorAll(IMG);
        imgElements.forEach((imgElement) => {
          imgElement.style.visibility = "hidden";
        });
      }
    });
  }
}