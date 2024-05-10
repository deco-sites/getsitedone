type Classes = "center" | "left" | "right";

const classes = {
  "center": "margin: auto",
  "left": "margin-right: auto",
  "right": "margin-left: auto",
};

export default function clx(_class: Classes) {
  return classes[_class];
}
