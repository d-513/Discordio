import cp from "child_process";
export default function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);
      else {
        return resolve({ stdout, stderr });
      }
    });
  });
}
