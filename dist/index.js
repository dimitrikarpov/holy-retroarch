/******/ var __webpack_modules__ = ({

/***/ "./src/RetroarchComponent.ts":
/*!***********************************!*\
  !*** ./src/RetroarchComponent.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetroarchComponent": () => (/* binding */ RetroarchComponent)
/* harmony export */ });
/* harmony import */ var _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retroarch-module/RetroarchService */ "./src/retroarch-module/RetroarchService.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var templateString = "<canvas id=\"canvas\"></canvas>";
var RetroarchComponent = /** @class */ (function (_super) {
    __extends(RetroarchComponent, _super);
    function RetroarchComponent() {
        var _this = _super.call(this) || this;
        _this.retroarchService = _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService;
        return _this;
    }
    RetroarchComponent.prototype.connectedCallback = function () {
        this.innerHTML = templateString;
        this.$canvas = this.querySelector("canvas");
        this.core = this.getAttribute("core");
        _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.prepare(this.$canvas, this.core);
    };
    RetroarchComponent.prototype.disconnectedCallback = function () { };
    return RetroarchComponent;
}(HTMLElement));



/***/ }),

/***/ "./src/createRetroarch.ts":
/*!********************************!*\
  !*** ./src/createRetroarch.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRetroarch": () => (/* binding */ createRetroarch)
/* harmony export */ });
/* harmony import */ var _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retroarch-module/RetroarchService */ "./src/retroarch-module/RetroarchService.ts");
/* harmony import */ var _utils_waitMs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/waitMs */ "./src/utils/waitMs.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var templateString = "<canvas id=\"canvas\"></canvas>";
var createCanvas = function (container) {
    var parentContainer = container;
    if (!container) {
        parentContainer = document.createElement("div");
        document.body.appendChild(parentContainer);
    }
    parentContainer.innerHTML = templateString;
    var canvas = parentContainer.querySelector("canvas");
    return canvas;
};
var createRetroarch = function (_a) {
    var container = _a.container, rom = _a.rom, save = _a.save, onStarted = _a.onStarted, core = _a.core;
    return __awaiter(void 0, void 0, void 0, function () {
        var canvas;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (onStarted) {
                        _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.onEmulatorStarted = onStarted;
                    }
                    canvas = createCanvas(container);
                    return [4 /*yield*/, _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.prepare(canvas, core)];
                case 1:
                    _b.sent();
                    if (!(rom && save)) return [3 /*break*/, 3];
                    _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.uploadRom(rom);
                    _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.uploadSave(save);
                    return [4 /*yield*/, (0,_utils_waitMs__WEBPACK_IMPORTED_MODULE_1__.waitMs)(250)];
                case 2:
                    _b.sent();
                    _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.start();
                    return [3 /*break*/, 5];
                case 3:
                    if (!rom) return [3 /*break*/, 5];
                    _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.uploadRom(rom);
                    return [4 /*yield*/, (0,_utils_waitMs__WEBPACK_IMPORTED_MODULE_1__.waitMs)(250)];
                case 4:
                    _b.sent();
                    _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.start();
                    _b.label = 5;
                case 5: return [2 /*return*/, _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService];
            }
        });
    });
};


/***/ }),

/***/ "./src/retroarch-module/RetroarchService.ts":
/*!**************************************************!*\
  !*** ./src/retroarch-module/RetroarchService.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetroarchService": () => (/* binding */ RetroarchService)
/* harmony export */ });
/* harmony import */ var _downloadModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./downloadModule */ "./src/retroarch-module/downloadModule.ts");
/* harmony import */ var _configureModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configureModule */ "./src/retroarch-module/configureModule.ts");
/* harmony import */ var _utils_copyFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/copyFile */ "./src/utils/copyFile.ts");
/* harmony import */ var _utils_Deferred__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Deferred */ "./src/utils/Deferred.ts");
/* harmony import */ var _defaultConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultConfig */ "./src/retroarch-module/defaultConfig.ts");
/**
 * Module - is js part of instance of libretro core + retroarch frontend
 * Module is avaiable as global variable `Module` also it expose `FS` and `RA` objects
 * Module contains js glue for compiled wasm file and some exported functions from retroarch itself
 * FS used for accessing filesystem of wasm module, we will use it to upload rom and retroarch assets (so called bundle)
 * RA will be used for accessing to audio
 *
 *
 * How the module going to be created:
 * - first of all we need to create global object `Module` with some configuration
 *   and initialization hooks
 * - next we download compiled js script of needed core and wasm file. js script
 *   checks if where Module instance in global scope and hooks up our config and extends it.
 *   after that full Module object going to be available and global FS object too.
 * - next we have to copy our rom file and retroarch config file to our retroarch filesystem.
 *   retroarch will start it by calling `onRuntimeInitialized` hook or we can copy directly to wasm filesystem
 * - and we ready to start the Module!
 */
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var deferredOnRuntimeInitialized = new _utils_Deferred__WEBPACK_IMPORTED_MODULE_3__.Deferred();
var onRuntimeInitialized = function () { return deferredOnRuntimeInitialized.resolve(""); };
var RetroarchService = {
    prepare: function (canvas, core) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0,_configureModule__WEBPACK_IMPORTED_MODULE_1__.configureModule)(canvas, onRuntimeInitialized);
                    return [4 /*yield*/, (0,_downloadModule__WEBPACK_IMPORTED_MODULE_0__.downloadModule)(core)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, deferredOnRuntimeInitialized.promise];
                case 2:
                    _a.sent();
                    (0,_utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.copyFile)((0,_defaultConfig__WEBPACK_IMPORTED_MODULE_4__.stringifySettings)(__assign(__assign(__assign({}, _defaultConfig__WEBPACK_IMPORTED_MODULE_4__.defaultKeybinds), _defaultConfig__WEBPACK_IMPORTED_MODULE_4__.extraConfig), _defaultConfig__WEBPACK_IMPORTED_MODULE_4__.nulKeys)), _utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.DIRS.USERDATA, "retroarch.cfg");
                    return [2 /*return*/];
            }
        });
    }); },
    uploadSave: function (state) {
        (0,_utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.copyFile)(state, _utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.DIRS.STATES, "rom.state");
    },
    uploadRom: function (rom) {
        (0,_utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.copyFile)(rom, _utils_copyFile__WEBPACK_IMPORTED_MODULE_2__.DIRS.ROOT, "rom.bin");
    },
    start: function () {
        window.Module.callMain(window.Module.arguments);
        window.Module["resumeMainLoop"]();
        document.getElementById("canvas").focus();
    },
    loadSave: function () {
        window.Module._cmd_load_state();
    },
    onEmulatorStarted: function () {
        console.log("[Retroarch Service]: emulator started");
    },
};


/***/ }),

/***/ "./src/retroarch-module/configureModule.ts":
/*!*************************************************!*\
  !*** ./src/retroarch-module/configureModule.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configureModule": () => (/* binding */ configureModule)
/* harmony export */ });
/* harmony import */ var _moduleLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moduleLogger */ "./src/retroarch-module/moduleLogger.ts");

var _a = (0,_moduleLogger__WEBPACK_IMPORTED_MODULE_0__.moduleLogger)(), print = _a.print, printErr = _a.printErr;
var configureModule = function (canvas, onRuntimeInitialized) {
    window.Module = {
        canvas: canvas,
        noInitialRun: true,
        arguments: ["/rom.bin", "--verbose"],
        onRuntimeInitialized: onRuntimeInitialized,
        print: print,
        printErr: printErr,
        preRun: [],
        postRun: [],
    };
};


/***/ }),

/***/ "./src/retroarch-module/defaultConfig.ts":
/*!***********************************************!*\
  !*** ./src/retroarch-module/defaultConfig.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultKeybinds": () => (/* binding */ defaultKeybinds),
