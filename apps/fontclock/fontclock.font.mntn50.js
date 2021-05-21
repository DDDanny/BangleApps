var NumeralFont = require("fontclock.font.js");

const DIM_30x47 = [30,47];
const DIM_49x47 = [49,47];
const DIM_37x47 = [37,47];
class DigitNumeralFont extends NumeralFont{
    constructor(){
        super();
        // dimension map provides the dimensions of the character for
        // each number for plotting and collision detection

        /*this.dimension_map = {
            3 : [30,47],
            6 : [37,47],
            9 : [37,47],
            12: [49,47]
        };*/
        this.widths = atob("DRYqFR0fHyMnICgnDQ==");
        this.font = atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAChkoAAAAAAAAAAAAAvP7wAAAAAAAAAAAAC8/vAAAAAAAAAAAAALz+8AAAAAAAAAAAAAvP7wAAAAAAAAAAAAC8/vAAAAAAAAAAAAALz+8AAAAAAAAAAAAAvP7wAAAAAAAAAAAAC8/vAAAAAAAAAAAAALz+8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAH/AAAAAAAAAAAAAB//8AAAAAAAAAAAAf///gAAAAAAAAAAH///5LAAAAAAAAAB///+S/8AAAAAAAAf///kv//wAAAAAAH///5L///4AAAAAB///+S///+G8AAAAf///kv///hv/wAAH///5L///4b///AAP//+S///+G///5AAA//kv///hv//+QAAAD5L///4b///kAAAAAC///+G///5AAAAAAA///hv//+QAAAAAAAD/4b///kAAAAAAAAAKG///5AAAAAAAAAAAv//+QAAAAAAAAAAAD//kAAAAAAAAAAAAAP5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAAAAAAAAAAAAAC////4AAAAAAAAAAL//////gAAAAAAAAP//6Vr//8AAAAAAAH/9Gv/pH/9AAAAAAD/4v////4v/AAAAAA/8///////P/AAAAAP9v/4BUC//n/AAAAD/f/m///+b/3/AAAAv3/n/////2/3+AAAH9/3//+r//9/39AAA/v9/+G/+S/9/78AAD9/f+f///9v9/fwAAvf3/f/////f9/fgAD9/vz/4AAv/P78/AAf/39/0AAAH/f3/9AC9/f78AAAAD+/f34ALz+9/QAAAAH9+/PgA/Pvz8AAAAAPz+8/AD99/PgAAAAAvP338AP739+AAAAAC9/ffwA/ff34AAAAAL399/AD8+/PwAAAAA/P7z8APz/9/AAAAAD9//PgAvf37/AAAAA//39+AB+/Pz/AAAAP8/P70AD9/v3/wAAP/f79/AAP39/3/////3/f38AAf79/2////5/3+/QAA/f9/9r//p/9/78AAB/f9//5Rb//f9/QAAD/f9v/////n/f8AAAD/f/b////n/3/AAAAD/f/4WqlL/9/wAAAAH/X//////9f9AAAAAH/1/////9f/QAAAAAC/+H///0v/gAAAAAAB//+QAb//0AAAAAAAAf//////0AAAAAAAAAB/////QAAAAAAAAAAAAa6QAAAAAAAAAAAAAAAAAAAAAAAAClopAAAAAAAAAAAAAPvz4AAAAAAAAAAAAA+/PgAAAAAAAAAAAAD78+AAAAAAAAAAAAAPvz4AAAAAAAAAAAAA+/PgAAAAAAAAAAAAD78///////////wAAPvz///////////AAA+/P6qqqqqqqqqoAAD78///////////gAAPvz///////////AAA+/P//////////8AAD78+AAAAAAAAAAAAAPvz///////////AAA+/P//////////8AAD78/qqqqqqqqqqgAAPvz//////////+AAA+/P//////////8AAD68///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAA/PQAAAAAAAG8+vAAD9+/ZAAAAAC/z+8AAP/3+9AAAAA//P7wAB+/PvwAAAAf/8/vAAL3+9/AAAAL/bz+8AA/P/z8AAAD/r/P7wAD9+/PgAAB/7/8/vAAP379+AAAv+//z+8AA/vf30AAP+/9vP7wAD+9/vQAH/v+v8/vAAP7399AD/7/f/z+8AA/fv30A/7/3//P7wAD9+/Pgv+/7/28/vAALz+9/v/v9/9/z+8AAvP3+//v/v+v/P7wAB+/f3/7/v/f/8/vAAD+/v4H/3/3/bz+8AAP39///7/2/0vP7wAAf79v/9/9/8C8/vAAA/f9G5/+v+ALz+8AAC/f/7//f/QAvP7wAAD/P///r/wAC8/vAAAH/n//n/0AALz+8AAAH/5Ab/8AAAvP7wAAAH////9AAAB8tfAAAAC///9AAAAAAAAAAAAAK/kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALyQAAAAAAAAABj4AA/P7gAAAAAAAu/PwAD9+/fQAAAAH3+9/AAP73+8AAAAAfv378AB+/PvwAAAAA//P70AL3+9/AAAAAD+9/fgA/P7z8KWiloPz78+AD8+/Pg/vP7wvP/z8APz78+D+8/vC8/vPwA/fv34P7z+8L3+8/AD99/fQ/vP7wvf738AP3399D+8/vB9/ffwA/ff30P7z+8H3+9/AD9+/fg/vf30vP738APz/8/D9+/Pj8+/PwA/P77//z/9//778+AC+/f3//f3+/9/f74AD+/v3/+/v6/f7+/AAPz9/5b9/f+b/fz8AAv79////+v//3+/gAA/f9///3/f/9/38AAC/f+RR/3/Rlv9/gAAD/f////3////f8AAAD/b////3///3/AAAAH/2//X/5//n/0AAAAD/+lr///lb/8AAAAAC////9////+AAAAAAAv//9Af//+AAAAAAAABaQAAAaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7z58AAAAAAAAAAAB//P7wAAAAAAAAAAC//8/vAAAAAAAAAAC//rz+8AAAAAAAAAD//X/P7wAAAAAAAAH//X/8/vAAAAAAAAH//b//z+8AAAAAAAH//L/+vP7wAAAAAAL/+P/9f8/vAAAAAAL/+f/9f/z+8AAAAAL/9f/8v//P7wAAAAD/9f/4v/68/vAAAAAP9v/4//4vz+8AAAAA8v/5//0v/P7wAAAAAv/1//1//8/vAAAAAP/1//x///z+8AAAAA/y//i//wvP7wAAAADi//i//gC8/vAAAAAD//X//gALz+8AAAAA//X//QAAvP7wAAAAD/L//Af//8/vv/gAAOL/+AC///z+///AAAP/+AAH///P7//8AAD/9AAAAAC8/vAAAAAP9AAAB///z+///AAA4AAAAL///P7//8AAAAAAAAKqr8/vaqgAAAAAAAAAALz+8AAAAAAAAAAAAAvPrwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAA8AAAD14//////0AAL8AAAPvz//////gACf8AAA+/P/////+AAvfwAAD78+AAAAAAAD/vwAAPvz//////gA39/AAA+/P/////+AP3++AAD78/qqqqqgA/fz8AAPvz//////Qt/vvwAA+/P/////+D78/vQAD78//////4P739+AAPvz4A9ufPQ/Pvz8AA+/PgH3+9+C8+vPwAD78+Avf/z0L3+9/AAPvz4C8//fAff338AA+/PgLz7+8B9/vfwAD78+AvPv7wL3+9/AAPvz4D8+/fg/P/z8AA+/PgLz+8/D9+/PwAD78+AvP77///39+AAPvz4B+/P3/9/v/wAA+/PgD9+/3/f39/AAD78+AP38/0L/f78AAPvz4Av79///39/QAA+/PgA/f8//9//8AAD78+AB/f9L5f9/QAAPvz4AD/f/6//f8AAA+/PgAD/P///3/AAAD289AAH/j//y/wAAAAAAAAAH/9AH/8AAAAAAAAAAD////+AAAAAAAAAAAB///+AAAAAAAAAAAAAGvpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa////6QAAAAAAAAB///////+AAAAAAAB/////////gAAAAAA//kAAAABv/0AAAAAP/X//////n/0AAAAD/b///////6/0AAAA/3//6qqqv/9/wAAAL9/9a////kv9/wAAB/P+v//////P9/QAAP6/f///////P+/AAA/P3/5AAAAf/fz8AAP3+/2/////3/v74AA/f79//////79/fwAD/+/f/6qqr/3++/AAvf39/Pz799//3+9AD8/vfw/vf/w/fv38APz/8/D/9+/D8+/PwA/fvz4ff734L3/9/AD99/fS8//fQff738AP3399Lz799B9/ffwA/ff30vPv7wH3+9/AD9+/Pj8+/vQvP7z8APz68+Lz79+D8+/PwA/P338vP7z8f779+AB+/f/x+/f//+/f70AD+9/fD+9/f/7/+/AAP3+/QP3+/b2/f38AA/fz8Av/3///7//gAB/v3QA/f3///v38AAD9/gAC/v2//b+/gAAH9+AAD+/+AL/r8AAAP+wAAH+v///6/QAAAP0AAAP/f//9/4AAAAfQAAAP/lvlv+AAAAAkAAAAL//r//QAAAAAAAAAAD////wAAAAAAAAAAAAv//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPrz4AAAAAAAAAAAAA+/PgAAAAAAAAAAAAD78+AAAAAAAAAAAAAPvz4AAAAAAAAAAAAA+/PgAAAAAAAAAAAAD78+AAAAAAAAAAAAAPvz4AAAAAAAAAGAAA+/PgAAAAAAAB/8AAD78+AAAAAAAv//wAAPvz4AAAAAL///4AAA+/PgAAAC///+G8AAD78+AAAv///hv/wAAPvz4AL///4b///AAA+/Pm///+G///9EAAD79////Rv//+R/wAAPr///0f///kv//AAA///9H///5L///4AAD//R///+S///+GwAAPkf///kv///hv/AAAL///5L///4b//8AAD//+W///+G///9AAAP/hv///Rv//+QAAAAob///0f///kAAAAAC///9H///5AAAAAAAP//R///+QAAAAAAAA/kf///kAAAAAAAAAAL///5AAAAAAAAAAAP//+QAAAAAAAAAAAA//kAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//0AL//9AAAAAAAf///+L////QAAAAAP/+r////r//wAAAAD/0v5f/4r6b/wAAAA/6///n////1/wAAAP9////3////9/gAAC/f/gG/3/kB/9/AAAP7/b/9/3//+f+/AAC/f3//9/v///f79AAP39/+/9/f///f38AA/v/9uf+/v/n+/vwAL79/f/v38//38/vQA/P77//f7z///78/AD8//Pz9/vfw/Prz8AP379+H79+/D8/vfwA/vf30Pvz68L399/AD+9/fQ+/Prwff378AP7399D78+vB9/fvwA/vf30Pvz68H39+/AD+9/fQ+/Prwff378AP7399D78+vB9/fvwA/vf30Pvz+8H39+/AD9+/fg/vP7wvf338APz/8/D+8/vT8/vfwA/P77/v339//378/AC9/f7//P77/+/f34AH++/r/9/f3/r9/vQAP39/0H++v4D/f38AA/v+///39///+/fwAA/f9///39//+v39AAD/v9b5/v+b+P+/wAAD/f/6//v/6//r8AAAH/f////7///2/gAAAL/X//3/3//5/4AAAAH/5FC//9BB/+AAAAAH//////////QAAAAAB////A////QAAAAAAAK/5AAG/5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//QAAAAAAAAAAAAv///4AAAAAAAAAAAf////9AAAABQAAAAH/0aR/9AAAAPQAAAB/2//+v9AAAC/AAAAf9////f8AAA3/AAAD/f/Qf/f4AAL38AAAv3/P/n/fwAAv78AAD+/r//3/fwAd/fwAAv7+///7+/AD9/vgAD9/f8pv3+/Af39/AAP7//v//v38Lf778AB+/f3/9/f/w//P70AL3++/r+9/vT99/fgA/P7z8Pz79+Pz78/AD9+/Pgvf/z4vPrz8AP3799B9/vPi9/vfwA/vf30D7+8+H399/AD9+/fQff/z4ff338AP3799C8+/fS8/vfwA/P7z4P73+8Pz/8/AD8/vfw//fvw/fvz8AL39//n3+8/P79/fgAP/39/6VVVv/f7/8AA/f7+//////3+/fwAD+/f9/////9/79/AAH9/f+FVVVRv9/P0AAP3+f///////f9/AAAf3/f//////7/P0AAA/3/W////+j/3/AAAA/7/+lVVVr/9/wAAAB/3///////+f9AAAAB/9//////+L/QAAAAB//QVVVVQv/wAAAAAA/////////4AAAAAAAf///////4AAAAAAAABv////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB89fAHz18AAAAAAAAPz78AvP7wAAAAAAAA/PvwC8/vAAAAAAAAD8+/ALz+8AAAAAAAAPz78AvP7wAAAAAAAA/PvwC8/vAAAAAAAAD8+/ALz+8AAAAAAAAPz78AvP7wAAAAAAAA/PvwC8/vAAAAAAAAC8+vALz68AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==");
        var scale = 1; // size multiplier for this font
        this.size = 50+(scale<<8)+(2<<16);
        this.y_offset = -2;

    }
    getDimensions(hour){
        switch(hour){
            case 3:
                return DIM_30x47;
            case 12:
                return DIM_49x47;
            default:
                return DIM_37x47;
        }
        //return this.dimension_map[hour];
    }
    hour_txt(hour){ return hour.toString(); }
    draw(hour_txt,x,y){
        /* going to leave this in here for future testing.
         uncomment this so that it draws a box behind the string
         so we can guess the digit dimensions
        var dim = [37,47];
        g.setColor(0.5,0,0);
        g.fillPoly([x,y,
                      x+dim[0],y,
                      x+dim[0],y+dim[1],
                      x,y+dim[1]
                     ]);
        g.setColor(1.0,1.0,1.0);*/
        g.setFontAlign(-1.0,-1.0,0);
        g.setFontCustom(this.font, 46, this.widths, this.size);
        g.drawString(hour_txt,x,y+this.y_offset );
    }
    getName(){return "Digit";}
}

module.exports = [DigitNumeralFont];