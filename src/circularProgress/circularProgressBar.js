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
  const { strokeWidth, radius, perimeter } = getSvgStaticAttributes(options.size);

  const parent = document.createElement('div');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  const text = options.showValue ? document.createElement('span') : null;

  let value = normalizeValue(options.value, options.minValue, options.maxValue);
  let animationFrame = null;

  parent.classList.add('circular-progress');
  parent.style.width = options.size + 'px';
  parent.style.height = options.size + 'px';

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
    cancelAnimationFrame(animationFrame);

    const normalizedValue = normalizeValue(newValue, options.minValue, options.maxValue);

    const isIncrementing = normalizedValue > value;

    if (value === normalizedValue) return;

    const update = () => {
      if (isIncrementing) {
        value += 1;
        updateValue(value > normalizedValue ? normalizedValue : value);
        animationFrame = requestAnimationFrame(update);
        value > normalizedValue && cancelAnimationFrame(animationFrame);
      } else {
        value -= 1;
        updateValue(value < normalizedValue ? normalizedValue : value);
        animationFrame = requestAnimationFrame(update);
        value < normalizedValue && cancelAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(update);
  };

  parent.getValue = () => value;

  return parent;

  function updateValue(value) {
    svg.setAttribute('style', getStrokeDasharrayStyle(getLineWidth(perimeter, value), perimeter));
    if (options.showValue) {
      text.innerHTML = typeof options.display === 'function' ? options.display(Math.round(value)) : Math.round(value);
    }
  }
}
