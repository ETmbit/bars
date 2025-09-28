///////////////////
//###############//
//##           ##//
//##  bars.ts  ##//
//##           ##//
//###############//
///////////////////

//% color="#80350E" icon="\uf04c"
//% block="BarDiagram"
//% block.loc.nl="Staafdiagram"
namespace BarDiagram {

    let BARS = 3
    let LOWLEFT = 0
    let LOWMID = 0
    let LOWRIGHT = 0
    let HIGHLEFT = 100
    let HIGHMID = 100
    let HIGHRIGHT = 100

    export enum Bar {
        //% block="left"
        //% block.loc.nl="linker"
        Left,
        //% block="midst"
        //% block.loc.nl="middelste"
        Mid,
        //% block="right"
        //% block.loc.nl="rechter"
        Right
    }

    //% block="use %count bars"
    //% block.loc.nl="gebruik %count staven"
    //% count.min=1 count.max=3 valperc.defl=3
    export function setCount(count: number) {
        BARS = count;
    }

    //% block="set the high value for the %pos bar to %valperc"
    //% block.loc.nl="stel de bovenwaarde van de %pos staaf in op %valperc"
    //% valperc.min=0 valperc.max=100 valperc.defl=100
    export function highValue(position: Bar, valperc: number) {
        if (position == Bar.Left)
            HIGHLEFT = (valperc > LOWLEFT ? valperc : LOWLEFT)
        else
            if (position == Bar.Mid)
                HIGHMID = (valperc > LOWMID ? valperc : LOWMID)
            else
                HIGHRIGHT = (valperc > LOWRIGHT ? valperc : LOWRIGHT)
    }

    //% block="set the low value for the %pos bar to %valperc"
    //% block.loc.nl="stel de onderwaarde van de %pos staaf in op %valperc"
    //% valperc.min=0 valperc.max=100 valperc.defl=0
    export function lowValue(position: Bar, valperc: number) {
        if (position == Bar.Left)
            LOWLEFT = (valperc < HIGHLEFT ? valperc : HIGHLEFT)
        else
            if (position == Bar.Mid)
                LOWMID = (valperc < HIGHMID ? valperc : HIGHMID)
            else
                LOWRIGHT = (valperc < HIGHRIGHT ? valperc : HIGHRIGHT)
    }

    //% block="draw the %pos bar with value %valperc"
    //% block.loc.nl="teken de %pos staaf met waarde %valperc"
    //% valperc.min=0 valperc.max=100 valperc.defl=0
    export function draw(position: Bar, valperc: number) {
        let x = (position == Bar.Left ? 0 : 3)
        let w = 4 - BARS
        let low = (position == Bar.Left ? LOWLEFT : LOWRIGHT)
        let high = (position == Bar.Left ? HIGHLEFT : HIGHRIGHT)

        switch (position) {
            case Bar.Left: low = LOWLEFT; high = HIGHLEFT
                x = 0
                break
            case Bar.Mid: low = LOWMID; high = HIGHMID;
                x = (BARS == 1 ? 1 : 2)
                break;
            case Bar.Right: low = LOWRIGHT; high = HIGHRIGHT;
                x = 5 - w
                break;
        }

        if (valperc == low) {
            for (let y = 0; y < 5; y++) {
                led.unplot(x, 4 - y)
                if (w > 1)
                    led.unplot(x + 1, 4 - y)
                if (w > 2)
                    led.unplot(x + 2, 4 - y)
            }
        }
        else {
            valperc = Math.map(valperc, low, high, 0, 4)
            for (let y = 0; y < 5; y++) {
                if (y <= valperc) {
                    led.plot(x, 4 - y)
                    if (w > 1)
                        led.plot(x + 1, 4 - y)
                    if (w > 2)
                        led.plot(x + 2, 4 - y)
                }
                else {
                    led.unplot(x, 4 - y)
                    if (w > 1)
                        led.unplot(x + 1, 4 - y)
                    if (w > 2)
                        led.unplot(x + 2, 4 - y)
                }
            }
        }
    }
}
