class Logger {
  constructor() {
    this.entries = [];
    this.listeners = new Set();
  }

  log(entry) {
    this.entries.push({ time: new Date(), ...entry });
    for (const cb of this.listeners) {
      cb(this.entries);
    }
  }

  subscribe(cb) {
    this.listeners.add(cb);
    cb(this.entries);
    return () => this.listeners.delete(cb);
  }
}

const logger = new Logger();
export default logger;
