import createModule from './bin/neosu.js';

// Annoying, but we need to track if the module is 'alive'
//
// Because in the case the WASM module runs out of memory,
// we can't even call delete(), we need to re-create a new module!
//
// Or else, we wouldn't be able to recover from an error caused
// by a malicious map.

let alive = true;
let module;

async function init() {
    module = await createModule({
        wasmMemory: new WebAssembly.Memory({
            initial: 256,
            maximum: 1024,
        })
    });
    module.onAbort = () => { alive = false; };
    alive = true;
}

// WASM classes/functions
async function Beatmap(osu_bytes) {
    if(!alive) await init();
    return new module.Beatmap(osu_bytes);
}


// WASM constants
await init();
const PP_ALGORITHM_VERSION = module.PP_ALGORITHM_VERSION;


export default {Beatmap, PP_ALGORITHM_VERSION};
