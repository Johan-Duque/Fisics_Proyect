const button_MRUA = document.getElementById("section2-button");

const inputVo_MRUA = document.getElementById("inputVo_MRUA");

const inputRo_MRUA = document.getElementById("inputRo_MRUA");

const car_1 = document.getElementById("car_1");

// --- Move the car --- //

button_MRUA.addEventListener("click", (e) => {
  e.preventDefault();
  let info_vo = Number(inputVo_MRUA.value);
  let info_ro = Number(inputRo_MRUA.value);

  try {
    
    if(info_ro <= 0 || info_vo <= 0){
      alert("NOT IS A CORRECT VALUE")
    } else {
      let calculation_time = info_ro/info_vo;
      console.log(calculation_time);

      car_1.style.animationName = "animation_car1"
      car_1.style.animationDuration = `${calculation_time}s`; 
    }  

  } catch (e) {
    console.log(e)
  }
  
})


// ``