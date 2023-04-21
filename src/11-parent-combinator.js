function querySelectorAll(selector) {
  // If there are no special combinators we can use the vanilla querySelectorAll
  if (!selector.includes("<")) return document.querySelectorAll(selector);

  const [parentSelector, childSelector] = selector.split("<");
  const candidateParents = document.querySelectorAll(parentSelector);
  const elements = [];

  candidateParents.forEach((parent) => {
    const children = parent.querySelectorAll(`:scope > ${childSelector}`);
    children.forEach((child) => {
      if (child.parentNode === parent) {
        elements.push(parent);
      }
    });
  });

  return elements;
}

module.exports = querySelectorAll;