/* harmony export */   "extraConfig": () => (/* binding */ extraConfig),
/* harmony export */   "nulKeys": () => (/* binding */ nulKeys),
/* harmony export */   "stringifySettings": () => (/* binding */ stringifySettings)
/* harmony export */ });
var extraConfig = { rgui_show_start_screen: "false" };
var defaultKeybinds = {
    input_player1_start: "enter",
    input_player1_select: "space",
    input_player1_l: "e",
    input_player1_l2: "r",
    input_player1_r: "p",
    input_player1_r2: "o",
    input_player1_a: "h",
    input_player1_b: "g",
    input_player1_x: "y",
    input_player1_y: "t",
    input_player1_up: "up",
    input_player1_left: "left",
    input_player1_down: "down",
    input_player1_right: "right",
    input_player1_l_x_minus: "a",
    input_player1_l_x_plus: "d",
    input_player1_l_y_minus: "w",
    input_player1_l_y_plus: "s",
    input_player1_l3_btn: "x",
    input_player1_r_x_minus: "j",
    input_player1_r_x_plus: "l",
    input_player1_r_y_minus: "i",
    input_player1_r_y_plus: "k",
    input_player1_r3_btn: "comma",
    input_menu_toggle: "f1",
    input_save_state: "f2",
    input_load_state: "f3",
    input_screenshot: "f4",
    input_hold_fast_forward: "nul",
    input_toggle_fast_forward: "nul",
};
var nulKeys = {
    input_ai_service: "nul",
    input_ai_service_axis: "nul",
    input_ai_service_btn: "nul",
    input_ai_service_mbtn: "nul",
    input_audio_mute: "nul",
    input_audio_mute_axis: "nul",
    input_audio_mute_btn: "nul",
    input_audio_mute_mbtn: "nul",
    input_cheat_index_minus: "nul",
    input_cheat_index_minus_axis: "nul",
    input_cheat_index_minus_btn: "nul",
    input_cheat_index_minus_mbtn: "nul",
    input_cheat_index_plus: "nul",
    input_cheat_index_plus_axis: "nul",
    input_cheat_index_plus_btn: "nul",
    input_cheat_index_plus_mbtn: "nul",
    input_cheat_toggle: "nul",
    input_cheat_toggle_axis: "nul",
    input_cheat_toggle_btn: "nul",
    input_cheat_toggle_mbtn: "nul",
    input_desktop_menu_toggle: "nul",
    input_desktop_menu_toggle_axis: "nul",
    input_desktop_menu_toggle_btn: "nul",
    input_desktop_menu_toggle_mbtn: "nul",
    input_disk_eject_toggle: "nul",
    input_disk_eject_toggle_axis: "nul",
    input_disk_eject_toggle_btn: "nul",
    input_disk_eject_toggle_mbtn: "nul",
    input_disk_next: "nul",
    input_disk_next_axis: "nul",
    input_disk_next_btn: "nul",
    input_disk_next_mbtn: "nul",
    input_disk_prev: "nul",
    input_disk_prev_axis: "nul",
    input_disk_prev_btn: "nul",
    input_disk_prev_mbtn: "nul",
    input_duty_cycle: "nul",
    input_enable_hotkey: "nul",
    input_enable_hotkey_axis: "nul",
    input_enable_hotkey_btn: "nul",
    input_enable_hotkey_mbtn: "nul",
    input_exit_emulator: "nul",
    input_exit_emulator_axis: "nul",
    input_exit_emulator_btn: "nul",
    input_exit_emulator_mbtn: "nul",
    input_fps_toggle: "nul",
    input_fps_toggle_axis: "nul",
    input_fps_toggle_btn: "nul",
    input_fps_toggle_mbtn: "nul",
    input_frame_advance: "nul",
    input_frame_advance_axis: "nul",
    input_frame_advance_btn: "nul",
    input_frame_advance_mbtn: "nul",
    input_game_focus_toggle: "nul",
    input_game_focus_toggle_axis: "nul",
    input_game_focus_toggle_btn: "nul",
    input_game_focus_toggle_mbtn: "nul",
    input_grab_mouse_toggle: "nul",
    input_grab_mouse_toggle_axis: "nul",
    input_grab_mouse_toggle_btn: "nul",
    input_grab_mouse_toggle_mbtn: "nul",
    input_hold_fast_forward_axis: "nul",
    input_hold_fast_forward_btn: "nul",
    input_hold_fast_forward_mbtn: "nul",
    input_hold_slowmotion: "nul",
    input_slowmotion: "nul",
    input_hold_slowmotion_axis: "nul",
    input_hold_slowmotion_btn: "nul",
    input_hold_slowmotion_mbtn: "nul",
    input_hotkey_block_delay: "nul",
    input_load_state_axis: "nul",
    input_load_state_btn: "nul",
    input_load_state_mbtn: "nul",
    input_menu_toggle_axis: "nul",
    input_menu_toggle_btn: "nul",
    input_menu_toggle_mbtn: "nul",
    input_movie_record_toggle: "nul",
    input_movie_record_toggle_axis: "nul",
    input_movie_record_toggle_btn: "nul",
    input_movie_record_toggle_mbtn: "nul",
    input_netplay_game_watch: "nul",
    input_netplay_game_watch_axis: "nul",
    input_netplay_game_watch_btn: "nul",
    input_netplay_game_watch_mbtn: "nul",
    input_netplay_host_toggle: "nul",
    input_netplay_host_toggle_axis: "nul",
    input_netplay_host_toggle_btn: "nul",
    input_netplay_host_toggle_mbtn: "nul",
    input_osk_toggle: "nul",
    input_osk_toggle_axis: "nul",
    input_osk_toggle_btn: "nul",
    input_osk_toggle_mbtn: "nul",
    input_overlay_next: "nul",
    input_overlay_next_axis: "nul",
    input_overlay_next_btn: "nul",
    input_overlay_next_mbtn: "nul",
    input_pause_toggle: "nul",
    input_pause_toggle_axis: "nul",
    input_pause_toggle_btn: "nul",
    input_pause_toggle_mbtn: "nul",
    input_player1_a_axis: "nul",
    input_player1_a_btn: "nul",
    input_player1_a_mbtn: "nul",
    input_player1_b_axis: "nul",
    input_player1_b_btn: "nul",
    input_player1_b_mbtn: "nul",
    input_player1_down_axis: "nul",
    input_player1_down_btn: "nul",
    input_player1_down_mbtn: "nul",
    input_player1_gun_aux_a: "nul",
    input_player1_gun_aux_a_axis: "nul",
    input_player1_gun_aux_a_btn: "nul",
    input_player1_gun_aux_a_mbtn: "nul",
    input_player1_gun_aux_b: "nul",
    input_player1_gun_aux_b_axis: "nul",
    input_player1_gun_aux_b_btn: "nul",
    input_player1_gun_aux_b_mbtn: "nul",
    input_player1_gun_aux_c: "nul",
    input_player1_gun_aux_c_axis: "nul",
    input_player1_gun_aux_c_btn: "nul",
    input_player1_gun_aux_c_mbtn: "nul",
    input_player1_gun_dpad_down: "nul",
    input_player1_gun_dpad_down_axis: "nul",
    input_player1_gun_dpad_down_btn: "nul",
    input_player1_gun_dpad_down_mbtn: "nul",
    input_player1_gun_dpad_left: "nul",
    input_player1_gun_dpad_left_axis: "nul",
    input_player1_gun_dpad_left_btn: "nul",
    input_player1_gun_dpad_left_mbtn: "nul",
    input_player1_gun_dpad_right: "nul",
    input_player1_gun_dpad_right_axis: "nul",
    input_player1_gun_dpad_right_btn: "nul",
    input_player1_gun_dpad_right_mbtn: "nul",
    input_player1_gun_dpad_up: "nul",
    input_player1_gun_dpad_up_axis: "nul",
    input_player1_gun_dpad_up_btn: "nul",
    input_player1_gun_dpad_up_mbtn: "nul",
    input_player1_gun_offscreen_shot: "nul",
    input_player1_gun_offscreen_shot_axis: "nul",
    input_player1_gun_offscreen_shot_btn: "nul",
    input_player1_gun_offscreen_shot_mbtn: "nul",
    input_player1_gun_select: "nul",
    input_player1_gun_select_axis: "nul",
    input_player1_gun_select_btn: "nul",
    input_player1_gun_select_mbtn: "nul",
    input_player1_gun_start: "nul",
    input_player1_gun_start_axis: "nul",
    input_player1_gun_start_btn: "nul",
    input_player1_gun_start_mbtn: "nul",
    input_player1_gun_trigger: "nul",
    input_player1_gun_trigger_axis: "nul",
    input_player1_gun_trigger_btn: "nul",
    input_player1_gun_trigger_mbtn: "nul",
    input_player1_l2_axis: "nul",
    input_player1_l2_btn: "nul",
    input_player1_l2_mbtn: "nul",
    input_player1_l3: "nul",
    input_player1_l3_axis: "nul",
    input_player1_l3_mbtn: "nul",
    input_player1_l_axis: "nul",
    input_player1_l_btn: "nul",
    input_player1_l_mbtn: "nul",
    input_player1_l_x_minus_axis: "nul",
    input_player1_l_x_minus_btn: "nul",
    input_player1_l_x_minus_mbtn: "nul",
    input_player1_l_x_plus_axis: "nul",
    input_player1_l_x_plus_btn: "nul",
    input_player1_l_x_plus_mbtn: "nul",
    input_player1_l_y_minus_axis: "nul",
    input_player1_l_y_minus_btn: "nul",
    input_player1_l_y_minus_mbtn: "nul",
    input_player1_l_y_plus_axis: "nul",
    input_player1_l_y_plus_btn: "nul",
    input_player1_l_y_plus_mbtn: "nul",
    input_player1_left_axis: "nul",
    input_player1_left_mbtn: "nul",
    input_player1_r2_axis: "nul",
    input_player1_r2_btn: "nul",
    input_player1_r2_mbtn: "nul",
    input_player1_r3: "nul",
    input_player1_r3_axis: "nul",
    input_player1_r3_mbtn: "nul",
    input_player1_r_axis: "nul",
    input_player1_r_btn: "nul",
    input_player1_r_mbtn: "nul",
    input_player1_r_x_minus_axis: "nul",
    input_player1_r_x_minus_btn: "nul",
    input_player1_r_x_minus_mbtn: "nul",
    input_player1_r_x_plus_axis: "nul",
    input_player1_r_x_plus_btn: "nul",
    input_player1_r_x_plus_mbtn: "nul",
    input_player1_r_y_minus_axis: "nul",
    input_player1_r_y_minus_btn: "nul",
    input_player1_r_y_minus_mbtn: "nul",
    input_player1_r_y_plus_axis: "nul",
    input_player1_r_y_plus_btn: "nul",
    input_player1_r_y_plus_mbtn: "nul",
    input_player1_right_axis: "nul",
    input_player1_right_mbtn: "nul",
    input_player1_select_axis: "nul",
    input_player1_select_btn: "nul",
    input_player1_select_mbtn: "nul",
    input_player1_start_axis: "nul",
    input_player1_start_btn: "nul",
    input_player1_start_mbtn: "nul",
    input_player1_turbo: "nul",
    input_player1_turbo_axis: "nul",
    input_player1_turbo_btn: "nul",
    input_player1_turbo_mbtn: "nul",
    input_player1_up_axis: "nul",
    input_player1_up_btn: "nul",
    input_player1_up_mbtn: "nul",
    input_player1_x_axis: "nul",
    input_player1_x_btn: "nul",
    input_player1_x_mbtn: "nul",
    input_player1_y_axis: "nul",
    input_player1_y_btn: "nul",
    input_player1_y_mbtn: "nul",
    input_poll_type_behavior: "nul",
    input_recording_toggle: "nul",
    input_recording_toggle_axis: "nul",
    input_recording_toggle_btn: "nul",
    input_recording_toggle_mbtn: "nul",
    input_reset: "nul",
    input_reset_axis: "nul",
    input_reset_btn: "nul",
    input_reset_mbtn: "nul",
    input_rewind: "nul",
    input_rewind_axis: "nul",
    input_rewind_btn: "nul",
    input_rewind_mbtn: "nul",
    input_save_state_axis: "nul",
    input_save_state_btn: "nul",
    input_save_state_mbtn: "nul",
    input_screenshot_axis: "nul",
    input_screenshot_btn: "nul",
    input_screenshot_mbtn: "nul",
    input_send_debug_info: "nul",
    input_send_debug_info_axis: "nul",
    input_send_debug_info_btn: "nul",
    input_send_debug_info_mbtn: "nul",
    input_shader_next: "nul",
    input_shader_next_axis: "nul",
    input_shader_next_btn: "nul",
    input_shader_next_mbtn: "nul",
    input_shader_prev: "nul",
    input_shader_prev_axis: "nul",
    input_shader_prev_btn: "nul",
    input_shader_prev_mbtn: "nul",
    input_state_slot_decrease: "nul",
    input_state_slot_decrease_axis: "nul",
    input_state_slot_decrease_btn: "nul",
    input_state_slot_decrease_mbtn: "nul",
    input_state_slot_increase: "nul",
    input_state_slot_increase_axis: "nul",
    input_state_slot_increase_btn: "nul",
    input_state_slot_increase_mbtn: "nul",
    input_streaming_toggle: "nul",
    input_streaming_toggle_axis: "nul",
    input_streaming_toggle_btn: "nul",
    input_streaming_toggle_mbtn: "nul",
    input_toggle_fast_forward_axis: "nul",
    input_toggle_fast_forward_btn: "nul",
    input_toggle_fast_forward_mbtn: "nul",
    input_toggle_fullscreen: "nul",
    input_toggle_fullscreen_axis: "nul",
    input_toggle_fullscreen_btn: "nul",
    input_toggle_fullscreen_mbtn: "nul",
    input_toggle_slowmotion: "nul",
    input_toggle_slowmotion_axis: "nul",
    input_toggle_slowmotion_btn: "nul",
    input_toggle_slowmotion_mbtn: "nul",
    input_turbo_default_button: "nul",
    input_turbo_mode: "nul",
    input_turbo_period: "nul",
    input_volume_down: "nul",
    input_volume_down_axis: "nul",
    input_volume_down_btn: "nul",
    input_volume_down_mbtn: "nul",
    input_volume_up: "nul",
    input_volume_up_axis: "nul",
    input_volume_up_btn: "nul",
    input_volume_up_mbtn: "nul",
};
var stringifySettings = function (settings) {
    return Object.entries(settings).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        return "".concat(acc).concat(key, " = \"").concat(value, "\"\n");
    }, "");
};


