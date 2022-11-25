const height = {
  appBar: 12,
  tab: 12,
};

const color = {
  main: "pink-500",
  mainRgb: "#EC4899",
  mainLight: "pink-200",
  mainLightRgb: "#F48FB1",
  background: "white",
};

const page = {
  base: "flex-1 flex flex-col w-full justify-center items-center",
  body: "flex-1 flex flex-col overflow-scroll w-full",
  margin: {
    top: `mt-${height.appBar}`,
    topWithTab: `mt-${height.appBar + height.tab}`,
    bottom: "mb-[56px]",
  }
};

const component = {
  signIn: {
    notification: `my-16 text-center text-${color.main}`,
    buttonWrapper: "flex flex-col my-12",
  },
};

const button = {
  base: "w-36 min-h-12 h-12 rounded-md text-center shadow",
  colorSet: {
    main: `bg-${color.main} text-white`,
    secondary: `bg-white text-${color.main} border-2`,
  },
  margin: {
    base: "",
    large: "",
  },
};

const classNames = {
  color,
  page,
  component,
  button,
};

export default classNames;
