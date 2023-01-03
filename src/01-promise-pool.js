const taskFactorySample = (delay, resolve, val) => () =>
  new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));
const tasks = [
  taskFactorySample(500, true, 1),
  taskFactorySample(1000, true, 2),
  taskFactorySample(5000, false, "error"),
  taskFactorySample(2000, true, 4),
  taskFactorySample(1000, false, "error"),
  taskFactorySample(1000, false, "error"),
];

class PromiseCaller {
  constructor(indexedTaskArray, answers) {
    this.answers = answers;
    this.indexedTaskArray = indexedTaskArray;
  }

  call() {
    new PromiseCaller();
    if (this.indexedTaskArray.length !== 0) {
      const [firstTaskCalled, index] = this.indexedTaskArray.shift();
      this.answers[index] = firstTaskCalled()
        .then(console.log)
        .catch(console.log)
        .finally(() => {
          this.call();
        });
    }
  }
}

const runTasks = async (tasks, pool_size) => {
  const answers = Array(pool_size);
  const callers = Array(pool_size).fill(
    new PromiseCaller(
      tasks.map((task, index) => [task, index]),
      answers
    )
  );
  callers.map((caller) => caller.call());
  return Promise.allSettled(answers);
};

const pool_size = 6;
const startTime = Date.now();
runTasks(tasks, pool_size).then(() =>
  console.log("time passed", Date.now() - startTime)
);
