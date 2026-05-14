# Single UART? More like U-fart. JK haha lol

I think people who make SBCs should add at least 2 UART ports. RPI zero just has 1 which hurts when you want to reserve the UART port for serial console and then all of a sudden you also need it to communicate with some other module. I'm in that situation right now.

Options I have:
1. USB for console with dwc2 (depends on SBC). UART for module.
2. UART for serial console. USB-to-serial adapter for module (or vice-versa but makes more sense if console's serial device can't be unplugged).
3. UART for serial console. Bit-bang the module at a much lower baud rate (if that's supported).
4. Board has wifi? Just ssh into it. Although, seems overkill for simpler use-cases. Not an option for my pi zero.

Maybe theres another option that I'm not aware of?

Going with 1 because it's less work on a pi zero. USB-to-serial if the board doesn't support dwc2. But for a serial console you have to 69 2 USB-to-serial adapters to get a console. But all of this goes away if you just fucking add the 2nd UART port.
