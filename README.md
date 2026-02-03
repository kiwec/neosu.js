# neosu.js

**Experimental** library to interact with the neosu server, and other neosu-related tooling.

### pp

Runs a WASM version of neosu's pp calculation code.

See [the neosu repository](https://github.com/kiwec/neosu/tree/master/tools/neosu.js) if you want to build it from source.

```js
import neosu from 'neosu';

console.log("pp version": neosu.PP_ALGORITHM_VERSION);

// https://osu.ppy.sh/scores/1641562531 (636pp)
const res = await fetch('https://osu.ppy.sh/osu/3337690');
const map_bytes = await res.bytes();

const beatmap = new neosu.Beatmap(map_bytes);
try {
    // You must pass ALL these parameters or else you will get 0pp.
    const pp = beatmap.calculate({
        num300s: 3027,
        num100s: 115,
        num50s: 4,
        numMisses: 11,
        score: 300461780,
        comboMax: 3483,
    });
    console.log("pp:", pp);
} catch(err) {
    console.error("failed to calc pp:", err);
} finally {
    // You must delete the Beatmap object after usage to prevent memory leaks!
    beatmap.delete();
}
```
