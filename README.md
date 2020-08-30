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

Setup a CSML Studio project locally in the given path. This command will automatically download the contents of the given bot.

```
Usage: csml-studio init

Available options for init command:
   -p, --path         Initial path for bot folder
   [-k, --key]        CSML Studio API key
   [-s, --secret]     CSML Studio API secret
   -h, --help         show this information
```

### up

Upload your local bot to CSML Studio. This command replaces the full bot on CSML Studio, but does not build a new version.

```
Usage: csml-studio up

Available options for up command:
   [-k, --key]        CSML Studio API key
   [-s, --secret]     CSML Studio API secret
   -h, --help         show this information
```

### down

Download the latest version of the bot from CSML Studio. This command replaces the full local bot with the contents of the bot on CSML Studio.

```
Usage: csml-studio down

Available options for down command:
   [-k, --key]        CSML Studio API key
   [-s, --secret]     CSML Studio API secret
   -h, --help         show this information
```

### validate

Test your local CSML code without uploading your bot.

```
Usage: csml-studio validate

Available options for validate command:
   [-k, --key]        CSML Studio API key
   [-s, --secret]     CSML Studio API secret
   -h, --help         show this information
```

### build

Build a new version of your bot with the latest contents available on CSML Studio.

```
Usage: csml-studio build

Available options for build command:
   [-k, --key]        CSML Studio API key
   [-s, --secret]     CSML Studio API secret
   -h, --help         show this information
```

### broadcast

Broadcast a flow to any number of targets on the given channel.
> Note: this method is rate-limited - sending thousands of broadcasts can take a few minutes.

```
Usage: csml-studio broadcast -i myfile.csv --flow_id myflow [-k MYKEY] [-s MYSECRET] [-o debug.log]

Available options for broadcast command:
   -i, --input        path to input file containing broadcast targets (one target per line)
   --flow_id          ID or name of flow to trigger
   [-o, --output]     path to debug logs file
   [-v, --verbose]    show debug info in the console
   [-k, --key]        broadcasting channel API key ID
   [-s, --secret]     broadcasting channel API secret key
   -h, --help         show this information
```

## Options

Each command has its own set of commands, however some options are available on every command.

- `--key`, `--secret`: the Studio API key for the bot. To create an API key, visit [CSML Studio](https://studio.csml.dev) and create an API channel for your bot.
(NB: the `broadcast` command should be used with the API keys of the channel you want to send the broadcast on). You can replace this by using a .env file at the root of the project, similar to the .env.example in this repository. This env file will be created for you on `init` command. If both the `--key`/`--secret` parameters and .env file are used, the `--key`/`--secret` parameters will be used in priority.
- `--help`: to get info on any command, use it with the `--help` (or `-h`) option to print its help section.
