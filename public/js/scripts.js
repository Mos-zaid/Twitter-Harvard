// Count Word
let countWordBtn = document.querySelector('#countWordBtn')
if (countWordBtn){
  countWordBtn.addEventListener('click', countWords)
}



function countWords(e) {
  e.preventDefault()
  newTweetValue = document.querySelector('.add-new-tweet-field').value

  const arr = newTweetValue.split(' ');

  countWord = arr.filter(word => word !== '').length;
              // Display it as output
    document.getElementById("show").innerHTML = countWord;
}



// MOBILE MENU
// 1. Select item
let hamburgerIcon = document.querySelector('.navbar-toggler')
let navContainer = document.querySelector('.navbar-collapse', '.collapse')

// 2. Event
hamburgerIcon.addEventListener('click', toggleNavMenu)

// 3. Action / Functions
function toggleNavMenu () {
  hamburgerIcon.classList.toggle('collapsed')
  navContainer.classList.toggle('show')
}




// TWEET PAGE

let newTweetTemplate = function (text, serverResponse){
    return `<div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <p class="card-text">${text}.</p>
        <div>
            <span data-id="${serverResponse.data._id}" href="#" class="btn edit-tweet-btn btn-outline-primary">Edit</span>
            <span data-id="${serverResponse.data._id}" href="#" class="btn delete-tweet-btn btn-outline-danger">Delete</span>
          </div>
      </div>
      <div class="card-footer">
      <small class="text-muted">Created Now</small>
    </div>
    </div>
  </div>
`
}

// 1. Select button
let addNewTweetButton = document.querySelector('.add-tweet-btn')
let addNewTweetForm = document.querySelector('.create-tweet-form')

// 2. Event
document.addEventListener('click', editBtn)
document.addEventListener('click', deleteBtn)
if (addNewTweetButton){
  addNewTweetButton.addEventListener('click', addNewTweet)
}
// addNewTweetForm.addEventListener('submit', addNewTweet)
// document.getElementsByClassName

// 3. Action
function editBtn (e){
  if(e.target.classList.contains('edit-tweet-btn')){
    let idToEdit = e.target.getAttribute("data-id")
    let newVal = prompt("Edit your tweet", e.target.parentElement.parentElement.querySelector('.card-text').innerHTML)
    if (newVal){
      // DO SERVER SIDE AND DATABASE THINGS
      var token = document.querySelector('#_csrf').value
      axios.post("/edit-tweet", {id: idToEdit, content: newVal}, {
        headers: {
          'CSRF-Token': token
        }
      }).then( (msg) => {
          e.target.parentElement.parentElement.querySelector('.card-text').innerHTML = newVal
      }).catch( (err) => {
        console.log(err)
      })
    }
  }
}

function deleteBtn (e){
  if(e.target.classList.contains('delete-tweet-btn')){
    let confirmation = confirm("Are you sure you want to delete this?")
    let idToDel = e.target.getAttribute("data-id")
    if (confirmation){
      // DO SERVER SIDE AND DATABASE THINGS
      var token = document.querySelector('#_csrf').value
      axios.post("/delete-tweet", {id : idToDel}, {
        headers: {
          'CSRF-Token': token
        }
      }).then(function(response){
        console.log("Success")
      }).catch(function(error){
        console.log("Error")
      })
      e.target.parentElement.parentElement.parentElement.parentElement.remove()
    }
  }
}

function addNewTweet (e){
  e.preventDefault()
  newTweet = document.querySelector('.add-new-tweet-field')
  newTweetValue = document.querySelector('.add-new-tweet-field').value
  newTweetDate = document.querySelector('.add-new-tweet-date')
  if (newTweetValue){
    // DO SERVER SIDE AND DATABASE THINGS
    var token = document.querySelector('#_csrf').value
    axios.post('/create-tweet', {content: newTweetValue, tweetDate: newTweetDate}, {
      headers: {
        'CSRF-Token': token
      }
    }).then( (response) => {
        document.querySelector('.full-tweet-list').insertAdjacentHTML("beforeend", newTweetTemplate(newTweetValue, response))
        newTweet.focus()
        newTweet.value = ''
        newTweetDate.value = ''
    }).catch( (err) =>{
        console.log(err)
    })


  }

}