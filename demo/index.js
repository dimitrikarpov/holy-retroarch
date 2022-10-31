/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/HolyRetroNestopia.js":
/*!**********************************!*\
  !*** ./src/HolyRetroNestopia.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HolyRetroNestopia": () => (/* binding */ HolyRetroNestopia)
/* harmony export */ });
/* harmony import */ var _retroarch_module_moduleService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retroarch-module/moduleService */ "./src/retroarch-module/moduleService.js");


const templateString = `<canvas></canvas>`

class HolyRetroNestopia extends HTMLElement {
  constructor() {
    super()

    this.service = _retroarch_module_moduleService__WEBPACK_IMPORTED_MODULE_0__.ModuleService
    this.innerHTML = templateString
    this.$canvas = this.querySelector("canvas")
  }

  connectedCallback() {
    // const prop1 = this.getAttribute("prop1")
    // console.log({ prop1 })

    _retroarch_module_moduleService__WEBPACK_IMPORTED_MODULE_0__.ModuleService.prepare(this.$canvas)
  }

  disconnectedCallback() {}
}


/***/ }),

/***/ "./src/retroarch-module/configureModule.js":
/*!*************************************************!*\
  !*** ./src/retroarch-module/configureModule.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configureModule": () => (/* binding */ configureModule)
/* harmony export */ });
const configureModule = (canvas, onRuntimeInitialized) => {
  const Module = {
    canvas,
    noInitialRun: true,
    arguments: ["/rom.bin", "--verbose"],
    onRuntimeInitialized,
    print: function (text) {
      console.log("stdout: " + text)
    },
    printErr: function (text) {
      console.log("stderr: " + text)
    },
    preRun: [],
    postRun: [],
  }

  window.Module = Module
}


/***/ }),

/***/ "./src/retroarch-module/copyConfig.js":
/*!********************************************!*\
  !*** ./src/retroarch-module/copyConfig.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyConfig": () => (/* binding */ copyConfig)
/* harmony export */ });
/* harmony import */ var _defaultConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultConfig */ "./src/retroarch-module/defaultConfig.js");


const copyConfig = () => {
  window.FS.createPath("/", "home/web_user/retroarch/userdata", true, true)
  window.FS.writeFile(
    "/home/web_user/retroarch/userdata/retroarch.cfg",
    (0,_defaultConfig__WEBPACK_IMPORTED_MODULE_0__.stringifySettings)({ ..._defaultConfig__WEBPACK_IMPORTED_MODULE_0__.defaultKeybinds, ..._defaultConfig__WEBPACK_IMPORTED_MODULE_0__.extraConfig, ..._defaultConfig__WEBPACK_IMPORTED_MODULE_0__.nulKeys }),
  )
}


/***/ }),

/***/ "./src/retroarch-module/copyRom.js":
/*!*****************************************!*\
  !*** ./src/retroarch-module/copyRom.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyRom": () => (/* binding */ copyRom)
/* harmony export */ });
const copyRom = (rom) => {
  window.FS.writeFile("/rom.bin", rom)
}


/***/ }),

/***/ "./src/retroarch-module/defaultConfig.js":
/*!***********************************************!*\
  !*** ./src/retroarch-module/defaultConfig.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultKeybinds": () => (/* binding */ defaultKeybinds),
/* harmony export */   "extraConfig": () => (/* binding */ extraConfig),
/* harmony export */   "nulKeys": () => (/* binding */ nulKeys),
/* harmony export */   "stringifySettings": () => (/* binding */ stringifySettings)
/* harmony export */ });
const extraConfig = { rgui_show_start_screen: 'false' }

const defaultKeybinds = {
  input_player1_start: 'enter',
  input_player1_select: 'space',
  input_player1_l: 'e',
  input_player1_l2: 'r',
  input_player1_r: 'p',
  input_player1_r2: 'o',
  input_player1_a: 'h',
  input_player1_b: 'g',
  input_player1_x: 'y',
  input_player1_y: 't',
  input_player1_up: 'up',
  input_player1_left: 'left',
  input_player1_down: 'down',
  input_player1_right: 'right',
  input_player1_l_x_minus: 'a',
  input_player1_l_x_plus: 'd',
  input_player1_l_y_minus: 'w',
  input_player1_l_y_plus: 's',
  input_player1_l3_btn: 'x',
  input_player1_r_x_minus: 'j',
  input_player1_r_x_plus: 'l',
  input_player1_r_y_minus: 'i',
  input_player1_r_y_plus: 'k',
  input_player1_r3_btn: 'comma',
  input_menu_toggle: 'f1',
  input_save_state: 'f2',
  input_load_state: 'f3',
  input_screenshot: 'f4',
  input_hold_fast_forward: 'nul',
  input_toggle_fast_forward: 'nul',
}

