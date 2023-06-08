let myLibrary = [];
const booksbox=document.querySelector("#books")
let books=document.querySelectorAll(".placeable");
const add=document.querySelector("#addbook");
add.addEventListener('click',addNewBook);
addBookToLibrary("Hobbit","Tolkien",298,"Not read yet");
addBookToLibrary("witcher","sapkowski",521,"read");

function Book(title,author,pages,read){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    this.info=function(){
        return title+" by "+author+", "+pages+" pages, "+read;
    }
}
let counter=2;
let shelfindex=0;
function addNewBook(event){
    event.preventDefault()
    let newTitle=document.querySelector("#title").value;
    let newAuthor=document.querySelector("#author").value;
    let newPages=document.querySelector("#pages").value;
    let newRead;
    if(document.querySelector("#read").checked){
        newRead="Already read";;
    }else{
        newRead="Not read yet";
    }
    if(newTitle==="" || newTitle===""|| newPages===""){
        return;
    }
    if(isNaN(newPages)){
        console.log("hey")
        document.querySelector("#pages").setAttribute("style","border-color:red")
        return;
    }
    document.querySelector("#pages").setAttribute("style","border-color:green")
    addBookToLibrary(newTitle,newAuthor,newPages,newRead);
    displayNew(newTitle,newAuthor,newPages,newRead);
    counter++;
    if(counter%4===0){
        shelfindex=shelfindex+1;
        let shelf=document.createElement('div');
        shelf.classList.add("shelf");
        let placeableshelf=document.createElement('div');
        placeableshelf.classList.add("shelf");
        placeableshelf.classList.add("placeable");
        booksbox.appendChild(placeableshelf)
        booksbox.appendChild(shelf);
        books=document.querySelectorAll(".placeable");
    }
}

function addBookToLibrary(title,author,pages,read) {
    let newBook=new Book(title,author,pages,read);
    myLibrary.push(newBook);
}


function displayBooks(){
    books[0].textContent="";
    for (let num in myLibrary){
        let book=document.createElement('div');
        book.classList.add("book");
        let title=document.createElement('h1');
        let author=document.createElement('h2');
        let pages=document.createElement('p');
        let read=document.createElement('p');
        title.textContent=myLibrary[num].title
        author.textContent=myLibrary[num].author
        pages.textContent=myLibrary[num].pages
        read.textContent=myLibrary[num].read
        book.appendChild(title)
        book.appendChild(author)
        book.appendChild(pages)
        book.appendChild(read)
        books[0].appendChild(book);
    }
}
function displayNew(newtitle,newauthor,newpages,newread){
    let book=document.createElement('div');
    book.classList.add("book");
    let title=document.createElement('h1');
    let author=document.createElement('h2');
    let pages=document.createElement('p');
    let read=document.createElement('p');
    title.textContent=newtitle
    author.textContent=newauthor
    pages.textContent=newpages
    read.textContent=newread
    book.appendChild(title)
    book.appendChild(author)
    book.appendChild(pages)
    book.appendChild(read)
    books[shelfindex].appendChild(book);
}

displayBooks();