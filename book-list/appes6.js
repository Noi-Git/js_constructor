
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Crate tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">Delete</a></td>
        `;
        
        list.appendChild(row);
    }
    
    showAlert(message, className) {
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Disappear after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

/* =============== Local Storge ================== */
class Store {
    // fetch book from the local storage
    static getBooks() {
        // initualize a variable to hold books info - to use with other method
        let books;
        // check local storage
        if(localStorage.getItem('books') === null) {
            // if the books is no there - set it to an empty array
            books = [];
        } else {
            // use JSON.parse - because we want it to be javascript object
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    // display books to the UI
    static displayBooks() {
        const books = Store.getBooks();

        // loop throug boods with forEach
        books.forEach(function(book) {
            // instantiate the ui
            const ui = new UI;

            // Add book to Ui
            ui.addBookToList(book);
        })
    }

    // add books to the local storage
    static addBook(book) {
        // get book form local storage
        const books = Store.getBooks();

        books.push(book);

        // set local storage with the new book
        // use JSON.stringify - in order to put it in the local storage
        // and becsuse we want to set the books as array
        localStorage.setItem('books', JSON.stringify(books));
    }

    // remove books from the local storage
    static removeBook(isbn) {
        // need to find the unique object to target the remove
        // because we don't have book's id - we are going to use isbn
        // console.log(isbn);

        // get the book from the local storage
        const books = Store.getBooks();

        // loop through with forEach
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

/* =============== DOM Load Event ================== */
// call books in the local storage
document.addEventListener('DOMContentLoaded', Store.displayBooks);

/* =============== Event Listeners ================== */
// 2. Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // console.log('test')
    // get form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value
    // console.log(title, author, isbn);

    // instantiate a book
    const book = new Book(title, author, isbn);
    // console.log(book);

    // instantiate UI
    const ui = new UI()
    // console.log(ui);

    // Validate
    if(title === '' || title === '' || isbn === '') {
        // alert('Failed')
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);
        // Add to local storage
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
})


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    // console.log(123);
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);
    // Remove book from local storage by targeting isbn
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
})