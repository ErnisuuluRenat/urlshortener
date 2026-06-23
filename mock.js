"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Injectable() {
    return function (target) { };
}
class Container {
    providers;
    instances;
    constructor() {
        this.providers = new Map();
        this.instances = new Map();
    }
    register(Class) {
        this.providers.set(Class, Class);
    }
    resolve(Class) {
        if (this.instances.has(Class)) {
            return this.instances.get(Class);
        }
        const TargetClass = this.providers.get(Class);
        if (!TargetClass) {
            throw new Error(`Not found ${Class.name}`);
        }
        const deps = Reflect.getMetadata("design:paramtypes", TargetClass) || [];
        const instances = deps.map((dep) => this.resolve(dep));
        const instance = new TargetClass(...instances);
        this.instances.set(Class, instance);
        return instance;
        // return new TargetClass(...instances)
    }
}
let UserService = class UserService {
    // static dependencies : any[]
    constructor() {
        console.log("User service is created");
    }
    getUsers() {
        return ["Alex", "Maria"];
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UserService);
let Logger = class Logger {
    // static dependencies : any[]
    constructor() {
        console.log("Logger is created");
    }
    log(msg) {
        console.log("LOG ", msg);
    }
};
Logger = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], Logger);
let UserController = class UserController {
    // static dependencies : any[]
    userService;
    logger;
    constructor(userService, logger) {
        this.userService = userService;
        this.logger = logger;
        console.log("User Service created");
    }
    init() {
        this.logger.log(this.userService.getUsers());
    }
};
UserController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserService, Logger])
], UserController);
const container = new Container();
container.register(UserService);
container.register(Logger);
container.register(UserController);
console.log("metadata", Reflect.getMetadata("design:paramtypes", UserController));
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
const controller = container.resolve(UserController);
controller.init();
const container2 = container;
const controller2 = container2.resolve(UserController);
controller2.init();
