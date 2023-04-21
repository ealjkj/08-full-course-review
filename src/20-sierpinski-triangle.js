const number = document.getElementById("number-input");
const display = document.getElementById("number-display");

const equilateralTriangle = (size, color) => {
  const height = (size * Math.sqrt(3)) / 2;

  const triangle = document.createElement("div");
  triangle.classList.add("equilateral");

  // Style
  triangle.style.borderLeft = `${size}px solid transparent`;
  triangle.style.borderRight = `${size}px solid transparent`;
  triangle.style.borderBottom = `${height * 2}px solid ${color}`;

  return triangle;
};

function sierpinski(n, size) {
  if (Number.isNaN(n)) throw Error("not valid input");
  const memo = {};

  const recursiveSierpinski = (n, size) => {
    if (memo[n]) {
      return memo[n].cloneNode(true);
    }

    const height = (size * Math.sqrt(3)) / 2;
    if (n === 1) {
      const baseCase = equilateralTriangle(size, "black");
      memo[n] = baseCase;
      return baseCase;
    }

    const base = equilateralTriangle(size, "white");

    const t1 = recursiveSierpinski(n - 1, size / 2);
    const t2 = recursiveSierpinski(n - 1, size / 2);
    const t3 = recursiveSierpinski(n - 1, size / 2);

    base.appendChild(t1);
    base.appendChild(t2);
    base.appendChild(t3);

    // translate
    t1.style.transform = `translateX(${-size / 2}px)`;
    t3.style.transform = `translate(${-size}px, ${-height}px)`;

    memo[n] = base;
    return base;
  };

  return recursiveSierpinski(n, size);
}

// Event

document.getElementById("number-input").addEventListener("input", (event) => {
  event.preventDefault();

  // Clean the "canvas"
  document.getElementById("triangle-container").remove();

  // Create a new one
  const $triangleContainer = document.createElement("div");
  $triangleContainer.id = "triangle-container";
  document.getElementById("container").appendChild($triangleContainer);

  const s = sierpinski(Number(number.value), 150);
  $triangleContainer.appendChild(s);
  display.textContent = number.value;
});
