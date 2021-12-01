import { exec, spawn } from 'child_process';

export function asyncExecute (command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err)
      } else {
      // the *entire* stdout and stderr (buffered)
        resolve({
          stdout, stderr
        });
      }
    });
  });
}

export function shell (command = 'sh', args = []) {
  const shell = spawn(command, args, { stdio: 'inherit' })
  shell.on('close',(code)=>{console.log('[shell] terminated :',code)})

}

export function asyncTimeout (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timeout);
    }, timeout);
  });
}