class PromiseCaller {
  constructor(indexedTaskArray, answers) {
    this.answers = answers;
    this.indexedTaskArray = indexedTaskArray;
  }

  call() {
    if (this.indexedTaskArray.length !== 0) {
      const [firstTaskCalled, index] = this.indexedTaskArray.shift();
      return firstTaskCalled()
        .then((value) => {
          this.answers[index] = { value };
        })
        .catch((error) => {
          this.answers[index] = { error };
        })
        .finally(() => {
          return this.call();
        });
    }
  }
}

const runTasks = async (tasks, pool_size) => {
  const answers = Array(tasks.length);
  const callers = Array(pool_size).fill(
    new PromiseCaller(
      tasks.map((task, index) => [task, index]),
      answers
    )
  );
  const promises = callers.map((caller) => caller.call());
  await Promise.allSettled(promises);

  return answers;
};

module.exports = runTasks;
