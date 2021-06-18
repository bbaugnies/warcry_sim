# Warcry simulator

## What is this and how do I use it?
This site is meant to give some predictions on the ouctome of an action in the Warcry tabletop game. By calculating some probabilities about the game, it can help you find which matchups are more advantageous, which abilities have the highest chance of success, or retroactively see how unlikely it was that your opponent killed your super important unit right on the last turn.

Specifically, by filling in the stats of an attacking unit and it's target, you will get two numbers: the average wounds/damage that the action will do, and the probability that it will kill the target.

## Filling in the stats
Since we are only simulating one unit attacking another, we don't need all the stats of both units.

The following stats need to be filled in for the attacker:
* Strength
* Attacks
* Damage
* Crit Damage

The other two base stats are the defenders:
* Defense
* Hitpoints

These are pretty straightforward. They should include any buffs you plan on using, and you need to enter twice the unit's attack value if you plan on using both actions to attack.


The special attack stats are used to model abilities that deal damage directly. They should added alongside any normal attacks you would be doing in the same activation.
* Number: This is how many time the ability can deal damage. Do not include hits against different targets or your kill % will be wrong
* To-hit: This is the number you need to roll to deal damage. If the attack does guaranteed damage, put "1" here.
* To-crit: If the ability deals higher damage on a higher roll, enter it here. Otherwise you can put "7" or higher, or put the same value in Damage and Crit Damage
* Damage: The damage the ability deals.
* Crit Damage: The damage the ability deals on higher rolls.

### Example
**Iron Golem [Double] Throw Bolas**
* Number: 2
* To-hit: 4
* To-crit: 6
* Damage: 1
* Crit Damage: [dice value]

**Iron Golem [Triple] Living Battering Ram**
* Number: 1
* To-hit: 1
* To-crit: 7
* Damage: [dice value]
* Crit Damage: [dice value]

**Splintered Fang [Double] Fanged Buckler**
* Number: 1
* To-hit: 3
* To-crit: 5
* Damage: 1
* Crit Damage: [dice value]

## Interpreting results
So you get two numbers: Average damage done, and chance to kill the enemy unit. Both numbers in a vacuum are pretty straightforward; higher is better. It becomes more interesting when you try different scenarios. You might find when simulating two different abilities, for example, that increasing Strength will increase your average damage more than increasing Attacks, but Attacks might give you a chance to kill or increase it more than Strength did.

Often, trying to go for a low kill chance is a high risk/high reward option whereas more average damage is the safer option and sets up a kill in the next activation/round. Of course, there are situations where you need to kill a unit right now and won't get a second chance. Those are times where you want to max out kill chance above all else.

