class Puppy {
    constructor(name, puppyLogger, puppyMutation, puppyService) {
        this.name = name
        this.puppyLogger = puppyLogger
        this.puppyMutation = puppyMutation
        this.puppyService = puppyService
    }

    init() {
        this.puppyLogger.log(this.puppyService.connected())
    }
}

class PuppyLogger {
    log(data) {
        console.log(`LOGGED: ${data}`)
    }
}

class PuppyMutation {
    mutated(name) {
        return `Your puppy: ${name} started to mutate!`
    }
}

class PuppyService {  
    connected() {
        return  ["Puppy1", "Puppy2", "Puppy3"]
    }
}

const logger = new PuppyLogger()
const mutation = new PuppyMutation()
const service = new PuppyService()

const puppy = new Puppy("George", logger, mutation, service)

puppy.init()
