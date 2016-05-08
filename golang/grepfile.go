package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	pattern := os.Args[1]
	fp, err := os.Open(os.Args[2])

	if err != nil {
		panic(err)
	}

	re := regexp.MustCompile(pattern)
	scanner := bufio.NewScanner(fp)
	for scanner.Scan() {
		text := scanner.Text()
		if re.MatchString(text) {
			fmt.Println(scanner.Text())
		}
	}
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading standard input:", err)
	}
}
