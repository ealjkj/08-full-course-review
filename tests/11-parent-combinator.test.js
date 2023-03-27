/**
 * @jest-environment jsdom
 */

const querySelectorAll = require("../src/11-parent-combinator");

test("Selector includes complex selectors such as [checked]", () => {
  document.body.innerHTML = /*html*/ `
  <section>
    <div id="1" class="note">
      <input type="checkbox" class="is-complete" checked> 
    </div>
    <div id="2" class="note"></div>
    <div id="3" class="note">
      <input type="checkbox" class="is-complete" checked>
    </div>
    <div id="4" class="note"></div>
    <div id="5" class="note">
      <input type="checkbox" class="is-complete" checked>
    </div>
  </section>
  `;

  const elements = querySelectorAll("div.note < input.is-complete[checked]");
  const ids = [].map.call(elements, (el) => el.id);
  expect(ids.sort()).toStrictEqual(["1", "3", "5"]);
});

test("Only select DIRECT parents", () => {
  document.body.innerHTML = /*html*/ `
  <section>
    <div id="1" class="note">
      <div>
        <input type="checkbox" class="is-complete" checked> 
      </div>
    </div>
    <div id="2" class="note"></div>
    <div id="3" class="note">
      <input type="checkbox" class="is-complete" checked>
    </div>
    <div id="4" class="note"></div>
    <div id="5" class="note">
      <input type="checkbox" class="is-complete" checked>
    </div>
  </section>
  `;

  const elements = querySelectorAll("div.note < input.is-complete[checked]");
  const ids = [].map.call(elements, (el) => el.id);
  expect(ids.sort()).toStrictEqual(["3", "5"]);
});

test("Child includes parent on the chain", () => {
  document.body.innerHTML = /*html*/ `
  <section>
    <div id="1" class="note">
      <div id="2" class="note">
        <input type="checkbox" class="is-complete" checked> 
      </div>
    </div>
  </section>
  `;

  const elements = querySelectorAll(
    "div.note < div.note > input.is-complete[checked]"
  );
  const ids = [].map.call(elements, (el) => el.id);
  expect(ids.sort()).toStrictEqual(["1"]);
});

test("Child selector is equal to the parent selector", () => {
  document.body.innerHTML = /*html*/ `
  <section>
    <div id="1" class="note">
      <div id="2" class="note">
        <input type="checkbox" class="is-complete" checked> 
      </div>
    </div>
  </section>
  `;

  const elements = querySelectorAll("div.note < div.note ");
  const ids = [].map.call(elements, (el) => el.id);
  expect(ids.sort()).toStrictEqual(["1"]);
});
