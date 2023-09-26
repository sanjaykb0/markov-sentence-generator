export const helpCLI = (isRecognized : boolean = true, t? : string) => {
    if (!isRecognized) {
        console.log(`Command "${t}" not recognized.`)
    }
    console.log("Usage: markov <command>");
    console.log("  generate <URL>\t\t Generates a random comment from a new YouTube URL")
    console.log("  generate\t\t\t Generates a new comment from a pre-existing model (most recent YT video)")
    console.log("  configure\t\t\t Opens configuration dialogue")
    console.log("  help\t\t\t\t Opens this dialogue")
}