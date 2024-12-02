class SingletonCar {

    static instance = undefined;

    constructor() {
    }

        static getInstance() {
            if (!SingletonCar.instance) {
                SingletonCar.instance = new SingletonCar();
            }
            return SingletonCar.instance
        }

        Advance(){
          //...
        }

        
        traveledSpace(){
          //...
        }

    }
    
    // Uso del Singleton
    const instance1 = SingletonCar.getInstance();
    console.log(instance1); // Muestra la fecha y hora de creación 

// ``