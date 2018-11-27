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
        showFriend(friend.user.id, friend.id)
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
      $('#app-container').html('<h3>Friends</h3><br />')
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
      $('#app-container').html(`<h5>Friend ${friendId}</h5><br>`)
      let newFriend = new Friend(friend)
      let friendHtml = newFriend.formatShow()
      $('#app-container').append(friendHtml)
    })
  }
  
  const makeTable = (headers) => {
    let table = "<table class='table'><tr>"
    headers.forEach((header) => { table += `<td><strong>${header}</strong></td>`})
    table += "</tr>"
    return table
  }
  
  const total = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  
  function Friend(friend) {
    this.id = friend.id
    this.name = friend.name
    this.gift_status = friend.gift_status
    this.amount_spent = friend.amount_spent
    this.userId = friend.user.id

  }
  
  Friend.prototype.formatShow = function(){
    let friendHtml = `
    <h3>Name: ${this.name}</h3><br>
    <h5><a href="/users/${this.userId}/friends/${this.id}/gifts/new">Add Gifts</a>||<a href="/users/${this.userid}/friends/${this.id}/gifts">Giftlist</a></h5>
    <p><strong>Gift Purchased: </strong>${this.gift_status}</p>
    <p><strong>Amount: </strong>${this.amount_spent}</p>
    <p><a href="/users/${this.userId}/friends/${this.id}/edit ">Edit Friend</a> </p><br>
    <button class="next-friend" data-user="${this.userId}" data-id="${this.id}">Next</button>
    `
    return friendHtml
  }
  
  Friend.prototype.friendColumn = function(){
    let friendColumn = `
    <tr>
    <td>${this.name}</td>
    <td>${this.gift_purchased}</td>
    <td>${this.purchase_amount}</td>
    <td><a href="#" data-user="${this.userId}" data-id="${this.id}" class="show-friend">See details</a></td>
    </tr>`
    return friendColumn
  }
  