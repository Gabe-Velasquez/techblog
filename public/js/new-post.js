const newPostFormHandler = async (event)=>{
    event.preventDefault();
    const title=document.querySelector('#title').value.trim();
    const content=document.querySelector('#entry').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title,content }),
        headers:{'Content-Type':'application/json'},
    });

    if (response.ok){
        document.location.replace("/dashboard");
    }else{
        alert(response);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);