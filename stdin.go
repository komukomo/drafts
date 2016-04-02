package main

import (
	"./slack"
	"bufio"
	"fmt"
	"os"
	"flag"
)

func main() {
	defaultUrl := os.Getenv("SLACK_URL")

	var channel = flag.String("c", "random", "cannel name")
	var botname = flag.String("n", "gobot", "bot name")
	var icon = flag.String("i", "ghost", "bot icon. emoji or URL ")
	var incomingURL = flag.String("url", defaultUrl, "bot icon. emoji or URL ")

	flag.Parse()

	scanner := bufio.NewScanner(os.Stdin)
	var output string
	for scanner.Scan() {
		output += scanner.Text() + "\n"
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading std input:", err)
	}

	slack.PostSlack(*incomingURL, slack.SlackMessage{
		output,
		*botname,
		"#" + *channel,
		":" + *icon + ":",
	})
}
