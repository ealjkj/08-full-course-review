// References:  [1] https://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number

const { program } = require("commander");
const { ProgressBar } = require("ascii-progress");

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
}

// Utils ---------------------------
function sieve(N) {
  const total = Math.floor(Math.sqrt(N)) - 1;
  const bar = new ProgressBar({
    schema: ":bar.cyan :percent.magenta",
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
