import { circularProgressBar } from './circularProgressBar';

const progressBar = circularProgressBar();

document.getElementById('root').appendChild(progressBar);

const count = setInterval(() => {
  progressBar.setValue(progressBar.getValue() + 1);
  if (progressBar.getValue() >= 100) {
    clearInterval(count);
  }
}, 15);
