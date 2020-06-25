import { circularProgressBar } from './circularProgressBar';

const progressBar = circularProgressBar({
  fontSize: '1.4em',
  color: 'lightblue',
  valueColor: '#737993',
  display: (value) => value + '%'
});

document.getElementById('root').appendChild(progressBar);

// const count = setInterval(() => {
//   progressBar.setValue(progressBar.getValue() + 1);
//   if (progressBar.getValue() >= 100) {
//     clearInterval(count);
//   }
// }, 10);

setTimeout(() => {
  progressBar.setValue(100);
}, 500);
