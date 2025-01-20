class EventEmitter {
    constructor() {
        this.events = new Map(); // Храним события и их обработчики в виде пары "имя события -> массив обработчиков"
    }

    // Метод для подписки на событие
    on(eventName, listener) {
        // Исключаем существующие обработчики для этого события
        if (!this.events.has(eventName)) {
            // Если нет, создаем новую запись с пустым массивом обработчиков
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(listener); // Добавляем обработчик listener в массив обработчиков для этого события
    }

    // Метод для вызова события
    emit(eventName, ...args) {
        // Получаем массив обработчиков для указанного события
        const listeners = this.events.get(eventName);
        if (listeners) {
            // Если существует, вызываем каждый из них, передавая аргументы
            listeners.forEach(listener => listener(...args));
        }
    }

    // Метод для удаления обработчика события
    off(eventName, listener) {
        // Получаем массив обработчиков для указанного события
        const listeners = this.events.get(eventName);
        if (listeners) {
            // Если такой существует, удаляем указанный обработчик из массива
            this.events.set(eventName, listeners.filter(l => l !== listener));
        }
    }
}

const emitter = new EventEmitter(); // Создаем новый экземпляр
const logData = (data) => console.log(data); // Создаем некий обработчик события

emitter.on('data', logData); // Подписываемся на событие "data"
emitter.emit('data', { message: 'Hello, VK' }); // Испускаем событие "data" с данными
emitter.off('data', logData); // Удаляем обработчик для события "data"
emitter.emit('data', { message: 'Not Hello =(' }); // Пытаемся испустить событие снова, но обработчик уже удален
