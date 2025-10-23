/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        1: "0.01",
        2: "0.02",
        3: "0.03",
      },
      animation: {
        fadeIn: "fadeIn 500ms ease"
      },
      backgroundImage: {
        placeholder: "url(https://s3-alpha-sig.figma.com/img/fe50/ba59/4917078977ee913066a08ba58b681400?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TsikEl98btr66o8lAJzApVVtZI7cJsgSDoZDlROSiHK~ULaK4I96pyWC05ZuTeM68Ihhs6FoYNwPt5PZJXBvcNnrteTgdOGAJJPPm9aUN8iPhEN6uZbXSw~9FwF~Zz9fTdPs8wDc06PHFjTkgnWv~gTe45A0HhFjIHdFwESA0gFpfoSZz9IJFxD64Nwoxl0hWylFJSVa4bzYzwE7XVbAYD3vGcN5M5TAXcxWkcvIE9NSMr43Gqbvct88SVYgBhu6oZYYHyiWRKHnK36xQ5gONJntXdd32PbaWhpmNPDMLmpmD2C628qVHg5ZwCuW61bc5~jsnAwZnRZYi0tDIu411w__)",
      },
    },
  },
  plugins: [],
};
