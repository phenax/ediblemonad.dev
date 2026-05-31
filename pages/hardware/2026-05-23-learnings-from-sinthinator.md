# Learnings from sinthinator

I recently tried decided to randomly pick up a pcb design project for an ${partials.linkExternal "https://github.com/phenax/sinthinator" "stm32 based toy music instrument"} that used capacitive touch sensor traces on a PCB. Expected it to be a bit of a challenge because I've never dealt with most of the components involved and only have basic experience with SMD components.

Stuff I've learned:
- keep in mind ICs with identical i2c addresses when you have multiple devices on an i2c bus. Use separate busses if possible or i2c multiplexer if thats becoming a problem
- dont forget the cc pins on a usbc connector
- read the datasheet more carefully and dont just rely on the "typical application" diagram
- keep pcb traces in mind when drawing schematics. Not to have them laid out the same way, but whenever there's a choice for which pins keep the ICs position in mind. Or just re-do the connections in the schematics later, I'm not your dad
- add extra header pins/solder pads to make debugging easier. For sinthinator, I've got i2c pins out for debugging in case things went sideways as well as audio output (that ones is for combining outputs)
- use solder jumpers as "flags" if needed
- ERC and DRC are your friend
- add the mounting holes as soon as possible after board outline to reserve enough space for them
- add mounting holes in schematic instead of just the pcb or lock the mounting holes in pcb. Mounting holes can get removed when doing "Update PCB from schematic"
- for mcus, plan the firmware early on when drawing out the schematics
- pay attention to res pullups values for i2c lines based on the frequency (from i2c spec). Used 4.7K on mine which seems alright
- dont move the ic around in the pcb and leave the bypass capacitors behind (happened twice)

project is wip so will add more here...
