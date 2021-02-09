const modalOverlay = document.querySelector(".modal__overlay");
const recipes = document.querySelectorAll(".recipe");

for (let recipe of recipes) {
  recipe.addEventListener("click", () => {
    const elementId = handleId(recipe);
    const recipeTitle = recipe.querySelector("h3").innerText;
    const recipeAuthor = recipe.querySelector("p").innerText;

    modalOverlay.classList.add("active");

    modalOverlay.querySelector("img").src = `./assets/${elementId}.png`;
    modalOverlay.querySelector("h2").innerText = recipeTitle;
    modalOverlay.querySelector("p").innerText = recipeAuthor;
  });
}

document.querySelector(".modal__close").addEventListener("click", () => {
  modalOverlay.classList.remove("active");

  modalOverlay.querySelector("img").src = "";
  modalOverlay.querySelector("h2").innerText = "";
  modalOverlay.querySelector("p").innerText = "";
});

function handleId(recipe) {
  const elementId = recipe.getAttribute("id");
  const formatedId = elementId.split("_");

  if (formatedId.length === 2) {
    return formatedId[1];
  }
  
  return elementId;
}
