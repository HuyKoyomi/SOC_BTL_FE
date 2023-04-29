/** @type {import('tailwindcss').Config} */

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  blue: {
    1: "#E8F1FE",
    2: "#f1f6ff",
    3: "#BAD6FB",
    4: "#E6F7FF",
    5: "#5DA0F6",
    6: "#1877F2",
    7: "#0A51AE",
    8: "#2F54EB",
    9: "#1890FF",
  },
  green: {
    1: "#EBFAEF",
    3: "#B3EBC5",
    5: "#4DD077",
    6: "#2EB553",
    7: "#039732",
  },
  cyan: {
    1: "#E7F9F9",
    3: "#87E8DE",
    5: "#36CFC9",
    6: "#13C2C2",
    7: "#08979C",
  },
  orange: {
    1: "#FFF7E6",
    3: "#FFD591",
    4: "#FFF7E6",
    5: "#FFA940",
    6: "#FA8C16",
    7: "#D46B08",
  },
  red: {
    1: "#FFF1F0",
    2: "#fef2f2",
    3: "#FFA39E",
    5: "#FF4D4F",
    6: "#F5222D",
    7: "#CF1322",
  },
  grey: {
    1: "#FFFFFF",
    2: "#FAFAFA",
    3: "#F3F3F3",
    4: "#E8E8E8",
    5: "#D9D9D9",
    6: "#BFBFBF",
    7: "#8C8C8C",
    8: "#5F5F5F",
    9: "#1B1B1B",
    10: "#F5F5F5",
    11: "#595959",
    12: "#7D7D7D",
    13: "#262626",
  },
};

module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    extend: {
      spacing: {
        "9/10": "90%",
        "14/15": "93.333%",
        "19/20": "95%",
        a23: "-23px",
      },
      width: {
        "400px": "400px",
        "300px": "300px",
        "350px": "350px",
        "500px": "500px",
        "600px": "600px",
      },
      colors,
      minWidth: {
        8: "2rem",
      },
      minHeight: {
        8: "2rem",
      },
    },
    fontFamily: {
      arial: ["Arial", "sans-serif"],
    },
    variables: {
      DEFAULT: {
        colors,
        "font-family": "Arial, sans-serif",
      },
    },
  },
  plugins: [require("@mertasan/tailwindcss-variables")],
};
