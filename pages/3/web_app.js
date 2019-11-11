/* 
    Javascript Syntax. Interactive course.
    Rishat Ishbulatov, dated Oct 04, 2019.

    Repeat all the work done in the lesson in order to get a working 
    system of "Movie Accounting". At will, to develop it: add covers 
    to films, implement rating the film with stars, add beautiful 
    design and new categories.
*/

const categories = ['драма', 'комедия', 'ужасы', 'фантастика', 'фэнтези', 'мелодрама']
const films = []
const opennedFilms = {}

class Film {
    constructor(name, category, imageLink) {
        this.name = name
        this.category = categories[category]
        this.comments = []
        this.imageLink = imageLink
    }
    addComment(text, author, starts) {
        this.comments.push(new Comment(text, author, starts))
    }
    averageStars() {
        let sum = 0
        this.comments.forEach(comment => {
            sum += +comment.starts
        })
        return (this.comments.length > 0) ? sum / this.comments.length : 0
    }
}

class Comment {
    constructor(text, author, starts) {
        this.text = text || ""
        this.author = author || "anonymous"
        this.starts = starts || 0
    }
}

document.addEventListener("DOMContentLoaded", function () {
    for (let category of categories) {
        const newEl = document.createElement("div")
        newEl.classList.add("category")
        newEl.innerText = category
        newEl.addEventListener("click", function () {
            onCategoryClick(category)
        })
        document.querySelector(".categories").appendChild(newEl)
    }
})

function getFilmsByCategory(category) {
    const out = []
    for (let film of films) {
        if (film.category == category) {
            out.push(film)
        }
    }
    return out
}

function onCategoryClick(name) {
    document.querySelector(".films").innerHTML = ""
    const category = getFilmsByCategory(name)
    for (let film of category) {
        renderFilm(film)
    }
}

function getFilmComments(name) {
    const film = getFilmByName(name)
    return film.comments
}

function getFilmByName(name) {
    const film = films.find(f => f.name === name)
    return film
}

function onAddComment(name) {
    const authorValue = document.getElementById("author-" + name).value
    const commentValue = document.getElementById("comment-" + name).value
    const starValue = document.querySelector('input[id^="'+name+'-star"]:checked').value
    const film = getFilmByName(name)
    film.addComment(commentValue, authorValue, starValue)
    onCategoryClick(film.category)
}

function renderCommentForm(film) {
    let content =
        '<div class="form-title">Добавить отзыв фильму ' + film.name + '</div>' +
        '<form class="form-body">' +
        '<input type="text" id="author-' + film.name + '" placeholder="Ваше имя" class="form-author" required>' +
        '<input type="text" id="comment-' + film.name + '" placeholder="Ваш отзыв" class="form-comment" required>' +
        '<div class="rating">'
    for (let i = 10; i > 0; i--) {
        content += '<input type="radio" class="star" id="'+film.name+'-star-'+i+'" name="rating" value="'+i+'" /><label for="'+film.name+'-star-'+i+'"></label>'
    }
    content += '</div><button onclick="onAddComment(\'' + film.name + '\')">Отправить</button>' +
        '</form>'
    const form = document.createElement("div")
    form.classList.add("comment-form")
    form.innerHTML = content

    form.addEventListener("click", function (event) {
        event.stopPropagation()
        form.classList.add("chosen")
    })
    return form
}

function openFilmCard(film, newEl) {
    const comments = getFilmComments(film.name)
    let s = ""
    comments.forEach(c => {
        s += '<div class="film-comment"><span class="comment-author">' + c.author + '</span>: ' + c.text + '</div>'
    });
    newEl.innerHTML += '<div class="film-comments">' + s + '</div>'

    const commentBtn = document.createElement("button")
    commentBtn.innerText = "Добавить отзыв"
    commentBtn.addEventListener("click", function (event) {
        event.stopPropagation()
        const commentForm = renderCommentForm(film)
        newEl.appendChild(commentForm)
        newEl.removeChild(commentBtn)
    })
    newEl.appendChild(commentBtn)
}

function onFilmClick(film, newEl) {
    if (opennedFilms.hasOwnProperty(film.name) && opennedFilms[film.name]) {
        newEl.innerHTML =
            '<h3>' + film.name + '</h3>' +
            '<figure>' +
            '<img class="film-banner" src="' + film.imageLink + '"/ >' +
            '<div class="film-votes">' +
            '<div class="film-stars-front" style="width:' + film.averageStars() * 10 + '%"></div>' +
            '<div class="film-stars-back"></div>' +
            '</div>' +
            '</figure>'
        opennedFilms[film.name] = false
        return
    } else {
        openFilmCard(film, newEl)
        opennedFilms[film.name] = true
    }
}

function renderFilm(film) {
    const newEl = document.createElement("article")
    newEl.classList.add("film")
    newEl.innerHTML =
        '<h3>' + film.name + '</h3>' +
        '<figure>' +
        '<img class="film-banner" src="' + film.imageLink + '"/ >' +
        '<div class="film-votes">' +
        '<div class="film-stars-front" style="width:' + film.averageStars() * 10 + '%"></div>' +
        '<div class="film-stars-back"></div>' +
        '</div>' +
        '</figure>'
    newEl.addEventListener("click", function () {
        onFilmClick(film, newEl)
    })
    document.querySelector(".films").appendChild(newEl)
}

films.push(new Film("Титаник", 0, "inc/1.jpg"))
films.push(new Film("Матрица", 3, "inc/5.jpg"))
films.push(new Film("Проклятие монахини", 2, "inc/4.jpg"))
films.push(new Film("Эйс Вентура 2: Когда зовёт природа", 1, "inc/2.jpg"))
films.push(new Film("Гарри Поттер и философский камень", 4, "inc/6.jpg"))
films.push(new Film("Знакомьтесь, Джо Блэк", 5, "inc/7.jpg"))
films.push(new Film("Солдаты неудачи", 1, "inc/3.jpg"))

films[0].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Vasia Pupkine", 5)
films[0].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 6)
films[1].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 8)
films[1].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Praesent ac", 1)
films[2].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Vasia Pupkine", 3)
films[2].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 5)
films[3].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 8)
films[3].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "", 9)
films[4].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Vasia Pupkine", 3)
films[4].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 2)
films[5].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 5)
films[5].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Praesent ac", 2)
films[6].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Vasia Pupkine", 1)
films[6].addComment("In hac habitasse platea dictumst. Sed quis eros suscipit, tristique augue quis", "Lorem ipsum dolor sit amet", 10)
