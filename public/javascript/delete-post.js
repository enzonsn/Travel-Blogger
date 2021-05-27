const { post } = require("../../routes/Post-routes");

async function deleteFormHandler(event) {
  event.preventDefault();

  // const id = we need to get the post id here somehow
 console.log("here is the id ------------------->>>>", id);
  const response = await fetch(`/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/profile/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#post-delete-btn")
  .addEventListener("click", deleteFormHandler);
