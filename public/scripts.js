// UPLOAD DE FOTOS

const PhotosUpload = {
  preview: document.querySelector("#photos__preview"),
  uploadLimit: 5,
  files: [],
  input: "",

  handleFileInput(event) {
    const { files: fileList } = event.target;
    const { preview, getContainer, hasLimit, files, getAllFiles } = PhotosUpload;

    PhotosUpload.input = event.target;

    if (hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = getContainer(image);

        preview.appendChild(container);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = getAllFiles();
  },

  getContainer(image) {
    const { getRemoveButton, removePhoto } = PhotosUpload;

    const container = document.createElement("div");
    container.classList.add("photo");
    container.onclick = removePhoto;

    container.appendChild(image);
    container.appendChild(getRemoveButton());

    return container;
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.legth > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos.`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];

    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos.");
      event.preventDefault();
      return true;
    }

    return false;
  },

  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },

  removePhoto(event) {
    const { preview, files, getAllFiles } = PhotosUpload;

    const photoDiv = event.target.parentNode; // div.photo
    const photoArray = Array.from(preview.children);

    const index = photoArray.indexOf(photoDiv);

    files.splice(index, 1);
    PhotosUpload.input.files = getAllFiles();

    photoDiv.remove();
  },

  getAllFiles() {
    const { files } = PhotosUpload;

    // ClipboardEvent.clipboardData() para mozilla
    const dataTransfer = new DataTransfer();

    files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }

    photoDiv.remove();
  },
};

// GALLERY

const ImageGallery = {
  highlight: document.querySelector(".gallery__highlight > img"),
  previews: document.querySelectorAll(".gallery__preview img"),

  setImage(e) {
    const { target } = e;

    ImageGallery.previews.forEach(preview => preview.classList.remove("active"));
    target.classList.add("active");

    ImageGallery.highlight.src = target.src;
    Lightbox.image.src = target.src;
  }
}

// LIGHTBOX

const Lightbox = {
  target: document.querySelector(".lightbox"),
  image: document.querySelector(".lightbox img"),
  closeButton: document.querySelector(".lightbox__button--close"),

  open() {
    Lightbox.target.style.opacity = 1;
    Lightbox.target.style.top = 0;
  },

  close() {
    Lightbox.target.style.opacity = 0;
    Lightbox.target.style.top = "-100%";
  }
}

// ACCORDION

const Accordion = {
  ingredients: document.querySelector(".ingredients__list"),
  preparation: document.querySelector(".preparation__list"),
  information: document.querySelector(".information__text"),
  AR_D: "arrow_drop_down",
  AR_U: "arrow_drop_up",

  handleArrow(element, item) {
    element.classList.toggle("accordion");

    item.innerHTML === Accordion.AR_D ? item.innerHTML = Accordion.AR_U : item.innerHTML = Accordion.AR_D;
  },

  openAndCloseIngredients(e) {
    const { target } = e;

    Accordion.handleArrow(Accordion.ingredients, target);
  },

  openAndClosePreparations(e) {
    const { target } = e;

    Accordion.handleArrow(Accordion.preparation, target);
  },

  openAndCloseInforations(e) {
    const { target } = e;

    Accordion.handleArrow(Accordion.information, target);
  }
}

// VALIDATE

const Validate = {
  apply(input, func) {
    Validate.clearErrors(input);

    let results = Validate[func](input.value)
    input.value = results.value

    if(results.error) Validate.displayError(input, results.error);
  },

  isEmail(value) {
    let error = null;

    const mailFormat = /^\w+([-\.]?\w+)*@\w+([-\.]?\w+)*(\.\w{2,3})+$/

    if(!value.match(mailFormat)) error = "Email inválido";

    return {
      error,
      value
    }
  },

  displayError(input, error) {
    const div = document.createElement("div");
    div.classList.add("form__error");
    div.innerHTML = error;

    input.parentNode.appendChild(div);
    input.focus();
  },

  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector(".form__error");

    if(errorDiv) errorDiv.remove();
  }
}