const nulKeys = {
  input_ai_service: 'nul',
  input_ai_service_axis: 'nul',
  input_ai_service_btn: 'nul',
  input_ai_service_mbtn: 'nul',
  input_audio_mute: 'nul',
  input_audio_mute_axis: 'nul',
  input_audio_mute_btn: 'nul',
  input_audio_mute_mbtn: 'nul',
  input_cheat_index_minus: 'nul',
  input_cheat_index_minus_axis: 'nul',
  input_cheat_index_minus_btn: 'nul',
  input_cheat_index_minus_mbtn: 'nul',
  input_cheat_index_plus: 'nul',
  input_cheat_index_plus_axis: 'nul',
  input_cheat_index_plus_btn: 'nul',
  input_cheat_index_plus_mbtn: 'nul',
  input_cheat_toggle: 'nul',
  input_cheat_toggle_axis: 'nul',
  input_cheat_toggle_btn: 'nul',
  input_cheat_toggle_mbtn: 'nul',
  input_desktop_menu_toggle: 'nul',
  input_desktop_menu_toggle_axis: 'nul',
  input_desktop_menu_toggle_btn: 'nul',
  input_desktop_menu_toggle_mbtn: 'nul',
  input_disk_eject_toggle: 'nul',
  input_disk_eject_toggle_axis: 'nul',
  input_disk_eject_toggle_btn: 'nul',
  input_disk_eject_toggle_mbtn: 'nul',
  input_disk_next: 'nul',
  input_disk_next_axis: 'nul',
  input_disk_next_btn: 'nul',
  input_disk_next_mbtn: 'nul',
  input_disk_prev: 'nul',
  input_disk_prev_axis: 'nul',
  input_disk_prev_btn: 'nul',
  input_disk_prev_mbtn: 'nul',
  input_duty_cycle: 'nul',
  input_enable_hotkey: 'nul',
  input_enable_hotkey_axis: 'nul',
  input_enable_hotkey_btn: 'nul',
  input_enable_hotkey_mbtn: 'nul',
  input_exit_emulator: 'nul',
  input_exit_emulator_axis: 'nul',
  input_exit_emulator_btn: 'nul',
  input_exit_emulator_mbtn: 'nul',
  input_fps_toggle: 'nul',
  input_fps_toggle_axis: 'nul',
  input_fps_toggle_btn: 'nul',
  input_fps_toggle_mbtn: 'nul',
  input_frame_advance: 'nul',
  input_frame_advance_axis: 'nul',
  input_frame_advance_btn: 'nul',
  input_frame_advance_mbtn: 'nul',
  input_game_focus_toggle: 'nul',
  input_game_focus_toggle_axis: 'nul',
  input_game_focus_toggle_btn: 'nul',
  input_game_focus_toggle_mbtn: 'nul',
  input_grab_mouse_toggle: 'nul',
  input_grab_mouse_toggle_axis: 'nul',
  input_grab_mouse_toggle_btn: 'nul',
  input_grab_mouse_toggle_mbtn: 'nul',
  input_hold_fast_forward_axis: 'nul',
  input_hold_fast_forward_btn: 'nul',
  input_hold_fast_forward_mbtn: 'nul',
  input_hold_slowmotion: 'nul',
  input_slowmotion: 'nul',
  input_hold_slowmotion_axis: 'nul',
  input_hold_slowmotion_btn: 'nul',
  input_hold_slowmotion_mbtn: 'nul',
  input_hotkey_block_delay: 'nul',
  input_load_state_axis: 'nul',
  input_load_state_btn: 'nul',
  input_load_state_mbtn: 'nul',
  input_menu_toggle_axis: 'nul',
  input_menu_toggle_btn: 'nul',
  input_menu_toggle_mbtn: 'nul',
  input_movie_record_toggle: 'nul',
  input_movie_record_toggle_axis: 'nul',
  input_movie_record_toggle_btn: 'nul',
  input_movie_record_toggle_mbtn: 'nul',
  input_netplay_game_watch: 'nul',
  input_netplay_game_watch_axis: 'nul',
  input_netplay_game_watch_btn: 'nul',
  input_netplay_game_watch_mbtn: 'nul',
  input_netplay_host_toggle: 'nul',
  input_netplay_host_toggle_axis: 'nul',
  input_netplay_host_toggle_btn: 'nul',
  input_netplay_host_toggle_mbtn: 'nul',
  input_osk_toggle: 'nul',
  input_osk_toggle_axis: 'nul',
  input_osk_toggle_btn: 'nul',
  input_osk_toggle_mbtn: 'nul',
  input_overlay_next: 'nul',
  input_overlay_next_axis: 'nul',
  input_overlay_next_btn: 'nul',
  input_overlay_next_mbtn: 'nul',
  input_pause_toggle: 'nul',
  input_pause_toggle_axis: 'nul',
  input_pause_toggle_btn: 'nul',
  input_pause_toggle_mbtn: 'nul',
  input_player1_a_axis: 'nul',
  input_player1_a_btn: 'nul',
  input_player1_a_mbtn: 'nul',
  input_player1_b_axis: 'nul',
  input_player1_b_btn: 'nul',
  input_player1_b_mbtn: 'nul',
  input_player1_down_axis: 'nul',
  input_player1_down_btn: 'nul',
  input_player1_down_mbtn: 'nul',
  input_player1_gun_aux_a: 'nul',
  input_player1_gun_aux_a_axis: 'nul',
  input_player1_gun_aux_a_btn: 'nul',
  input_player1_gun_aux_a_mbtn: 'nul',
  input_player1_gun_aux_b: 'nul',
  input_player1_gun_aux_b_axis: 'nul',
  input_player1_gun_aux_b_btn: 'nul',
  input_player1_gun_aux_b_mbtn: 'nul',
  input_player1_gun_aux_c: 'nul',
  input_player1_gun_aux_c_axis: 'nul',
  input_player1_gun_aux_c_btn: 'nul',
  input_player1_gun_aux_c_mbtn: 'nul',
  input_player1_gun_dpad_down: 'nul',
  input_player1_gun_dpad_down_axis: 'nul',
  input_player1_gun_dpad_down_btn: 'nul',
  input_player1_gun_dpad_down_mbtn: 'nul',
  input_player1_gun_dpad_left: 'nul',
  input_player1_gun_dpad_left_axis: 'nul',
  input_player1_gun_dpad_left_btn: 'nul',
  input_player1_gun_dpad_left_mbtn: 'nul',
  input_player1_gun_dpad_right: 'nul',
  input_player1_gun_dpad_right_axis: 'nul',
  input_player1_gun_dpad_right_btn: 'nul',
  input_player1_gun_dpad_right_mbtn: 'nul',
  input_player1_gun_dpad_up: 'nul',
  input_player1_gun_dpad_up_axis: 'nul',
  input_player1_gun_dpad_up_btn: 'nul',
  input_player1_gun_dpad_up_mbtn: 'nul',
  input_player1_gun_offscreen_shot: 'nul',
  input_player1_gun_offscreen_shot_axis: 'nul',
  input_player1_gun_offscreen_shot_btn: 'nul',
  input_player1_gun_offscreen_shot_mbtn: 'nul',
  input_player1_gun_select: 'nul',
  input_player1_gun_select_axis: 'nul',
  input_player1_gun_select_btn: 'nul',
  input_player1_gun_select_mbtn: 'nul',
  input_player1_gun_start: 'nul',
  input_player1_gun_start_axis: 'nul',
  input_player1_gun_start_btn: 'nul',
  input_player1_gun_start_mbtn: 'nul',
  input_player1_gun_trigger: 'nul',
  input_player1_gun_trigger_axis: 'nul',
  input_player1_gun_trigger_btn: 'nul',
  input_player1_gun_trigger_mbtn: 'nul',
  input_player1_l2_axis: 'nul',
  input_player1_l2_btn: 'nul',
  input_player1_l2_mbtn: 'nul',
  input_player1_l3: 'nul',
  input_player1_l3_axis: 'nul',
  input_player1_l3_mbtn: 'nul',
  input_player1_l_axis: 'nul',
  input_player1_l_btn: 'nul',
  input_player1_l_mbtn: 'nul',
  input_player1_l_x_minus_axis: 'nul',
  input_player1_l_x_minus_btn: 'nul',
  input_player1_l_x_minus_mbtn: 'nul',
  input_player1_l_x_plus_axis: 'nul',
  input_player1_l_x_plus_btn: 'nul',
  input_player1_l_x_plus_mbtn: 'nul',
  input_player1_l_y_minus_axis: 'nul',
  input_player1_l_y_minus_btn: 'nul',
  input_player1_l_y_minus_mbtn: 'nul',
  input_player1_l_y_plus_axis: 'nul',
  input_player1_l_y_plus_btn: 'nul',
  input_player1_l_y_plus_mbtn: 'nul',
  input_player1_left_axis: 'nul',
  input_player1_left_mbtn: 'nul',
  input_player1_r2_axis: 'nul',
  input_player1_r2_btn: 'nul',
  input_player1_r2_mbtn: 'nul',
  input_player1_r3: 'nul',
  input_player1_r3_axis: 'nul',
  input_player1_r3_mbtn: 'nul',
  input_player1_r_axis: 'nul',
  input_player1_r_btn: 'nul',
  input_player1_r_mbtn: 'nul',
  input_player1_r_x_minus_axis: 'nul',
  input_player1_r_x_minus_btn: 'nul',
  input_player1_r_x_minus_mbtn: 'nul',
  input_player1_r_x_plus_axis: 'nul',
  input_player1_r_x_plus_btn: 'nul',
  input_player1_r_x_plus_mbtn: 'nul',
  input_player1_r_y_minus_axis: 'nul',
  input_player1_r_y_minus_btn: 'nul',
  input_player1_r_y_minus_mbtn: 'nul',
  input_player1_r_y_plus_axis: 'nul',
  input_player1_r_y_plus_btn: 'nul',
  input_player1_r_y_plus_mbtn: 'nul',
  input_player1_right_axis: 'nul',
  input_player1_right_mbtn: 'nul',
  input_player1_select_axis: 'nul',
  input_player1_select_btn: 'nul',
  input_player1_select_mbtn: 'nul',
  input_player1_start_axis: 'nul',
  input_player1_start_btn: 'nul',
  input_player1_start_mbtn: 'nul',
  input_player1_turbo: 'nul',
  input_player1_turbo_axis: 'nul',
  input_player1_turbo_btn: 'nul',
  input_player1_turbo_mbtn: 'nul',
  input_player1_up_axis: 'nul',
  input_player1_up_btn: 'nul',
  input_player1_up_mbtn: 'nul',
  input_player1_x_axis: 'nul',
  input_player1_x_btn: 'nul',
  input_player1_x_mbtn: 'nul',
  input_player1_y_axis: 'nul',
  input_player1_y_btn: 'nul',
  input_player1_y_mbtn: 'nul',
  input_poll_type_behavior: 'nul',
  input_recording_toggle: 'nul',
  input_recording_toggle_axis: 'nul',
  input_recording_toggle_btn: 'nul',
  input_recording_toggle_mbtn: 'nul',
  input_reset: 'nul',
  input_reset_axis: 'nul',
  input_reset_btn: 'nul',
  input_reset_mbtn: 'nul',
  input_rewind: 'nul',
  input_rewind_axis: 'nul',
  input_rewind_btn: 'nul',
  input_rewind_mbtn: 'nul',
  input_save_state_axis: 'nul',
  input_save_state_btn: 'nul',
  input_save_state_mbtn: 'nul',
  input_screenshot_axis: 'nul',
  input_screenshot_btn: 'nul',
  input_screenshot_mbtn: 'nul',
  input_send_debug_info: 'nul',
  input_send_debug_info_axis: 'nul',
  input_send_debug_info_btn: 'nul',
  input_send_debug_info_mbtn: 'nul',
  input_shader_next: 'nul',
  input_shader_next_axis: 'nul',
  input_shader_next_btn: 'nul',
  input_shader_next_mbtn: 'nul',
  input_shader_prev: 'nul',
  input_shader_prev_axis: 'nul',
  input_shader_prev_btn: 'nul',
  input_shader_prev_mbtn: 'nul',
  input_state_slot_decrease: 'nul',
  input_state_slot_decrease_axis: 'nul',
  input_state_slot_decrease_btn: 'nul',
  input_state_slot_decrease_mbtn: 'nul',
  input_state_slot_increase: 'nul',
  input_state_slot_increase_axis: 'nul',
  input_state_slot_increase_btn: 'nul',
  input_state_slot_increase_mbtn: 'nul',
  input_streaming_toggle: 'nul',
  input_streaming_toggle_axis: 'nul',
  input_streaming_toggle_btn: 'nul',
  input_streaming_toggle_mbtn: 'nul',
  input_toggle_fast_forward_axis: 'nul',
  input_toggle_fast_forward_btn: 'nul',
  input_toggle_fast_forward_mbtn: 'nul',
  input_toggle_fullscreen: 'nul',
  input_toggle_fullscreen_axis: 'nul',
  input_toggle_fullscreen_btn: 'nul',
  input_toggle_fullscreen_mbtn: 'nul',
  input_toggle_slowmotion: 'nul',
  input_toggle_slowmotion_axis: 'nul',
  input_toggle_slowmotion_btn: 'nul',
  input_toggle_slowmotion_mbtn: 'nul',
  input_turbo_default_button: 'nul',
  input_turbo_mode: 'nul',
  input_turbo_period: 'nul',
  input_volume_down: 'nul',
  input_volume_down_axis: 'nul',
  input_volume_down_btn: 'nul',
  input_volume_down_mbtn: 'nul',
  input_volume_up: 'nul',
  input_volume_up_axis: 'nul',
  input_volume_up_btn: 'nul',
  input_volume_up_mbtn: 'nul',
}

