const editFormHandler = async (event)=>{
    event.preventDefault();
    const title= document.querySelector('#title').value.trim();
    const content =document.querySelector('#content').value.trim();
    const id=window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    const response = await fetch(`/api/posts/${id}`,{
        method:'PUT',
        body:JSON.stringify({ id,title,content }),
        headers:{ 'Content-Type': 'application/json' },
    });
    if(response.ok){
        alert('Post updated successfully');
        document.location.replace('/dashboard/');
        }else {
            alert(response.statusText)
        }
};
document.querySelector('#edit').addEventListener('click', editFormHandler);