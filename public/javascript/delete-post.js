async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document.querySelector("#post-id").name;
 console.log("here is the id ------------------->>>>", id)
  const response = await fetch(`/api/posts/${id}`, {
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
  .addEventListener("submit", deleteFormHandler);
