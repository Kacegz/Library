let myLibrary = [];
let id=0;
const booksbox=document.querySelector("#books")
let books=document.querySelectorAll(".placeable");
const add=document.querySelector("#addbook");
add.addEventListener('click',addNewBook);
addBookToLibrary("Hobbit","Tolkien",310,"Not read yet");
addBookToLibrary("Witcher","A.Sapkowski",343,"Already read");
books[0].textContent="";
let shelfindex=0;
let counter=0;
function Book(title,author,pages,read,id){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id=id;
    this.display=function(){
        let book=document.createElement('div');
        book.classList.add("book");
        let title=document.createElement('h1');
        let author=document.createElement('h2');
        let pages=document.createElement('p');
        let read=document.createElement('p');
        title.textContent=this.title
        author.textContent=this.author
        pages.textContent=this.pages
        read.textContent=this.read
        book.appendChild(title)
        book.appendChild(author)
        book.appendChild(pages)
        book.appendChild(read)
        let choices=document.createElement('div');
        choices.id="choiceboxes"
        let remove=document.createElement('div');
        remove.classList.add("remove")
        remove.id=this.id;
        book.id=this.id
        let change=document.createElement('div');
        change.classList.add("change")
        change.id=this.id;
        change.addEventListener('click',this.changeRead)
        //book.appendChild(change)
        remove.addEventListener('click',this.removeBook)
        //book.appendChild(remove)
        choices.appendChild(change);
        choices.appendChild(remove);
        book.appendChild(choices)
        books[shelfindex].appendChild(book);
    }


    this.removeBook=()=>{
        console.log(this)
        let shelf = document.querySelector(".placeable")
        console.log(myLibrary[document.getElementById(this)])
        let book=document.getElementById(this.id)
        console.log(book)
        if(book.parentNode){
            book.parentNode.removeChild(book);
        }
        delete myLibrary[this.id]
    }
    this.changeRead=()=>{
        let thisbook=document.getElementById(this.id).getElementsByTagName('p')[1];
        console.log(thisbook)
        if (this.read==="Not read yet"){
            thisbook.textContent="Already read";
            return this.read="Already read";
        }else{
            thisbook.textContent="Not read yet";
            return this.read="Not read yet";
        }
    }
}

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
        document.querySelector("#pages").setAttribute("style","border-color:red")
        return;
    }
    document.querySelector("#pages").setAttribute("style","border-color:green")
    addBookToLibrary(newTitle,newAuthor,newPages,newRead,id);
    //displayNew(newTitle,newAuthor,newPages,newRead,id);
    /*books.forEach(shelf => {
        shelf.textContent="";
    });
    displayAll();*/
    if(myLibrary.slice(-1)[0].id%4==0){
        shelfindex++;
        let shelf=document.createElement('div');
        shelf.classList.add("shelf");
        let placeableshelf=document.createElement('div');
        placeableshelf.classList.add("shelf");
        placeableshelf.classList.add("placeable");
        booksbox.appendChild(placeableshelf)
        booksbox.appendChild(shelf);
        books=document.querySelectorAll(".placeable");
    }
    myLibrary.slice(-1)[0].display()
}

function addBookToLibrary(title,author,pages,read) {
    let newBook=new Book(title,author,pages,read,id);
    id++;
    myLibrary.push(newBook);
}
function displayAll(){
    myLibrary.forEach(book => {
        console.log(book.id)
        myLibrary[book.id].display();
    });
}
displayAll();
/*
function displayNew(newtitle,newauthor,newpages,newread,id){
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
    
}*/