const stringifySettings = (settings) =>
  Object.entries(settings).reduce(
    (acc, [key, value]) => `${acc}${key} = "${value}"\n`,
    ''
  )


/***/ }),

/***/ "./src/retroarch-module/downloadAssets.js":
/*!************************************************!*\
  !*** ./src/retroarch-module/downloadAssets.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downloadAssets": () => (/* binding */ downloadAssets)
/* harmony export */ });
/* harmony import */ var _getDownloadUrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDownloadUrl */ "./src/retroarch-module/getDownloadUrl.js");


const getPaths = async () => {
  const indexRes = await fetch((0,_getDownloadUrl__WEBPACK_IMPORTED_MODULE_0__.getDownloadUrl)("bundle", "indexedfiles-v2.txt"))
  const indexText = await indexRes.text()

  var paths = indexText.split(",,,\n")

  return {
    dirs: JSON.parse(paths[0]),
    files: paths[1].split("\n"),
  }
}

const copyFiles = async (dirs, files, FS = window.FS) => {
  const baseFsBundleDir = "/home/web_user/retroarch/bundle"

  // make directories
  FS.createPath("/", baseFsBundleDir, true, true) // ??
  for (var i = 0; i < dirs.length; i++) {
    FS.createPath(baseFsBundleDir + dirs[i][0], dirs[i][1], true, true)
  }

  // make the files
  for (let i = 0; i < files.length; i++) {
    let fileRes = await fetch((0,_getDownloadUrl__WEBPACK_IMPORTED_MODULE_0__.getDownloadUrl)("bundle", files[i]))
    const fileData = await fileRes.arrayBuffer()

    FS.writeFile(`${baseFsBundleDir}/${files[i]}`, new Uint8Array(fileData))
  }
}

const downloadAssets = async () => {
  const { dirs, files } = await getPaths()

  await copyFiles(dirs, files)
}


/***/ }),

/***/ "./src/retroarch-module/downloadModule.js":
/*!************************************************!*\
  !*** ./src/retroarch-module/downloadModule.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downloadModule": () => (/* binding */ downloadModule)
/* harmony export */ });
const downloadModule = async (url) => {
  return new Promise((resolve, reject) => {
    if (Boolean(document.querySelector(`[src="${url}"`))) return

    try {
      const script = document.createElement("script")
      script.type = "application/javascript"
      script.src = url
      script.addEventListener("load", resolve)
      script.addEventListener("error", reject)

      document.body.appendChild(script)
    } catch (error) {
      reject(error)
    }
  })
}


/***/ }),

/***/ "./src/retroarch-module/getDownloadUrl.js":
/*!************************************************!*\
  !*** ./src/retroarch-module/getDownloadUrl.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDownloadUrl": () => (/* binding */ getDownloadUrl)
/* harmony export */ });
const repository_base_url =
  "https://cdn.jsdelivr.net/gh/dimitrikarpov/holy-retroarch@master"

const getDownloadUrl = (type, fileName) => {
  if (!type) return

  if (type === "core") return `${repository_base_url}/cores/${fileName}`

  if (type === "bundle")
    return `${repository_base_url}/cores/bundle/${fileName}`
}


/***/ }),

/***/ "./src/retroarch-module/moduleService.js":
/*!***********************************************!*\
  !*** ./src/retroarch-module/moduleService.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModuleService": () => (/* binding */ ModuleService)
/* harmony export */ });
/* harmony import */ var _utils_Deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Deferred */ "./src/utils/Deferred.js");
/* harmony import */ var _configureModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configureModule */ "./src/retroarch-module/configureModule.js");
/* harmony import */ var _copyConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./copyConfig */ "./src/retroarch-module/copyConfig.js");
/* harmony import */ var _copyRom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./copyRom */ "./src/retroarch-module/copyRom.js");
/* harmony import */ var _downloadAssets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./downloadAssets */ "./src/retroarch-module/downloadAssets.js");
/* harmony import */ var _downloadModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./downloadModule */ "./src/retroarch-module/downloadModule.js");
/* harmony import */ var _getDownloadUrl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDownloadUrl */ "./src/retroarch-module/getDownloadUrl.js");
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
 * - next we have to copy our rom file, retroarch config file and retroarch frontend assets to our retroarch filesystem.
 *   retroarch will start it by calling `onRuntimeInitialized` hook
 * - and we ready to start the Module!
 */









const deferredOnRuntimeInitialized = new _utils_Deferred__WEBPACK_IMPORTED_MODULE_0__.Deferred()
const onRuntimeInitialized = () => deferredOnRuntimeInitialized.resolve()

class ModuleService {
  static async prepare(canvas) {
    ;(0,_configureModule__WEBPACK_IMPORTED_MODULE_1__.configureModule)(canvas, onRuntimeInitialized)
    await (0,_downloadModule__WEBPACK_IMPORTED_MODULE_5__.downloadModule)((0,_getDownloadUrl__WEBPACK_IMPORTED_MODULE_6__.getDownloadUrl)("core", "nestopia_libretro.js"))
    await deferredOnRuntimeInitialized.promise
    await (0,_downloadAssets__WEBPACK_IMPORTED_MODULE_4__.downloadAssets)()
    ;(0,_copyConfig__WEBPACK_IMPORTED_MODULE_2__.copyConfig)()
  }

  static uploadSave(savefile) {}

  static uploadRom(romfile) {
    (0,_copyRom__WEBPACK_IMPORTED_MODULE_3__.copyRom)(romfile)
  }

  static start() {
    window.Module.callMain(window.Module.arguments)
  }
}

// prepare module
// download script
// copy config file
// copy bundle
// wait for rom uploaded
// wait for save file uploaded
// wait for start (should start if rom or rom+save uploaded)


/***/ }),

/***/ "./src/utils/Deferred.js":
/*!*******************************!*\
  !*** ./src/utils/Deferred.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deferred": () => (/* binding */ Deferred)
/* harmony export */ });
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}


/***/ }),

/***/ "./src/utils/convertFileToUnit8Array.js":
/*!**********************************************!*\
  !*** ./src/utils/convertFileToUnit8Array.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertFileToUint8Array": () => (/* binding */ convertFileToUint8Array)
/* harmony export */ });
const convertFileToUint8Array = async (file) => {
  const buff = await file.arrayBuffer()
  return new Uint8Array(buff)
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "user": () => (/* binding */ user)
/* harmony export */ });
/* harmony import */ var _HolyRetroNestopia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HolyRetroNestopia */ "./src/HolyRetroNestopia.js");
/* harmony import */ var _utils_convertFileToUnit8Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/convertFileToUnit8Array */ "./src/utils/convertFileToUnit8Array.js");



