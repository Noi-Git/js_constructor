const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post Two' }
]

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        })
        document.body.innerHTML = output;
    }, 1000)
} 

// add callback
function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);

        callback();
    }, 2000);
}

// create a new posts - base on info in the function createPost()
createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);



