
function getRandomRange(from: number, to: number) {
  return Math.round(Math.random() * (to - from)) + from;
}

export const Utils = {
  getRandomRange
};
