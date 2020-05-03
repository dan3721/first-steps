#!/bin/bash
#
# Let's just get this thing to turn using pigs cmds...
#
STEP_DELAY=1

for i in {1..510} # 2038 steps are needed to rotate the shaft due to gear reduction. At 4 per cycle thats 509.5 
do
	pigs w 17 1 mils $STEP_DELAY w 17 0 # step 1
	pigs w 18 1 mils $STEP_DELAY w 18 0 # step 2
	pigs w 22 1 mils $STEP_DELAY w 22 0 # step 3
	pigs w 23 1 mils $STEP_DELAY w 23 0 # step 4
done

pigs w 17 0 w 18 0 w 22 0 w 23 0 # all off
