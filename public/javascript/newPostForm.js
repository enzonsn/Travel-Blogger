
async function newPostHandler(event) {
    event.preventDefault();
  
    const post_destination = document.querySelector('input[name="post-destination"]').value;
    const photo = document.querySelector('input[name="photo-link-input"]').value;
    const post_url = `/mockimages/${photo}`
    const post_content = document.querySelector('textarea[name="post-content"]').value; 
    // const user_id = '1';
    const response = await fetch(`/posts`, {
      method: "POST",
      body: JSON.stringify({
        post_destination,
        post_content, 
        post_url
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newPostHandler);