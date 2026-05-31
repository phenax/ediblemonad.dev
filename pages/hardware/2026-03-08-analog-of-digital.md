# The analog of the digital

In digital electronics something that always catches me off guard is the analog suprise. Don't get me started on signal integrity issues but what I'm talking about is when a random part of your schematic depends on a very specific analog behavior. I ran into one of those while working on ${partials.linkExternal "https://github.com/makedaft/daft-watch" "a clock using attiny84a microcontroller IC"}. That project was my re-creation of ${partials.linkExternal "https://ingep.net/breadboardwatch/" "breadboard watch"} which taught me a very simple but neat trick.

An rtc based on timer interrupts on a microcontroller, displayed on a 4 digit, 7 segment display seems simple enough but theres a sneaky problem with attiny84a. The total number of pins in the IC is 14. 1 for Vcc, 1 for GND, 1 for reset. Since it's battery powered, to avoid drawing more power than needed, we also need to use an external 32KHz crystal oscillator which then takes up the 2 XTAL pins. This leaves us with 9 pins to drive the display. But for 4 7-segment displays, you need 1 shared pin for each segments and 1 control pin for each digit. That comes out to 11 (7 + 4). But we only have 9 pins left so how do we drive the display?

In avr, for a given pin, you can set the data direction (DDR* register) and the port value (PORT* register). When DDR bit is 1, the data direction is output so the respective PORT bit decides whether the output is high or low. But then if the DDR bit is 0, the value of PORT instead of being used for the output of that pin, it engages an internal pull-up resistor if the value is 1, and leaves it floating if the value is 0.

This is the magic that makes feel things in the crotch. The solution used here is to use diodes to create a sort-of OR circuit by deriving segment states based on the state of the control pins. Here's the ${partials.linkExternal "https://raw.githubusercontent.com/makedaft/daft-watch/refs/heads/main/watch.svg" "full schematic for reference"}.

> Note: in my case it's a common anode display so segment pin low and control pin high means that segment on that digit is on.

In the schematic, with `DDRA = (1 << PA6) | (1 << PA7)` (PA6 and PA7 both output),
- When PA6 is high, and PA7 is low, it enables digit 3 and the F segment.
- When PA6 is low, and PA7 is high, it enables digit 4 and the F segment.

If we have `DDRA = 0` (PA6,PA7 both input),
- When `PORTA = 0` (PA6,PA7 without internal pullup resistor), being floating, there is no current flowing which means both digits are off and the F segment is off. This state can be used when drawing the other 2 digits.

So far we can turn off both digits or have either one on but with F segment enabled. But how do we disable the F segment?

If we have `DDRA = (1 << PA6)` (PA6 output, PA7 input),
- When `PORTA = (1 << PA6)` (PA6 high, PA7 floating), digit 3 is on but the F segment is off as the current has nowhere to go through the diodes.

Applying the inverse of that, we can achieve the last state we need to draw anything on each of the 7 segment displays. With this we now have 2 pins doing the work for 3. Adding in-between states in our digital logic that don't exist in pure boolean logic. Doesn't that feel satisfying?
