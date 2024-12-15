import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const aspectRatio =
//   (windowHeight / (windowHeight % windowWidth)).toFixed(0) /
//   (windowWidth / (windowHeight % windowWidth)).toFixed(0);

export const hp = (value) => {
  //   if (aspectRatio <= 1.5)
  //     return ((windowHeight - StatusBar.currentHeight) * value) / 100;
  return (windowHeight * value) / 100;
};
export const wp = (value) => {
  return (windowWidth * value) / 100;
};

export const addCommas = (value) => {
  return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Will remove spaces, check for numbers starting from +923, 923, 03 or 3.
// Then remove +92, 92 or 0 from the number's start and return.
// Returns error if number is not valid.
export const mobileNumberCheck = (value) => {
  const mobile = value.replace(/\s/g, "");
  if (mobile.length === 13 && mobile.substring(0, 4) === "+923") {
    return mobile.substring(3);
  }
  if (mobile.length === 12 && mobile.substring(0, 3) === "923") {
    return mobile.substring(2);
  }
  if (mobile.length === 11 && mobile.substring(0, 2) === "03") {
    return mobile.substring(1);
  }
  if (mobile.length === 10 && mobile.substring(0, 1) === "3") {
    return mobile;
  }
  return "Invalid Mobile Number";
};

// SCALE START

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};
export const scaleN = (size) => (shortDimension / guidelineBaseWidth) * size;
export const scale = memoize(scaleN);
export const verticalScale = (size) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

// SCALE END

export function tConvert(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

export const tConvert_v2 = (time) => {
  // Check correct time format and split into components

  time = time
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    // If time format correct

    time = time.slice(1); // Remove full string match value

    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM

    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  return time.join(""); // return adjusted time or original string
};