/***/ }),

/***/ "./src/retroarch-module/downloadModule.ts":
/*!************************************************!*\
  !*** ./src/retroarch-module/downloadModule.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downloadModule": () => (/* binding */ downloadModule)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cores_url = "https://cdn.statically.io/gh/dimitrikarpov/holy-retroarch@master/cores";
var downloadModule = function (moduleName) { return __awaiter(void 0, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        url = "".concat(cores_url, "/").concat(moduleName, "_libretro.js");
        return [2 /*return*/, new Promise(function (resolve, reject) {
                if (Boolean(document.querySelector("[src=\"".concat(url, "\""))))
                    return;
                try {
                    var script = document.createElement("script");
                    script.type = "application/javascript";
                    script.src = url;
                    script.addEventListener("load", resolve);
                    script.addEventListener("error", reject);
                    document.body.appendChild(script);
                }
                catch (error) {
                    reject(error);
                }
            })];
    });
}); };


/***/ }),

/***/ "./src/retroarch-module/moduleLogger.ts":
/*!**********************************************!*\
  !*** ./src/retroarch-module/moduleLogger.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moduleLogger": () => (/* binding */ moduleLogger)
/* harmony export */ });
/* harmony import */ var _RetroarchService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RetroarchService */ "./src/retroarch-module/RetroarchService.ts");

