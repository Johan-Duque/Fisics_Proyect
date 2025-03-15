import {IntervalAnimation_MRUA, Calculates_Event_MP, buttonsListeners} from "./functions.js"

/*=============== MENU ===============*/
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

/*=============== Animation Home ===============*/

const buttons_front = document.querySelectorAll(".card__button-front");
const buttons_back = document.querySelectorAll(".card__button-back");

buttonsListeners(buttons_front, "Front");
buttonsListeners(buttons_back, "Back");

/*=============== MRUA ===============*/

const button_MRUA = document.getElementById("section2-button");

let inputRo_MRUA = document.getElementById("inputRo_MRUA");
let inputVo_MRUA = document.getElementById("inputVo_MRUA");
let inputTime_MRUA = document.getElementById("inputTime_MRUA");
let inputDc_MRUA = document.getElementById("inputDc_MRUA");

const car_1 = document.getElementById("car_1");
let audio_car = document.getElementById("audio-car");
let ro_final = document.getElementById("space-final");
let screen_width = 0, width_car = 0;

button_MRUA.addEventListener("click", (e) => {

  let info_vo = Number(inputVo_MRUA.value);
  let info_ro = Number(inputRo_MRUA.value);
  let info_time = Number(inputTime_MRUA.value);

  let value_time = 0, value_space = 0, value_velocity = 0, deceleration = 0;

  screen_width = window.innerWidth;

  if      (screen_width>= 1175) width_car = 200;
  else if (screen_width>= 500)  width_car = 150;
  else                          width_car = 120;

  const root = document.documentElement;
  root.style.setProperty('--translateCar_X', `${screen_width}px`);
  root.style.setProperty('--width-car', `${width_car + 30}px`);
 
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
      IntervalAnimation_MRUA (inputTime_MRUA, value_time, time, [info_vo, deceleration], 1, "s", inputVo_MRUA, car_1, audio_car, screen_width, width_car);
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
      IntervalAnimation_MRUA (inputRo_MRUA, value_space, space, [info_vo, deceleration], info_vo, "m", inputVo_MRUA, car_1, audio_car, screen_width, width_car);

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
      IntervalAnimation_MRUA (inputVo_MRUA, value_velocity, info_time, [velocity, deceleration],1, "m/s", inputVo_MRUA, car_1, audio_car, screen_width, width_car);

    } 

    }
    
  } catch (e) {
    console.log(e);
  }
  
})

/*=============== MP ===============*/

const button_MP = document.getElementById("section-3__button");
const Ball_MP = document.getElementById("ball-section3");
const max_height = document.getElementById("max-height");

let inputVo_MP = document.getElementById("inputVo_MP");
let inputTime_MP = document.getElementById("inputTime_MP");
let space_mp = document.getElementById("space_mp");
let audio_ball = document.getElementById("audio-ball");

button_MP.addEventListener("click", (e) => {

 try{

  if(inputVo_MP.value > 0) {

  screen_width= window.innerWidth
  let reach_ball = 0, left = 0;

  if (screen_width>= 700) reach_ball = 380,  left = '64%';
  else if (screen_width < 700 && screen_width >= 500) reach_ball = 250, left = '70%' 
  else reach_ball = 150, left = '70%';
  
  const root = document.documentElement;
  root.style.setProperty('--translateBall_X', `${reach_ball}%`);
  root.style.setProperty('--left-ball', `${left}`);

  Ball_MP.style.display = "inline-block";    
  audio_ball.play();
  inputVo_MP.disabled = true;
  let values_MP = Calculates_Event_MP(inputVo_MP.value, 9.8, 0.7);
  let time = values_MP[0], reach = values_MP[1], h_max = values_MP[2];

  inputTime_MP.placeholder = `${time}s`;
  space_mp.textContent = `Reach: ${reach} m`;

  max_height.style.display = "none";
  Ball_MP.style.animationName = "canon_shoot";  
  Ball_MP.style.animationDuration = `${time}s`;

  setTimeout(() => {
    max_height.textContent =  `Max Height: ${h_max}m`;
    max_height.style.display = "flex";
  },(time*1000)/1.8);

  setTimeout(() => {
    Ball_MP.style.animationName = "none";
    Ball_MP.style.bottom = "0px";
    Ball_MP.style.left = `calc(${reach_ball}% + ${left})`; 
    inputVo_MP.disabled = false;
  }, time*1000);

  } else {
    alert("You have write the initial velocity");
    inputVo_MP.style.background = "red";
    setTimeout(() => {
      inputVo_MP.style.transition = "background .8s";
      inputVo_MP.style.background = "#3498db";
    },700)
    inputVo_MP.style.transition = "none";
  }

 } catch (e) {
    console.log(e);
  }
  
});

/*=============== GIF ANIMATION ===============*/
const MCUA_Article = document.getElementById("MCUA-section1");

MCUA_Article.addEventListener("mouseover", () => {
  const img = document.getElementById("MCUA-GIF");
  img.src = "imgs/prueba2-unscreen.gif";
  //img.src = "imgs/prueba2.gif";
});

MCUA_Article.addEventListener("mouseleave", () => {
  const img = document.getElementById("MCUA-GIF");
  img.src = "imgs/MRCU-section1.png" ;
}); 

  // `` 