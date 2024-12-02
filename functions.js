class Singleton {

    static instance = undefined;

     constructor() {
        this.timestamp = new Date();
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance
    }

    getTimestamp() {
        return this.timestamp;
    }
}

// Uso del Singleton
const instance1 = Singleton.getInstance();
console.log(instance1); // Muestra la fecha y hora de creación 