# CSML Studio CLI

The best way to develop CSML bots from the comfort of your laptop!

## Installation

First, download this CLI tool (requires nodeJS LTS or above):

```
npm i -g @csml/studio-cli
```

Create a bot on CSML Studio, add an API Channel, then run:

```
csml-studio init -k API_KEY -s API_SECRET
```

This will initialize a project in the current directory and download your CSML bot locally for your local chatboting pleasure.

## Commands

### init

Setup a CSML Studio project locally

### up

Upload your local bot to CSML Studio

### down

Download the latest version of the bot from CSML Studio

### build

Build a new version of your bot from the latest version available on CSML Studio

### broadcast

Broadcast a flow to any number of targets on the given channel.
> Note: this method is rate-limited - sending thousands of broadcasts can take a few minutes.
