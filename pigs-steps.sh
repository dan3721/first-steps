#!/bin/bash
#
# Let's just get this thing to turn using pigs cmds...
#
STEP_DELAY=100

pigs w 17 0 w 18 0 w 22 0 w 23 0

for i in {1..200}
do
	pigs w 17 1 mils $STEP_DELAY w 17 0 # step 1
	pigs w 18 1 mils $STEP_DELAY w 18 0 # step 2
	pigs w 22 1 mils $STEP_DELAY w 22 0 # step 3
	pigs w 23 1 mils $STEP_DELAY w 23 0 # step 4
	echo .
done

pigs w 17 0 w 18 0 w 22 0 w 23 0