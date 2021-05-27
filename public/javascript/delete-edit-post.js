// MAKES CALL TO DELETE ROUTE WITH THE POST ID THEN REROUTES TO PROFILE
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

// MAKES CALL TO PUT ROUTE WITH THE POST ID THEN REROUTES TO PROFILE
async function editFormHandler(event) {
  event.preventDefault();

  const post_content = document.querySelector("#newblog-input").value;
  const post_url = document.querySelector('#photo-link-input').value;
  const id = document.querySelector("input[name='post-id-input'").value;
  console.log("here is the id ------------------->>>>", id);
  const response = await fetch(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_content,
      post_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile/");
  } else {
    alert(response.statusText);
  }
}

// EVENT LISTENER FOR DELETE BTN
document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);

// EVENT LISTENER FOR SUBMIT EDIT BTN
document
  .querySelector("#edit-post-submit-btn")
  .addEventListener("click", editFormHandler);
