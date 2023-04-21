const { getFirstPrimes } = require("../src/23-first-primes.js");

const originalLog = console.log;
const originalWrite = process.stdout.write;

beforeAll(() => {
  console.log = jest.fn();
  process.stdout.write = jest.fn();
});

afterAll(() => {
  console.log = originalLog;
});

test("function should return the first prime", () => {
  expect(getFirstPrimes(1)).toEqual([2]);
});

test("function should return the first two primes", () => {
  expect(getFirstPrimes(2)).toEqual([2, 3]);
});

test("function should return the first 10 primes", () => {
  expect(getFirstPrimes(10)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
});

test("function should return the first 25 primes", () => {
  expect(getFirstPrimes(25)).toEqual([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]);
});

test("function should return the first 100 primes", () => {
  expect(getFirstPrimes(100)).toEqual([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
    239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
    331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
    421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
    509, 521, 523, 541,
  ]);
});
