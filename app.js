"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Enum для типів героїв
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
// Enum для типів атак
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
// Глобальний лічильник ID
var heroIdCounter = 1;
// Функція для створення героя зі скілами
function createHero(name, type) {
    var baseStats = {
        health: 100,
        attack: 20,
        defense: 10,
        speed: 5
    };
    var skills = [];
    switch (type) {
        case HeroType.Warrior:
            baseStats.health += 50;
            baseStats.attack += 10;
            baseStats.defense += 20;
            skills.push({
                name: "Могутній удар",
                description: "Завдає 50% додаткового урону.",
                effect: function (attacker, defender) {
                    var damage = attacker.stats.attack * 1.5 - defender.stats.defense * 0.5;
                    applyDamage(defender, Math.max(damage, 0));
                    console.log("".concat(attacker.name, " \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \"\u041C\u043E\u0433\u0443\u0442\u043D\u0456\u0439 \u0443\u0434\u0430\u0440\" \u0456 \u0437\u0430\u0432\u0434\u0430\u0454 ").concat(damage.toFixed(2), " \u0448\u043A\u043E\u0434\u0438."));
                }
            });
            break;
        case HeroType.Mage:
            baseStats.attack += 30;
            baseStats.speed += 10;
            skills.push({
                name: "Вогняний шар",
                description: "Магічна атака, що ігнорує захист супротивника.",
                effect: function (attacker, defender) {
                    var damage = attacker.stats.attack;
                    applyDamage(defender, damage);
                    console.log("".concat(attacker.name, " \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \"\u0412\u043E\u0433\u043D\u044F\u043D\u0438\u0439 \u0448\u0430\u0440\" \u0456 \u0437\u0430\u0432\u0434\u0430\u0454 ").concat(damage.toFixed(2), " \u043C\u0430\u0433\u0456\u0447\u043D\u043E\u0457 \u0448\u043A\u043E\u0434\u0438."));
                }
            }, {
                name: "Зцілення",
                description: "Відновлює 20 здоров'я.",
                effect: function (attacker) {
                    attacker.stats.health += 20;
                    console.log("".concat(attacker.name, " \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \"\u0417\u0446\u0456\u043B\u0435\u043D\u043D\u044F\" \u0456 \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u044E\u0454 20 \u0437\u0434\u043E\u0440\u043E\u0432'\u044F."));
                }
            });
            break;
        case HeroType.Archer:
            baseStats.attack += 15;
            baseStats.speed += 20;
            skills.push({
                name: "Дворазовий постріл",
                description: "Двічі атакує супротивника.",
                effect: function (attacker, defender) {
                    for (var i = 0; i < 2; i++) {
                        var damage = attacker.stats.attack - defender.stats.defense * 0.5;
                        applyDamage(defender, Math.max(damage, 0));
                        console.log("".concat(attacker.name, " \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \"\u0414\u0432\u043E\u0440\u0430\u0437\u043E\u0432\u0438\u0439 \u043F\u043E\u0441\u0442\u0440\u0456\u043B\" \u0456 \u0437\u0430\u0432\u0434\u0430\u0454 ").concat(damage.toFixed(2), " \u0448\u043A\u043E\u0434\u0438."));
                    }
                }
            });
            break;
    }
    return {
        id: heroIdCounter++,
        name: name,
        type: type,
        attackType: type === HeroType.Mage ? AttackType.Magical : (type === HeroType.Archer ? AttackType.Ranged : AttackType.Physical),
        stats: baseStats,
        skills: skills,
        isAlive: true
    };
}
// Функція для вибору скілу
function chooseSkill(hero) {
    return new Promise(function (resolve) {
        console.log("\n\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0441\u043A\u0456\u043B \u0434\u043B\u044F ".concat(hero.name, ":"));
        hero.skills.forEach(function (skill, index) {
            console.log("".concat(index + 1, ". ").concat(skill.name, " - ").concat(skill.description));
        });
        rl.question("Введіть номер скілу: ", function (input) {
            var skillIndex = parseInt(input) - 1;
            if (skillIndex >= 0 && skillIndex < hero.skills.length) {
                resolve(hero.skills[skillIndex]);
            }
            else {
                console.log("Неправильний вибір. Спробуйте ще раз.");
                resolve(chooseSkill(hero));
            }
        });
    });
}
// Функція для перевірки здоров'я
function applyDamage(defender, damage) {
    defender.stats.health -= damage;
    if (defender.stats.health < 0) {
        defender.stats.health = 0;
    }
    if (defender.stats.health === 0 && defender.isAlive) {
        defender.isAlive = false;
        console.log("".concat(defender.name, " \u0431\u0443\u0432 \u043F\u0435\u0440\u0435\u043C\u043E\u0436\u0435\u043D\u0438\u0439!"));
    }
}
// Функція для перевірки переможця
function checkWinner(team1, team2) {
    var team1Alive = team1.some(function (hero) { return hero.isAlive; });
    var team2Alive = team2.some(function (hero) { return hero.isAlive; });
    if (!team1Alive && !team2Alive)
        return "Нічия!";
    if (!team1Alive)
        return "Команда 2 перемогла!";
    if (!team2Alive)
        return "Команда 1 перемогла!";
    return null;
}
// Введення даних
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Основний цикл гри
function gameLoop(team1, team2) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTeam, enemyTeam, attacker, defender, skill, winner;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currentTeam = team1;
                    enemyTeam = team2;
                    console.log("\n=== Початок битви ===\n");
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 5];
                    return [4 /*yield*/, chooseHero(currentTeam, "Оберіть героя для атаки: ")];
                case 2:
                    attacker = _b.sent();
                    return [4 /*yield*/, chooseHero(enemyTeam, "Оберіть ціль для атаки: ")];
                case 3:
                    defender = _b.sent();
                    return [4 /*yield*/, chooseSkill(attacker)];
                case 4:
                    skill = _b.sent();
                    skill.effect(attacker, defender);
                    winner = checkWinner(team1, team2);
                    if (winner) {
                        console.log("\n=== ".concat(winner, " ==="));
                        rl.close();
                        return [3 /*break*/, 5];
                    }
                    _a = [enemyTeam, currentTeam], currentTeam = _a[0], enemyTeam = _a[1];
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function chooseHero(team, message) {
    return new Promise(function (resolve) {
        console.log(message);
        team.forEach(function (hero, index) {
            if (hero.isAlive) {
                console.log("".concat(index + 1, ". ").concat(hero.name, " (").concat(hero.type, ") - \u0417\u0434\u043E\u0440\u043E\u0432'\u044F: ").concat(hero.stats.health.toFixed(2)));
            }
        });
        rl.question("Введіть номер героя: ", function (input) {
            var heroIndex = parseInt(input) - 1;
            if (heroIndex >= 0 && heroIndex < team.length && team[heroIndex].isAlive) {
                resolve(team[heroIndex]);
            }
            else {
                console.log("Неправильний вибір. Спробуйте ще раз.");
                resolve(chooseHero(team, message));
            }
        });
    });
}
// --- Створення команд ---
var team1 = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage)
];
var team2 = [
    createHero("Робін", HeroType.Archer),
    createHero("Гаррі", HeroType.Mage)
];
gameLoop(team1, team2);
