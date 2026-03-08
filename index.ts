import * as readlineSync from "readline-sync";
import spacemarinesData from "./spacemarines.json";
import squadsData from "./squads.json";

interface Squad {
    id: number;
    squadType: string;
    size: number;
    specialized: boolean;
    iconUrl: string;
    foundingDate: string;
}

interface SpaceMarine {
    id: number;
    name: string;
    description: string;
    age: number;
    active: boolean;
    inductionDate: string;
    imageUrl: string;
    chapter: string;
    wargear: string[];
    squad: {
        id: number;
        squadType: string;
        size: number;
        specialized: boolean;
        foundingDate: string;
    };
}

const spacemarines: SpaceMarine[] = spacemarinesData as SpaceMarine[];
const squads: Squad[] = squadsData as Squad[];

function displayAllMarines(marines: SpaceMarine[]): void {
    console.log();
    for (const marine of marines) {
        console.log(`- ${marine.name} (ID: ${marine.id}) | Chapter: ${marine.chapter}`);
    }
    console.log();
}

function displayDetailedMarine(marine: SpaceMarine): void {
    console.log();
    console.log(`Name:          ${marine.name}`);
    console.log(`ID:            ${marine.id}`);
    console.log(`Description:   ${marine.description}`);
    console.log(`Age:           ${marine.age}`);
    console.log(`Active:        ${marine.active}`);
    console.log(`Induction:     ${marine.inductionDate}`);
    console.log(`Chapter:       ${marine.chapter}`);
    console.log(`Image:         ${marine.imageUrl}`);
    console.log(`Wargear:       ${marine.wargear.join(", ")}`);
    console.log(`Squad:`);
    console.log(`  Type:        ${marine.squad.squadType}`);
    console.log(`  Size:        ${marine.squad.size}`);
    console.log(`  Specialized: ${marine.squad.specialized}`);
    console.log(`  Founded:     ${marine.squad.foundingDate}`);
    console.log();
}

function displayAllSquads(squads: Squad[]): void {
    console.log();
    for (const squad of squads) {
        console.log(`- ${squad.squadType} (ID: ${squad.id}) | Size: ${squad.size} | Specialized: ${squad.specialized}`);
    }
    console.log();
}

function displayDetailedSquad(squad: Squad): void {
    console.log();
    console.log(`ID:          ${squad.id}`);
    console.log(`Type:        ${squad.squadType}`);
    console.log(`Size:        ${squad.size}`);
    console.log(`Specialized: ${squad.specialized}`);
    console.log(`Founded:     ${squad.foundingDate}`);
    console.log(`Icon:        ${squad.iconUrl}`);
    console.log();
}

function main(): void {
    let running = true;

    while (running) {
        console.log("=== Space Marines Viewer ===");
        console.log();
        console.log("1. View all Space Marines");
        console.log("2. Search Space Marine by ID");
        console.log("3. View all Squads");
        console.log("4. Search Squad by ID");
        console.log("5. Exit");
        console.log();

        const choice = readlineSync.question("Enter your choice: ");
        console.log();

        switch (choice.trim()) {
            case "1":
                displayAllMarines(spacemarines);
                break;

            case "2":
                const marineInput = readlineSync.question("Enter Space Marine ID: ");
                const marineId = parseInt(marineInput.trim());
                const marine = spacemarines.find(m => m.id === marineId);
                if (marine) {
                    displayDetailedMarine(marine);
                } else {
                    console.log(`\nNo Space Marine found with ID ${marineId}.\n`);
                }
                break;

            case "3":
                displayAllSquads(squads);
                break;

            case "4":
                const squadInput = readlineSync.question("Enter Squad ID: ");
                const squadId = parseInt(squadInput.trim());
                const squad = squads.find(s => s.id === squadId);
                if (squad) {
                    displayDetailedSquad(squad);
                } else {
                    console.log(`\nNo Squad found with ID ${squadId}.\n`);
                }
                break;

            case "5":
                console.log("Goodbye!");
                running = false;
                break;

            default:
                console.log("\nInvalid choice. Please enter 1 to 5.\n");
        }
    }
}

main();
