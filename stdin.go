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

type Config struct {
	Url string `json:"url"`
	Channel string `json:"channel"`
	Name string `json:"name"`
	Icon string `json:"icon"`
}

func main() {
	config := Config {
		os.Getenv("SLACK_URL"),
		os.Getenv("SLACK_CHANNEL"),
		os.Getenv("SLACK_ICON"),
		os.Getenv("SLACK_NAME"),
	}

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

func exists(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil
}
