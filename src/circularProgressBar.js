import { getSvgStaticAttributes, getLineWidth, getStrokeDasharrayStyle, setElementAttributes, normalizeValue } from './helpers';

const defaultOptions = {
  color: '#ff4500',
  size: 150,
  value: 0,
  minValue: 0,
  maxValue: 100
};

export function circularProgressBar(userOptions) {
  const options = {
    ...defaultOptions,
    ...userOptions
  };

  let value = normalizeValue(options.value, options.minValue, options.maxValue);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

  const { strokeWidth, radius, perimeter } = getSvgStaticAttributes(options.size);

  const svgAttributes = {
    width: options.size,
    height: options.size,
    style: getStrokeDasharrayStyle(getLineWidth(perimeter, value), perimeter)
  };

  const circleAttributes = {
    cx: options.size / 2,
    cy: options.size / 2,
    r: radius,
    style: 'stroke-linecap: round',
    stroke: options.color,
    'stroke-width': strokeWidth,
    fill: 'none'
  };

  setElementAttributes(svg, svgAttributes);
  setElementAttributes(circle, circleAttributes);

  svg.appendChild(circle);

  svg.setValue = (newValue) => {
    value = normalizeValue(newValue, options.minValue, options.maxValue);
    svg.setAttribute('style', getStrokeDasharrayStyle(getLineWidth(perimeter, value), perimeter));
  };

  svg.getValue = () => value;

  return svg;
}
