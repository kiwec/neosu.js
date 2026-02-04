import neosu from './index.js';


async function test_pp_simple() {
    console.log("pp version:", neosu.PP_ALGORITHM_VERSION);

    // https://osu.ppy.sh/scores/1641562531 (636pp)
    const res = await fetch('https://osu.ppy.sh/osu/3337690');
    const map_bytes = await res.bytes();

    const beatmap = await neosu.Beatmap(map_bytes);
    try {
        const pp = beatmap.calculate({
            num300s: 3027,
            num100s: 115,
            num50s: 4,
            numMisses: 11,
            score: 300461780,
            comboMax: 3483,
        });
        console.log("pp:", pp);
    } finally {
        beatmap.delete();
    }
}

async function test_pp_large() {
    // https://osu.ppy.sh/scores/1770976762
    const res = await fetch('https://osu.ppy.sh/osu/2573161');
    const map_bytes = await res.bytes();

    const beatmap = await neosu.Beatmap(map_bytes);
    try {
        const pp = beatmap.calculate({
            num300s: 925,
            num100s: 158,
            num50s: 1,
            numMisses: 8,
            score: 30352231,
            comboMax: 1014,
            mods: {
                speed: 1.5,
                flags: neosu.ModFlags.Hidden | neosu.ModFlags.HardRock | neosu.ModFlags.Flashlight,
            }
        });
        console.log("pp:", pp);
    } finally {
        beatmap.delete();
    }
}

await test_pp_simple();
await test_pp_large();