if (!customElements.get("holy-retroarch-nestopia")) {
  customElements.define("holy-retroarch-nestopia", _HolyRetroNestopia__WEBPACK_IMPORTED_MODULE_0__.HolyRetroNestopia)
}

// export const a = 7

let user = "John"

// export { convertFileToUint8Array }

// export { HolyRetroNestopia }

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWdFOztBQUVoRTs7QUFFTztBQUNQO0FBQ0E7O0FBRUEsbUJBQW1CLDBFQUFhO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLE9BQU87O0FBRTVCLElBQUksa0ZBQXFCO0FBQ3pCOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNad0I7O0FBRWpCO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBaUIsR0FBRyxHQUFHLDJEQUFlLEtBQUssdURBQVcsS0FBSyxtREFBTyxFQUFFO0FBQ3hFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2JPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRk8sc0JBQXNCOztBQUV0QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0EsOEJBQThCLElBQUksRUFBRSxLQUFLLEtBQUssTUFBTTtBQUNwRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDclVpRDs7QUFFakQ7QUFDQSwrQkFBK0IsK0RBQWM7QUFDN0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDLDhCQUE4QiwrREFBYztBQUM1Qzs7QUFFQSxvQkFBb0IsZ0JBQWdCLEdBQUcsU0FBUztBQUNoRDtBQUNBOztBQUVPO0FBQ1AsVUFBVSxjQUFjOztBQUV4QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwQ087QUFDUDtBQUNBLGdEQUFnRCxJQUFJOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7O0FBRU87QUFDUDs7QUFFQSxpQ0FBaUMsb0JBQW9CLFNBQVMsU0FBUzs7QUFFdkU7QUFDQSxjQUFjLG9CQUFvQixnQkFBZ0IsU0FBUztBQUMzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEM7QUFDTztBQUNWO0FBQ047QUFDYztBQUNBO0FBQ0E7O0FBRWpELHlDQUF5QyxxREFBUTtBQUNqRDs7QUFFTztBQUNQO0FBQ0EsSUFBSSxrRUFBZTtBQUNuQixVQUFVLCtEQUFjLENBQUMsK0RBQWM7QUFDdkM7QUFDQSxVQUFVLCtEQUFjO0FBQ3hCLElBQUksd0RBQVU7QUFDZDs7QUFFQTs7QUFFQTtBQUNBLElBQUksaURBQU87QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeERPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUE87QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7VUNIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ051RDtBQUNrQjs7QUFFekU7QUFDQSxtREFBbUQsaUVBQWlCO0FBQ3BFOztBQUVBOztBQUVPOztBQUVQLFlBQVk7O0FBRVosWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL0hvbHlSZXRyb05lc3RvcGlhLmpzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL3JldHJvYXJjaC1tb2R1bGUvY29uZmlndXJlTW9kdWxlLmpzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL3JldHJvYXJjaC1tb2R1bGUvY29weUNvbmZpZy5qcyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC8uL3NyYy9yZXRyb2FyY2gtbW9kdWxlL2NvcHlSb20uanMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvcmV0cm9hcmNoLW1vZHVsZS9kZWZhdWx0Q29uZmlnLmpzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL3JldHJvYXJjaC1tb2R1bGUvZG93bmxvYWRBc3NldHMuanMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvLi9zcmMvcmV0cm9hcmNoLW1vZHVsZS9kb3dubG9hZE1vZHVsZS5qcyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC8uL3NyYy9yZXRyb2FyY2gtbW9kdWxlL2dldERvd25sb2FkVXJsLmpzIiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL3JldHJvYXJjaC1tb2R1bGUvbW9kdWxlU2VydmljZS5qcyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC8uL3NyYy91dGlscy9EZWZlcnJlZC5qcyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC8uL3NyYy91dGlscy9jb252ZXJ0RmlsZVRvVW5pdDhBcnJheS5qcyIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaG9seS1yZXRyb2FyY2gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ob2x5LXJldHJvYXJjaC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hvbHktcmV0cm9hcmNoLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVNlcnZpY2UgfSBmcm9tIFwiLi9yZXRyb2FyY2gtbW9kdWxlL21vZHVsZVNlcnZpY2VcIlxuXG5jb25zdCB0ZW1wbGF0ZVN0cmluZyA9IGA8Y2FudmFzPjwvY2FudmFzPmBcblxuZXhwb3J0IGNsYXNzIEhvbHlSZXRyb05lc3RvcGlhIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLnNlcnZpY2UgPSBNb2R1bGVTZXJ2aWNlXG4gICAgdGhpcy5pbm5lckhUTUwgPSB0ZW1wbGF0ZVN0cmluZ1xuICAgIHRoaXMuJGNhbnZhcyA9IHRoaXMucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc3QgcHJvcDEgPSB0aGlzLmdldEF0dHJpYnV0ZShcInByb3AxXCIpXG4gICAgLy8gY29uc29sZS5sb2coeyBwcm9wMSB9KVxuXG4gICAgTW9kdWxlU2VydmljZS5wcmVwYXJlKHRoaXMuJGNhbnZhcylcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge31cbn1cbiIsImV4cG9ydCBjb25zdCBjb25maWd1cmVNb2R1bGUgPSAoY2FudmFzLCBvblJ1bnRpbWVJbml0aWFsaXplZCkgPT4ge1xuICBjb25zdCBNb2R1bGUgPSB7XG4gICAgY2FudmFzLFxuICAgIG5vSW5pdGlhbFJ1bjogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IFtcIi9yb20uYmluXCIsIFwiLS12ZXJib3NlXCJdLFxuICAgIG9uUnVudGltZUluaXRpYWxpemVkLFxuICAgIHByaW50OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgY29uc29sZS5sb2coXCJzdGRvdXQ6IFwiICsgdGV4dClcbiAgICB9LFxuICAgIHByaW50RXJyOiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgY29uc29sZS5sb2coXCJzdGRlcnI6IFwiICsgdGV4dClcbiAgICB9LFxuICAgIHByZVJ1bjogW10sXG4gICAgcG9zdFJ1bjogW10sXG4gIH1cblxuICB3aW5kb3cuTW9kdWxlID0gTW9kdWxlXG59XG4iLCJpbXBvcnQge1xuICBkZWZhdWx0S2V5YmluZHMsXG4gIGV4dHJhQ29uZmlnLFxuICBudWxLZXlzLFxuICBzdHJpbmdpZnlTZXR0aW5ncyxcbn0gZnJvbSBcIi4vZGVmYXVsdENvbmZpZ1wiXG5cbmV4cG9ydCBjb25zdCBjb3B5Q29uZmlnID0gKCkgPT4ge1xuICB3aW5kb3cuRlMuY3JlYXRlUGF0aChcIi9cIiwgXCJob21lL3dlYl91c2VyL3JldHJvYXJjaC91c2VyZGF0YVwiLCB0cnVlLCB0cnVlKVxuICB3aW5kb3cuRlMud3JpdGVGaWxlKFxuICAgIFwiL2hvbWUvd2ViX3VzZXIvcmV0cm9hcmNoL3VzZXJkYXRhL3JldHJvYXJjaC5jZmdcIixcbiAgICBzdHJpbmdpZnlTZXR0aW5ncyh7IC4uLmRlZmF1bHRLZXliaW5kcywgLi4uZXh0cmFDb25maWcsIC4uLm51bEtleXMgfSksXG4gIClcbn1cbiIsImV4cG9ydCBjb25zdCBjb3B5Um9tID0gKHJvbSkgPT4ge1xuICB3aW5kb3cuRlMud3JpdGVGaWxlKFwiL3JvbS5iaW5cIiwgcm9tKVxufVxuIiwiZXhwb3J0IGNvbnN0IGV4dHJhQ29uZmlnID0geyByZ3VpX3Nob3dfc3RhcnRfc2NyZWVuOiAnZmFsc2UnIH1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRLZXliaW5kcyA9IHtcbiAgaW5wdXRfcGxheWVyMV9zdGFydDogJ2VudGVyJyxcbiAgaW5wdXRfcGxheWVyMV9zZWxlY3Q6ICdzcGFjZScsXG4gIGlucHV0X3BsYXllcjFfbDogJ2UnLFxuICBpbnB1dF9wbGF5ZXIxX2wyOiAncicsXG4gIGlucHV0X3BsYXllcjFfcjogJ3AnLFxuICBpbnB1dF9wbGF5ZXIxX3IyOiAnbycsXG4gIGlucHV0X3BsYXllcjFfYTogJ2gnLFxuICBpbnB1dF9wbGF5ZXIxX2I6ICdnJyxcbiAgaW5wdXRfcGxheWVyMV94OiAneScsXG4gIGlucHV0X3BsYXllcjFfeTogJ3QnLFxuICBpbnB1dF9wbGF5ZXIxX3VwOiAndXAnLFxuICBpbnB1dF9wbGF5ZXIxX2xlZnQ6ICdsZWZ0JyxcbiAgaW5wdXRfcGxheWVyMV9kb3duOiAnZG93bicsXG4gIGlucHV0X3BsYXllcjFfcmlnaHQ6ICdyaWdodCcsXG4gIGlucHV0X3BsYXllcjFfbF94X21pbnVzOiAnYScsXG4gIGlucHV0X3BsYXllcjFfbF94X3BsdXM6ICdkJyxcbiAgaW5wdXRfcGxheWVyMV9sX3lfbWludXM6ICd3JyxcbiAgaW5wdXRfcGxheWVyMV9sX3lfcGx1czogJ3MnLFxuICBpbnB1dF9wbGF5ZXIxX2wzX2J0bjogJ3gnLFxuICBpbnB1dF9wbGF5ZXIxX3JfeF9taW51czogJ2onLFxuICBpbnB1dF9wbGF5ZXIxX3JfeF9wbHVzOiAnbCcsXG4gIGlucHV0X3BsYXllcjFfcl95X21pbnVzOiAnaScsXG4gIGlucHV0X3BsYXllcjFfcl95X3BsdXM6ICdrJyxcbiAgaW5wdXRfcGxheWVyMV9yM19idG46ICdjb21tYScsXG4gIGlucHV0X21lbnVfdG9nZ2xlOiAnZjEnLFxuICBpbnB1dF9zYXZlX3N0YXRlOiAnZjInLFxuICBpbnB1dF9sb2FkX3N0YXRlOiAnZjMnLFxuICBpbnB1dF9zY3JlZW5zaG90OiAnZjQnLFxuICBpbnB1dF9ob2xkX2Zhc3RfZm9yd2FyZDogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9mYXN0X2ZvcndhcmQ6ICdudWwnLFxufVxuXG5leHBvcnQgY29uc3QgbnVsS2V5cyA9IHtcbiAgaW5wdXRfYWlfc2VydmljZTogJ251bCcsXG4gIGlucHV0X2FpX3NlcnZpY2VfYXhpczogJ251bCcsXG4gIGlucHV0X2FpX3NlcnZpY2VfYnRuOiAnbnVsJyxcbiAgaW5wdXRfYWlfc2VydmljZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfYXVkaW9fbXV0ZTogJ251bCcsXG4gIGlucHV0X2F1ZGlvX211dGVfYXhpczogJ251bCcsXG4gIGlucHV0X2F1ZGlvX211dGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfYXVkaW9fbXV0ZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfY2hlYXRfaW5kZXhfbWludXM6ICdudWwnLFxuICBpbnB1dF9jaGVhdF9pbmRleF9taW51c19heGlzOiAnbnVsJyxcbiAgaW5wdXRfY2hlYXRfaW5kZXhfbWludXNfYnRuOiAnbnVsJyxcbiAgaW5wdXRfY2hlYXRfaW5kZXhfbWludXNfbWJ0bjogJ251bCcsXG4gIGlucHV0X2NoZWF0X2luZGV4X3BsdXM6ICdudWwnLFxuICBpbnB1dF9jaGVhdF9pbmRleF9wbHVzX2F4aXM6ICdudWwnLFxuICBpbnB1dF9jaGVhdF9pbmRleF9wbHVzX2J0bjogJ251bCcsXG4gIGlucHV0X2NoZWF0X2luZGV4X3BsdXNfbWJ0bjogJ251bCcsXG4gIGlucHV0X2NoZWF0X3RvZ2dsZTogJ251bCcsXG4gIGlucHV0X2NoZWF0X3RvZ2dsZV9heGlzOiAnbnVsJyxcbiAgaW5wdXRfY2hlYXRfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X2NoZWF0X3RvZ2dsZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGVza3RvcF9tZW51X3RvZ2dsZTogJ251bCcsXG4gIGlucHV0X2Rlc2t0b3BfbWVudV90b2dnbGVfYXhpczogJ251bCcsXG4gIGlucHV0X2Rlc2t0b3BfbWVudV90b2dnbGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGVza3RvcF9tZW51X3RvZ2dsZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGlza19lamVjdF90b2dnbGU6ICdudWwnLFxuICBpbnB1dF9kaXNrX2VqZWN0X3RvZ2dsZV9heGlzOiAnbnVsJyxcbiAgaW5wdXRfZGlza19lamVjdF90b2dnbGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGlza19lamVjdF90b2dnbGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X2Rpc2tfbmV4dDogJ251bCcsXG4gIGlucHV0X2Rpc2tfbmV4dF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfZGlza19uZXh0X2J0bjogJ251bCcsXG4gIGlucHV0X2Rpc2tfbmV4dF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGlza19wcmV2OiAnbnVsJyxcbiAgaW5wdXRfZGlza19wcmV2X2F4aXM6ICdudWwnLFxuICBpbnB1dF9kaXNrX3ByZXZfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZGlza19wcmV2X21idG46ICdudWwnLFxuICBpbnB1dF9kdXR5X2N5Y2xlOiAnbnVsJyxcbiAgaW5wdXRfZW5hYmxlX2hvdGtleTogJ251bCcsXG4gIGlucHV0X2VuYWJsZV9ob3RrZXlfYXhpczogJ251bCcsXG4gIGlucHV0X2VuYWJsZV9ob3RrZXlfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZW5hYmxlX2hvdGtleV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZXhpdF9lbXVsYXRvcjogJ251bCcsXG4gIGlucHV0X2V4aXRfZW11bGF0b3JfYXhpczogJ251bCcsXG4gIGlucHV0X2V4aXRfZW11bGF0b3JfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZXhpdF9lbXVsYXRvcl9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZnBzX3RvZ2dsZTogJ251bCcsXG4gIGlucHV0X2Zwc190b2dnbGVfYXhpczogJ251bCcsXG4gIGlucHV0X2Zwc190b2dnbGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZnBzX3RvZ2dsZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZnJhbWVfYWR2YW5jZTogJ251bCcsXG4gIGlucHV0X2ZyYW1lX2FkdmFuY2VfYXhpczogJ251bCcsXG4gIGlucHV0X2ZyYW1lX2FkdmFuY2VfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZnJhbWVfYWR2YW5jZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfZ2FtZV9mb2N1c190b2dnbGU6ICdudWwnLFxuICBpbnB1dF9nYW1lX2ZvY3VzX3RvZ2dsZV9heGlzOiAnbnVsJyxcbiAgaW5wdXRfZ2FtZV9mb2N1c190b2dnbGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfZ2FtZV9mb2N1c190b2dnbGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X2dyYWJfbW91c2VfdG9nZ2xlOiAnbnVsJyxcbiAgaW5wdXRfZ3JhYl9tb3VzZV90b2dnbGVfYXhpczogJ251bCcsXG4gIGlucHV0X2dyYWJfbW91c2VfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X2dyYWJfbW91c2VfdG9nZ2xlX21idG46ICdudWwnLFxuICBpbnB1dF9ob2xkX2Zhc3RfZm9yd2FyZF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfaG9sZF9mYXN0X2ZvcndhcmRfYnRuOiAnbnVsJyxcbiAgaW5wdXRfaG9sZF9mYXN0X2ZvcndhcmRfbWJ0bjogJ251bCcsXG4gIGlucHV0X2hvbGRfc2xvd21vdGlvbjogJ251bCcsXG4gIGlucHV0X3Nsb3dtb3Rpb246ICdudWwnLFxuICBpbnB1dF9ob2xkX3Nsb3dtb3Rpb25fYXhpczogJ251bCcsXG4gIGlucHV0X2hvbGRfc2xvd21vdGlvbl9idG46ICdudWwnLFxuICBpbnB1dF9ob2xkX3Nsb3dtb3Rpb25fbWJ0bjogJ251bCcsXG4gIGlucHV0X2hvdGtleV9ibG9ja19kZWxheTogJ251bCcsXG4gIGlucHV0X2xvYWRfc3RhdGVfYXhpczogJ251bCcsXG4gIGlucHV0X2xvYWRfc3RhdGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfbG9hZF9zdGF0ZV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfbWVudV90b2dnbGVfYXhpczogJ251bCcsXG4gIGlucHV0X21lbnVfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X21lbnVfdG9nZ2xlX21idG46ICdudWwnLFxuICBpbnB1dF9tb3ZpZV9yZWNvcmRfdG9nZ2xlOiAnbnVsJyxcbiAgaW5wdXRfbW92aWVfcmVjb3JkX3RvZ2dsZV9heGlzOiAnbnVsJyxcbiAgaW5wdXRfbW92aWVfcmVjb3JkX3RvZ2dsZV9idG46ICdudWwnLFxuICBpbnB1dF9tb3ZpZV9yZWNvcmRfdG9nZ2xlX21idG46ICdudWwnLFxuICBpbnB1dF9uZXRwbGF5X2dhbWVfd2F0Y2g6ICdudWwnLFxuICBpbnB1dF9uZXRwbGF5X2dhbWVfd2F0Y2hfYXhpczogJ251bCcsXG4gIGlucHV0X25ldHBsYXlfZ2FtZV93YXRjaF9idG46ICdudWwnLFxuICBpbnB1dF9uZXRwbGF5X2dhbWVfd2F0Y2hfbWJ0bjogJ251bCcsXG4gIGlucHV0X25ldHBsYXlfaG9zdF90b2dnbGU6ICdudWwnLFxuICBpbnB1dF9uZXRwbGF5X2hvc3RfdG9nZ2xlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9uZXRwbGF5X2hvc3RfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X25ldHBsYXlfaG9zdF90b2dnbGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X29za190b2dnbGU6ICdudWwnLFxuICBpbnB1dF9vc2tfdG9nZ2xlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9vc2tfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X29za190b2dnbGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X292ZXJsYXlfbmV4dDogJ251bCcsXG4gIGlucHV0X292ZXJsYXlfbmV4dF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfb3ZlcmxheV9uZXh0X2J0bjogJ251bCcsXG4gIGlucHV0X292ZXJsYXlfbmV4dF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGF1c2VfdG9nZ2xlOiAnbnVsJyxcbiAgaW5wdXRfcGF1c2VfdG9nZ2xlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wYXVzZV90b2dnbGVfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGF1c2VfdG9nZ2xlX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2FfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfYV9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2FfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfYl9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9iX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfYl9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9kb3duX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2Rvd25fYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9kb3duX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYTogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9hX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYV9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYV9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2I6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9hdXhfYl9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2JfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2JfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9jOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fYXV4X2NfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9jX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2F1eF9jX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2Rvd246ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2Rvd25fYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfZG93bl9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9kcGFkX2Rvd25fbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfbGVmdDogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfbGVmdF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9sZWZ0X2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfbGVmdF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9yaWdodDogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfcmlnaHRfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfcmlnaHRfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF9yaWdodF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF91cDogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfdXBfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX2RwYWRfdXBfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fZHBhZF91cF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fb2Zmc2NyZWVuX3Nob3Q6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9vZmZzY3JlZW5fc2hvdF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fb2Zmc2NyZWVuX3Nob3RfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fb2Zmc2NyZWVuX3Nob3RfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX3NlbGVjdDogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX3NlbGVjdF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fc2VsZWN0X2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX3NlbGVjdF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnQ6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl9zdGFydF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnRfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9ndW5fc3RhcnRfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX3RyaWdnZXI6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl90cmlnZ2VyX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2d1bl90cmlnZ2VyX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfZ3VuX3RyaWdnZXJfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbDJfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbDJfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sMl9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sMzogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbDNfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbDNfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sX3hfbWludXNfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF94X21pbnVzX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF94X21pbnVzX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xfeF9wbHVzX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xfeF9wbHVzX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF94X3BsdXNfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbF95X21pbnVzX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xfeV9taW51c19idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xfeV9taW51c19tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sX3lfcGx1c19heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9sX3lfcGx1c19idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xfeV9wbHVzX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX2xlZnRfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfbGVmdF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yMl9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yMl9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3IyX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3IzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yM19heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yM19tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3JfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3JfeF9taW51c19heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX3hfbWludXNfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX3hfbWludXNfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcl94X3BsdXNfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcl94X3BsdXNfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX3hfcGx1c19tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9yX3lfbWludXNfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcl95X21pbnVzX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcl95X21pbnVzX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3JfeV9wbHVzX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3JfeV9wbHVzX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcl95X3BsdXNfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcmlnaHRfYXhpczogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfcmlnaHRfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfc2VsZWN0X2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3NlbGVjdF9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3NlbGVjdF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9zdGFydF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV9zdGFydF9idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3N0YXJ0X21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3R1cmJvOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV90dXJib19heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV90dXJib19idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3R1cmJvX21idG46ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3VwX2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3VwX2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfdXBfbWJ0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfeF9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV94X2J0bjogJ251bCcsXG4gIGlucHV0X3BsYXllcjFfeF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV95X2F4aXM6ICdudWwnLFxuICBpbnB1dF9wbGF5ZXIxX3lfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcGxheWVyMV95X21idG46ICdudWwnLFxuICBpbnB1dF9wb2xsX3R5cGVfYmVoYXZpb3I6ICdudWwnLFxuICBpbnB1dF9yZWNvcmRpbmdfdG9nZ2xlOiAnbnVsJyxcbiAgaW5wdXRfcmVjb3JkaW5nX3RvZ2dsZV9heGlzOiAnbnVsJyxcbiAgaW5wdXRfcmVjb3JkaW5nX3RvZ2dsZV9idG46ICdudWwnLFxuICBpbnB1dF9yZWNvcmRpbmdfdG9nZ2xlX21idG46ICdudWwnLFxuICBpbnB1dF9yZXNldDogJ251bCcsXG4gIGlucHV0X3Jlc2V0X2F4aXM6ICdudWwnLFxuICBpbnB1dF9yZXNldF9idG46ICdudWwnLFxuICBpbnB1dF9yZXNldF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfcmV3aW5kOiAnbnVsJyxcbiAgaW5wdXRfcmV3aW5kX2F4aXM6ICdudWwnLFxuICBpbnB1dF9yZXdpbmRfYnRuOiAnbnVsJyxcbiAgaW5wdXRfcmV3aW5kX21idG46ICdudWwnLFxuICBpbnB1dF9zYXZlX3N0YXRlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9zYXZlX3N0YXRlX2J0bjogJ251bCcsXG4gIGlucHV0X3NhdmVfc3RhdGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X3NjcmVlbnNob3RfYXhpczogJ251bCcsXG4gIGlucHV0X3NjcmVlbnNob3RfYnRuOiAnbnVsJyxcbiAgaW5wdXRfc2NyZWVuc2hvdF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfc2VuZF9kZWJ1Z19pbmZvOiAnbnVsJyxcbiAgaW5wdXRfc2VuZF9kZWJ1Z19pbmZvX2F4aXM6ICdudWwnLFxuICBpbnB1dF9zZW5kX2RlYnVnX2luZm9fYnRuOiAnbnVsJyxcbiAgaW5wdXRfc2VuZF9kZWJ1Z19pbmZvX21idG46ICdudWwnLFxuICBpbnB1dF9zaGFkZXJfbmV4dDogJ251bCcsXG4gIGlucHV0X3NoYWRlcl9uZXh0X2F4aXM6ICdudWwnLFxuICBpbnB1dF9zaGFkZXJfbmV4dF9idG46ICdudWwnLFxuICBpbnB1dF9zaGFkZXJfbmV4dF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfc2hhZGVyX3ByZXY6ICdudWwnLFxuICBpbnB1dF9zaGFkZXJfcHJldl9heGlzOiAnbnVsJyxcbiAgaW5wdXRfc2hhZGVyX3ByZXZfYnRuOiAnbnVsJyxcbiAgaW5wdXRfc2hhZGVyX3ByZXZfbWJ0bjogJ251bCcsXG4gIGlucHV0X3N0YXRlX3Nsb3RfZGVjcmVhc2U6ICdudWwnLFxuICBpbnB1dF9zdGF0ZV9zbG90X2RlY3JlYXNlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9zdGF0ZV9zbG90X2RlY3JlYXNlX2J0bjogJ251bCcsXG4gIGlucHV0X3N0YXRlX3Nsb3RfZGVjcmVhc2VfbWJ0bjogJ251bCcsXG4gIGlucHV0X3N0YXRlX3Nsb3RfaW5jcmVhc2U6ICdudWwnLFxuICBpbnB1dF9zdGF0ZV9zbG90X2luY3JlYXNlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9zdGF0ZV9zbG90X2luY3JlYXNlX2J0bjogJ251bCcsXG4gIGlucHV0X3N0YXRlX3Nsb3RfaW5jcmVhc2VfbWJ0bjogJ251bCcsXG4gIGlucHV0X3N0cmVhbWluZ190b2dnbGU6ICdudWwnLFxuICBpbnB1dF9zdHJlYW1pbmdfdG9nZ2xlX2F4aXM6ICdudWwnLFxuICBpbnB1dF9zdHJlYW1pbmdfdG9nZ2xlX2J0bjogJ251bCcsXG4gIGlucHV0X3N0cmVhbWluZ190b2dnbGVfbWJ0bjogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9mYXN0X2ZvcndhcmRfYXhpczogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9mYXN0X2ZvcndhcmRfYnRuOiAnbnVsJyxcbiAgaW5wdXRfdG9nZ2xlX2Zhc3RfZm9yd2FyZF9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfdG9nZ2xlX2Z1bGxzY3JlZW46ICdudWwnLFxuICBpbnB1dF90b2dnbGVfZnVsbHNjcmVlbl9heGlzOiAnbnVsJyxcbiAgaW5wdXRfdG9nZ2xlX2Z1bGxzY3JlZW5fYnRuOiAnbnVsJyxcbiAgaW5wdXRfdG9nZ2xlX2Z1bGxzY3JlZW5fbWJ0bjogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uOiAnbnVsJyxcbiAgaW5wdXRfdG9nZ2xlX3Nsb3dtb3Rpb25fYXhpczogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uX2J0bjogJ251bCcsXG4gIGlucHV0X3RvZ2dsZV9zbG93bW90aW9uX21idG46ICdudWwnLFxuICBpbnB1dF90dXJib19kZWZhdWx0X2J1dHRvbjogJ251bCcsXG4gIGlucHV0X3R1cmJvX21vZGU6ICdudWwnLFxuICBpbnB1dF90dXJib19wZXJpb2Q6ICdudWwnLFxuICBpbnB1dF92b2x1bWVfZG93bjogJ251bCcsXG4gIGlucHV0X3ZvbHVtZV9kb3duX2F4aXM6ICdudWwnLFxuICBpbnB1dF92b2x1bWVfZG93bl9idG46ICdudWwnLFxuICBpbnB1dF92b2x1bWVfZG93bl9tYnRuOiAnbnVsJyxcbiAgaW5wdXRfdm9sdW1lX3VwOiAnbnVsJyxcbiAgaW5wdXRfdm9sdW1lX3VwX2F4aXM6ICdudWwnLFxuICBpbnB1dF92b2x1bWVfdXBfYnRuOiAnbnVsJyxcbiAgaW5wdXRfdm9sdW1lX3VwX21idG46ICdudWwnLFxufVxuXG5leHBvcnQgY29uc3Qgc3RyaW5naWZ5U2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+XG4gIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzKS5yZWR1Y2UoXG4gICAgKGFjYywgW2tleSwgdmFsdWVdKSA9PiBgJHthY2N9JHtrZXl9ID0gXCIke3ZhbHVlfVwiXFxuYCxcbiAgICAnJ1xuICApXG4iLCJpbXBvcnQgeyBnZXREb3dubG9hZFVybCB9IGZyb20gXCIuL2dldERvd25sb2FkVXJsXCJcblxuY29uc3QgZ2V0UGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGluZGV4UmVzID0gYXdhaXQgZmV0Y2goZ2V0RG93bmxvYWRVcmwoXCJidW5kbGVcIiwgXCJpbmRleGVkZmlsZXMtdjIudHh0XCIpKVxuICBjb25zdCBpbmRleFRleHQgPSBhd2FpdCBpbmRleFJlcy50ZXh0KClcblxuICB2YXIgcGF0aHMgPSBpbmRleFRleHQuc3BsaXQoXCIsLCxcXG5cIilcblxuICByZXR1cm4ge1xuICAgIGRpcnM6IEpTT04ucGFyc2UocGF0aHNbMF0pLFxuICAgIGZpbGVzOiBwYXRoc1sxXS5zcGxpdChcIlxcblwiKSxcbiAgfVxufVxuXG5jb25zdCBjb3B5RmlsZXMgPSBhc3luYyAoZGlycywgZmlsZXMsIEZTID0gd2luZG93LkZTKSA9PiB7XG4gIGNvbnN0IGJhc2VGc0J1bmRsZURpciA9IFwiL2hvbWUvd2ViX3VzZXIvcmV0cm9hcmNoL2J1bmRsZVwiXG5cbiAgLy8gbWFrZSBkaXJlY3Rvcmllc1xuICBGUy5jcmVhdGVQYXRoKFwiL1wiLCBiYXNlRnNCdW5kbGVEaXIsIHRydWUsIHRydWUpIC8vID8/XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgIEZTLmNyZWF0ZVBhdGgoYmFzZUZzQnVuZGxlRGlyICsgZGlyc1tpXVswXSwgZGlyc1tpXVsxXSwgdHJ1ZSwgdHJ1ZSlcbiAgfVxuXG4gIC8vIG1ha2UgdGhlIGZpbGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgZmlsZVJlcyA9IGF3YWl0IGZldGNoKGdldERvd25sb2FkVXJsKFwiYnVuZGxlXCIsIGZpbGVzW2ldKSlcbiAgICBjb25zdCBmaWxlRGF0YSA9IGF3YWl0IGZpbGVSZXMuYXJyYXlCdWZmZXIoKVxuXG4gICAgRlMud3JpdGVGaWxlKGAke2Jhc2VGc0J1bmRsZURpcn0vJHtmaWxlc1tpXX1gLCBuZXcgVWludDhBcnJheShmaWxlRGF0YSkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvd25sb2FkQXNzZXRzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB7IGRpcnMsIGZpbGVzIH0gPSBhd2FpdCBnZXRQYXRocygpXG5cbiAgYXdhaXQgY29weUZpbGVzKGRpcnMsIGZpbGVzKVxufVxuIiwiZXhwb3J0IGNvbnN0IGRvd25sb2FkTW9kdWxlID0gYXN5bmMgKHVybCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChCb29sZWFuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtzcmM9XCIke3VybH1cImApKSkgcmV0dXJuXG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuICAgICAgc2NyaXB0LnR5cGUgPSBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIlxuICAgICAgc2NyaXB0LnNyYyA9IHVybFxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlc29sdmUpXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHJlamVjdClcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICB9XG4gIH0pXG59XG4iLCJjb25zdCByZXBvc2l0b3J5X2Jhc2VfdXJsID1cbiAgXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvZGltaXRyaWthcnBvdi9ob2x5LXJldHJvYXJjaEBtYXN0ZXJcIlxuXG5leHBvcnQgY29uc3QgZ2V0RG93bmxvYWRVcmwgPSAodHlwZSwgZmlsZU5hbWUpID0+IHtcbiAgaWYgKCF0eXBlKSByZXR1cm5cblxuICBpZiAodHlwZSA9PT0gXCJjb3JlXCIpIHJldHVybiBgJHtyZXBvc2l0b3J5X2Jhc2VfdXJsfS9jb3Jlcy8ke2ZpbGVOYW1lfWBcblxuICBpZiAodHlwZSA9PT0gXCJidW5kbGVcIilcbiAgICByZXR1cm4gYCR7cmVwb3NpdG9yeV9iYXNlX3VybH0vY29yZXMvYnVuZGxlLyR7ZmlsZU5hbWV9YFxufVxuIiwiLyoqXG4gKiBNb2R1bGUgLSBpcyBqcyBwYXJ0IG9mIGluc3RhbmNlIG9mIGxpYnJldHJvIGNvcmUgKyByZXRyb2FyY2ggZnJvbnRlbmRcbiAqIE1vZHVsZSBpcyBhdmFpYWJsZSBhcyBnbG9iYWwgdmFyaWFibGUgYE1vZHVsZWAgYWxzbyBpdCBleHBvc2UgYEZTYCBhbmQgYFJBYCBvYmplY3RzXG4gKiBNb2R1bGUgY29udGFpbnMganMgZ2x1ZSBmb3IgY29tcGlsZWQgd2FzbSBmaWxlIGFuZCBzb21lIGV4cG9ydGVkIGZ1bmN0aW9ucyBmcm9tIHJldHJvYXJjaCBpdHNlbGZcbiAqIEZTIHVzZWQgZm9yIGFjY2Vzc2luZyBmaWxlc3lzdGVtIG9mIHdhc20gbW9kdWxlLCB3ZSB3aWxsIHVzZSBpdCB0byB1cGxvYWQgcm9tIGFuZCByZXRyb2FyY2ggYXNzZXRzIChzbyBjYWxsZWQgYnVuZGxlKVxuICogUkEgd2lsbCBiZSB1c2VkIGZvciBhY2Nlc3NpbmcgdG8gYXVkaW9cbiAqXG4gKlxuICogSG93IHRoZSBtb2R1bGUgZ29pbmcgdG8gYmUgY3JlYXRlZDpcbiAqIC0gZmlyc3Qgb2YgYWxsIHdlIG5lZWQgdG8gY3JlYXRlIGdsb2JhbCBvYmplY3QgYE1vZHVsZWAgd2l0aCBzb21lIGNvbmZpZ3VyYXRpb25cbiAqICAgYW5kIGluaXRpYWxpemF0aW9uIGhvb2tzXG4gKiAtIG5leHQgd2UgZG93bmxvYWQgY29tcGlsZWQganMgc2NyaXB0IG9mIG5lZWRlZCBjb3JlIGFuZCB3YXNtIGZpbGUuIGpzIHNjcmlwdFxuICogICBjaGVja3MgaWYgd2hlcmUgTW9kdWxlIGluc3RhbmNlIGluIGdsb2JhbCBzY29wZSBhbmQgaG9va3MgdXAgb3VyIGNvbmZpZyBhbmQgZXh0ZW5kcyBpdC5cbiAqICAgYWZ0ZXIgdGhhdCBmdWxsIE1vZHVsZSBvYmplY3QgZ29pbmcgdG8gYmUgYXZhaWxhYmxlIGFuZCBnbG9iYWwgRlMgb2JqZWN0IHRvby5cbiAqIC0gbmV4dCB3ZSBoYXZlIHRvIGNvcHkgb3VyIHJvbSBmaWxlLCByZXRyb2FyY2ggY29uZmlnIGZpbGUgYW5kIHJldHJvYXJjaCBmcm9udGVuZCBhc3NldHMgdG8gb3VyIHJldHJvYXJjaCBmaWxlc3lzdGVtLlxuICogICByZXRyb2FyY2ggd2lsbCBzdGFydCBpdCBieSBjYWxsaW5nIGBvblJ1bnRpbWVJbml0aWFsaXplZGAgaG9va1xuICogLSBhbmQgd2UgcmVhZHkgdG8gc3RhcnQgdGhlIE1vZHVsZSFcbiAqL1xuXG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gXCIuLi91dGlscy9EZWZlcnJlZFwiXG5pbXBvcnQgeyBjb25maWd1cmVNb2R1bGUgfSBmcm9tIFwiLi9jb25maWd1cmVNb2R1bGVcIlxuaW1wb3J0IHsgY29weUNvbmZpZyB9IGZyb20gXCIuL2NvcHlDb25maWdcIlxuaW1wb3J0IHsgY29weVJvbSB9IGZyb20gXCIuL2NvcHlSb21cIlxuaW1wb3J0IHsgZG93bmxvYWRBc3NldHMgfSBmcm9tIFwiLi9kb3dubG9hZEFzc2V0c1wiXG5pbXBvcnQgeyBkb3dubG9hZE1vZHVsZSB9IGZyb20gXCIuL2Rvd25sb2FkTW9kdWxlXCJcbmltcG9ydCB7IGdldERvd25sb2FkVXJsIH0gZnJvbSBcIi4vZ2V0RG93bmxvYWRVcmxcIlxuXG5jb25zdCBkZWZlcnJlZE9uUnVudGltZUluaXRpYWxpemVkID0gbmV3IERlZmVycmVkKClcbmNvbnN0IG9uUnVudGltZUluaXRpYWxpemVkID0gKCkgPT4gZGVmZXJyZWRPblJ1bnRpbWVJbml0aWFsaXplZC5yZXNvbHZlKClcblxuZXhwb3J0IGNsYXNzIE1vZHVsZVNlcnZpY2Uge1xuICBzdGF0aWMgYXN5bmMgcHJlcGFyZShjYW52YXMpIHtcbiAgICBjb25maWd1cmVNb2R1bGUoY2FudmFzLCBvblJ1bnRpbWVJbml0aWFsaXplZClcbiAgICBhd2FpdCBkb3dubG9hZE1vZHVsZShnZXREb3dubG9hZFVybChcImNvcmVcIiwgXCJuZXN0b3BpYV9saWJyZXRyby5qc1wiKSlcbiAgICBhd2FpdCBkZWZlcnJlZE9uUnVudGltZUluaXRpYWxpemVkLnByb21pc2VcbiAgICBhd2FpdCBkb3dubG9hZEFzc2V0cygpXG4gICAgY29weUNvbmZpZygpXG4gIH1cblxuICBzdGF0aWMgdXBsb2FkU2F2ZShzYXZlZmlsZSkge31cblxuICBzdGF0aWMgdXBsb2FkUm9tKHJvbWZpbGUpIHtcbiAgICBjb3B5Um9tKHJvbWZpbGUpXG4gIH1cblxuICBzdGF0aWMgc3RhcnQoKSB7XG4gICAgd2luZG93Lk1vZHVsZS5jYWxsTWFpbih3aW5kb3cuTW9kdWxlLmFyZ3VtZW50cylcbiAgfVxufVxuXG4vLyBwcmVwYXJlIG1vZHVsZVxuLy8gZG93bmxvYWQgc2NyaXB0XG4vLyBjb3B5IGNvbmZpZyBmaWxlXG4vLyBjb3B5IGJ1bmRsZVxuLy8gd2FpdCBmb3Igcm9tIHVwbG9hZGVkXG4vLyB3YWl0IGZvciBzYXZlIGZpbGUgdXBsb2FkZWRcbi8vIHdhaXQgZm9yIHN0YXJ0IChzaG91bGQgc3RhcnQgaWYgcm9tIG9yIHJvbStzYXZlIHVwbG9hZGVkKVxuIiwiZXhwb3J0IGNsYXNzIERlZmVycmVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWplY3QgPSByZWplY3RcbiAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmVcbiAgICB9KVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgY29udmVydEZpbGVUb1VpbnQ4QXJyYXkgPSBhc3luYyAoZmlsZSkgPT4ge1xuICBjb25zdCBidWZmID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpXG4gIHJldHVybiBuZXcgVWludDhBcnJheShidWZmKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBIb2x5UmV0cm9OZXN0b3BpYSB9IGZyb20gXCIuL0hvbHlSZXRyb05lc3RvcGlhXCJcbmltcG9ydCB7IGNvbnZlcnRGaWxlVG9VaW50OEFycmF5IH0gZnJvbSBcIi4vdXRpbHMvY29udmVydEZpbGVUb1VuaXQ4QXJyYXlcIlxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcImhvbHktcmV0cm9hcmNoLW5lc3RvcGlhXCIpKSB7XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcImhvbHktcmV0cm9hcmNoLW5lc3RvcGlhXCIsIEhvbHlSZXRyb05lc3RvcGlhKVxufVxuXG4vLyBleHBvcnQgY29uc3QgYSA9IDdcblxuZXhwb3J0IGxldCB1c2VyID0gXCJKb2huXCJcblxuLy8gZXhwb3J0IHsgY29udmVydEZpbGVUb1VpbnQ4QXJyYXkgfVxuXG4vLyBleHBvcnQgeyBIb2x5UmV0cm9OZXN0b3BpYSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=