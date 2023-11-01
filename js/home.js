let logOut = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "../index.html"
        })
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       

        firebase.database().ref(`doctors`).on('child_added', (data) => {
            console.log(data.val())
          console.log(data.key)
                
            let a = data.val()
        
        let spiner = document.getElementById('spiner')
        let rest = document.getElementById('rest')
        
        spiner.style.display = 'none'
        
                    rest.innerHTML += `
          <div class="col-lg-4 col-sm-6 mt-3">
                    <div class="card" >
                            <img src="${a.profile}" style="height:200px" class="card-img-top" alt="...">
                                <div class="card-body">
                            <h5 class="card-title">${a.username.toUpperCase()}</h5>
                            <p>${a.city}, ${a.country}</p>
                           
                            
                            <a href="doctor.html#${data.key}"> <button type="button" class="btn btn-primary">view services</button> </a>
                            </div>
                                </div>
                                </div>`
        
           
        })
        
        


    } else {
        window.location = "../index.html"
    }
});

