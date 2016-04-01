package main

import (
	"./slack"
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var output string
	for scanner.Scan() {
		output += scanner.Text() + "\n"
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading std input:", err)
	}

	incomingURL := os.Getenv("SLACK_URL")
	slack.PostSlack(incomingURL, slack.SlackMessage{
		output,
		"gobot",
		"#times_komukomo",
		":ghost:",
	})

	fmt.Println(output)
}