var isEmulatorStarted = function (message) {
    var isStarted = false;
    if (message.includes("VSync => ON")) {
        isStarted = true;
        _RetroarchService__WEBPACK_IMPORTED_MODULE_0__.RetroarchService.onEmulatorStarted();
    }
};
var log = function (message) {
    // hide assets warning
    if (message.includes("Asset missing"))
        return;
    // check is emulator started
    isEmulatorStarted(message);
    console.warn(message);
};
var moduleLogger = function () {
    return {
        print: log,
        printErr: log,
    };
};


/***/ }),

/***/ "./src/utils/Deferred.ts":
/*!*******************************!*\
  !*** ./src/utils/Deferred.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deferred": () => (/* binding */ Deferred)
/* harmony export */ });
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.reject = reject;
            _this.resolve = resolve;
        });
    }
    return Deferred;
}());



/***/ }),

/***/ "./src/utils/convertFileToUnit8Array.ts":
/*!**********************************************!*\
  !*** ./src/utils/convertFileToUnit8Array.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertFileToUint8Array": () => (/* binding */ convertFileToUint8Array)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var convertFileToUint8Array = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var buff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file.arrayBuffer()];
            case 1:
                buff = _a.sent();
                return [2 /*return*/, new Uint8Array(buff)];
        }
    });
}); };


/***/ }),

/***/ "./src/utils/copyFile.ts":
/*!*******************************!*\
  !*** ./src/utils/copyFile.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DIRS": () => (/* binding */ DIRS),
/* harmony export */   "copyFile": () => (/* binding */ copyFile)
/* harmony export */ });
var DIRS = {
    ROOT: "/",
    USERDATA: "home/web_user/retroarch/userdata",
    STATES: "home/web_user/retroarch/userdata/states",
};
var copyFile = function (file, path, filename) {
    if (window.FS.analyzePath(path).exists === false) {
        window.FS.createPath("/", path, true, true);
    }
    window.FS.writeFile("".concat(path, "/").concat(filename), file);
};


/***/ }),

/***/ "./src/utils/waitMs.ts":
/*!*****************************!*\
  !*** ./src/utils/waitMs.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitMs": () => (/* binding */ waitMs)
/* harmony export */ });
var waitMs = function (ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetroarchService": () => (/* reexport safe */ _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_1__.RetroarchService),
/* harmony export */   "convertFileToUint8Array": () => (/* reexport safe */ _utils_convertFileToUnit8Array__WEBPACK_IMPORTED_MODULE_2__.convertFileToUint8Array),
/* harmony export */   "createRetroarch": () => (/* reexport safe */ _createRetroarch__WEBPACK_IMPORTED_MODULE_3__.createRetroarch)
/* harmony export */ });
/* harmony import */ var _RetroarchComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RetroarchComponent */ "./src/RetroarchComponent.ts");
/* harmony import */ var _retroarch_module_RetroarchService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retroarch-module/RetroarchService */ "./src/retroarch-module/RetroarchService.ts");
/* harmony import */ var _utils_convertFileToUnit8Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/convertFileToUnit8Array */ "./src/utils/convertFileToUnit8Array.ts");
/* harmony import */ var _createRetroarch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createRetroarch */ "./src/createRetroarch.ts");

if (!customElements.get("holy-retroarch")) {
    customElements.define("holy-retroarch", _RetroarchComponent__WEBPACK_IMPORTED_MODULE_0__.RetroarchComponent);
}




})();

