function getSvgStaticAttributes(size) {
  const strokeWidth = (size / 100) * 6;
  const radius = size / 2 - strokeWidth;
  const perimeter = 2 * Math.PI * radius;

  return {
    strokeWidth,
    radius,
    perimeter
  };
}

function getLineWidth(perimeter, value) {
  return (perimeter / 100) * value;
}

function getStrokeDasharrayStyle(lineWidth, perimeter) {
  return `stroke-dasharray: ${lineWidth} ${perimeter}; transform: rotate(-90deg);`;
}

function setElementAttributes(element, attributes) {
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
}

function normalizeValue(value, minValue, maxValue) {
  return value < minValue ? minValue : value > maxValue ? maxValue : value;
}

export { getSvgStaticAttributes, getLineWidth, getStrokeDasharrayStyle, setElementAttributes, normalizeValue };
