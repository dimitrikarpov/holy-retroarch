# Holy Retroarch

Make web retroarch simplier

### listen Retroarch status changes

Holy Retroarch provides custom event called `ra-status` for emulator lifecycle changes. To handle them just subscribe on canvas element or any other canvas parent

```js
/**
 * listening status changes
 */
function subscribeToRetroarchStatusChange() {
  document.getElementById("canvas").addEventListener("ra-status", (e) => {
    console.log("[HOLY-STATUS]", e.detail)
  })
}
```

Statuses:

- `not-inited` - after creating Retroarch instance
- `initing` - downloading core (Module) and copying config
- `inited` - when `initing` phase completed
- `running` - started Module's main loop
- `paused` - paused Module's main loop (emulator paused)

## How to compile cores

You can use already builded cores from retroarch's buildbot by downloading and unpacking [archive](https://buildbot.libretro.com/nightly/emscripten/) or you can build cores manually with adding some extra tweaks using this retroarch [compiling guide](https://github.com/libretro/RetroArch/blob/master/pkg/emscripten/README.md) as base guide

What type of tweaks can be added:

- compiling output js code for web environment only, without support of nodejs or webworker environments
- ability to add extra js code to compiled Module with needed logic
- add or remove compilation params to add or remove compiled retroarch features and functions
- and much more...

For simplicity we will use official Emscripten SDK [docker continer](https://hub.docker.com/r/emscripten/emsdk)

The main steps to compile core:

- clone retroarch repo
- clone needed libretro core repo
- compile core to bitcode `.bc` file
- link core's `.bc` with retroarch frontend and compile them to `.js` and `.wasm`

### prepare working folder and clone retroarch repo

```sh
mkdir ~/retroarch
cd ~/retroarch
git clone https://github.com/libretro/RetroArch.git ~/retroarch/RetroArch
```

and apply one of the patches from `/cores` folder. For example, let's patch for "web-only" environment

```bash
cd Retroarch
git apply ~/Documents/dev/holy-retroarch/cores/Retroarch-webonly.patch
cd ..
```

### compile core: Snes9x

```sh
git clone https://github.com/libretro/snes9x

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/snes9x/libretro \
emscripten/emsdk \
emmake make -f /src/snes9x/libretro/Makefile platform=emscripten

cp ~/retroarch/snes9x/libretro/snes9x_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/snes9x_libretro_emscripten.bc
```

### compile core: Fceumm

```sh
git clone https://github.com/libretro/libretro-fceumm.git

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/libretro-fceumm \
emscripten/emsdk \
emmake make -f /src/libretro-fceumm/Makefile.libretro platform=emscripten

cp ~/retroarch/libretro-fceumm/fceumm_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/fceumm_libretro_emscripten.bc
```

### compile core: Genesis Plus GX

```sh
git clone https://github.com/libretro/Genesis-Plus-GX

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/Genesis-Plus-GX \
emscripten/emsdk \
emmake make -f /src/Genesis-Plus-GX/Makefile.libretro platform=emscripten

cp ~/retroarch/Genesis-Plus-GX/genesis_plus_gx_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/genesis_plus_gx_libretro_emscripten.bc
```

### add retroarch to all compiled cores and build wasm files

```sh
docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/RetroArch/dist-scripts \
emscripten/emsdk \
emmake ./dist-cores.sh emscripten
```

All compiled `.js` and `.wasm` files now in `~/retroarch/RetroArch/pkg/` folder
