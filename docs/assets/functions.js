/*=============== FUNCTIONS Home ===============*/

export function buttonsListeners (buttons, typeButton){

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
           e.preventDefault();
           e.stopPropagation();
           if(typeButton == "Front") {
            button.parentNode.style.transform = `perspective(600px) rotateY(180deg)`;
            button.parentNode.nextElementSibling.style.transform = `perspective(600px) rotateY(360deg)`;
           } else if(typeButton == "Back") {
            button.parentNode.previousElementSibling.style.transform = `perspective(600px) rotateY(0deg)`;
            button.parentNode.style.transform  = `perspective(600px) rotateY(180deg)`;
           }

        });
    });

}

/*=============== FUNCTIONS MRUA ===============*/

function Calculate_Instantaneous_Speed(Vo, a, t, input_vo, loop){

  let Velocity_Instantaneous = (Vo - (a*t)).toFixed(2);

  if(loop) {
    if(Velocity_Instantaneous > 0) input_vo.placeholder = `${Velocity_Instantaneous} m/s`; 
    else input_vo.placeholder = `${0} m/s`;
    
  } else {
    return Velocity_Instantaneous;
  }

}

export function IntervalAnimation_MRUA (input, value, condicion, array, number_increment, unit, input_vo, car, audio_car, width_screen, width_car){

  let contTime = 0
  let vo_value = Calculate_Instantaneous_Speed(array[0], array[1], contTime, input_vo);
  input_vo.placeholder = `${input_vo.value} m/s`;
  input_vo.value = null;
  input_vo.disabled = true;

    const intervalo = setInterval(() => {
      value += number_increment;
      input.placeholder = `${value}${unit}`;

      contTime++;
      Calculate_Instantaneous_Speed(array[0], array[1], contTime, input_vo, "yes");

      if (value >= condicion) {
        clearInterval(intervalo);
        audio_car.pause();
        car.style.animationName = "none";
        car.style.left = `${width_screen - (width_car + 30)}px`;
        input.disabled = false;
        input_vo.disabled = false;

        setTimeout(() => {
          input_vo.value = Number(vo_value);
        }, 1500);

        }
    }, 1000);
}
  
/*=============== FUNCTIONS MP ===============*/
export function Calculates_Event_MP(vo, g, angle) {

  let voy_mp = vo*angle;

  let time = (2*(voy_mp)/g).toFixed(2);
  let space = (voy_mp*time).toFixed(2);
  let h_max = ((vo**2 * angle**2) / (2*g)).toFixed(2);

  return [time, space, h_max];

}

