


// random with a seed.
// // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript


export const randomNumberGenerator =


    function newRandom(a, b, c, d) {
        const foo = function () {
            a |= 0;
            b |= 0;
            c |= 0;
            d |= 0;
            let t = (a + b | 0) + d | 0;
            d = d + 1 | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }

        // if the seed values are not random enough,
        // the first 15 or so entries repeat a lot.
        // just grab 100 right off the top.
        for (let x = 0; x < 1000; x++) {
            foo()
        }

        return foo
    }

