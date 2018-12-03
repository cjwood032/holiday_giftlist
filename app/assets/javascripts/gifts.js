$(function() {
    attachgiftListeners()
  })
  const attachgiftListeners = () => {
    $('.friend-gifts').on('click', (e) => {
      e.preventDefault()
      debugger
      let userId = $(e.target).attr("data-id")
      let friendId =$(e.target).attr("friend-id")
      debugger
      history.pushState(null, null, `/users/${userId}/friends/${friendId}/gifts`)
      getGifts(userId, FriendId)
    })
    $('#gift-form').submit(function(e) {
      e.preventDefault()
      //debugger
      $.ajax({
        type: "POST",
        url: $(this).attr('action'),
        data: $(this).serialize(),
        dataType: "JSON",
        success: function(gift) {
          showGift(gift.user.id, gift.friend_id, gift.id)
        }
      })
    })
  
    $(document).on('click', '.show-gift', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-user")
      let friendId = $(e.target).attr("data-friend")
      let giftId = $(e.target).attr("data-id")
      showGift(userId, friendId, giftId)
    })
  
    $(document).on('click', '.next-gift', (e) => {
      e.preventDefault()

      let userId = $(e.target).attr("data-user")
      let friendId = $(e.target).attr("data-friend")
      let giftId = $(e.target).attr("data-id")
      debugger
      fetch(`/users/${userId}/friends/${friendId}/gifts/${giftId}next.json`)
      .then(res => res.json())
      .then(gift => {
        showGift(gift.user.id, friendId, gift.id)
      })
    })
  }
  
  const getGifts = (userId, friendId) => {
    fetch(`/users/${userId}/friends/${friendId}/gifts.json`)
    .then(res => res.json())
    .then(gifts => {
      $('#app-container').html('<h3>Gifts</h3><br />')
      let giftColumns = ''
      gifts.forEach(gift => {
        let newGift = new Gift(gift)
        giftColumns += newGift.giftColumn()
      })
      let giftHeadings = ["Name", "Link", "Price", "Buy?"]
      $('#app-container').append(fillGameTable(giftHeadings, giftColumns))
    })
  }
  
  const fillGameTable = (headings, columns) => {
    return makeGameTable(headings) + columns + "</table>"
  }
  
  const showGift = (userId, friendId, giftId) => {
    history.pushState(null, null, `/users/${userId}/friends/${friendId}/gifts/${giftId}`)
    fetch(`/users/${userId}/friends/${friendId}/gifts/${giftId}.json`)
    .then(res => res.json())
    .then(gift => {
      $('#app-container').html(`<h5>Gift ${giftId}</h5><br>`)
      let newGift = new Gift(gift)
      let giftHtml = newGift.formatGameShow()
      $('#app-container').append(giftHtml)
    })
  }
  
  const makeGameTable = (headers) => {
    let table = "<table class='table'><tr>"
    headers.forEach((header) => { table += `<td><strong>${header}</strong></td>`})
    table += "</tr>"
    return table
  }
  

  let giftHeadings = ["Name", "Link", "Price", "Buy?"]
  function Gift(gift) {
    this.id = gift.id
    this.name = gift.name
    this.link = gift.link
    this.price = gift.price
    this.friendId=gift.friend_id
    this.userId = gift.user.id

  }
  
  Gift.prototype.formatGameShow = function(){
    //debugger
    let giftHtml = `
    <h3>Name: ${this.name}</h3><br>
    <p><strong>Link: </strong>${this.link}</p>
    <p><strong>Price: </strong>${this.price}</p>
    <p><a href="/users/${this.userId}/friends/${this.friendId}/gifts/${this.id}edit ">Edit</a> </p><br>
    <button class="next-gift" data-user="${this.userId}" data-friend="${this.friendId}" data-id="${this.id}">Next</button>
    `
    return giftHtml
  }
  
  Gift.prototype.giftColumn = function(){
    let giftColumn = `
    <tr>
    <td>${this.name}</td>
    <td>${this.link}</td>
    <td>${this.price}</td>
    <td><a href="#" data-user="${this.userId}" data-id="${this.id}" class="show-gift">See details</a></td>
    </tr>`
    return giftColumn
  }
  