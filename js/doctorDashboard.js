firebase.auth().onAuthStateChanged((user) => {
    if (user) {

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

let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {

        let storageRef = firebase.storage().ref(`images/${file.name}`);

        let loader = document.getElementById('loader')
        let text = document.getElementById('text')
        loader.style.display = "block"
        text.style.display = "none"
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}


let submit = async () => {
    let service = document.getElementById('name');
   let discription = document.getElementById('discription');
    let profile = document.getElementById("image");
    let image = await uploadFiles(profile.files[0]);
    let loader = document.getElementById('loader');
    let text = document.getElementById('text');
    loader.style.display = "block"
    text.style.display = "none"

    let redAlert = document.getElementById('redAlert')
    let greenAlert = document.getElementById('greenAlert')



    let data = {
        service: service.value,
        discription: discription.value,
        profile: image
    }



    firebase.auth().onAuthStateChanged((user) => {
        if (user) {




            firebase.database().ref(`services/${user.uid}`).push(data)
                .then((res) => {
                    loader.style.display = "none"
                    text.style.display = "block"
                    greenAlert.innerHTML = "Item added successfully"
                    greenAlert.style.display = "block"


                    service.value = ""
                    discription.value = ""
                    profile.value = ""




                })



                .catch((error) => {

                    var errorMessage = error.message;
                    // console.log(errorMessage)
                    loader.style.display = "none"
                    text.style.display = "block"
                    redAlert.innerHTML = errorMessage
                    redAlert.style.display = "block"


                })
        }

    });
}

let myServices = ()=>{



firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var uid = user.uid;


        firebase.database().ref(`services/${uid}`).on('child_added', (data) => {
            // console.log(data.val())

            var a = data.val()
        
            let tbody = document.getElementById('tbody');

// a === false ? tbody.innerHTML = "Your restaurant is empty" : 
            tbody.innerHTML += `
                    <tr>
                
                    <td>${a.service}</td>
                    <td> <img src="${a.profile}" style="width:50px;  height:40px "></td>
                    <td>${a.discription}</td>
                   
                  </tr>`

        })

    }
});
}


let getAppointment = (status) => {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            var uid = user.uid;


            let appointmentList = document.getElementById('appointment-list')

            firebase.database().ref(`appointments/${uid}`).on('child_added', (data) => {

            //    console.log(data.val())
                
                firebase.database().ref(`patients/${data.val().patientUid}`).once('value', (snapshot) => {
                    // console.log(snapshot.val())
                    // console.log(data.val())

                    let appointmentDetail = { patient: { ...snapshot.val() }, appointment: { ...data.val() } }
                  
                    if (status === appointmentDetail.appointment.status) {

                       

                        appointmentList.innerHTML += `
                <tr>
                
                <td>${appointmentDetail.patient.username}</td>
                <td>${appointmentDetail.patient.email}</td>
                <td>${appointmentDetail.appointment.service}</td>
                <td> <button class="btn btn-primary" onClick="${(appointmentDetail.appointment.status === 'pending') ? accepted(appointmentDetail.appointment.key): true} ">
                 ${appointmentDetail.appointment.status === 'pending' ? "accept" : "accepted"} 
                 </button></td>
               
          
                </tr>
            
              

                 `
            

                    }

                })


            })


        }
    })
}


let accepted = (key)=>{

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            var uid = user.uid;
            console.log(uid)
            firebase.database().ref(`appointments/${uid}/${key}`).update({status: "accepted"})


        }

    })
    
}
// let delivered = (key)=>{

//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {

//             var uid = user.uid;
//             firebase.database().ref(`Appointment/${uid}/${key}`).update({status: "delivered"})


//         }

//     })
  
// }
