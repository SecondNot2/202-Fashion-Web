module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // Màu nền và văn bản chính
        "bg-primary": "#004643",
        "text-headline": "#fffffe",
        "text-paragraph": "#abd1c6",

        // Màu nút
        "btn-primary": "#f9bc60",
        "btn-text": "#001e1d",

        // Màu minh họa
        "illustration-stroke": "#001e1d",
        "illustration-main": "#e8e4e6",
        "illustration-highlight": "#f9bc60",
        "illustration-secondary": "#abd1c6",
        "illustration-tertiary": "#e16162",

        // Màu bổ sung từ Happy Hues Palette 10
        "bg-secondary": "#abd1c6",
        "card-bg": "#004643",
        "card-headline": "#fffffe",
        "card-paragraph": "#abd1c6",
        "card-paragraph2": "#0f3433",
        "card-tag-bg": "#004643",
        "card-tag-text": "#fffffe",
        "card-highlight": "#001e1d",
        link: "#f9bc60",
        "form-bg": "#001e1d",
        "form-input": "#004643",
        "form-label": "#fffffe",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
