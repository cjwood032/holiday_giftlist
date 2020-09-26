$(function() {
    attachListeners()
  })
  const attachListeners = () => {
    $('.all-friends').on('click', (e) => {
        e.preventDefault()
        let userId = $(e.target).attr("data-id")
        history.pushState(null, null, `/users/${userId}/friends`)
        getFriends(userId)
      })
 
    $('#friend-form').submit(function(e) {
      e.preventDefault()
      $.ajax({
        type: "POST",
        url: $(this).attr('action'),
        data: $(this).serialize(),
        dataType: "JSON",
        success: function(friend) {
          showFriend(friend.user.id, friend.id)
        }
      })
    })
  
    $(document).on('click', '.show-friend', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-user")
      let friendId = $(e.target).attr("data-id")
      showFriend(userId, friendId)
    })
  
    $(document).on('click', '.next-friend', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-user")
      let friendId = $(e.target).attr("data-id")
      fetch(`/users/${userId}/friends/${friendId}/next.json`)
      .then(res => res.json())
      .then(friend => {
        try {
        showFriend(friend.user.id, friend.id)
      }
      catch(err){
        alert("You have no more friends!")

      }
      })
    })

    $('#delete-friend').submit(function(e) {
      alert('Friend Deleted')
      })
  }
  
  const getFriends = (userId) => {
    fetch(`/users/${userId}/friends.json`)
    .then(res => res.json())
    .then(friends => {
      $('#app-container').html('<h1>Friends</h1>')
      let friendColumns = ''
      friends.forEach(friend => {
        let newFriend = new Friend(friend)
        friendColumns += newFriend.friendColumn()
      })
      let friendHeadings = ["Name", "Gift Purchased", "Amount Spent", "Wishlist"]
      $('#app-container').append(fillTable(friendHeadings, friendColumns))
    })
  }
  
  const fillTable = (headings, columns) => {
    return makeTable(headings) + columns + "</table>"
  }
  
  const showFriend = (userId, friendId) => {
    history.pushState(null, null, `/users/${userId}/friends/${friendId}`)
    fetch(`/users/${userId}/friends/${friendId}.json`)
    .then(res => res.json())
    .then(friend => {
      $('#app-container').html(``)
      let newFriend = new Friend(friend)
      let friendHtml = newFriend.formatShow()
      $('#app-container').append(friendHtml)
    })
  }
  
  const makeTable = (headers) => {
    let table = "<table class='table table-striped'><thead class=\"thead-light\" style=\"background-color: #e3f2fd\"><tr>"
    headers.forEach((header) => { table += `<th><strong>${header}</strong></th>`})
    table += "</tr></thead>"
    return table
  }
  
  function Friend(friend) {
    this.id = friend.id
    this.name = friend.name
    this.giftStatus = friend.gift_status
    this.amountSpent = friend.amount_spent
    this.userId = friend.user.id

  }
  
  Friend.prototype.formatShow = function(){
    let friendHtml = `
    <h1>${this.name}</h1>
    <div class="row"><a href="/users/${this.userId}/friends/${this.id}/gifts/new" class="btn btn-primary">Add Gifts</a><a class="btn btn-info" href="/users/${this.userId}/friends/${this.id}/edit ">Edit Friend</a><a href="/users/${this.userId}/friends/${this.id}/gifts" id="friend-gifts" class="btn btn-primary">Giftlist</a></div>
    <div class="row"><strong>Gift Purchased: </strong>${this.giftStatus}</div>
    <div class="row"><strong>Amount: </strong>${this.amountSpent}</div>
    <div class="row"><button class="next-friend btn btn-primary" data-user="${this.userId}" data-id="${this.id}">Next</button></div>
    `
    return friendHtml
  }
  
  Friend.prototype.friendColumn = function(){
    let friendColumn = `
    <tr>
    <td>${this.name}</td>
    <td>${this.giftStatus}</td>
    <td>${this.amountSpent}</td>
    <td><a href="#" data-user="${this.userId}" data-id="${this.id}" class="show-friend">See details</a></td>
    </tr>`
    return friendColumn
  }
  