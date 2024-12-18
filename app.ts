import * as readline from "readline";

// Enum для типів героїв
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum для типів атак
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Інтерфейс для характеристик героя
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Інтерфейс для скілів
interface Skill {
    name: string;
    description: string;
    effect: (attacker: Hero, defender: Hero) => void;
}

// Інтерфейс для героя
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    skills: Skill[];
    isAlive: boolean;
}

// Глобальний лічильник ID
let heroIdCounter = 1;

// Функція для створення героя зі скілами
function createHero(name: string, type: HeroType): Hero {
    const baseStats: HeroStats = {
        health: 100,
        attack: 20,
        defense: 10,
        speed: 5
    };

    const skills: Skill[] = [];

    switch (type) {
        case HeroType.Warrior:
            baseStats.health += 50;
            baseStats.attack += 10;
            baseStats.defense += 20;
            skills.push(
                {
                    name: "Могутній удар",
                    description: "Завдає 50% додаткового урону.",
                    effect: (attacker, defender) => {
                        const damage = attacker.stats.attack * 1.5 - defender.stats.defense * 0.5;
                        applyDamage(defender, Math.max(damage, 0));
                        console.log(`${attacker.name} використовує "Могутній удар" і завдає ${damage.toFixed(2)} шкоди.`);
                    }
                },
                {
                    name: "Захисна стійка",
                    description: "Збільшує захист на 10 на один раунд.",
                    effect: (attacker) => {
                        attacker.stats.defense += 10;
                        console.log(`${attacker.name} використовує "Захисна стійка" і збільшує захист на 10.`);
                    }
                }
            );
            break;
        case HeroType.Mage:
            baseStats.attack += 30;
            baseStats.speed += 10;
            skills.push(
                {
                    name: "Вогняний шар",
                    description: "Магічна атака, що ігнорує захист супротивника.",
                    effect: (attacker, defender) => {
                        const damage = attacker.stats.attack;
                        applyDamage(defender, damage);
                        console.log(`${attacker.name} використовує "Вогняний шар" і завдає ${damage.toFixed(2)} магічної шкоди.`);
                    }
                },
                {
                    name: "Зцілення",
                    description: "Відновлює 20 здоров'я.",
                    effect: (attacker) => {
                        attacker.stats.health += 20;
                        console.log(`${attacker.name} використовує "Зцілення" і відновлює 20 здоров'я.`);
                    }
                }                
            );
            break;
        case HeroType.Archer:
            baseStats.attack += 15;
            baseStats.speed += 20;
            skills.push(
                {
                    name: "Дворазовий постріл",
                    description: "Двічі атакує супротивника.",
                    effect: (attacker, defender) => {
                        for (let i = 0; i < 2; i++) {
                            const damage = attacker.stats.attack - defender.stats.defense * 0.5;
                            applyDamage(defender, Math.max(damage, 0));
                            console.log(`${attacker.name} використовує "Дворазовий постріл" і завдає ${damage.toFixed(2)} шкоди.`);
                        }
                    },
                },
                {
                    name: "Уклонення",
                    description: "Збільшує швидкість на 10 на один раунд.",
                    effect: (attacker) => {
                        attacker.stats.speed += 10;
                        console.log(`${attacker.name} використовує "Уклонення" і збільшує свою швидкість на 10.`);
                    }
                }
            );
            break;
    }

    return {
        id: heroIdCounter++,
        name,
        type,
        attackType: type === HeroType.Mage ? AttackType.Magical : (type === HeroType.Archer ? AttackType.Ranged : AttackType.Physical),
        stats: baseStats,
        skills,
        isAlive: true
    };
}

// Функція для вибору скілу
function chooseSkill(hero: Hero): Promise<Skill> {
    return new Promise((resolve) => {
        console.log(`\nОберіть скіл для ${hero.name}:`);
        hero.skills.forEach((skill, index) => {
            console.log(`${index + 1}. ${skill.name} - ${skill.description}`);
        });
        rl.question("Введіть номер скілу: ", (input) => {
            const skillIndex = parseInt(input) - 1;
            if (skillIndex >= 0 && skillIndex < hero.skills.length) {
                resolve(hero.skills[skillIndex]);
            } else {
                console.log("Неправильний вибір. Спробуйте ще раз.");
                resolve(chooseSkill(hero));
            }
        });
    });
}

// Функція для перевірки здоров'я
function applyDamage(defender: Hero, damage: number): void {
    defender.stats.health -= damage;

    if (defender.stats.health < 0) {
        defender.stats.health = 0;
    }

    if (defender.stats.health === 0 && defender.isAlive) {
        defender.isAlive = false;
        console.log(`${defender.name} був переможений!`);
    }
}


// Функція для перевірки переможця
function checkWinner(team1: Hero[], team2: Hero[]): string | null {
    const team1Alive = team1.some(hero => hero.isAlive);
    const team2Alive = team2.some(hero => hero.isAlive);

    if (!team1Alive && !team2Alive) return "Нічия!";
    if (!team1Alive) return "Команда 2 перемогла!";
    if (!team2Alive) return "Команда 1 перемогла!";

    return null;
}

// Введення даних
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Основний цикл гри
async function gameLoop(team1: Hero[], team2: Hero[]): Promise<void> {
    let currentTeam = team1;
    let enemyTeam = team2;

    console.log("\n=== Початок битви ===\n");

    while (true) {
        const attacker = await chooseHero(currentTeam, "Оберіть героя для атаки: ");
        const defender = await chooseHero(enemyTeam, "Оберіть ціль для атаки: ");
        const skill = await chooseSkill(attacker);

        skill.effect(attacker, defender);

        const winner = checkWinner(team1, team2);
        if (winner) {
            console.log(`\n=== ${winner} ===`);
            rl.close();
            break;
        }

        [currentTeam, enemyTeam] = [enemyTeam, currentTeam];
    }
}

function chooseHero(team: Hero[], message: string): Promise<Hero> {
    return new Promise((resolve) => {
        console.log(message);
        team.forEach((hero, index) => {
            if (hero.isAlive) {
                console.log(`${index + 1}. ${hero.name} (${hero.type}) - Здоров'я: ${hero.stats.health.toFixed(2)}`);
            }
        });
        rl.question("Введіть номер героя: ", (input) => {
            const heroIndex = parseInt(input) - 1;
            if (heroIndex >= 0 && heroIndex < team.length && team[heroIndex].isAlive) {
                resolve(team[heroIndex]);
            } else {
                console.log("Неправильний вибір. Спробуйте ще раз.");
                resolve(chooseHero(team, message));
            }
        });
    });
}

// --- Створення команд ---
const team1: Hero[] = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage)
];

const team2: Hero[] = [
    createHero("Робін", HeroType.Archer),
    createHero("Гаррі", HeroType.Mage)
];

gameLoop(team1, team2);
