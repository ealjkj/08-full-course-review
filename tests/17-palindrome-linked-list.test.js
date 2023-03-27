const { LinkedList, getNode } = require("../utils/linkedlist");
const isPalindrome = require("../src/17-palindrome-linked-list");

test("Even palindrome", () => {
  const linkedList = LinkedList.fromArray([1, 2, 2, 3, 3, 2, 2, 1]);
  expect(isPalindrome(linkedList)).toBe(true);
});

test("Odd palindrome", () => {
  const linkedList = LinkedList.fromArray([1, 2, 2, 3, 5, 3, 2, 2, 1]);
  expect(isPalindrome(linkedList)).toBe(true);
});

test("Non palindrome", () => {
  const linkedList = LinkedList.fromArray([1, 2, 2, 3, 4, 2, 2, 1]);
  expect(isPalindrome(linkedList)).toBe(false);
});

test("Empty", () => {
  const linkedList = LinkedList.fromArray([]);
  expect(isPalindrome(linkedList)).toBe(true);
});

test("Loop", () => {
  const linkedList = LinkedList.fromArray([1, 2, 2, 3, 3, 2, 2, 1], 3);
  expect(isPalindrome(linkedList)).toBe(false);
});

test("Function is not destructive", () => {
  const linkedList = LinkedList.fromArray([1, 2, 2, 3, 3, 2, 2, 1]);
  isPalindrome(linkedList);
  expect(isPalindrome(linkedList)).toBe(true);
});
