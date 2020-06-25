import { getSvgStaticAttributes, getLineWidth, getStrokeDasharrayStyle, setElementAttributes, normalizeValue } from './helpers';
import './progress.css';

const defaultOptions = {
  color: '#ff4500',
  size: 150,
  value: 0,
  minValue: 0,
  maxValue: 100,
  showValue: true,
  fontSize: 'inherit',
  valueColor: 'inherit'
};

export function circularProgressBar(userOptions) {
  const options = {
    ...defaultOptions,
    ...userOptions
  };

  let value = normalizeValue(options.value, options.minValue, options.maxValue);
  let valueInterval = null;

  const parent = document.createElement('div');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const text = options.showValue ? document.createElement('span') : null;

  const { strokeWidth, radius, perimeter } = getSvgStaticAttributes(options.size);

  if (options.showValue) {
    text.style.fontSize = options.fontSize;
    text.style.color = options.valueColor;
  }

  updateValue(value);

  parent.classList.add('circular-progress');

  const svgAttributes = {
    width: options.size,
    height: options.size
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
  parent.appendChild(svg);
  options.showValue && parent.appendChild(text);

  parent.setValue = (newValue) => {
    clearInterval(valueInterval);

    const normalizedValue = normalizeValue(newValue, options.minValue, options.maxValue);
    const fps = 60;
    const duration = Math.abs(normalizedValue - value) * 10;
    const ticks = (fps / 100) * (duration / 1000) * 100;
    const tickValue = Math.abs(normalizedValue - value) / ticks;
    const isIncrementing = normalizedValue > value;

    if (value === normalizedValue) return;

    valueInterval = setInterval(() => {
      if (isIncrementing) {
        value += tickValue;
        updateValue(value > normalizedValue ? normalizedValue : value);
        value > normalizedValue && clearInterval(valueInterval);
      } else {
        value -= tickValue;
        updateValue(value < normalizedValue ? normalizedValue : value);
        value < normalizedValue && clearInterval(valueInterval);
      }
    }, duration / fps);

    // const updateValue = () => {
    //   if (value !== normalizedValue) {
    //     value = normalizedValue > value ? value + 1 : value - 1;
    //     updateValue(value);
    //     requestAnimationFrame(updateValue);
    //   }
    // };

    // requestAnimationFrame(updateValue);
  };

  parent.getValue = () => value;

  return parent;

  function updateValue(value) {
    svg.setAttribute('style', getStrokeDasharrayStyle(getLineWidth(perimeter, value), perimeter));
    if (options.showValue) {
      text.innerHTML = Math.round(value);
    }
  }
}
