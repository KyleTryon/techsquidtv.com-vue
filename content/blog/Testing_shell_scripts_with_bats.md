---
title: Testing Shell Scripts with "BATS"
description: Deceptively simple Bash scripts everywhere are acting as the backbone of critical systems, shouldn't they be tested like any other piece of software? BATS-Core is a simple, easy-to-use, and powerful testing framework for Bash scripts.
headerImage: /posts/img/bats-testing.png
tags:
  - linux
  - testing
---

Unit-Testing Bash is something I never considered was even possible, nor did it cross my mind how critical Bash scripts often are often going un-tested. If you are in the semi-rare situation where you are publishing Bash scripts to production, you may want to pay attention.  The rest of you are reading I assume for shock value.

In my day job, I create CI integrations for a large CI platform, mostly in Bash. Bash is extremely portable, running on most Linux distributions and mostly compatible with MacOS. A more common scenario might be deploying shell scripts to Ansible, or distributing bash scripts directly like [CodeCov's Bash Uploader](https://docs.codecov.com/docs/about-the-codecov-bash-uploader)(_until recently_).

## BATS-Core Bash Automated Testing System

BATS-Core Git Repository: https://github.com/bats-core/bats-core

> Bats is a [TAP](https://testanything.org/)-compliant testing framework for Bash. It provides a simple way to verify that the UNIX programs you write behave as expected.

If you are already familiar with unit-testing in languages like JavaScript, you may be familiar with basic testing frameworks such as [Jest](https://facebook.github.io/jest/). These unit-testing frameworks take "assertions" and execute them to validate your code.

## Writing Testable Bash Scripts

If you haven't written a lot of Bash in the past, you've probably written fairly linear scripts, without functions, all in a single file. For small scripts that may be find but let's take a look at how we can write our Bash in a way that's manageable and testable.

There are two main ways to approach writing testable Bash:
1. Write small singe-purpose scripts that could be executed in sequential order.
2. Create a "main" script, and define "functions" in one or more dependency scripts.

In this tutorial, we are going to go with option two and define functions in a separate file.

Start a new directory and create two files: `main.sh` and `functions.sh`.

```shell
$ mkdir <some/directory/for/this>
$ touch main.sh
$ touch functions.sh
```

`main.sh` will act as the "root" of our Bash "application". It will load all of the functions we write in `functions.sh`.

### Writing Functions

Let's create a function that will take in two numbers and add them together, then echo the result.

There are multiple syntaxes to write a function in shell but we'll stick with this.

```bash{}[functions.sh]
#!/bin/sh

addNumbers() {
  result=$(($1+$2))
  echo $result
}

addNumbers 1 2
```

When we run `./functions.sh` from the shell, we'll get back `3`.

```bash
$ ./functions.sh
3
```

We can't use `()` parentheses in functions in the same way we do in most programming languages, the parentheses are just decorative. We can however, pass arguments to our function the same way you can any shell executable.

The `$0` variable contains the current shell, and each numeric value above that corresponds to each argument passed in.

Now, we don't actually wan't our `functions.sh` file to execute, we only want it to contain the functions we want to call in `main.sh`, and test. So, let's remove the `addNumbers 1 2`

```bash{}[functions.sh]
#!/bin/sh

addNumbers() {
  result=$(($1+$2))
  echo $result
}
```

Let's add one more example to our `functions.sh` file, another function that will square the input.

```bash[functions.sh]
#!/bin/sh

addNumbers() {

  result=$(($1+$2))
  echo $result

}

squareResult() {
  result=$(($1*$1))
  echo $result
}
```

We have here two functions, but we can't yet do anything with them. So let's open up `main.sh` and add the following code:

```bash[main.sh]
#!/bin/sh
source functions.sh
sum=$(addNumbers 1 2)
squareResult $sum
```


## Testing Your Bash with BATS

### Installing BATS

Now that you've had a mico-crash-course on writing Bash functions, lets take a look at testing our new Bash script using the [BATS-Core Bash Automation Testing System](https://github.com/bats-core/bats-core#run-test-other-commands).

First, install BATS-Core. There are a number of different installation options, including Homebrew, NPM, or you can install from the source directly.

```shell
$ git clone https://github.com/bats-core/bats-core.git
$ cd bats-core
$ ./install.sh /usr/local
```

Run `bats -v` to verify the installation.

### Write Tests

First up to create our tests, create a tests directory right next to our shell script.

```shell
📁 tests/
📄 add.sh
```

After we complete writing our tests, we will simply give BATS the path to this directory and each `.bats` test file will be executed, with each test case within being evaluated.

You can think of each file as a test suite containing a number of tests.

A `.bat` file is nothing more than a simple bash script with some fancy syntax sugar that allows us to write tests in a way that is somewhat reminiscent of a testing framework in other programming languages, but there isn't much actual magic happening behind the scenes.

Let's write our first test case.

```bash
#!/usr/bin/env bats
@test "addNumbers 5 + 3 | expect 8" {
  run addNumbers 5 3
  [ "$status" -eq 0 ]
  [ "$output" = "8" ]
  [ "$result" = "8" ]
}
```

Now don't go running anything yet, there is an issue we'll need to take care of but let's check out what we have.

`@test` is a special syntax for BATS which is nothing more than a wrapper for a function. The first "_argument_" here is the test description/name and within this function is your test code. BATS will automatically iterate each test case and report back the results individually, we'll take a look at that soon.

What runs within this test case is any valid bash code. If a _non-zero_ status code is returned during this test it will be considered a failure. So we want to execute some code within this test and ensure a non-zero exit code is raised if we see unexpected behavior. 

We will be testing our "`addNumbers`" function by passing it two known values and comparing the output. If we feed in to our function the numbers '`5`' and '`3`', we expect to get back '`8`', both echoed to the standard output, and saved under the `$result` variable.

`run` is another special function that is included with the BATS framework that is extremely helpful (though you don't have to use it). You can read about `run` and other built-in functions on the [documentation here](https://github.com/bats-core/bats-core#run-test-other-commands).

What `run` does is execute some command, and save the standard output to the `$output` environment variables, and the exit status to `$status`. The `run` command itself will always return a `0` status code so we can then write our tests around the values stored in these two environment variables.

```bash
run addNumbers 5 3
  [ "$status" -eq 0 ]
  [ "$output" = "8" ]
  [ "$result" = "8" ]
```
In this test, we expect no issues so we check to ensure `$status` is equal to zero (`0`). We also know that the result was saved to `$result` and echoed to standard output, which is recorded by the run function under $output, so we will also test for those as well, which we expect to be equal to `8`.

This one test now checks three conditions to be considered valid.

setup() import your script