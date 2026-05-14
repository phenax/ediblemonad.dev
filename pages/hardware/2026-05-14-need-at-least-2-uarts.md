## Single UART? More like U-fart. JK haha lol

SBCs, SoMs, SoCs need at least 2 UART ports. RPI zero just has 1 which hurts when you have to use the UART port for serial console and then all of a sudden you also need to use it to communicate with some other module.

Options I have:
1. USB for console with dwc2 (rpi only). UART for module.
2. UART for serial console. USB-to-serial adapter for module (or vice-versa but makes more sense if console's serial device cant be unplugged).
3. UART for serial console. Bit-bang the module at a much lower baud rate (if that's supported).
4. Board has wifi? Just ssh into it. Although, seems overkill for simpler use-cases. Not an option for pi zero.
5. some 4th option? no clue, let me know if there is one.

Going with 1 because it's less work on a pi zero. USB-to-serial seems ideal though in case the board doesn't support it. But for a serial console you have to 69 2 USB-to-serial adapters to get a console.
