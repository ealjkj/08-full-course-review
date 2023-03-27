const querySelectorAll = (selector) => {
  // If there are no special combinators we can use the vanilla querySelectorAll
  if (!selector.includes("<")) return document.querySelectorAll(selector);
  const [parentSelector, childSelector] = selector.split("<");

  const candidateParents = document.querySelectorAll(parentSelector);

  return [].filter.call(candidateParents, (parent) => {
    const childSeparated = childSelector.split(">");

    if (childSeparated.length === 1) {
      return Array.from(document.querySelectorAll(childSelector)).some(
        (child) => Array.from(parent.children).includes(child)
      );
    }

    return Array.from(
      querySelectorAll(
        `${childSeparated[0]} < ${childSeparated.slice(1).join(" > ")}`
      )
    ).some((child) => {
      return Array.from(parent.children).includes(child);
    });
  });
};

module.exports = querySelectorAll;
