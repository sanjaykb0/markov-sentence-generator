import * as actions from "./actions"

export const prompt = () => {
    const data = Bun.argv.slice(2);

    switch (data[0]) {
        case "help" || "-help" || "--help":
            actions.helpCLI();
            break;

        case "generate":
            // return comment generate logic
            break;

        case "configure":
            // return current configuration
            break;
        
        default: 
            actions.helpCLI(false, data[0])
            break;
    }
}

// 