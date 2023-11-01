let closeSignIn = ()=>{
    let closeBtn = document.getElementById('closeBtn')
    let closeBtn2 = document.getElementById('closeBtn2')
    closeBtn.click()
    closeBtn2.click()
}

// console.log(firebase)

let about = ()=>{
    swal("About Online Medical",`Effortlessly book your doctor’s appointment from our list of doctors in Pakistan using Shifaam’s online
    appointment booking feature. This allows you to book an appointment with your doctor to either see them
    physically at one of the best hospitals in Pakistan or consult online at Shifaam Virtual Clinic without the
    hassle of leaving your home.`);
}
let help = ()=>{
    swal("Help Online Medical", "for help Call or WhatsApp on 0311-1823673");
}