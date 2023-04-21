// References:  [1] https://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number

const { program } = require("commander");
const chalk = require("chalk");

class ProgressBar {
  constructor(props) {
    this.total = props.total;
    this.ticks = 0;
    this.barlength = 60;
    this.done = false;
  }

  tick() {
    if (this.done) return;

    this.ticks++;
    const label = parseFloat((100 * this.ticks) / this.total).toFixed(2) + "%";

    const tickLength = this.barlength / this.total;
    const filledPortion = Math.floor(tickLength * this.ticks);
    let bar = "▇".repeat(filledPortion) + "—".repeat(60 - filledPortion);

    if (this.ticks >= this.total) {
      this.done = true;
      bar = "▇".repeat(this.barlength);
    }

    process.stdout.write("\r");
    return process.stdout.write(
      chalk.blue.bgMagentaBright(bar) + " " + chalk.yellow(label)
    );
  }
}

// CLI ---------------------------
program
  .argument("<number>", "The number of primes to calculate")
  .action(getFirstPrimes);

program.parse();

// Main Function ---------------------------
function getFirstPrimes(n) {
  const upperBound =
    n > 5 ? Math.floor(n * Math.log(n) + n * Math.log(Math.log(n))) : 11; // [1]
  const firstPrimes = sieve(upperBound).slice(0, n);
  console.log(firstPrimes);
  return firstPrimes;
}

// Utils ---------------------------
function sieve(N) {
  const total = Math.floor(Math.sqrt(N)) - 1;
  const bar = new ProgressBar({
    total,
  });

  const isPrimeArray = Array(N + 1).fill(true); // indexed from 0 to n

  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (isPrimeArray[i]) {
      for (let j = i * i; j <= N; j += i) {
        isPrimeArray[j] = false;
      }
    }
    bar.tick();
  }

  // Fixing the first two
  isPrimeArray[0] = false;
  isPrimeArray[1] = false;

  return isPrimeArray
    .map((value, index) => {
      if (value) return index;
      return value;
    })
    .filter((value) => value);
}

module.exports = { getFirstPrimes };
