const newPostFormHandler = async (event)=>{
    event.preventDefault();
    const title=document.querySelector('#post-title').value.trim();
    const entry=document.querySelector('#post-entry').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title,entry }),
        headers:{'Content-Type':'application/json'},
    });

    if (response.ok){
        document.location.replace("/");
    }else{
        alert(response);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);