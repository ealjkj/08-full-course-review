const querySelectorAll = (selector) => {
  // If there are no special combinators we can use the vanilla querySelectorAll
  if (!selector.includes("<")) return document.querySelectorAll(selector);
  const [parentSelector, childSelector] = divideParentChild(selector);

  // In case the child selector has also the combinator we can just apply recursion
  const allChildren = childSelector.includes("<")
    ? querySelectorAll(parentSelector + ">" + childSelector)
    : document.querySelectorAll(parentSelector + ">" + childSelector);

  const uniqueParents = new Set();
  for (let child of allChildren) {
    uniqueParents.add(child.parentElement);
  }

  return Array.from(uniqueParents);
};

const divideParentChild = (selector) => {
  const indexOfFirstParentCombinator = selector.indexOf("<");
  const parentSelector = selector.slice(0, indexOfFirstParentCombinator);
  const childSelector = selector.slice(
    indexOfFirstParentCombinator + 1,
    selector.length
  );

  return [parentSelector, childSelector];
};

console.log(querySelectorAll("div.note < .nested <input.is-complete[checked]"));
// console.log(querySelectorAll("div.note < input.is-complete[checked]"));
