package main

import (
	"./slack"
	"bufio"
	"fmt"
	"os"
	"flag"
	"io/ioutil"
	"encoding/json"
)


func main() {
	config := slack.Config {
		os.Getenv("SLACK_URL"),
		os.Getenv("SLACK_CHANNEL"),
		os.Getenv("SLACK_ICON"),
		os.Getenv("SLACK_NAME"),
	}

	at := slack.SlackMessage{}
	atfile, _ := ioutil.ReadFile("./attachments.json")
	json.Unmarshal(atfile, &at)

	configFile := "./config.json"
	if exists(configFile) {
		file, err := ioutil.ReadFile(configFile)
		if err != nil {
			panic(err)
		}
		json.Unmarshal(file, &config)
	}

	var channel = flag.String("c", config.Channel, "cannel name")
	var botname = flag.String("n", config.Name, "bot name")
	var icon = flag.String("i", config.Icon, "bot icon. emoji or URL ")
	var incomingURL = flag.String("url", config.Url, "bot icon. emoji or URL ")
	var attachmentFlag = flag.Bool("a", true, "attachment format")

	flag.Parse()

	var output string
	if !*attachmentFlag {
		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			output += scanner.Text() + "\n"
		}
		if err := scanner.Err(); err != nil {
			fmt.Fprintln(os.Stderr, "reading std input:", err)
		}
	}

	if *attachmentFlag {
		slack.PostSlack(*incomingURL, at)
	} else {
		slack.PostSlack(*incomingURL, slack.SlackMessage{
			output,
			*botname,
			"#" + *channel,
			":" + *icon + ":",
			nil,
		})
	}
}


func exists(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil
}
