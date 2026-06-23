import "reflect-metadata"

function Injectable(){
    return function(target: any) {}
}

class Container{
    providers : Map<any, any>
    instances: Map<any, any>

    constructor() {
        this.providers = new Map()
        this.instances = new Map()
    }

    register(Class) {
        this.providers.set(Class, Class)
    }

    resolve(Class) {
        if (this.instances.has(Class)) {
            return this.instances.get(Class)
        }

        const TargetClass = this.providers.get(Class)

        if (!TargetClass) {throw new Error(`Not found ${Class.name}`)}

        const deps = Reflect.getMetadata("design:paramtypes", TargetClass) || []

        const instances = deps.map((dep) => this.resolve(dep)) 
        const instance = new TargetClass(...instances)
        this.instances.set(Class, instance)
        return instance

        // return new TargetClass(...instances)
    }
}

@Injectable()
class UserService{
    // static dependencies : any[]
    constructor() {
        console.log("User service is created")
    }
  getUsers() {
    return ["Alex", "Maria"];
  }
}

@Injectable()
class Logger{
    // static dependencies : any[]
    constructor() {
        console.log("Logger is created")
    }
    log(msg) {
        console.log("LOG ", msg)
    }
}

@Injectable()
class UserController {
    // static dependencies : any[]
    userService : UserService
    logger: Logger
    constructor(userService : UserService, logger :Logger) {
        this.userService = userService
        this.logger = logger
        console.log("User Service created")
    }

    init() {
        this.logger.log(this.userService.getUsers())
    }
}

const container = new Container()
container.register(UserService)
container.register(Logger)
container.register(UserController)

console.log("metadata", Reflect.getMetadata("design:paramtypes", UserController))
// const construct = UserController.toString()
// const constructorStart = construct.indexOf("constructor(")

// if (constructorStart !== -1) {
//     const startIndex = constructorStart + 12
//     const endIndex = construct.indexOf(")", startIndex)
//     const result = construct.slice(startIndex, endIndex)
//     console.log("Result", result)
// }

// console.log("index of constructor", constructorStart)
// console.log("Convert ", UserController.toString())

const controller = container.resolve(UserController)
controller.init()

const container2 = container

const controller2 = container2.resolve(UserController)
controller2.init()