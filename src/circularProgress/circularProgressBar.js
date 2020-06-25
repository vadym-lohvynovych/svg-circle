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
  let text = null;

  let value = normalizeValue(options.value, options.minValue, options.maxValue);
  let animationFrame = null;

  parent.classList.add('circular-progress');
  parent.style.width = options.size + 'px';
  parent.style.height = options.size + 'px';

  parent.appendChild(svg);
  svg.appendChild(circle);

  if (options.showValue) {
    text = document.createElement('span');
    text.style.fontSize = options.fontSize;
    text.style.color = options.valueColor;
    parent.appendChild(text);
  }

  updateValue(value);

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

  parent.setValue = (newValue) => {
    cancelAnimationFrame(animationFrame);

    const finalValue = normalizeValue(newValue, options.minValue, options.maxValue);

    const isIncrementing = finalValue > value;

    if (value === finalValue) return;

    const updateFrame = () => {
      const nextValue = isIncrementing ? value + 1 : value - 1;
      const shouldStop = isIncrementing ? nextValue > finalValue : nextValue < finalValue;

      if ((isIncrementing && nextValue > finalValue) || (!isIncrementing && nextValue < finalValue)) {
        value = finalValue;
      } else {
        value = nextValue;
      }

      updateValue(value);

      if (!shouldStop) {
        animationFrame = requestAnimationFrame(updateFrame);
      }
    };

    requestAnimationFrame(updateFrame);
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
