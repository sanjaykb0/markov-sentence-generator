import * as actions from "./actions"

export const prompt = () => {
    const data = Bun.argv.slice(2);

    switch (data[0]) {
        case "help" || "-help" || "--help":
            actions.helpCLI();
            break;

        case "generate":
            if (data[1]) {
                actions.generateCLI(data[1])
            } else {
                actions.generateCLI()
            }
            break;

        case "config":
            // return current configuration
            if (data[2]) {
                actions.configCLI(data[2]);
            } else {
                actions.helpCLI();
            }
            break;
        
        default: 
            actions.helpCLI(false, data[0])
            break;
    }
}

// 