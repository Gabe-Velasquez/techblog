const editFormHandler = async (event)=>{
    event.preventDefault();
    const title= document.querySelector('#title').value.trim();
    const entry =document.querySelector('#entry').value.trim();
    const id=window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    const response = await fetch(`/api/posts/${id}`,{
        method:'PUT',
        body:JSON.stringify({title,entry}),
        headers:{ 'Content-Type': 'application/json' },
    });
    if(response.ok){
        alert('Post updated successfully');
        document.location.replace('/dashboard');
        }else {
            alert('Failed to update post');
        }
};
document.querySelector('.edit-post-form').addEventListener('submit',editFormHandler);