var __webpack_exports__RetroarchService = __webpack_exports__.RetroarchService;
var __webpack_exports__convertFileToUint8Array = __webpack_exports__.convertFileToUint8Array;
var __webpack_exports__createRetroarch = __webpack_exports__.createRetroarch;
export { __webpack_exports__RetroarchService as RetroarchService, __webpack_exports__convertFileToUint8Array as convertFileToUint8Array, __webpack_exports__createRetroarch as createRetroarch };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UmV0cm9hcmNoQ29tcG9uZW50LnRzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL2NyZWF0ZVJldHJvYXJjaC50cyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC8uL3NyYy9yZXRyb2FyY2gtbW9kdWxlL1JldHJvYXJjaFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvcmV0cm9hcmNoLW1vZHVsZS9jb25maWd1cmVNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvcmV0cm9hcmNoLW1vZHVsZS9kZWZhdWx0Q29uZmlnLnRzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL3JldHJvYXJjaC1tb2R1bGUvZG93bmxvYWRNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvcmV0cm9hcmNoLW1vZHVsZS9tb2R1bGVMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvdXRpbHMvRGVmZXJyZWQudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvdXRpbHMvY29udmVydEZpbGVUb1VuaXQ4QXJyYXkudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvdXRpbHMvY29weUZpbGUudHMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvdXRpbHMvd2FpdE1zLnRzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFJldHJvYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9yZXRyb2FyY2gtbW9kdWxlL1JldHJvYXJjaFNlcnZpY2VcIjtcbnZhciB0ZW1wbGF0ZVN0cmluZyA9IFwiPGNhbnZhcyBpZD1cXFwiY2FudmFzXFxcIj48L2NhbnZhcz5cIjtcbnZhciBSZXRyb2FyY2hDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJldHJvYXJjaENvbXBvbmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXRyb2FyY2hDb21wb25lbnQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJldHJvYXJjaFNlcnZpY2UgPSBSZXRyb2FyY2hTZXJ2aWNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJldHJvYXJjaENvbXBvbmVudC5wcm90b3R5cGUuY29ubmVjdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gdGVtcGxhdGVTdHJpbmc7XG4gICAgICAgIHRoaXMuJGNhbnZhcyA9IHRoaXMucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jb3JlID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJjb3JlXCIpO1xuICAgICAgICBSZXRyb2FyY2hTZXJ2aWNlLnByZXBhcmUodGhpcy4kY2FudmFzLCB0aGlzLmNvcmUpO1xuICAgIH07XG4gICAgUmV0cm9hcmNoQ29tcG9uZW50LnByb3RvdHlwZS5kaXNjb25uZWN0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICByZXR1cm4gUmV0cm9hcmNoQ29tcG9uZW50O1xufShIVE1MRWxlbWVudCkpO1xuZXhwb3J0IHsgUmV0cm9hcmNoQ29tcG9uZW50IH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgUmV0cm9hcmNoU2VydmljZSB9IGZyb20gXCIuL3JldHJvYXJjaC1tb2R1bGUvUmV0cm9hcmNoU2VydmljZVwiO1xuaW1wb3J0IHsgd2FpdE1zIH0gZnJvbSBcIi4vdXRpbHMvd2FpdE1zXCI7XG52YXIgdGVtcGxhdGVTdHJpbmcgPSBcIjxjYW52YXMgaWQ9XFxcImNhbnZhc1xcXCI+PC9jYW52YXM+XCI7XG52YXIgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIHZhciBwYXJlbnRDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYXJlbnRDb250YWluZXIpO1xuICAgIH1cbiAgICBwYXJlbnRDb250YWluZXIuaW5uZXJIVE1MID0gdGVtcGxhdGVTdHJpbmc7XG4gICAgdmFyIGNhbnZhcyA9IHBhcmVudENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICAgIHJldHVybiBjYW52YXM7XG59O1xuZXhwb3J0IHZhciBjcmVhdGVSZXRyb2FyY2ggPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgY29udGFpbmVyID0gX2EuY29udGFpbmVyLCByb20gPSBfYS5yb20sIHNhdmUgPSBfYS5zYXZlLCBvblN0YXJ0ZWQgPSBfYS5vblN0YXJ0ZWQsIGNvcmUgPSBfYS5jb3JlO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FudmFzO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAob25TdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXRyb2FyY2hTZXJ2aWNlLm9uRW11bGF0b3JTdGFydGVkID0gb25TdGFydGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhjb250YWluZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBSZXRyb2FyY2hTZXJ2aWNlLnByZXBhcmUoY2FudmFzLCBjb3JlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJvbSAmJiBzYXZlKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgIFJldHJvYXJjaFNlcnZpY2UudXBsb2FkUm9tKHJvbSk7XG4gICAgICAgICAgICAgICAgICAgIFJldHJvYXJjaFNlcnZpY2UudXBsb2FkU2F2ZShzYXZlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgd2FpdE1zKDI1MCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBSZXRyb2FyY2hTZXJ2aWNlLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyb20pIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgICAgICBSZXRyb2FyY2hTZXJ2aWNlLnVwbG9hZFJvbShyb20pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB3YWl0TXMoMjUwKV07XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIFJldHJvYXJjaFNlcnZpY2Uuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFJldHJvYXJjaFNlcnZpY2VdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSAtIGlzIGpzIHBhcnQgb2YgaW5zdGFuY2Ugb2YgbGlicmV0cm8gY29yZSArIHJldHJvYXJjaCBmcm9udGVuZFxuICogTW9kdWxlIGlzIGF2YWlhYmxlIGFzIGdsb2JhbCB2YXJpYWJsZSBgTW9kdWxlYCBhbHNvIGl0IGV4cG9zZSBgRlNgIGFuZCBgUkFgIG9iamVjdHNcbiAqIE1vZHVsZSBjb250YWlucyBqcyBnbHVlIGZvciBjb21waWxlZCB3YXNtIGZpbGUgYW5kIHNvbWUgZXhwb3J0ZWQgZnVuY3Rpb25zIGZyb20gcmV0cm9hcmNoIGl0c2VsZlxuICogRlMgdXNlZCBmb3IgYWNjZXNzaW5nIGZpbGVzeXN0ZW0gb2Ygd2FzbSBtb2R1bGUsIHdlIHdpbGwgdXNlIGl0IHRvIHVwbG9hZCByb20gYW5kIHJldHJvYXJjaCBhc3NldHMgKHNvIGNhbGxlZCBidW5kbGUpXG4gKiBSQSB3aWxsIGJlIHVzZWQgZm9yIGFjY2Vzc2luZyB0byBhdWRpb1xuICpcbiAqXG4gKiBIb3cgdGhlIG1vZHVsZSBnb2luZyB0byBiZSBjcmVhdGVkOlxuICogLSBmaXJzdCBvZiBhbGwgd2UgbmVlZCB0byBjcmVhdGUgZ2xvYmFsIG9iamVjdCBgTW9kdWxlYCB3aXRoIHNvbWUgY29uZmlndXJhdGlvblxuICogICBhbmQgaW5pdGlhbGl6YXRpb24gaG9va3NcbiAqIC0gbmV4dCB3ZSBkb3dubG9hZCBjb21waWxlZCBqcyBzY3JpcHQgb2YgbmVlZGVkIGNvcmUgYW5kIHdhc20gZmlsZS4ganMgc2NyaXB0XG4gKiAgIGNoZWNrcyBpZiB3aGVyZSBNb2R1bGUgaW5zdGFuY2UgaW4gZ2xvYmFsIHNjb3BlIGFuZCBob29rcyB1cCBvdXIgY29uZmlnIGFuZCBleHRlbmRzIGl0LlxuICogICBhZnRlciB0aGF0IGZ1bGwgTW9kdWxlIG9iamVjdCBnb2luZyB0byBiZSBhdmFpbGFibGUgYW5kIGdsb2JhbCBGUyBvYmplY3QgdG9vLlxuICogLSBuZXh0IHdlIGhhdmUgdG8gY29weSBvdXIgcm9tIGZpbGUgYW5kIHJldHJvYXJjaCBjb25maWcgZmlsZSB0byBvdXIgcmV0cm9hcmNoIGZpbGVzeXN0ZW0uXG4gKiAgIHJldHJvYXJjaCB3aWxsIHN0YXJ0IGl0IGJ5IGNhbGxpbmcgYG9uUnVudGltZUluaXRpYWxpemVkYCBob29rIG9yIHdlIGNhbiBjb3B5IGRpcmVjdGx5IHRvIHdhc20gZmlsZXN5c3RlbVxuICogLSBhbmQgd2UgcmVhZHkgdG8gc3RhcnQgdGhlIE1vZHVsZSFcbiAqL1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBkb3dubG9hZE1vZHVsZSB9IGZyb20gXCIuL2Rvd25sb2FkTW9kdWxlXCI7XG5pbXBvcnQgeyBjb25maWd1cmVNb2R1bGUgfSBmcm9tIFwiLi9jb25maWd1cmVNb2R1bGVcIjtcbmltcG9ydCB7IGNvcHlGaWxlLCBESVJTIH0gZnJvbSBcIi4uL3V0aWxzL2NvcHlGaWxlXCI7XG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gXCIuLi91dGlscy9EZWZlcnJlZFwiO1xuaW1wb3J0IHsgZGVmYXVsdEtleWJpbmRzLCBleHRyYUNvbmZpZywgbnVsS2V5cywgc3RyaW5naWZ5U2V0dGluZ3MsIH0gZnJvbSBcIi4vZGVmYXVsdENvbmZpZ1wiO1xudmFyIGRlZmVycmVkT25SdW50aW1lSW5pdGlhbGl6ZWQgPSBuZXcgRGVmZXJyZWQoKTtcbnZhciBvblJ1bnRpbWVJbml0aWFsaXplZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlZmVycmVkT25SdW50aW1lSW5pdGlhbGl6ZWQucmVzb2x2ZShcIlwiKTsgfTtcbmV4cG9ydCB2YXIgUmV0cm9hcmNoU2VydmljZSA9IHtcbiAgICBwcmVwYXJlOiBmdW5jdGlvbiAoY2FudmFzLCBjb3JlKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmVNb2R1bGUoY2FudmFzLCBvblJ1bnRpbWVJbml0aWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRvd25sb2FkTW9kdWxlKGNvcmUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZGVmZXJyZWRPblJ1bnRpbWVJbml0aWFsaXplZC5wcm9taXNlXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29weUZpbGUoc3RyaW5naWZ5U2V0dGluZ3MoX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRLZXliaW5kcyksIGV4dHJhQ29uZmlnKSwgbnVsS2V5cykpLCBESVJTLlVTRVJEQVRBLCBcInJldHJvYXJjaC5jZmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7IH0sXG4gICAgdXBsb2FkU2F2ZTogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIGNvcHlGaWxlKHN0YXRlLCBESVJTLlNUQVRFUywgXCJyb20uc3RhdGVcIik7XG4gICAgfSxcbiAgICB1cGxvYWRSb206IGZ1bmN0aW9uIChyb20pIHtcbiAgICAgICAgY29weUZpbGUocm9tLCBESVJTLlJPT1QsIFwicm9tLmJpblwiKTtcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5Nb2R1bGUuY2FsbE1haW4od2luZG93Lk1vZHVsZS5hcmd1bWVudHMpO1xuICAgICAgICB3aW5kb3cuTW9kdWxlW1wicmVzdW1lTWFpbkxvb3BcIl0oKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuZm9jdXMoKTtcbiAgICB9LFxuICAgIGxvYWRTYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5Nb2R1bGUuX2NtZF9sb2FkX3N0YXRlKCk7XG4gICAgfSxcbiAgICBvbkVtdWxhdG9yU3RhcnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltSZXRyb2FyY2ggU2VydmljZV06IGVtdWxhdG9yIHN0YXJ0ZWRcIik7XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBtb2R1bGVMb2dnZXIgfSBmcm9tIFwiLi9tb2R1bGVMb2dnZXJcIjtcbnZhciBfYSA9IG1vZHVsZUxvZ2dlcigpLCBwcmludCA9IF9hLnByaW50LCBwcmludEVyciA9IF9hLnByaW50RXJyO1xuZXhwb3J0IHZhciBjb25maWd1cmVNb2R1bGUgPSBmdW5jdGlvbiAoY2FudmFzLCBvblJ1bnRpbWVJbml0aWFsaXplZCkge1xuICAgIHdpbmRvdy5Nb2R1bGUgPSB7XG4gICAgICAgIGNhbnZhczogY2FudmFzLFxuICAgICAgICBub0luaXRpYWxSdW46IHRydWUsXG4gICAgICAgIGFyZ3VtZW50czogW1wiL3JvbS5iaW5cIiwgXCItLXZlcmJvc2VcIl0sXG4gICAgICAgIG9uUnVudGltZUluaXRpYWxpemVkOiBvblJ1bnRpbWVJbml0aWFsaXplZCxcbiAgICAgICAgcHJpbnQ6IHByaW50LFxuICAgICAgICBwcmludEVycjogcHJpbnRFcnIsXG4gICAgICAgIHByZVJ1bjogW10sXG4gICAgICAgIHBvc3RSdW46IFtdLFxuICAgIH07XG59O1xuIiwiZXhwb3J0IHZhciBleHRyYUNvbmZpZyA9IHsgcmd1aV9zaG93X3N0YXJ0X3NjcmVlbjogXCJmYWxzZVwiIH07XG5leHBvcnQgdmFyIGRlZmF1bHRLZXliaW5kcyA9IHtcbiAgICBpbnB1dF9wbGF5ZXIxX3N0YXJ0OiBcImVudGVyXCIsXG4gICAgaW5wdXRfcGxheWVyMV9zZWxlY3Q6IFwic3BhY2VcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2w6IFwiZVwiLFxuICAgIGlucHV0X3BsYXllcjFfbDI6IFwiclwiLFxuICAgIGlucHV0X3BsYXllcjFfcjogXCJwXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yMjogXCJvXCIsXG4gICAgaW5wdXRfcGxheWVyMV9hOiBcImhcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2I6IFwiZ1wiLFxuICAgIGlucHV0X3BsYXllcjFfeDogXCJ5XCIsXG4gICAgaW5wdXRfcGxheWVyMV95OiBcInRcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3VwOiBcInVwXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sZWZ0OiBcImxlZnRcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2Rvd246IFwiZG93blwiLFxuICAgIGlucHV0X3BsYXllcjFfcmlnaHQ6IFwicmlnaHRcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeF9taW51czogXCJhXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3hfcGx1czogXCJkXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3lfbWludXM6IFwid1wiLFxuICAgIGlucHV0X3BsYXllcjFfbF95X3BsdXM6IFwic1wiLFxuICAgIGlucHV0X3BsYXllcjFfbDNfYnRuOiBcInhcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3JfeF9taW51czogXCJqXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3hfcGx1czogXCJsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3lfbWludXM6IFwiaVwiLFxuICAgIGlucHV0X3BsYXllcjFfcl95X3BsdXM6IFwia1wiLFxuICAgIGlucHV0X3BsYXllcjFfcjNfYnRuOiBcImNvbW1hXCIsXG4gICAgaW5wdXRfbWVudV90b2dnbGU6IFwiZjFcIixcbiAgICBpbnB1dF9zYXZlX3N0YXRlOiBcImYyXCIsXG4gICAgaW5wdXRfbG9hZF9zdGF0ZTogXCJmM1wiLFxuICAgIGlucHV0X3NjcmVlbnNob3Q6IFwiZjRcIixcbiAgICBpbnB1dF9ob2xkX2Zhc3RfZm9yd2FyZDogXCJudWxcIixcbiAgICBpbnB1dF90b2dnbGVfZmFzdF9mb3J3YXJkOiBcIm51bFwiLFxufTtcbmV4cG9ydCB2YXIgbnVsS2V5cyA9IHtcbiAgICBpbnB1dF9haV9zZXJ2aWNlOiBcIm51bFwiLFxuICAgIGlucHV0X2FpX3NlcnZpY2VfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9haV9zZXJ2aWNlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9haV9zZXJ2aWNlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfYXVkaW9fbXV0ZTogXCJudWxcIixcbiAgICBpbnB1dF9hdWRpb19tdXRlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfYXVkaW9fbXV0ZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfYXVkaW9fbXV0ZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2NoZWF0X2luZGV4X21pbnVzOiBcIm51bFwiLFxuICAgIGlucHV0X2NoZWF0X2luZGV4X21pbnVzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfY2hlYXRfaW5kZXhfbWludXNfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2NoZWF0X2luZGV4X21pbnVzX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfY2hlYXRfaW5kZXhfcGx1czogXCJudWxcIixcbiAgICBpbnB1dF9jaGVhdF9pbmRleF9wbHVzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfY2hlYXRfaW5kZXhfcGx1c19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfY2hlYXRfaW5kZXhfcGx1c19tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2NoZWF0X3RvZ2dsZTogXCJudWxcIixcbiAgICBpbnB1dF9jaGVhdF90b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9jaGVhdF90b2dnbGVfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2NoZWF0X3RvZ2dsZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rlc2t0b3BfbWVudV90b2dnbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfZGVza3RvcF9tZW51X3RvZ2dsZV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X2Rlc2t0b3BfbWVudV90b2dnbGVfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rlc2t0b3BfbWVudV90b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX2VqZWN0X3RvZ2dsZTogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX2VqZWN0X3RvZ2dsZV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X2Rpc2tfZWplY3RfdG9nZ2xlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX2VqZWN0X3RvZ2dsZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rpc2tfbmV4dDogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX25leHRfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX25leHRfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rpc2tfbmV4dF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rpc2tfcHJldjogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX3ByZXZfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9kaXNrX3ByZXZfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2Rpc2tfcHJldl9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2R1dHlfY3ljbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfZW5hYmxlX2hvdGtleTogXCJudWxcIixcbiAgICBpbnB1dF9lbmFibGVfaG90a2V5X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfZW5hYmxlX2hvdGtleV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfZW5hYmxlX2hvdGtleV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2V4aXRfZW11bGF0b3I6IFwibnVsXCIsXG4gICAgaW5wdXRfZXhpdF9lbXVsYXRvcl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X2V4aXRfZW11bGF0b3JfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2V4aXRfZW11bGF0b3JfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9mcHNfdG9nZ2xlOiBcIm51bFwiLFxuICAgIGlucHV0X2Zwc190b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9mcHNfdG9nZ2xlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9mcHNfdG9nZ2xlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfZnJhbWVfYWR2YW5jZTogXCJudWxcIixcbiAgICBpbnB1dF9mcmFtZV9hZHZhbmNlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfZnJhbWVfYWR2YW5jZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfZnJhbWVfYWR2YW5jZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2dhbWVfZm9jdXNfdG9nZ2xlOiBcIm51bFwiLFxuICAgIGlucHV0X2dhbWVfZm9jdXNfdG9nZ2xlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfZ2FtZV9mb2N1c190b2dnbGVfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2dhbWVfZm9jdXNfdG9nZ2xlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfZ3JhYl9tb3VzZV90b2dnbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfZ3JhYl9tb3VzZV90b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9ncmFiX21vdXNlX3RvZ2dsZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfZ3JhYl9tb3VzZV90b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9ob2xkX2Zhc3RfZm9yd2FyZF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X2hvbGRfZmFzdF9mb3J3YXJkX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9ob2xkX2Zhc3RfZm9yd2FyZF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X2hvbGRfc2xvd21vdGlvbjogXCJudWxcIixcbiAgICBpbnB1dF9zbG93bW90aW9uOiBcIm51bFwiLFxuICAgIGlucHV0X2hvbGRfc2xvd21vdGlvbl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X2hvbGRfc2xvd21vdGlvbl9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfaG9sZF9zbG93bW90aW9uX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfaG90a2V5X2Jsb2NrX2RlbGF5OiBcIm51bFwiLFxuICAgIGlucHV0X2xvYWRfc3RhdGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9sb2FkX3N0YXRlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9sb2FkX3N0YXRlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbWVudV90b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9tZW51X3RvZ2dsZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbWVudV90b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9tb3ZpZV9yZWNvcmRfdG9nZ2xlOiBcIm51bFwiLFxuICAgIGlucHV0X21vdmllX3JlY29yZF90b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9tb3ZpZV9yZWNvcmRfdG9nZ2xlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9tb3ZpZV9yZWNvcmRfdG9nZ2xlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbmV0cGxheV9nYW1lX3dhdGNoOiBcIm51bFwiLFxuICAgIGlucHV0X25ldHBsYXlfZ2FtZV93YXRjaF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X25ldHBsYXlfZ2FtZV93YXRjaF9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbmV0cGxheV9nYW1lX3dhdGNoX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbmV0cGxheV9ob3N0X3RvZ2dsZTogXCJudWxcIixcbiAgICBpbnB1dF9uZXRwbGF5X2hvc3RfdG9nZ2xlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfbmV0cGxheV9ob3N0X3RvZ2dsZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfbmV0cGxheV9ob3N0X3RvZ2dsZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X29za190b2dnbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfb3NrX3RvZ2dsZV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X29za190b2dnbGVfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X29za190b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9vdmVybGF5X25leHQ6IFwibnVsXCIsXG4gICAgaW5wdXRfb3ZlcmxheV9uZXh0X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfb3ZlcmxheV9uZXh0X2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9vdmVybGF5X25leHRfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wYXVzZV90b2dnbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfcGF1c2VfdG9nZ2xlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGF1c2VfdG9nZ2xlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wYXVzZV90b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2FfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2FfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfYV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfYl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfYl9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9iX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9kb3duX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9kb3duX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2Rvd25fbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYTogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9hX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9iOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9iX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2JfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9iX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2M6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2NfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfY19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2NfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2Rvd246IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9kb3duX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9kb3duX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2Rvd25fbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2xlZnQ6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9sZWZ0X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9sZWZ0X2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2xlZnRfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX3JpZ2h0OiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfcmlnaHRfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX3JpZ2h0X2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX3JpZ2h0X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF91cDogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX3VwX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF91cF9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF91cF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX29mZnNjcmVlbl9zaG90OiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX29mZnNjcmVlbl9zaG90X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fb2Zmc2NyZWVuX3Nob3RfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX29mZnNjcmVlbl9zaG90X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fc2VsZWN0OiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX3NlbGVjdF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX3NlbGVjdF9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fc2VsZWN0X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnQ6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnRfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl9zdGFydF9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnRfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl90cmlnZ2VyOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfZ3VuX3RyaWdnZXJfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl90cmlnZ2VyX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2d1bl90cmlnZ2VyX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sMl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbDJfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbDJfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2wzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbDNfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2wzX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeF9taW51c19heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbF94X21pbnVzX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeF9taW51c19tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbF94X3BsdXNfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeF9wbHVzX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeF9wbHVzX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3lfbWludXNfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeV9taW51c19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3lfbWludXNfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX2xfeV9wbHVzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3lfcGx1c19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9sX3lfcGx1c19tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbGVmdF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfbGVmdF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcjJfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3IyX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3IyX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yMzogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3IzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yM19tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3hfbWludXNfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3JfeF9taW51c19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3hfbWludXNfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3JfeF9wbHVzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3hfcGx1c19idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3hfcGx1c19tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl95X21pbnVzX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3lfbWludXNfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl95X21pbnVzX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yX3lfcGx1c19heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl95X3BsdXNfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfcl95X3BsdXNfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3JpZ2h0X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9yaWdodF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfc2VsZWN0X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9zZWxlY3RfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfc2VsZWN0X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV9zdGFydF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfc3RhcnRfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfc3RhcnRfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3R1cmJvOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfdHVyYm9fYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3R1cmJvX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3R1cmJvX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV91cF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfdXBfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfdXBfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3hfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9wbGF5ZXIxX3hfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfeF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfeV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3BsYXllcjFfeV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcGxheWVyMV95X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfcG9sbF90eXBlX2JlaGF2aW9yOiBcIm51bFwiLFxuICAgIGlucHV0X3JlY29yZGluZ190b2dnbGU6IFwibnVsXCIsXG4gICAgaW5wdXRfcmVjb3JkaW5nX3RvZ2dsZV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3JlY29yZGluZ190b2dnbGVfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3JlY29yZGluZ190b2dnbGVfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9yZXNldDogXCJudWxcIixcbiAgICBpbnB1dF9yZXNldF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3Jlc2V0X2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9yZXNldF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3Jld2luZDogXCJudWxcIixcbiAgICBpbnB1dF9yZXdpbmRfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9yZXdpbmRfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3Jld2luZF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3NhdmVfc3RhdGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9zYXZlX3N0YXRlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9zYXZlX3N0YXRlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfc2NyZWVuc2hvdF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3NjcmVlbnNob3RfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3NjcmVlbnNob3RfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9zZW5kX2RlYnVnX2luZm86IFwibnVsXCIsXG4gICAgaW5wdXRfc2VuZF9kZWJ1Z19pbmZvX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfc2VuZF9kZWJ1Z19pbmZvX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9zZW5kX2RlYnVnX2luZm9fbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9zaGFkZXJfbmV4dDogXCJudWxcIixcbiAgICBpbnB1dF9zaGFkZXJfbmV4dF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3NoYWRlcl9uZXh0X2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9zaGFkZXJfbmV4dF9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3NoYWRlcl9wcmV2OiBcIm51bFwiLFxuICAgIGlucHV0X3NoYWRlcl9wcmV2X2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfc2hhZGVyX3ByZXZfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3NoYWRlcl9wcmV2X21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfc3RhdGVfc2xvdF9kZWNyZWFzZTogXCJudWxcIixcbiAgICBpbnB1dF9zdGF0ZV9zbG90X2RlY3JlYXNlX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfc3RhdGVfc2xvdF9kZWNyZWFzZV9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfc3RhdGVfc2xvdF9kZWNyZWFzZV9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3N0YXRlX3Nsb3RfaW5jcmVhc2U6IFwibnVsXCIsXG4gICAgaW5wdXRfc3RhdGVfc2xvdF9pbmNyZWFzZV9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3N0YXRlX3Nsb3RfaW5jcmVhc2VfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3N0YXRlX3Nsb3RfaW5jcmVhc2VfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF9zdHJlYW1pbmdfdG9nZ2xlOiBcIm51bFwiLFxuICAgIGlucHV0X3N0cmVhbWluZ190b2dnbGVfYXhpczogXCJudWxcIixcbiAgICBpbnB1dF9zdHJlYW1pbmdfdG9nZ2xlX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF9zdHJlYW1pbmdfdG9nZ2xlX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfdG9nZ2xlX2Zhc3RfZm9yd2FyZF9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9mYXN0X2ZvcndhcmRfYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9mYXN0X2ZvcndhcmRfbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF90b2dnbGVfZnVsbHNjcmVlbjogXCJudWxcIixcbiAgICBpbnB1dF90b2dnbGVfZnVsbHNjcmVlbl9heGlzOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9mdWxsc2NyZWVuX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF90b2dnbGVfZnVsbHNjcmVlbl9tYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfdG9nZ2xlX3Nsb3dtb3Rpb25fYnRuOiBcIm51bFwiLFxuICAgIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uX21idG46IFwibnVsXCIsXG4gICAgaW5wdXRfdHVyYm9fZGVmYXVsdF9idXR0b246IFwibnVsXCIsXG4gICAgaW5wdXRfdHVyYm9fbW9kZTogXCJudWxcIixcbiAgICBpbnB1dF90dXJib19wZXJpb2Q6IFwibnVsXCIsXG4gICAgaW5wdXRfdm9sdW1lX2Rvd246IFwibnVsXCIsXG4gICAgaW5wdXRfdm9sdW1lX2Rvd25fYXhpczogXCJudWxcIixcbiAgICBpbnB1dF92b2x1bWVfZG93bl9idG46IFwibnVsXCIsXG4gICAgaW5wdXRfdm9sdW1lX2Rvd25fbWJ0bjogXCJudWxcIixcbiAgICBpbnB1dF92b2x1bWVfdXA6IFwibnVsXCIsXG4gICAgaW5wdXRfdm9sdW1lX3VwX2F4aXM6IFwibnVsXCIsXG4gICAgaW5wdXRfdm9sdW1lX3VwX2J0bjogXCJudWxcIixcbiAgICBpbnB1dF92b2x1bWVfdXBfbWJ0bjogXCJudWxcIixcbn07XG5leHBvcnQgdmFyIHN0cmluZ2lmeVNldHRpbmdzID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgX2EpIHtcbiAgICAgICAgdmFyIGtleSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoYWNjKS5jb25jYXQoa2V5LCBcIiA9IFxcXCJcIikuY29uY2F0KHZhbHVlLCBcIlxcXCJcXG5cIik7XG4gICAgfSwgXCJcIik7XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBjb3Jlc191cmwgPSBcImh0dHBzOi8vY2RuLnN0YXRpY2FsbHkuaW8vZ2gvZGltaXRyaWthcnBvdi9ob2x5LXJldHJvYXJjaEBtYXN0ZXIvY29yZXNcIjtcbmV4cG9ydCB2YXIgZG93bmxvYWRNb2R1bGUgPSBmdW5jdGlvbiAobW9kdWxlTmFtZSkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdXJsO1xuICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdXJsID0gXCJcIi5jb25jYXQoY29yZXNfdXJsLCBcIi9cIikuY29uY2F0KG1vZHVsZU5hbWUsIFwiX2xpYnJldHJvLmpzXCIpO1xuICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChCb29sZWFuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbc3JjPVxcXCJcIi5jb25jYXQodXJsLCBcIlxcXCJcIikpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQudHlwZSA9IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiO1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV07XG4gICAgfSk7XG59KTsgfTtcbiIsImltcG9ydCB7IFJldHJvYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9SZXRyb2FyY2hTZXJ2aWNlXCI7XG52YXIgaXNFbXVsYXRvclN0YXJ0ZWQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHZhciBpc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBpZiAobWVzc2FnZS5pbmNsdWRlcyhcIlZTeW5jID0+IE9OXCIpKSB7XG4gICAgICAgIGlzU3RhcnRlZCA9IHRydWU7XG4gICAgICAgIFJldHJvYXJjaFNlcnZpY2Uub25FbXVsYXRvclN0YXJ0ZWQoKTtcbiAgICB9XG59O1xudmFyIGxvZyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgLy8gaGlkZSBhc3NldHMgd2FybmluZ1xuICAgIGlmIChtZXNzYWdlLmluY2x1ZGVzKFwiQXNzZXQgbWlzc2luZ1wiKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIGNoZWNrIGlzIGVtdWxhdG9yIHN0YXJ0ZWRcbiAgICBpc0VtdWxhdG9yU3RhcnRlZChtZXNzYWdlKTtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG59O1xuZXhwb3J0IHZhciBtb2R1bGVMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJpbnQ6IGxvZyxcbiAgICAgICAgcHJpbnRFcnI6IGxvZyxcbiAgICB9O1xufTtcbiIsInZhciBEZWZlcnJlZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZlcnJlZCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgX3RoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gRGVmZXJyZWQ7XG59KCkpO1xuZXhwb3J0IHsgRGVmZXJyZWQgfTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5leHBvcnQgdmFyIGNvbnZlcnRGaWxlVG9VaW50OEFycmF5ID0gZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJ1ZmY7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGZpbGUuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgYnVmZiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFVpbnQ4QXJyYXkoYnVmZildO1xuICAgICAgICB9XG4gICAgfSk7XG59KTsgfTtcbiIsImV4cG9ydCB2YXIgRElSUyA9IHtcbiAgICBST09UOiBcIi9cIixcbiAgICBVU0VSREFUQTogXCJob21lL3dlYl91c2VyL3JldHJvYXJjaC91c2VyZGF0YVwiLFxuICAgIFNUQVRFUzogXCJob21lL3dlYl91c2VyL3JldHJvYXJjaC91c2VyZGF0YS9zdGF0ZXNcIixcbn07XG5leHBvcnQgdmFyIGNvcHlGaWxlID0gZnVuY3Rpb24gKGZpbGUsIHBhdGgsIGZpbGVuYW1lKSB7XG4gICAgaWYgKHdpbmRvdy5GUy5hbmFseXplUGF0aChwYXRoKS5leGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgIHdpbmRvdy5GUy5jcmVhdGVQYXRoKFwiL1wiLCBwYXRoLCB0cnVlLCB0cnVlKTtcbiAgICB9XG4gICAgd2luZG93LkZTLndyaXRlRmlsZShcIlwiLmNvbmNhdChwYXRoLCBcIi9cIikuY29uY2F0KGZpbGVuYW1lKSwgZmlsZSk7XG59O1xuIiwiZXhwb3J0IHZhciB3YWl0TXMgPSBmdW5jdGlvbiAobXMpIHtcbiAgICBpZiAobXMgPT09IHZvaWQgMCkgeyBtcyA9IDEwMDA7IH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XG4gICAgfSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSZXRyb2FyY2hDb21wb25lbnQgfSBmcm9tIFwiLi9SZXRyb2FyY2hDb21wb25lbnRcIjtcbmlmICghY3VzdG9tRWxlbWVudHMuZ2V0KFwiaG9seS1yZXRyb2FyY2hcIikpIHtcbiAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJob2x5LXJldHJvYXJjaFwiLCBSZXRyb2FyY2hDb21wb25lbnQpO1xufVxuZXhwb3J0IHsgUmV0cm9hcmNoU2VydmljZSB9IGZyb20gXCIuL3JldHJvYXJjaC1tb2R1bGUvUmV0cm9hcmNoU2VydmljZVwiO1xuZXhwb3J0IHsgY29udmVydEZpbGVUb1VpbnQ4QXJyYXkgfSBmcm9tIFwiLi91dGlscy9jb252ZXJ0RmlsZVRvVW5pdDhBcnJheVwiO1xuZXhwb3J0IHsgY3JlYXRlUmV0cm9hcmNoIH0gZnJvbSBcIi4vY3JlYXRlUmV0cm9hcmNoXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=