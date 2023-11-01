firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let uid = window.location.hash.slice(1)

        firebase.database().ref(`doctors/${uid}`).once('value',(data)=>{

       
            let restCover = document.getElementById('rest-cover')
    
            restCover.innerHTML = ` <div class="cover-image mt-50">
            <img src="${data.val().profile}" height="400px" width="100%" alt="">
          </div>`
            
        }).then(()=>{

        
        
        firebase.database().ref(`doctors/${uid}`).once('value',(data)=>{

       
        let restName = document.getElementById('rest-name')

        restName.innerHTML = `${data.val().username.toUpperCase()}`
        
    })
})

        firebase.database().ref(`services/${uid}`).on('child_added', (data) => {
        // console.log(data.val())
        
             
        let a = data.val()
        
        let spiner = document.getElementById('spiner')
        let rest = document.getElementById('rest')
       
        
        
        spiner.style.display = 'none'
        
                    rest.innerHTML += `
          <div class="col-lg-3 col-md-4 col-sm-6 mt-3 mb-5">
                    <div class="card" >
                            <img src="${a.profile}" style="height:200px" class="card-img-top" alt="...">
                                <div class="card-body">
                            <h5 class="card-title">${a.service}</h5>
                            <p>${a.discription}</p>
                          
                           
                            
                            <a href="javascript:void(0)"> <button onclick="appointNow('${a.profile}','${a.service}','${a.discription}','${data.key}')" type="button" class="btn btn-primary">Take an Appointment</button> </a>
                         
                            </div>
                                </div>
                                </div>`
        
        })
        
        

    } else {
        window.location = "../index.html"
    }
});

let logout = () => {
    firebase.auth().signOut()
        .then(() => {
            window.location = "../index.html"
        })
}

let getUID = () => {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user.uid)
                // console.log(user.uid)
            }
        })
    })
}
// getUID()

let appointNow = async (image, service, discription,key) => {
//   let addToCartBtn = document.getElementById('addToCartBtn');
//   addToCartBtn.innerHTML = `
//   <div>
//   <input type="number" />
//   <span>Add</span>
//   </div>
//   `
    let uid = window.location.hash.slice(1);
    let patientUid = await getUID();
    let appointment = {
        image,
        service,
        discription,
        key,
        status: 'pending',
        uid,
        patientUid
    }
    firebase.database().ref(`appointments/${uid}/${key}`).set(appointment)

    
        .then(() => {
         
            swal("Congratulation!", "Your Appointment has been placed!", "success");


        })
}