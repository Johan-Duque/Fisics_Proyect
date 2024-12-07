const button_MRUA = document.getElementById("section2-button");

const inputVo_MRUA = document.getElementById("inputVo_MRUA");

let inputTime_MRUA = document.getElementById("inputTime_MRUA");
let inputDc_MRUA = document.getElementById("inputDc_MRUA");
let ro_final = document.getElementById("space-final");

const inputRo_MRUA = document.getElementById("inputRo_MRUA");


const car_1 = document.getElementById("car_1");

// --- Move the car --- //

button_MRUA.addEventListener("click", (e) => {
   let info_vo = Number(inputVo_MRUA.value);
  let info_ro = Number(inputRo_MRUA.value);
  let value_time = 1;

  try {
    
    if(info_ro <= 0 || info_vo <= 0){
      alert("NOT IS A CORRECT VALUE")
    } else {
      let time = info_ro/info_vo;
      let deceleration = -info_vo/time;
      console.log(time);

      ro_final.textContent = `${info_ro} m`
      inputTime_MRUA.placeholder = `0s`;
      inputDc_MRUA.placeholder = `-${deceleration}m/s²`;
      car_1.style.animationName = "animation_car1"
      car_1.style.animationDuration = `${time}s`; 

        const intervalo = setInterval(() => {
        inputTime_MRUA.placeholder = `${value_time}s`;
        value_time++;
    
        if (value_time > time) {
            clearInterval(intervalo); // Detiene el intervalo cuando llega a 20
            car_1.style.animationName = "none";
            car_1.style.left = "84%";
        }
    }, 1000);

    }  

  } catch (e) {
    console.log(e);
  }
  
})


// ``