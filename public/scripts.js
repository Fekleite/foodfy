const recipes = document.querySelectorAll(".recipe");

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];

  recipe.addEventListener("click", () => {
    window.location.href = `/recipes/${i}`;
  });
}

const ingredients = document.querySelector(".ingredients ul");
const preparation = document.querySelector(".preparation ul");
const information = document.querySelector(".information p");

const ingredientsAccordion = document.querySelector("#ingredientsAccordion");
const preparationAccordion = document.querySelector("#preparationAccordion");
const informationAccordion = document.querySelector("#informationAccordion");

const AR_D = "arrow_drop_down";
const AR_U = "arrow_drop_up";

function handleArrow(element, item) {
  element.classList.toggle("hidden");

  item.innerHTML === AR_D ? item.innerHTML = AR_U : item.innerHTML = AR_D;
}

if (ingredients !== null && ingredientsAccordion !== null) {
  ingredientsAccordion.addEventListener("click", () => {
    handleArrow(ingredients, ingredientsAccordion);
  });
}

if (preparation !== null && preparationAccordion !== null) {
  preparationAccordion.addEventListener("click", () => {
    handleArrow(preparation, preparationAccordion);
  });
}

if (information !== null && informationAccordion !== null) {
  informationAccordion.addEventListener("click", () => {
    handleArrow(information, informationAccordion);
  });
}
