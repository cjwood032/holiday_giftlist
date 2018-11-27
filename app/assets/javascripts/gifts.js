$(function() {
    attachgiftListeners()
  })
  const attachgiftListeners = () => {
      
    $('#gift-form').submit(function(e) {
      e.preventDefault()
      debugger
      $.ajax({
        type: "POST",
        url: $(this).attr('action'),
        data: $(this).serialize(),
        dataType: "JSON",
        success: function(gift) {
          showGift(gift.user.id, gift.id)
        }
      })
    })
  
    $(document).on('click', '.show-gift', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-user")
      //let friendId = $(e.target).attr("data-friend")
      let giftId = $(e.target).attr("data-id")
      showGift(userId, giftId)
    })
  
    $(document).on('click', '.next-gift', (e) => {
      e.preventDefault()
      let userId = $(e.target).attr("data-user")
      let friendId = $(e.target).attr("data-friend")
      let giftId = $(e.target).attr("data-id")
      fetch(`/users/${userId}/friends/${friendId}/gifts/${giftId}next.json`)
      .then(res => res.json())
      .then(gift => {
        showGift(gift.user.id, gift.id)
      })
    })
  }
  
  const getGifts = (userId) => {
    fetch(`/users/${userId}/gifts.json`)
    .then(res => res.json())
    .then(gifts => {
      $('#app-container').html('<h3>Gifts</h3><br />')
      let giftColumns = ''
      gifts.forEach(gift => {
        let newGift = new Gift(gift)
        giftColumns += newGift.giftColumn()
      })
      let giftHeadings = ["Name", "Link", "Price", "Buy?"]
      $('#app-container').append(fillTable(giftHeadings, giftColumns))
    })
  }
  
  const fillTable = (headings, columns) => {
    return makeTable(headings) + columns + "</table>"
  }
  
  const showGift = (userId, friendId, giftId) => {
    history.pushState(null, null, `/users/${userId}/friends/${friendId}/gifts/${giftId}`)
    fetch(`/users/${userId}/friends/${friendId}/gifts/${giftId}.json`)
    .then(res => res.json())
    .then(gift => {
      $('#app-container').html(`<h5>Gift ${giftId}</h5><br>`)
      let newGift = new Gift(gift)
      let giftHtml = newGift.formatShow()
      $('#app-container').append(giftHtml)
    })
  }
  
  const makeTable = (headers) => {
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
    
    //this.buy
    this.userId = gift.user.id

  }
  
  Gift.prototype.formatShow = function(){
    let giftHtml = `
    <h3>Name: ${this.name}</h3><br>
    <h5><a href="/users/${this.userId}/friends/${this.id}/gifts/new">Add Gifts</a>||<a href="/users/${this.userid}/friends/${this.id}/gifts">Giftlist</a></h5>
    <p><strong>Link: </strong>${this.link}</p>
    <p><strong>Price: </strong>${this.price}</p>
    <p><a href="/users/${this.userId}/friends/${this.friendId}/gifts/${this.id}edit ">Edit</a> </p><br>
    <button class="next-gift" data-user="${this.userId}" data-friend="${this.friendId} "data-id="${this.id}">Next</button>
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
  