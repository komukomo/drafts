package main

import (
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

	fmt.Println(output)
}
