const button_MRUA = document.getElementById("section2-button");

let inputVo_MRUA = document.getElementById("inputVo_MRUA");

let inputTime_MRUA = document.getElementById("inputTime_MRUA");
let inputDc_MRUA = document.getElementById("inputDc_MRUA");
let ro_final = document.getElementById("space-final");

let inputRo_MRUA = document.getElementById("inputRo_MRUA");

const car_1 = document.getElementById("car_1");
let audio_car = document.getElementById("audio-car");

function Calculate_Instantaneous_Speed(Vo, a, t){
    let Velocity_Instantaneous = Vo - (a*t);
    inputVo_MRUA.placeholder = `${Velocity_Instantaneous} m/s`;
    console.log(Velocity_Instantaneous);
}

function IntervalAnimation_MRUA (input, value, condicion, array, number_increment, unit){

  let contTime = 0;
  inputVo_MRUA.placeholder = `${inputVo_MRUA.value} m/s`;
  inputVo_MRUA.value = null;
  inputVo_MRUA.disabled = true;

    const intervalo = setInterval(() => {
      value += number_increment;
      input.placeholder = `${value}${unit}`;

      contTime++;
      Calculate_Instantaneous_Speed(array[0], array[1], contTime);

      if (value >= condicion) {
        clearInterval(intervalo);
        audio_car.pause();
        car_1.style.animationName = "none";
        car_1.style.left = "84%";
        input.disabled = false;
        inputVo_MRUA.disabled = false;
        }
    }, 1000);
}

// --- Move the car --- //

button_MRUA.addEventListener("click", (e) => {
  let info_vo = Number(inputVo_MRUA.value);
  let info_ro = Number(inputRo_MRUA.value);
  let info_time = Number(inputTime_MRUA.value);

  let value_time = 0, value_space = 0, value_velocity = 0, deceleration = 0;

  try {

    if(info_ro > 0 && info_vo > 0 && info_time > 0){
      alert("You can't use 3 values");
    } else {

    // Calculate Time
    if(info_ro > 0 && info_vo > 0){
     
      let time = info_ro/info_vo;
      deceleration = Number((info_vo/time).toFixed(2));

      ro_final.textContent = `${info_ro} m`;
      inputTime_MRUA.disabled = true;
      inputTime_MRUA.placeholder = `0s`;

      inputDc_MRUA.placeholder = `-${deceleration}m/s²`;
      car_1.style.animationName = "animation_car1"
      car_1.style.animationDuration = `${time}s`; 

      audio_car.play();
      IntervalAnimation_MRUA (inputTime_MRUA, value_time, time, [info_vo, deceleration], 1, "s");
    } 

    // Calculate Space
    if(info_vo > 0 && info_time > 0){
  
      let space = (info_vo*info_time);
      let deceleration = (info_vo/info_time).toFixed(2);

      ro_final.textContent = `${space} m`;
      inputRo_MRUA.disabled = true;
      inputRo_MRUA.placeholder = `0m`;
      inputVo_MRUA.placeholder = `0000 m/s`;
      inputVo_MRUA.disabled = true;

      inputTime_MRUA.placeholder = `${info_time}s`;
      inputDc_MRUA.placeholder = `-${deceleration}m/s²`;
      car_1.style.animationName = "animation_car1"
      car_1.style.animationDuration = `${info_time}s`; 

      audio_car.play();
      IntervalAnimation_MRUA (inputRo_MRUA, value_space, space, [info_vo, deceleration], info_vo, "m");

    } 

    // Calculate Velocity
    if(info_ro > 0 && info_time > 0){
  
      let velocity = (info_ro/info_time).toFixed(2);
      let deceleration = (velocity/info_time).toFixed(2);

      ro_final.textContent = `${info_ro} m`;
      inputVo_MRUA.value = velocity;

      inputTime_MRUA.placeholder = `${info_time}s`;
      inputDc_MRUA.placeholder = `-${deceleration}m/s²`;
      car_1.style.animationName = "animation_car1"
      car_1.style.animationDuration = `${info_time}s`; 

      audio_car.play();
      IntervalAnimation_MRUA (inputVo_MRUA, value_velocity, info_time, [velocity, deceleration],1, "m/s");

    } 


    }
    

  } catch (e) {
    console.log(e);
  }
  
})

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  toggle.addEventListener('click', () =>{
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu')

      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle','nav-menu');

/*const MCUA_Article = document.getElementById("MCUA-section1");

MCUA_Article.addEventListener("mouseover", () => {
  const img = document.getElementById("MCUA-GIF");
  img.src = "imgs/prueba2-unscreen.gif";
  //img.src = "imgs/prueba2.gif";
});

MCUA_Article.addEventListener("mouseleave", () => {
  const img = document.getElementById("MCUA-GIF");
  img.src = "imgs/MRCU-section1.png" ;
}); */


// ``