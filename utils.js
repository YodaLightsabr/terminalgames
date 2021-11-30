export function asyncTimeout (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  });
}