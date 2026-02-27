document.querySelector(".js-add-book").addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector(".js-added-confirmation")
    .classList.add("added-successfully");
  setTimeout(() => {
    document
      .querySelector(".js-added-confirmation")
      .classList.remove("added-successfully");
    document.querySelector(".js-overlay").classList.remove("active");
    document.querySelector("form").classList.remove("active");
  }, 3000);
});

document.querySelector(".js-new-book").addEventListener("click", (e) => {
  document.querySelector(".js-overlay").classList.add("active");
  document.querySelector("form").classList.add("active");
});
