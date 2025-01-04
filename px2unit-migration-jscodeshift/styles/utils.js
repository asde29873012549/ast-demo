import { GENERAL_WIDTH, MAXIMUM_WIDTH } from "./constants";

export const setInitialRemSize = () => {
  let remUnit = 16;
  const windowWidth = window.innerWidth;
  const html = document.getElementsByTagName("HTML")[0];

  remUnit = windowWidth / 100;

  if (windowWidth > MAXIMUM_WIDTH) remUnit = MAXIMUM_WIDTH / 100;
  html.style.fontSize = `${remUnit}px`;
};

// landing 會先換算, 讓 1rem ＝ 1vw 大小
export const px2Unit = (pixel) => {
  const unit = (pixel / GENERAL_WIDTH) * 100;
  return `${unit}rem`;
};

export const widthUnit = (pixel) => {
  return `width: ${px2Unit(pixel)};`;
};

export const heightUnit = (pixel) => {
  return `height: ${px2Unit(pixel)};`;
};

