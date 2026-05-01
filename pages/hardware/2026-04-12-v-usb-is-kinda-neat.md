# V-USB is kinda neat

I only ran into [v-usb](https://github.com/obdev/v-usb) while going through the [qmk docs](https://docs.qmk.fm/compatible_microcontrollers) where it mentions that mcus that don't have native usb will use v-usb instead.

Curiosity killed the akshay. Couldn't resist so started thinking of what I could use it for. Right now I'm in my 8-bit avr arc so seemed like the perfect thing to mess around with. I thought it would be fun to make a simple rgb light connected via USB that changes color via commands over serial. Seems simple enough, what could go wrong? Plenty as it turns out.

First challenge: realized the internal clock of attiny84a and attiny4313 (the only 8-bit avr mcus I have) is 8MHz and v-usb only supports 12/15/16/18/20 MHz clocks. No biggie, heres a 16MHz crystal oscillator.

Second challenge: we need 3.3V for the usb data lines but the LEDs need 5V. I can either drive the attiny4313 with 3.3V and maybe add a mosfet for the LEDs or use 5V for the mcu and LED but shift D+/D- to 3.3V level. Went with the latter using a zener diode to maintain the 3.3V level on data lines since that seemed simpler.

Third challenge: after writing the fuse bits to use the external crystal oscillator, couldn't program it again. The crystal is connected with load caps and the program (an rgb version of blink) seems to run fine with or without the crystal. Makes no sense. Saw somewhere that you can set up a high voltage programmer (12v) to get the fuse bits to reset. So will try that next.

To be continued...
