import { circularProgressBar } from './circularProgressBar';

const progressBar = circularProgressBar({
  fontSize: '1.4em',
  color: 'indigo',
  valueColor: '#737373'
});

document.getElementById('root').appendChild(progressBar);

// const count = setInterval(() => {
//   progressBar.setValue(progressBar.getValue() + 1);
//   if (progressBar.getValue() >= 100) {
//     clearInterval(count);
//   }
// }, 15);

setTimeout(() => {
  progressBar.setValue(100);
}, 500);
