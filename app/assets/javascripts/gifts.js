$(function() {
    attachgiftListeners()
  })
  
  const attachgiftListeners = () => {
    $('.friend-gifts').on('click', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-id")
      let friendId =$(e.target).attr("friend-id")
      history.pushState(null, null, `/users/${userId}/friends/${friendId}/gifts`)
      getGifts(userId, FriendId)
    })

    $('#gift-form').submit(function(e) {
      e.preventDefault()
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
  }
  
  const getGifts = (userId, friendId) => {
    fetch(`/users/${userId}/friends/${friendId}/gifts.json`)
    .then(res => res.json())
    .then(gifts => {
      $('#app-container').html('<h3>Gifts</h3>')
      let giftColumns = ''
      gifts.forEach(gift => {
        let newGift = new Gift(gift)
        giftColumns += newGift.giftColumn()
      })
      let giftHeadings = ["Name", "Link", "Price", "Buy?"]
      $('#app-container').append(fillGiftTable(giftHeadings, giftColumns))
    })
  }
  
  const fillGiftTable = (headings, columns) => {
    return makeGiftTable(headings) + columns + "</table>"
  }
  
  const showGift = (userId, friendId, giftId) => {
    history.pushState(null, null, `/users/${userId}/friends/${friendId}/gifts/${giftId}`)
    fetch(`/users/${userId}/friends/${friendId}/gifts/${giftId}.json`)
    .then(res => res.json())
    .then(gift => {
      $('#app-container').html(``)
      let newGift = new Gift(gift)
      let giftHtml = newGift.formatGiftShow()
      $('#app-container').append(giftHtml)
    })
  }
  
  const makeGiftTable = (headers) => {
    let table = "<table class='table table-striped'><thead class=\"thead-light\" style=\"background-color: #e3f2fd\"><tr>"
    headers.forEach((header) => { table += `<th><strong>${header}</strong></th>`})
    table += "</tr></thead>"
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
  
  Gift.prototype.formatGiftShow = function(){
    let giftHtml = `
    <h3>${this.name}</h3><br>
    <a href="/users/${this.userId}/friends/${this.friendId}/gifts/${this.id}/buy"> Buy</a>
    <p><strong>Link: </strong><a href="${this.link}">${this.link}</a></p>
    <p><strong>Price:</strong> $${this.price}</p>
    <p><a href="/users/${this.userId}/friends/${this.friendId}/gifts/${this.id}/edit ">Edit Gift</a> </p><br>
    `
    return giftHtml
  }
  
  Gift.prototype.giftColumn = function(){
    let giftColumn = `
    <tr>
    <td>${this.name}</td>
    <td>${this.link}</td>
    <td>$${this.price}</td>
    <td><a href="#" data-user="${this.userId}" data-id="${this.id}" class="show-gift">See details</a></td>
    </tr>`
    return giftColumn
  }
  