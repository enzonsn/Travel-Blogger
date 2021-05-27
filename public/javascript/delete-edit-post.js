
async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document.querySelector("input[name='post-id-input'").value;
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
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
