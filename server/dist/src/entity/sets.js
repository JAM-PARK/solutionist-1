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
exports.sets = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("./users");
const problems_1 = require("./problems");
const usersProblems_1 = require("./usersProblems");
let sets = class sets {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], sets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], sets.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], sets.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], sets.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], sets.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], sets.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.users, (user) => user.id),
    __metadata("design:type", users_1.users)
], sets.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => problems_1.problems, (problem) => problem.setId, {
        cascade: true,
    }),
    __metadata("design:type", problems_1.problems)
], sets.prototype, "problem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usersProblems_1.usersProblems, (uProblem) => uProblem.setId),
    __metadata("design:type", usersProblems_1.usersProblems)
], sets.prototype, "uProblem", void 0);
sets = __decorate([
    (0, typeorm_1.Entity)()
], sets);
exports.sets = sets;
//# sourceMappingURL=sets.js.map