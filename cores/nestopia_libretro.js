var Module = typeof Module != "undefined" ? Module : {}
var moduleOverrides = Object.assign({}, Module)
var arguments_ = []
var thisProgram = "./this.program"
var quit_ = (status, toThrow) => {
  throw toThrow
}
var ENVIRONMENT_IS_WEB = true
var ENVIRONMENT_IS_WORKER = false
var scriptDirectory = ""
function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory)
  }
  return scriptDirectory + path
}
var read_, readAsync, readBinary, setWindowTitle
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = self.location.href
  } else if (typeof document != "undefined" && document.currentScript) {
    scriptDirectory = document.currentScript.src
  }
  if (scriptDirectory.indexOf("blob:") !== 0) {
    scriptDirectory = scriptDirectory.substr(
      0,
      scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1,
    )
  } else {
    scriptDirectory = ""
  }
  {
    read_ = (url) => {
      var xhr = new XMLHttpRequest()
      xhr.open("GET", url, false)
      xhr.send(null)
      return xhr.responseText
    }
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = (url) => {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url, false)
        xhr.responseType = "arraybuffer"
        xhr.send(null)
        return new Uint8Array(xhr.response)
      }
    }
    readAsync = (url, onload, onerror) => {
      var xhr = new XMLHttpRequest()
      xhr.open("GET", url, true)
      xhr.responseType = "arraybuffer"
      xhr.onload = () => {
        if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
          onload(xhr.response)
          return
        }
        onerror()
      }
      xhr.onerror = onerror
      xhr.send(null)
    }
  }
  setWindowTitle = (title) => (document.title = title)
} else {
}
var out = Module["print"] || console.log.bind(console)
var err = Module["printErr"] || console.warn.bind(console)
Object.assign(Module, moduleOverrides)
moduleOverrides = null
if (Module["arguments"]) arguments_ = Module["arguments"]
if (Module["thisProgram"]) thisProgram = Module["thisProgram"]
if (Module["quit"]) quit_ = Module["quit"]
var wasmBinary
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"]
var noExitRuntime = Module["noExitRuntime"] || false
if (typeof WebAssembly != "object") {
  abort("no native wasm support detected")
}
var wasmMemory
var ABORT = false
var EXITSTATUS
function assert(condition, text) {
  if (!condition) {
    abort(text)
  }
}
var UTF8Decoder =
  typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined
function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead
  var endPtr = idx
  while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr
  if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
    return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
  }
  var str = ""
  while (idx < endPtr) {
    var u0 = heapOrArray[idx++]
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0)
      continue
    }
    var u1 = heapOrArray[idx++] & 63
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1)
      continue
    }
    var u2 = heapOrArray[idx++] & 63
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
    } else {
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63)
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0)
    } else {
      var ch = u0 - 65536
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
    }
  }
  return str
}
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
}
function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) return 0
  var startIdx = outIdx
  var endIdx = outIdx + maxBytesToWrite - 1
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i)
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i)
      u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break
      heap[outIdx++] = u
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break
      heap[outIdx++] = 192 | (u >> 6)
      heap[outIdx++] = 128 | (u & 63)
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break
      heap[outIdx++] = 224 | (u >> 12)
      heap[outIdx++] = 128 | ((u >> 6) & 63)
      heap[outIdx++] = 128 | (u & 63)
    } else {
      if (outIdx + 3 >= endIdx) break
      heap[outIdx++] = 240 | (u >> 18)
      heap[outIdx++] = 128 | ((u >> 12) & 63)
      heap[outIdx++] = 128 | ((u >> 6) & 63)
      heap[outIdx++] = 128 | (u & 63)
    }
  }
  heap[outIdx] = 0
  return outIdx - startIdx
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
}
function lengthBytesUTF8(str) {
  var len = 0
  for (var i = 0; i < str.length; ++i) {
    var c = str.charCodeAt(i)
    if (c <= 127) {
      len++
    } else if (c <= 2047) {
      len += 2
    } else if (c >= 55296 && c <= 57343) {
      len += 4
      ++i
    } else {
      len += 3
    }
  }
  return len
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
function updateGlobalBufferAndViews(buf) {
  buffer = buf
  Module["HEAP8"] = HEAP8 = new Int8Array(buf)
  Module["HEAP16"] = HEAP16 = new Int16Array(buf)
  Module["HEAP32"] = HEAP32 = new Int32Array(buf)
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf)
  Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf)
  Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf)
  Module["HEAPF32"] = HEAPF32 = new Float32Array(buf)
  Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
}
var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 134217728
var wasmTable
var __ATPRERUN__ = []
var __ATINIT__ = []
var __ATMAIN__ = []
var __ATEXIT__ = []
var __ATPOSTRUN__ = []
var runtimeInitialized = false
var runtimeExited = false
var runtimeKeepaliveCounter = 0
function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0
}
function preRun() {
  if (Module["preRun"]) {
    if (typeof Module["preRun"] == "function")
      Module["preRun"] = [Module["preRun"]]
    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift())
    }
  }
  callRuntimeCallbacks(__ATPRERUN__)
}
function initRuntime() {
  runtimeInitialized = true
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init()
  FS.ignorePermissions = false
  TTY.init()
  callRuntimeCallbacks(__ATINIT__)
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__)
}
function exitRuntime() {
  ___funcs_on_exit()
  callRuntimeCallbacks(__ATEXIT__)
  FS.quit()
  TTY.shutdown()
  runtimeExited = true
}
function postRun() {
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function")
      Module["postRun"] = [Module["postRun"]]
    while (Module["postRun"].length) {
      addOnPostRun(Module["postRun"].shift())
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__)
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb)
}
function addOnInit(cb) {
  __ATINIT__.unshift(cb)
}
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb)
}
var runDependencies = 0
var runDependencyWatcher = null
var dependenciesFulfilled = null
function getUniqueRunDependency(id) {
  return id
}
function addRunDependency(id) {
  runDependencies++
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies)
  }
}
function removeRunDependency(id) {
  runDependencies--
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies)
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher)
      runDependencyWatcher = null
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled
      dependenciesFulfilled = null
      callback()
    }
  }
}
function abort(what) {
  {
    if (Module["onAbort"]) {
      Module["onAbort"](what)
    }
  }
  what = "Aborted(" + what + ")"
  err(what)
  ABORT = true
  EXITSTATUS = 1
  what += ". Build with -sASSERTIONS for more info."
  var e = new WebAssembly.RuntimeError(what)
  throw e
}
var dataURIPrefix = "data:application/octet-stream;base64,"
function isDataURI(filename) {
  return filename.startsWith(dataURIPrefix)
}
var wasmBinaryFile
wasmBinaryFile = "nestopia_libretro.wasm"
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile)
}
function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary)
    }
    if (readBinary) {
      return readBinary(file)
    }
    throw "both async and sync fetching of the wasm failed"
  } catch (err) {
    abort(err)
  }
}
function getBinaryPromise() {
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == "function") {
      return fetch(wasmBinaryFile, { credentials: "same-origin" })
        .then(function (response) {
          if (!response["ok"]) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
          }
          return response["arrayBuffer"]()
        })
        .catch(function () {
          return getBinary(wasmBinaryFile)
        })
    }
  }
  return Promise.resolve().then(function () {
    return getBinary(wasmBinaryFile)
  })
}
function createWasm() {
  var info = { a: asmLibraryArg }
  function receiveInstance(instance, module) {
    var exports = instance.exports
    Module["asm"] = exports
    wasmMemory = Module["asm"]["cf"]
    updateGlobalBufferAndViews(wasmMemory.buffer)
    wasmTable = Module["asm"]["ef"]
    addOnInit(Module["asm"]["df"])
    removeRunDependency("wasm-instantiate")
  }
  addRunDependency("wasm-instantiate")
  function receiveInstantiationResult(result) {
    receiveInstance(result["instance"])
  }
  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise()
      .then(function (binary) {
        return WebAssembly.instantiate(binary, info)
      })
      .then(function (instance) {
        return instance
      })
      .then(receiver, function (reason) {
        err("failed to asynchronously prepare wasm: " + reason)
        abort(reason)
      })
  }
  function instantiateAsync() {
    if (
      !wasmBinary &&
      typeof WebAssembly.instantiateStreaming == "function" &&
      !isDataURI(wasmBinaryFile) &&
      typeof fetch == "function"
    ) {
      return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(
        function (response) {
          var result = WebAssembly.instantiateStreaming(response, info)
          return result.then(receiveInstantiationResult, function (reason) {
            err("wasm streaming compile failed: " + reason)
            err("falling back to ArrayBuffer instantiation")
            return instantiateArrayBuffer(receiveInstantiationResult)
          })
        },
      )
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult)
    }
  }
  if (Module["instantiateWasm"]) {
    try {
      var exports = Module["instantiateWasm"](info, receiveInstance)
      return exports
    } catch (e) {
      err("Module.instantiateWasm callback failed with error: " + e)
      return false
    }
  }
  instantiateAsync()
  return {}
}
var tempDouble
var tempI64
function ExitStatus(status) {
  this.name = "ExitStatus"
  this.message = "Program terminated with exit(" + status + ")"
  this.status = status
}
function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    callbacks.shift()(Module)
  }
}
function runtimeKeepalivePush() {
  runtimeKeepaliveCounter += 1
}
function _emscripten_set_main_loop_timing(mode, value) {
  Browser.mainLoop.timingMode = mode
  Browser.mainLoop.timingValue = value
  if (!Browser.mainLoop.func) {
    return 1
  }
  if (!Browser.mainLoop.running) {
    runtimeKeepalivePush()
    Browser.mainLoop.running = true
  }
  if (mode == 0) {
    Browser.mainLoop.scheduler =
      function Browser_mainLoop_scheduler_setTimeout() {
        var timeUntilNextTick =
          Math.max(
            0,
            Browser.mainLoop.tickStartTime + value - _emscripten_get_now(),
          ) | 0
        setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
      }
    Browser.mainLoop.method = "timeout"
  } else if (mode == 1) {
    Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
      Browser.requestAnimationFrame(Browser.mainLoop.runner)
    }
    Browser.mainLoop.method = "rAF"
  } else if (mode == 2) {
    if (typeof setImmediate == "undefined") {
      var setImmediates = []
      var emscriptenMainLoopMessageId = "setimmediate"
      var Browser_setImmediate_messageHandler = (event) => {
        if (
          event.data === emscriptenMainLoopMessageId ||
          event.data.target === emscriptenMainLoopMessageId
        ) {
          event.stopPropagation()
          setImmediates.shift()()
        }
      }
      addEventListener("message", Browser_setImmediate_messageHandler, true)
      setImmediate = function Browser_emulated_setImmediate(func) {
        setImmediates.push(func)
        if (ENVIRONMENT_IS_WORKER) {
          if (Module["setImmediates"] === undefined)
            Module["setImmediates"] = []
          Module["setImmediates"].push(func)
          postMessage({ target: emscriptenMainLoopMessageId })
        } else postMessage(emscriptenMainLoopMessageId, "*")
      }
    }
    Browser.mainLoop.scheduler =
      function Browser_mainLoop_scheduler_setImmediate() {
        setImmediate(Browser.mainLoop.runner)
      }
    Browser.mainLoop.method = "immediate"
  }
  return 0
}
var _emscripten_get_now
_emscripten_get_now = () => performance.now()
var PATH = {
  isAbs: (path) => path.charAt(0) === "/",
  splitPath: (filename) => {
    var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
    return splitPathRe.exec(filename).slice(1)
  },
  normalizeArray: (parts, allowAboveRoot) => {
    var up = 0
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i]
      if (last === ".") {
        parts.splice(i, 1)
      } else if (last === "..") {
        parts.splice(i, 1)
        up++
      } else if (up) {
        parts.splice(i, 1)
        up--
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..")
      }
    }
    return parts
  },
  normalize: (path) => {
    var isAbsolute = PATH.isAbs(path),
      trailingSlash = path.substr(-1) === "/"
    path = PATH.normalizeArray(
      path.split("/").filter((p) => !!p),
      !isAbsolute,
    ).join("/")
    if (!path && !isAbsolute) {
      path = "."
    }
    if (path && trailingSlash) {
      path += "/"
    }
    return (isAbsolute ? "/" : "") + path
  },
  dirname: (path) => {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1]
    if (!root && !dir) {
      return "."
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1)
    }
    return root + dir
  },
  basename: (path) => {
    if (path === "/") return "/"
    path = PATH.normalize(path)
    path = path.replace(/\/$/, "")
    var lastSlash = path.lastIndexOf("/")
    if (lastSlash === -1) return path
    return path.substr(lastSlash + 1)
  },
  join: function () {
    var paths = Array.prototype.slice.call(arguments)
    return PATH.normalize(paths.join("/"))
  },
  join2: (l, r) => {
    return PATH.normalize(l + "/" + r)
  },
}
function getRandomDevice() {
  if (
    typeof crypto == "object" &&
    typeof crypto["getRandomValues"] == "function"
  ) {
    var randomBuffer = new Uint8Array(1)
    return () => {
      crypto.getRandomValues(randomBuffer)
      return randomBuffer[0]
    }
  } else return () => abort("randomDevice")
}
var PATH_FS = {
  resolve: function () {
    var resolvedPath = "",
      resolvedAbsolute = false
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd()
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings")
      } else if (!path) {
        return ""
      }
      resolvedPath = path + "/" + resolvedPath
      resolvedAbsolute = PATH.isAbs(path)
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split("/").filter((p) => !!p),
      !resolvedAbsolute,
    ).join("/")
    return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).substr(1)
    to = PATH_FS.resolve(to).substr(1)
    function trim(arr) {
      var start = 0
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break
      }
      var end = arr.length - 1
      for (; end >= 0; end--) {
        if (arr[end] !== "") break
      }
      if (start > end) return []
      return arr.slice(start, end - start + 1)
    }
    var fromParts = trim(from.split("/"))
    var toParts = trim(to.split("/"))
    var length = Math.min(fromParts.length, toParts.length)
    var samePartsLength = length
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i
        break
      }
    }
    var outputParts = []
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..")
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength))
    return outputParts.join("/")
  },
}
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
  var u8array = new Array(len)
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
  if (dontAddNull) u8array.length = numBytesWritten
  return u8array
}
var TTY = {
  ttys: [],
  init: function () {},
  shutdown: function () {},
  register: function (dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops: ops }
    FS.registerDevice(dev, TTY.stream_ops)
  },
  stream_ops: {
    open: function (stream) {
      var tty = TTY.ttys[stream.node.rdev]
      if (!tty) {
        throw new FS.ErrnoError(43)
      }
      stream.tty = tty
      stream.seekable = false
    },
    close: function (stream) {
      stream.tty.ops.fsync(stream.tty)
    },
    fsync: function (stream) {
      stream.tty.ops.fsync(stream.tty)
    },
    read: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60)
      }
      var bytesRead = 0
      for (var i = 0; i < length; i++) {
        var result
        try {
          result = stream.tty.ops.get_char(stream.tty)
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6)
        }
        if (result === null || result === undefined) break
        bytesRead++
        buffer[offset + i] = result
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now()
      }
      return bytesRead
    },
    write: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60)
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i])
        }
      } catch (e) {
        throw new FS.ErrnoError(29)
      }
      if (length) {
        stream.node.timestamp = Date.now()
      }
      return i
    },
  },
  default_tty_ops: {
    get_char: function (tty) {
      if (!tty.input.length) {
        var result = null
        if (
          typeof window != "undefined" &&
          typeof window.prompt == "function"
        ) {
          result = window.prompt("Input: ")
          if (result !== null) {
            result += "\n"
          }
        } else if (typeof readline == "function") {
          result = readline()
          if (result !== null) {
            result += "\n"
          }
        }
        if (!result) {
          return null
        }
        tty.input = intArrayFromString(result, true)
      }
      return tty.input.shift()
    },
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      } else {
        if (val != 0) tty.output.push(val)
      }
    },
    fsync: function (tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      }
    },
  },
  default_tty1_ops: {
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      } else {
        if (val != 0) tty.output.push(val)
      }
    },
    fsync: function (tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      }
    },
  },
}
function mmapAlloc(size) {
  abort()
}
var MEMFS = {
  ops_table: null,
  mount: function (mount) {
    return MEMFS.createNode(null, "/", 16384 | 511, 0)
  },
  createNode: function (parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63)
    }
    if (!MEMFS.ops_table) {
      MEMFS.ops_table = {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink,
          },
          stream: { llseek: MEMFS.stream_ops.llseek },
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            allocate: MEMFS.stream_ops.allocate,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync,
          },
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink,
          },
          stream: {},
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
          },
          stream: FS.chrdev_stream_ops,
        },
      }
    }
    var node = FS.createNode(parent, name, mode, dev)
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node
      node.stream_ops = MEMFS.ops_table.dir.stream
      node.contents = {}
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node
      node.stream_ops = MEMFS.ops_table.file.stream
      node.usedBytes = 0
      node.contents = null
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node
      node.stream_ops = MEMFS.ops_table.link.stream
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node
      node.stream_ops = MEMFS.ops_table.chrdev.stream
    }
    node.timestamp = Date.now()
    if (parent) {
      parent.contents[name] = node
      parent.timestamp = node.timestamp
    }
    return node
  },
  getFileDataAsTypedArray: function (node) {
    if (!node.contents) return new Uint8Array(0)
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes)
    return new Uint8Array(node.contents)
  },
  expandFileStorage: function (node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0
    if (prevCapacity >= newCapacity) return
    var CAPACITY_DOUBLING_MAX = 1024 * 1024
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0,
    )
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
    var oldContents = node.contents
    node.contents = new Uint8Array(newCapacity)
    if (node.usedBytes > 0)
      node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
  },
  resizeFileStorage: function (node, newSize) {
    if (node.usedBytes == newSize) return
    if (newSize == 0) {
      node.contents = null
      node.usedBytes = 0
    } else {
      var oldContents = node.contents
      node.contents = new Uint8Array(newSize)
      if (oldContents) {
        node.contents.set(
          oldContents.subarray(0, Math.min(newSize, node.usedBytes)),
        )
      }
      node.usedBytes = newSize
    }
  },
  node_ops: {
    getattr: function (node) {
      var attr = {}
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1
      attr.ino = node.id
      attr.mode = node.mode
      attr.nlink = 1
      attr.uid = 0
      attr.gid = 0
      attr.rdev = node.rdev
      if (FS.isDir(node.mode)) {
        attr.size = 4096
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length
      } else {
        attr.size = 0
      }
      attr.atime = new Date(node.timestamp)
      attr.mtime = new Date(node.timestamp)
      attr.ctime = new Date(node.timestamp)
      attr.blksize = 4096
      attr.blocks = Math.ceil(attr.size / attr.blksize)
      return attr
    },
    setattr: function (node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size)
      }
    },
    lookup: function (parent, name) {
      throw FS.genericErrors[44]
    },
    mknod: function (parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev)
    },
    rename: function (old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node
        try {
          new_node = FS.lookupNode(new_dir, new_name)
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55)
          }
        }
      }
      delete old_node.parent.contents[old_node.name]
      old_node.parent.timestamp = Date.now()
      old_node.name = new_name
      new_dir.contents[new_name] = old_node
      new_dir.timestamp = old_node.parent.timestamp
      old_node.parent = new_dir
    },
    unlink: function (parent, name) {
      delete parent.contents[name]
      parent.timestamp = Date.now()
    },
    rmdir: function (parent, name) {
      var node = FS.lookupNode(parent, name)
      for (var i in node.contents) {
        throw new FS.ErrnoError(55)
      }
      delete parent.contents[name]
      parent.timestamp = Date.now()
    },
    readdir: function (node) {
      var entries = [".", ".."]
      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue
        }
        entries.push(key)
      }
      return entries
    },
    symlink: function (parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
      node.link = oldpath
      return node
    },
    readlink: function (node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28)
      }
      return node.link
    },
  },
  stream_ops: {
    read: function (stream, buffer, offset, length, position) {
      var contents = stream.node.contents
      if (position >= stream.node.usedBytes) return 0
      var size = Math.min(stream.node.usedBytes - position, length)
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset)
      } else {
        for (var i = 0; i < size; i++)
          buffer[offset + i] = contents[position + i]
      }
      return size
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false
      }
      if (!length) return 0
      var node = stream.node
      node.timestamp = Date.now()
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length)
          node.usedBytes = length
          return length
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length)
          node.usedBytes = length
          return length
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position)
          return length
        }
      }
      MEMFS.expandFileStorage(node, position + length)
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position)
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i]
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length)
      return length
    },
    llseek: function (stream, offset, whence) {
      var position = offset
      if (whence === 1) {
        position += stream.position
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28)
      }
      return position
    },
    allocate: function (stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length)
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
    },
    mmap: function (stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43)
      }
      var ptr
      var allocated
      var contents = stream.node.contents
      if (!(flags & 2) && contents.buffer === buffer) {
        allocated = false
        ptr = contents.byteOffset
      } else {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length)
          } else {
            contents = Array.prototype.slice.call(
              contents,
              position,
              position + length,
            )
          }
        }
        allocated = true
        ptr = mmapAlloc(length)
        if (!ptr) {
          throw new FS.ErrnoError(48)
        }
        HEAP8.set(contents, ptr)
      }
      return { ptr: ptr, allocated: allocated }
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false)
      return 0
    },
  },
}
function asyncLoad(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : ""
  readAsync(
    url,
    (arrayBuffer) => {
      assert(
        arrayBuffer,
        'Loading data file "' + url + '" failed (no arrayBuffer).',
      )
      onload(new Uint8Array(arrayBuffer))
      if (dep) removeRunDependency(dep)
    },
    (event) => {
      if (onerror) {
        onerror()
      } else {
        throw 'Loading data file "' + url + '" failed.'
      }
    },
  )
  if (dep) addRunDependency(dep)
}
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  ErrnoError: null,
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  lookupPath: (path, opts = {}) => {
    path = PATH_FS.resolve(FS.cwd(), path)
    if (!path) return { path: "", node: null }
    var defaults = { follow_mount: true, recurse_count: 0 }
    opts = Object.assign(defaults, opts)
    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(32)
    }
    var parts = PATH.normalizeArray(
      path.split("/").filter((p) => !!p),
      false,
    )
    var current = FS.root
    var current_path = "/"
    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1
      if (islast && opts.parent) {
        break
      }
      current = FS.lookupNode(current, parts[i])
      current_path = PATH.join2(current_path, parts[i])
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root
        }
      }
      if (!islast || opts.follow) {
        var count = 0
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path)
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count + 1,
          })
          current = lookup.node
          if (count++ > 40) {
            throw new FS.ErrnoError(32)
          }
        }
      }
    }
    return { path: current_path, node: current }
  },
  getPath: (node) => {
    var path
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint
        if (!path) return mount
        return mount[mount.length - 1] !== "/"
          ? mount + "/" + path
          : mount + path
      }
      path = path ? node.name + "/" + path : node.name
      node = node.parent
    }
  },
  hashName: (parentid, name) => {
    var hash = 0
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length
  },
  hashAddNode: (node) => {
    var hash = FS.hashName(node.parent.id, node.name)
    node.name_next = FS.nameTable[hash]
    FS.nameTable[hash] = node
  },
  hashRemoveNode: (node) => {
    var hash = FS.hashName(node.parent.id, node.name)
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next
    } else {
      var current = FS.nameTable[hash]
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next
          break
        }
        current = current.name_next
      }
    }
  },
  lookupNode: (parent, name) => {
    var errCode = FS.mayLookup(parent)
    if (errCode) {
      throw new FS.ErrnoError(errCode, parent)
    }
    var hash = FS.hashName(parent.id, name)
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name
      if (node.parent.id === parent.id && nodeName === name) {
        return node
      }
    }
    return FS.lookup(parent, name)
  },
  createNode: (parent, name, mode, rdev) => {
    var node = new FS.FSNode(parent, name, mode, rdev)
    FS.hashAddNode(node)
    return node
  },
  destroyNode: (node) => {
    FS.hashRemoveNode(node)
  },
  isRoot: (node) => {
    return node === node.parent
  },
  isMountpoint: (node) => {
    return !!node.mounted
  },
  isFile: (mode) => {
    return (mode & 61440) === 32768
  },
  isDir: (mode) => {
    return (mode & 61440) === 16384
  },
  isLink: (mode) => {
    return (mode & 61440) === 40960
  },
  isChrdev: (mode) => {
    return (mode & 61440) === 8192
  },
  isBlkdev: (mode) => {
    return (mode & 61440) === 24576
  },
  isFIFO: (mode) => {
    return (mode & 61440) === 4096
  },
  isSocket: (mode) => {
    return (mode & 49152) === 49152
  },
  flagModes: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 },
  modeStringToFlags: (str) => {
    var flags = FS.flagModes[str]
    if (typeof flags == "undefined") {
      throw new Error("Unknown file open mode: " + str)
    }
    return flags
  },
  flagsToPermissionString: (flag) => {
    var perms = ["r", "w", "rw"][flag & 3]
    if (flag & 512) {
      perms += "w"
    }
    return perms
  },
  nodePermissions: (node, perms) => {
    if (FS.ignorePermissions) {
      return 0
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2
    }
    return 0
  },
  mayLookup: (dir) => {
    var errCode = FS.nodePermissions(dir, "x")
    if (errCode) return errCode
    if (!dir.node_ops.lookup) return 2
    return 0
  },
  mayCreate: (dir, name) => {
    try {
      var node = FS.lookupNode(dir, name)
      return 20
    } catch (e) {}
    return FS.nodePermissions(dir, "wx")
  },
  mayDelete: (dir, name, isdir) => {
    var node
    try {
      node = FS.lookupNode(dir, name)
    } catch (e) {
      return e.errno
    }
    var errCode = FS.nodePermissions(dir, "wx")
    if (errCode) {
      return errCode
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31
      }
    }
    return 0
  },
  mayOpen: (node, flags) => {
    if (!node) {
      return 44
    }
    if (FS.isLink(node.mode)) {
      return 32
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
        return 31
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
  },
  MAX_OPEN_FDS: 4096,
  nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd
      }
    }
    throw new FS.ErrnoError(33)
  },
  getStream: (fd) => FS.streams[fd],
  createStream: (stream, fd_start, fd_end) => {
    if (!FS.FSStream) {
      FS.FSStream = function () {
        this.shared = {}
      }
      FS.FSStream.prototype = {}
      Object.defineProperties(FS.FSStream.prototype, {
        object: {
          get: function () {
            return this.node
          },
          set: function (val) {
            this.node = val
          },
        },
        isRead: {
          get: function () {
            return (this.flags & 2097155) !== 1
          },
        },
        isWrite: {
          get: function () {
            return (this.flags & 2097155) !== 0
          },
        },
        isAppend: {
          get: function () {
            return this.flags & 1024
          },
        },
        flags: {
          get: function () {
            return this.shared.flags
          },
          set: function (val) {
            this.shared.flags = val
          },
        },
        position: {
          get: function () {
            return this.shared.position
          },
          set: function (val) {
            this.shared.position = val
          },
        },
      })
    }
    stream = Object.assign(new FS.FSStream(), stream)
    var fd = FS.nextfd(fd_start, fd_end)
    stream.fd = fd
    FS.streams[fd] = stream
    return stream
  },
  closeStream: (fd) => {
    FS.streams[fd] = null
  },
  chrdev_stream_ops: {
    open: (stream) => {
      var device = FS.getDevice(stream.node.rdev)
      stream.stream_ops = device.stream_ops
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream)
      }
    },
    llseek: () => {
      throw new FS.ErrnoError(70)
    },
  },
  major: (dev) => dev >> 8,
  minor: (dev) => dev & 255,
  makedev: (ma, mi) => (ma << 8) | mi,
  registerDevice: (dev, ops) => {
    FS.devices[dev] = { stream_ops: ops }
  },
  getDevice: (dev) => FS.devices[dev],
  getMounts: (mount) => {
    var mounts = []
    var check = [mount]
    while (check.length) {
      var m = check.pop()
      mounts.push(m)
      check.push.apply(check, m.mounts)
    }
    return mounts
  },
  syncfs: (populate, callback) => {
    if (typeof populate == "function") {
      callback = populate
      populate = false
    }
    FS.syncFSRequests++
    if (FS.syncFSRequests > 1) {
      err(
        "warning: " +
          FS.syncFSRequests +
          " FS.syncfs operations in flight at once, probably just doing extra work",
      )
    }
    var mounts = FS.getMounts(FS.root.mount)
    var completed = 0
    function doCallback(errCode) {
      FS.syncFSRequests--
      return callback(errCode)
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true
          return doCallback(errCode)
        }
        return
      }
      if (++completed >= mounts.length) {
        doCallback(null)
      }
    }
    mounts.forEach((mount) => {
      if (!mount.type.syncfs) {
        return done(null)
      }
      mount.type.syncfs(mount, populate, done)
    })
  },
  mount: (type, opts, mountpoint) => {
    var root = mountpoint === "/"
    var pseudo = !mountpoint
    var node
    if (root && FS.root) {
      throw new FS.ErrnoError(10)
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
      mountpoint = lookup.path
      node = lookup.node
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54)
      }
    }
    var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }
    var mountRoot = type.mount(mount)
    mountRoot.mount = mount
    mount.root = mountRoot
    if (root) {
      FS.root = mountRoot
    } else if (node) {
      node.mounted = mount
      if (node.mount) {
        node.mount.mounts.push(mount)
      }
    }
    return mountRoot
  },
  unmount: (mountpoint) => {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28)
    }
    var node = lookup.node
    var mount = node.mounted
    var mounts = FS.getMounts(mount)
    Object.keys(FS.nameTable).forEach((hash) => {
      var current = FS.nameTable[hash]
      while (current) {
        var next = current.name_next
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current)
        }
        current = next
      }
    })
    node.mounted = null
    var idx = node.mount.mounts.indexOf(mount)
    node.mount.mounts.splice(idx, 1)
  },
  lookup: (parent, name) => {
    return parent.node_ops.lookup(parent, name)
  },
  mknod: (path, mode, dev) => {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    var name = PATH.basename(path)
    if (!name || name === "." || name === "..") {
      throw new FS.ErrnoError(28)
    }
    var errCode = FS.mayCreate(parent, name)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63)
    }
    return parent.node_ops.mknod(parent, name, mode, dev)
  },
  create: (path, mode) => {
    mode = mode !== undefined ? mode : 438
    mode &= 4095
    mode |= 32768
    return FS.mknod(path, mode, 0)
  },
  mkdir: (path, mode) => {
    mode = mode !== undefined ? mode : 511
    mode &= 511 | 512
    mode |= 16384
    return FS.mknod(path, mode, 0)
  },
  mkdirTree: (path, mode) => {
    var dirs = path.split("/")
    var d = ""
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue
      d += "/" + dirs[i]
      try {
        FS.mkdir(d, mode)
      } catch (e) {
        if (e.errno != 20) throw e
      }
    }
  },
  mkdev: (path, mode, dev) => {
    if (typeof dev == "undefined") {
      dev = mode
      mode = 438
    }
    mode |= 8192
    return FS.mknod(path, mode, dev)
  },
  symlink: (oldpath, newpath) => {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44)
    }
    var lookup = FS.lookupPath(newpath, { parent: true })
    var parent = lookup.node
    if (!parent) {
      throw new FS.ErrnoError(44)
    }
    var newname = PATH.basename(newpath)
    var errCode = FS.mayCreate(parent, newname)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63)
    }
    return parent.node_ops.symlink(parent, newname, oldpath)
  },
  rename: (old_path, new_path) => {
    var old_dirname = PATH.dirname(old_path)
    var new_dirname = PATH.dirname(new_path)
    var old_name = PATH.basename(old_path)
    var new_name = PATH.basename(new_path)
    var lookup, old_dir, new_dir
    lookup = FS.lookupPath(old_path, { parent: true })
    old_dir = lookup.node
    lookup = FS.lookupPath(new_path, { parent: true })
    new_dir = lookup.node
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75)
    }
    var old_node = FS.lookupNode(old_dir, old_name)
    var relative = PATH_FS.relative(old_path, new_dirname)
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28)
    }
    relative = PATH_FS.relative(new_path, old_dirname)
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55)
    }
    var new_node
    try {
      new_node = FS.lookupNode(new_dir, new_name)
    } catch (e) {}
    if (old_node === new_node) {
      return
    }
    var isdir = FS.isDir(old_node.mode)
    var errCode = FS.mayDelete(old_dir, old_name, isdir)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    errCode = new_node
      ? FS.mayDelete(new_dir, new_name, isdir)
      : FS.mayCreate(new_dir, new_name)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10)
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w")
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
    }
    FS.hashRemoveNode(old_node)
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name)
    } catch (e) {
      throw e
    } finally {
      FS.hashAddNode(old_node)
    }
  },
  rmdir: (path) => {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    var name = PATH.basename(path)
    var node = FS.lookupNode(parent, name)
    var errCode = FS.mayDelete(parent, name, true)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10)
    }
    parent.node_ops.rmdir(parent, name)
    FS.destroyNode(node)
  },
  readdir: (path) => {
    var lookup = FS.lookupPath(path, { follow: true })
    var node = lookup.node
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54)
    }
    return node.node_ops.readdir(node)
  },
  unlink: (path) => {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    if (!parent) {
      throw new FS.ErrnoError(44)
    }
    var name = PATH.basename(path)
    var node = FS.lookupNode(parent, name)
    var errCode = FS.mayDelete(parent, name, false)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10)
    }
    parent.node_ops.unlink(parent, name)
    FS.destroyNode(node)
  },
  readlink: (path) => {
    var lookup = FS.lookupPath(path)
    var link = lookup.node
    if (!link) {
      throw new FS.ErrnoError(44)
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28)
    }
    return PATH_FS.resolve(
      FS.getPath(link.parent),
      link.node_ops.readlink(link),
    )
  },
  stat: (path, dontFollow) => {
    var lookup = FS.lookupPath(path, { follow: !dontFollow })
    var node = lookup.node
    if (!node) {
      throw new FS.ErrnoError(44)
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63)
    }
    return node.node_ops.getattr(node)
  },
  lstat: (path) => {
    return FS.stat(path, true)
  },
  chmod: (path, mode, dontFollow) => {
    var node
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now(),
    })
  },
  lchmod: (path, mode) => {
    FS.chmod(path, mode, true)
  },
  fchmod: (fd, mode) => {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    FS.chmod(stream.node, mode)
  },
  chown: (path, uid, gid, dontFollow) => {
    var node
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    node.node_ops.setattr(node, { timestamp: Date.now() })
  },
  lchown: (path, uid, gid) => {
    FS.chown(path, uid, gid, true)
  },
  fchown: (fd, uid, gid) => {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    FS.chown(stream.node, uid, gid)
  },
  truncate: (path, len) => {
    if (len < 0) {
      throw new FS.ErrnoError(28)
    }
    var node
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: true })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28)
    }
    var errCode = FS.nodePermissions(node, "w")
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
  },
  ftruncate: (fd, len) => {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28)
    }
    FS.truncate(stream.node, len)
  },
  utime: (path, atime, mtime) => {
    var lookup = FS.lookupPath(path, { follow: true })
    var node = lookup.node
    node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
  },
  open: (path, flags, mode) => {
    if (path === "") {
      throw new FS.ErrnoError(44)
    }
    flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags
    mode = typeof mode == "undefined" ? 438 : mode
    if (flags & 64) {
      mode = (mode & 4095) | 32768
    } else {
      mode = 0
    }
    var node
    if (typeof path == "object") {
      node = path
    } else {
      path = PATH.normalize(path)
      try {
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
        node = lookup.node
      } catch (e) {}
    }
    var created = false
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20)
        }
      } else {
        node = FS.mknod(path, mode, 0)
        created = true
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44)
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54)
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
    }
    if (flags & 512 && !created) {
      FS.truncate(node, 0)
    }
    flags &= ~(128 | 512 | 131072)
    var stream = FS.createStream({
      node: node,
      path: FS.getPath(node),
      flags: flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      ungotten: [],
      error: false,
    })
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream)
    }
    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!FS.readFiles) FS.readFiles = {}
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1
      }
    }
    return stream
  },
  close: (stream) => {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (stream.getdents) stream.getdents = null
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream)
      }
    } catch (e) {
      throw e
    } finally {
      FS.closeStream(stream.fd)
    }
    stream.fd = null
  },
  isClosed: (stream) => {
    return stream.fd === null
  },
  llseek: (stream, offset, whence) => {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70)
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28)
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence)
    stream.ungotten = []
    return stream.position
  },
  read: (stream, buffer, offset, length, position) => {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28)
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8)
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28)
    }
    var seeking = typeof position != "undefined"
    if (!seeking) {
      position = stream.position
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70)
    }
    var bytesRead = stream.stream_ops.read(
      stream,
      buffer,
      offset,
      length,
      position,
    )
    if (!seeking) stream.position += bytesRead
    return bytesRead
  },
  write: (stream, buffer, offset, length, position, canOwn) => {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28)
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8)
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28)
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2)
    }
    var seeking = typeof position != "undefined"
    if (!seeking) {
      position = stream.position
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70)
    }
    var bytesWritten = stream.stream_ops.write(
      stream,
      buffer,
      offset,
      length,
      position,
      canOwn,
    )
    if (!seeking) stream.position += bytesWritten
    return bytesWritten
  },
  allocate: (stream, offset, length) => {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8)
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43)
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138)
    }
    stream.stream_ops.allocate(stream, offset, length)
  },
  mmap: (stream, length, position, prot, flags) => {
    if (
      (prot & 2) !== 0 &&
      (flags & 2) === 0 &&
      (stream.flags & 2097155) !== 2
    ) {
      throw new FS.ErrnoError(2)
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2)
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43)
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags)
  },
  msync: (stream, buffer, offset, length, mmapFlags) => {
    if (!stream.stream_ops.msync) {
      return 0
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
  },
  munmap: (stream) => 0,
  ioctl: (stream, cmd, arg) => {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59)
    }
    return stream.stream_ops.ioctl(stream, cmd, arg)
  },
  readFile: (path, opts = {}) => {
    opts.flags = opts.flags || 0
    opts.encoding = opts.encoding || "binary"
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      throw new Error('Invalid encoding type "' + opts.encoding + '"')
    }
    var ret
    var stream = FS.open(path, opts.flags)
    var stat = FS.stat(path)
    var length = stat.size
    var buf = new Uint8Array(length)
    FS.read(stream, buf, 0, length, 0)
    if (opts.encoding === "utf8") {
      ret = UTF8ArrayToString(buf, 0)
    } else if (opts.encoding === "binary") {
      ret = buf
    }
    FS.close(stream)
    return ret
  },
  writeFile: (path, data, opts = {}) => {
    opts.flags = opts.flags || 577
    var stream = FS.open(path, opts.flags, opts.mode)
    if (typeof data == "string") {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
    } else {
      throw new Error("Unsupported data type")
    }
    FS.close(stream)
  },
  cwd: () => FS.currentPath,
  chdir: (path) => {
    var lookup = FS.lookupPath(path, { follow: true })
    if (lookup.node === null) {
      throw new FS.ErrnoError(44)
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54)
    }
    var errCode = FS.nodePermissions(lookup.node, "x")
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    FS.currentPath = lookup.path
  },
  createDefaultDirectories: () => {
    FS.mkdir("/tmp")
    FS.mkdir("/home")
    FS.mkdir("/home/web_user")
  },
  createDefaultDevices: () => {
    FS.mkdir("/dev")
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length,
    })
    FS.mkdev("/dev/null", FS.makedev(1, 3))
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
    FS.mkdev("/dev/tty", FS.makedev(5, 0))
    FS.mkdev("/dev/tty1", FS.makedev(6, 0))
    var random_device = getRandomDevice()
    FS.createDevice("/dev", "random", random_device)
    FS.createDevice("/dev", "urandom", random_device)
    FS.mkdir("/dev/shm")
    FS.mkdir("/dev/shm/tmp")
  },
  createSpecialDirectories: () => {
    FS.mkdir("/proc")
    var proc_self = FS.mkdir("/proc/self")
    FS.mkdir("/proc/self/fd")
    FS.mount(
      {
        mount: () => {
          var node = FS.createNode(proc_self, "fd", 16384 | 511, 73)
          node.node_ops = {
            lookup: (parent, name) => {
              var fd = +name
              var stream = FS.getStream(fd)
              if (!stream) throw new FS.ErrnoError(8)
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: { readlink: () => stream.path },
              }
              ret.parent = ret
              return ret
            },
          }
          return node
        },
      },
      {},
      "/proc/self/fd",
    )
  },
  createStandardStreams: () => {
    if (Module["stdin"]) {
      FS.createDevice("/dev", "stdin", Module["stdin"])
    } else {
      FS.symlink("/dev/tty", "/dev/stdin")
    }
    if (Module["stdout"]) {
      FS.createDevice("/dev", "stdout", null, Module["stdout"])
    } else {
      FS.symlink("/dev/tty", "/dev/stdout")
    }
    if (Module["stderr"]) {
      FS.createDevice("/dev", "stderr", null, Module["stderr"])
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr")
    }
    var stdin = FS.open("/dev/stdin", 0)
    var stdout = FS.open("/dev/stdout", 1)
    var stderr = FS.open("/dev/stderr", 1)
  },
  ensureErrnoError: () => {
    if (FS.ErrnoError) return
    FS.ErrnoError = function ErrnoError(errno, node) {
      this.node = node
      this.setErrno = function (errno) {
        this.errno = errno
      }
      this.setErrno(errno)
      this.message = "FS error"
    }
    FS.ErrnoError.prototype = new Error()
    FS.ErrnoError.prototype.constructor = FS.ErrnoError
    ;[44].forEach((code) => {
      FS.genericErrors[code] = new FS.ErrnoError(code)
      FS.genericErrors[code].stack = "<generic error, no stack>"
    })
  },
  staticInit: () => {
    FS.ensureErrnoError()
    FS.nameTable = new Array(4096)
    FS.mount(MEMFS, {}, "/")
    FS.createDefaultDirectories()
    FS.createDefaultDevices()
    FS.createSpecialDirectories()
    FS.filesystems = { MEMFS: MEMFS }
  },
  init: (input, output, error) => {
    FS.init.initialized = true
    FS.ensureErrnoError()
    Module["stdin"] = input || Module["stdin"]
    Module["stdout"] = output || Module["stdout"]
    Module["stderr"] = error || Module["stderr"]
    FS.createStandardStreams()
  },
  quit: () => {
    FS.init.initialized = false
    _fflush(0)
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i]
      if (!stream) {
        continue
      }
      FS.close(stream)
    }
  },
  getMode: (canRead, canWrite) => {
    var mode = 0
    if (canRead) mode |= 292 | 73
    if (canWrite) mode |= 146
    return mode
  },
  findObject: (path, dontResolveLastLink) => {
    var ret = FS.analyzePath(path, dontResolveLastLink)
    if (!ret.exists) {
      return null
    }
    return ret.object
  },
  analyzePath: (path, dontResolveLastLink) => {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
      path = lookup.path
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null,
    }
    try {
      var lookup = FS.lookupPath(path, { parent: true })
      ret.parentExists = true
      ret.parentPath = lookup.path
      ret.parentObject = lookup.node
      ret.name = PATH.basename(path)
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
      ret.exists = true
      ret.path = lookup.path
      ret.object = lookup.node
      ret.name = lookup.node.name
      ret.isRoot = lookup.path === "/"
    } catch (e) {
      ret.error = e.errno
    }
    return ret
  },
  createPath: (parent, path, canRead, canWrite) => {
    parent = typeof parent == "string" ? parent : FS.getPath(parent)
    var parts = path.split("/").reverse()
    while (parts.length) {
      var part = parts.pop()
      if (!part) continue
      var current = PATH.join2(parent, part)
      try {
        FS.mkdir(current)
      } catch (e) {}
      parent = current
    }
    return current
  },
  createFile: (parent, name, properties, canRead, canWrite) => {
    var path = PATH.join2(
      typeof parent == "string" ? parent : FS.getPath(parent),
      name,
    )
    var mode = FS.getMode(canRead, canWrite)
    return FS.create(path, mode)
  },
  createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
    var path = name
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent)
      path = name ? PATH.join2(parent, name) : parent
    }
    var mode = FS.getMode(canRead, canWrite)
    var node = FS.create(path, mode)
    if (data) {
      if (typeof data == "string") {
        var arr = new Array(data.length)
        for (var i = 0, len = data.length; i < len; ++i)
          arr[i] = data.charCodeAt(i)
        data = arr
      }
      FS.chmod(node, mode | 146)
      var stream = FS.open(node, 577)
      FS.write(stream, data, 0, data.length, 0, canOwn)
      FS.close(stream)
      FS.chmod(node, mode)
    }
    return node
  },
  createDevice: (parent, name, input, output) => {
    var path = PATH.join2(
      typeof parent == "string" ? parent : FS.getPath(parent),
      name,
    )
    var mode = FS.getMode(!!input, !!output)
    if (!FS.createDevice.major) FS.createDevice.major = 64
    var dev = FS.makedev(FS.createDevice.major++, 0)
    FS.registerDevice(dev, {
      open: (stream) => {
        stream.seekable = false
      },
      close: (stream) => {
        if (output && output.buffer && output.buffer.length) {
          output(10)
        }
      },
      read: (stream, buffer, offset, length, pos) => {
        var bytesRead = 0
        for (var i = 0; i < length; i++) {
          var result
          try {
            result = input()
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6)
          }
          if (result === null || result === undefined) break
          bytesRead++
          buffer[offset + i] = result
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now()
        }
        return bytesRead
      },
      write: (stream, buffer, offset, length, pos) => {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i])
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
        }
        if (length) {
          stream.node.timestamp = Date.now()
        }
        return i
      },
    })
    return FS.mkdev(path, mode, dev)
  },
  forceLoadFile: (obj) => {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
    if (typeof XMLHttpRequest != "undefined") {
      throw new Error(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
      )
    } else if (read_) {
      try {
        obj.contents = intArrayFromString(read_(obj.url), true)
        obj.usedBytes = obj.contents.length
      } catch (e) {
        throw new FS.ErrnoError(29)
      }
    } else {
      throw new Error("Cannot load without read() or XMLHttpRequest.")
    }
  },
  createLazyFile: (parent, name, url, canRead, canWrite) => {
    function LazyUint8Array() {
      this.lengthKnown = false
      this.chunks = []
    }
    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
      if (idx > this.length - 1 || idx < 0) {
        return undefined
      }
      var chunkOffset = idx % this.chunkSize
      var chunkNum = (idx / this.chunkSize) | 0
      return this.getter(chunkNum)[chunkOffset]
    }
    LazyUint8Array.prototype.setDataGetter =
      function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter
      }
    LazyUint8Array.prototype.cacheLength =
      function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest()
        xhr.open("HEAD", url, false)
        xhr.send(null)
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + ". Status: " + xhr.status)
        var datalength = Number(xhr.getResponseHeader("Content-length"))
        var header
        var hasByteServing =
          (header = xhr.getResponseHeader("Accept-Ranges")) &&
          header === "bytes"
        var usesGzip =
          (header = xhr.getResponseHeader("Content-Encoding")) &&
          header === "gzip"
        var chunkSize = 1024 * 1024
        if (!hasByteServing) chunkSize = datalength
        var doXHR = (from, to) => {
          if (from > to)
            throw new Error(
              "invalid range (" + from + ", " + to + ") or no bytes requested!",
            )
          if (to > datalength - 1)
            throw new Error(
              "only " + datalength + " bytes available! programmer error!",
            )
          var xhr = new XMLHttpRequest()
          xhr.open("GET", url, false)
          if (datalength !== chunkSize)
            xhr.setRequestHeader("Range", "bytes=" + from + "-" + to)
          xhr.responseType = "arraybuffer"
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined")
          }
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status)
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || [])
          }
          return intArrayFromString(xhr.responseText || "", true)
        }
        var lazyArray = this
        lazyArray.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize
          var end = (chunkNum + 1) * chunkSize - 1
          end = Math.min(end, datalength - 1)
          if (typeof lazyArray.chunks[chunkNum] == "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end)
          }
          if (typeof lazyArray.chunks[chunkNum] == "undefined")
            throw new Error("doXHR failed!")
          return lazyArray.chunks[chunkNum]
        })
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1
          datalength = this.getter(0).length
          chunkSize = datalength
          out(
            "LazyFiles on gzip forces download of the whole file when length is accessed",
          )
        }
        this._length = datalength
        this._chunkSize = chunkSize
        this.lengthKnown = true
      }
    if (typeof XMLHttpRequest != "undefined") {
      if (!ENVIRONMENT_IS_WORKER)
        throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"
      var lazyArray = new LazyUint8Array()
      Object.defineProperties(lazyArray, {
        length: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength()
            }
            return this._length
          },
        },
        chunkSize: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength()
            }
            return this._chunkSize
          },
        },
      })
      var properties = { isDevice: false, contents: lazyArray }
    } else {
      var properties = { isDevice: false, url: url }
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite)
    if (properties.contents) {
      node.contents = properties.contents
    } else if (properties.url) {
      node.contents = null
      node.url = properties.url
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function () {
          return this.contents.length
        },
      },
    })
    var stream_ops = {}
    var keys = Object.keys(node.stream_ops)
    keys.forEach((key) => {
      var fn = node.stream_ops[key]
      stream_ops[key] = function forceLoadLazyFile() {
        FS.forceLoadFile(node)
        return fn.apply(null, arguments)
      }
    })
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents
      if (position >= contents.length) return 0
      var size = Math.min(contents.length - position, length)
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i]
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i)
        }
      }
      return size
    }
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node)
      return writeChunks(stream, buffer, offset, length, position)
    }
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node)
      var ptr = mmapAlloc(length)
      if (!ptr) {
        throw new FS.ErrnoError(48)
      }
      writeChunks(stream, HEAP8, ptr, length, position)
      return { ptr: ptr, allocated: true }
    }
    node.stream_ops = stream_ops
    return node
  },
  createPreloadedFile: (
    parent,
    name,
    url,
    canRead,
    canWrite,
    onload,
    onerror,
    dontCreateFile,
    canOwn,
    preFinish,
  ) => {
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
    var dep = getUniqueRunDependency("cp " + fullname)
    function processData(byteArray) {
      function finish(byteArray) {
        if (preFinish) preFinish()
        if (!dontCreateFile) {
          FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
        }
        if (onload) onload()
        removeRunDependency(dep)
      }
      if (
        Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
          if (onerror) onerror()
          removeRunDependency(dep)
        })
      ) {
        return
      }
      finish(byteArray)
    }
    addRunDependency(dep)
    if (typeof url == "string") {
      asyncLoad(url, (byteArray) => processData(byteArray), onerror)
    } else {
      processData(url)
    }
  },
  indexedDB: () => {
    return (
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
    )
  },
  DB_NAME: () => {
    return "EM_FS_" + window.location.pathname
  },
  DB_VERSION: 20,
  DB_STORE_NAME: "FILE_DATA",
  saveFilesToDB: (paths, onload, onerror) => {
    onload = onload || (() => {})
    onerror = onerror || (() => {})
    var indexedDB = FS.indexedDB()
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
    } catch (e) {
      return onerror(e)
    }
    openRequest.onupgradeneeded = () => {
      out("creating db")
      var db = openRequest.result
      db.createObjectStore(FS.DB_STORE_NAME)
    }
    openRequest.onsuccess = () => {
      var db = openRequest.result
      var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite")
      var files = transaction.objectStore(FS.DB_STORE_NAME)
      var ok = 0,
        fail = 0,
        total = paths.length
      function finish() {
        if (fail == 0) onload()
        else onerror()
      }
      paths.forEach((path) => {
        var putRequest = files.put(FS.analyzePath(path).object.contents, path)
        putRequest.onsuccess = () => {
          ok++
          if (ok + fail == total) finish()
        }
        putRequest.onerror = () => {
          fail++
          if (ok + fail == total) finish()
        }
      })
      transaction.onerror = onerror
    }
    openRequest.onerror = onerror
  },
  loadFilesFromDB: (paths, onload, onerror) => {
    onload = onload || (() => {})
    onerror = onerror || (() => {})
    var indexedDB = FS.indexedDB()
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
    } catch (e) {
      return onerror(e)
    }
    openRequest.onupgradeneeded = onerror
    openRequest.onsuccess = () => {
      var db = openRequest.result
      try {
        var transaction = db.transaction([FS.DB_STORE_NAME], "readonly")
      } catch (e) {
        onerror(e)
        return
      }
      var files = transaction.objectStore(FS.DB_STORE_NAME)
      var ok = 0,
        fail = 0,
        total = paths.length
      function finish() {
        if (fail == 0) onload()
        else onerror()
      }
      paths.forEach((path) => {
        var getRequest = files.get(path)
        getRequest.onsuccess = () => {
          if (FS.analyzePath(path).exists) {
            FS.unlink(path)
          }
          FS.createDataFile(
            PATH.dirname(path),
            PATH.basename(path),
            getRequest.result,
            true,
            true,
            true,
          )
          ok++
          if (ok + fail == total) finish()
        }
        getRequest.onerror = () => {
          fail++
          if (ok + fail == total) finish()
        }
      })
      transaction.onerror = onerror
    }
    openRequest.onerror = onerror
  },
}
var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  calculateAt: function (dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path
    }
    var dir
    if (dirfd === -100) {
      dir = FS.cwd()
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd)
      dir = dirstream.path
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44)
      }
      return dir
    }
    return PATH.join2(dir, path)
  },
  doStat: function (func, path, buf) {
    try {
      var stat = func(path)
    } catch (e) {
      if (
        e &&
        e.node &&
        PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
      ) {
        return -54
      }
      throw e
    }
    HEAP32[buf >> 2] = stat.dev
    HEAP32[(buf + 8) >> 2] = stat.ino
    HEAP32[(buf + 12) >> 2] = stat.mode
    HEAPU32[(buf + 16) >> 2] = stat.nlink
    HEAP32[(buf + 20) >> 2] = stat.uid
    HEAP32[(buf + 24) >> 2] = stat.gid
    HEAP32[(buf + 28) >> 2] = stat.rdev
    ;(tempI64 = [
      stat.size >>> 0,
      ((tempDouble = stat.size),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 40) >> 2] = tempI64[0]),
      (HEAP32[(buf + 44) >> 2] = tempI64[1])
    HEAP32[(buf + 48) >> 2] = 4096
    HEAP32[(buf + 52) >> 2] = stat.blocks
    ;(tempI64 = [
      Math.floor(stat.atime.getTime() / 1e3) >>> 0,
      ((tempDouble = Math.floor(stat.atime.getTime() / 1e3)),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 56) >> 2] = tempI64[0]),
      (HEAP32[(buf + 60) >> 2] = tempI64[1])
    HEAPU32[(buf + 64) >> 2] = 0
    ;(tempI64 = [
      Math.floor(stat.mtime.getTime() / 1e3) >>> 0,
      ((tempDouble = Math.floor(stat.mtime.getTime() / 1e3)),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 72) >> 2] = tempI64[0]),
      (HEAP32[(buf + 76) >> 2] = tempI64[1])
    HEAPU32[(buf + 80) >> 2] = 0
    ;(tempI64 = [
      Math.floor(stat.ctime.getTime() / 1e3) >>> 0,
      ((tempDouble = Math.floor(stat.ctime.getTime() / 1e3)),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 88) >> 2] = tempI64[0]),
      (HEAP32[(buf + 92) >> 2] = tempI64[1])
    HEAPU32[(buf + 96) >> 2] = 0
    ;(tempI64 = [
      stat.ino >>> 0,
      ((tempDouble = stat.ino),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[(buf + 104) >> 2] = tempI64[0]),
      (HEAP32[(buf + 108) >> 2] = tempI64[1])
    return 0
  },
  doMsync: function (addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43)
    }
    if (flags & 2) {
      return 0
    }
    var buffer = HEAPU8.slice(addr, addr + len)
    FS.msync(stream, buffer, offset, len, flags)
  },
  varargs: undefined,
  get: function () {
    SYSCALLS.varargs += 4
    var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
    return ret
  },
  getStr: function (ptr) {
    var ret = UTF8ToString(ptr)
    return ret
  },
  getStreamFromFD: function (fd) {
    var stream = FS.getStream(fd)
    if (!stream) throw new FS.ErrnoError(8)
    return stream
  },
}
function _proc_exit(code) {
  EXITSTATUS = code
  if (!keepRuntimeAlive()) {
    if (Module["onExit"]) Module["onExit"](code)
    ABORT = true
  }
  quit_(code, new ExitStatus(code))
}
function exitJS(status, implicit) {
  EXITSTATUS = status
  if (!keepRuntimeAlive()) {
    exitRuntime()
  }
  _proc_exit(status)
}
var _exit = exitJS
function handleException(e) {
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS
  }
  quit_(1, e)
}
function maybeExit() {
  if (!keepRuntimeAlive()) {
    try {
      _exit(EXITSTATUS)
    } catch (e) {
      handleException(e)
    }
  }
}
function runtimeKeepalivePop() {
  runtimeKeepaliveCounter -= 1
}
function setMainLoop(
  browserIterationFunc,
  fps,
  simulateInfiniteLoop,
  arg,
  noSetTiming,
) {
  assert(
    !Browser.mainLoop.func,
    "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.",
  )
  Browser.mainLoop.func = browserIterationFunc
  Browser.mainLoop.arg = arg
  var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
  function checkIsRunning() {
    if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
      runtimeKeepalivePop()
      maybeExit()
      return false
    }
    return true
  }
  Browser.mainLoop.running = false
  Browser.mainLoop.runner = function Browser_mainLoop_runner() {
    if (ABORT) return
    if (Browser.mainLoop.queue.length > 0) {
      var start = Date.now()
      var blocker = Browser.mainLoop.queue.shift()
      blocker.func(blocker.arg)
      if (Browser.mainLoop.remainingBlockers) {
        var remaining = Browser.mainLoop.remainingBlockers
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining)
        if (blocker.counted) {
          Browser.mainLoop.remainingBlockers = next
        } else {
          next = next + 0.5
          Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
        }
      }
      out(
        'main loop blocker "' +
          blocker.name +
          '" took ' +
          (Date.now() - start) +
          " ms",
      )
      Browser.mainLoop.updateStatus()
      if (!checkIsRunning()) return
      setTimeout(Browser.mainLoop.runner, 0)
      return
    }
    if (!checkIsRunning()) return
    Browser.mainLoop.currentFrameNumber =
      (Browser.mainLoop.currentFrameNumber + 1) | 0
    if (
      Browser.mainLoop.timingMode == 1 &&
      Browser.mainLoop.timingValue > 1 &&
      Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0
    ) {
      Browser.mainLoop.scheduler()
      return
    } else if (Browser.mainLoop.timingMode == 0) {
      Browser.mainLoop.tickStartTime = _emscripten_get_now()
    }
    GL.newRenderingFrameStarted()
    Browser.mainLoop.runIter(browserIterationFunc)
    if (!checkIsRunning()) return
    if (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData)
      SDL.audio.queueNewAudioData()
    Browser.mainLoop.scheduler()
  }
  if (!noSetTiming) {
    if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps)
    else _emscripten_set_main_loop_timing(1, 1)
    Browser.mainLoop.scheduler()
  }
  if (simulateInfiniteLoop) {
    throw "unwind"
  }
}
function callUserCallback(func) {
  if (runtimeExited || ABORT) {
    return
  }
  try {
    func()
    maybeExit()
  } catch (e) {
    handleException(e)
  }
}
function safeSetTimeout(func, timeout) {
  runtimeKeepalivePush()
  return setTimeout(function () {
    runtimeKeepalivePop()
    callUserCallback(func)
  }, timeout)
}
function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {}
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1
    err(text)
  }
}
var Browser = {
  mainLoop: {
    running: false,
    scheduler: null,
    method: "",
    currentlyRunningMainloop: 0,
    func: null,
    arg: 0,
    timingMode: 0,
    timingValue: 0,
    currentFrameNumber: 0,
    queue: [],
    pause: function () {
      Browser.mainLoop.scheduler = null
      Browser.mainLoop.currentlyRunningMainloop++
    },
    resume: function () {
      Browser.mainLoop.currentlyRunningMainloop++
      var timingMode = Browser.mainLoop.timingMode
      var timingValue = Browser.mainLoop.timingValue
      var func = Browser.mainLoop.func
      Browser.mainLoop.func = null
      setMainLoop(func, 0, false, Browser.mainLoop.arg, true)
      _emscripten_set_main_loop_timing(timingMode, timingValue)
      Browser.mainLoop.scheduler()
    },
    updateStatus: function () {
      if (Module["setStatus"]) {
        var message = Module["statusMessage"] || "Please wait..."
        var remaining = Browser.mainLoop.remainingBlockers
        var expected = Browser.mainLoop.expectedBlockers
        if (remaining) {
          if (remaining < expected) {
            Module["setStatus"](
              message + " (" + (expected - remaining) + "/" + expected + ")",
            )
          } else {
            Module["setStatus"](message)
          }
        } else {
          Module["setStatus"]("")
        }
      }
    },
    runIter: function (func) {
      if (ABORT) return
      if (Module["preMainLoop"]) {
        var preRet = Module["preMainLoop"]()
        if (preRet === false) {
          return
        }
      }
      callUserCallback(func)
      if (Module["postMainLoop"]) Module["postMainLoop"]()
    },
  },
  isFullscreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  workers: [],
  init: function () {
    if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []
    if (Browser.initted) return
    Browser.initted = true
    try {
      new Blob()
      Browser.hasBlobConstructor = true
    } catch (e) {
      Browser.hasBlobConstructor = false
      err("warning: no blob constructor, cannot create blobs with mimetypes")
    }
    Browser.BlobBuilder =
      typeof MozBlobBuilder != "undefined"
        ? MozBlobBuilder
        : typeof WebKitBlobBuilder != "undefined"
        ? WebKitBlobBuilder
        : !Browser.hasBlobConstructor
        ? err("warning: no BlobBuilder")
        : null
    Browser.URLObject =
      typeof window != "undefined"
        ? window.URL
          ? window.URL
          : window.webkitURL
        : undefined
    if (!Module.noImageDecoding && typeof Browser.URLObject == "undefined") {
      err(
        "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.",
      )
      Module.noImageDecoding = true
    }
    var imagePlugin = {}
    imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
      return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
    }
    imagePlugin["handle"] = function imagePlugin_handle(
      byteArray,
      name,
      onload,
      onerror,
    ) {
      var b = null
      if (Browser.hasBlobConstructor) {
        try {
          b = new Blob([byteArray], { type: Browser.getMimetype(name) })
          if (b.size !== byteArray.length) {
            b = new Blob([new Uint8Array(byteArray).buffer], {
              type: Browser.getMimetype(name),
            })
          }
        } catch (e) {
          warnOnce(
            "Blob constructor present but fails: " +
              e +
              "; falling back to blob builder",
          )
        }
      }
      if (!b) {
        var bb = new Browser.BlobBuilder()
        bb.append(new Uint8Array(byteArray).buffer)
        b = bb.getBlob()
      }
      var url = Browser.URLObject.createObjectURL(b)
      var img = new Image()
      img.onload = () => {
        assert(img.complete, "Image " + name + " could not be decoded")
        var canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0)
        preloadedImages[name] = canvas
        Browser.URLObject.revokeObjectURL(url)
        if (onload) onload(byteArray)
      }
      img.onerror = (event) => {
        out("Image " + url + " could not be decoded")
        if (onerror) onerror()
      }
      img.src = url
    }
    Module["preloadPlugins"].push(imagePlugin)
    var audioPlugin = {}
    audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
      return (
        !Module.noAudioDecoding &&
        name.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 }
      )
    }
    audioPlugin["handle"] = function audioPlugin_handle(
      byteArray,
      name,
      onload,
      onerror,
    ) {
      var done = false
      function finish(audio) {
        if (done) return
        done = true
        preloadedAudios[name] = audio
        if (onload) onload(byteArray)
      }
      function fail() {
        if (done) return
        done = true
        preloadedAudios[name] = new Audio()
        if (onerror) onerror()
      }
      if (Browser.hasBlobConstructor) {
        try {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) })
        } catch (e) {
          return fail()
        }
        var url = Browser.URLObject.createObjectURL(b)
        var audio = new Audio()
        audio.addEventListener("canplaythrough", () => finish(audio), false)
        audio.onerror = function audio_onerror(event) {
          if (done) return
          err(
            "warning: browser could not fully decode audio " +
              name +
              ", trying slower base64 approach",
          )
          function encode64(data) {
            var BASE =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
            var PAD = "="
            var ret = ""
            var leftchar = 0
            var leftbits = 0
            for (var i = 0; i < data.length; i++) {
              leftchar = (leftchar << 8) | data[i]
              leftbits += 8
              while (leftbits >= 6) {
                var curr = (leftchar >> (leftbits - 6)) & 63
                leftbits -= 6
                ret += BASE[curr]
              }
            }
            if (leftbits == 2) {
              ret += BASE[(leftchar & 3) << 4]
              ret += PAD + PAD
            } else if (leftbits == 4) {
              ret += BASE[(leftchar & 15) << 2]
              ret += PAD
            }
            return ret
          }
          audio.src =
            "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray)
          finish(audio)
        }
        audio.src = url
        safeSetTimeout(function () {
          finish(audio)
        }, 1e4)
      } else {
        return fail()
      }
    }
    Module["preloadPlugins"].push(audioPlugin)
    function pointerLockChange() {
      Browser.pointerLock =
        document["pointerLockElement"] === Module["canvas"] ||
        document["mozPointerLockElement"] === Module["canvas"] ||
        document["webkitPointerLockElement"] === Module["canvas"] ||
        document["msPointerLockElement"] === Module["canvas"]
    }
    var canvas = Module["canvas"]
    if (canvas) {
      canvas.requestPointerLock =
        canvas["requestPointerLock"] ||
        canvas["mozRequestPointerLock"] ||
        canvas["webkitRequestPointerLock"] ||
        canvas["msRequestPointerLock"] ||
        (() => {})
      canvas.exitPointerLock =
        document["exitPointerLock"] ||
        document["mozExitPointerLock"] ||
        document["webkitExitPointerLock"] ||
        document["msExitPointerLock"] ||
        (() => {})
      canvas.exitPointerLock = canvas.exitPointerLock.bind(document)
      document.addEventListener("pointerlockchange", pointerLockChange, false)
      document.addEventListener(
        "mozpointerlockchange",
        pointerLockChange,
        false,
      )
      document.addEventListener(
        "webkitpointerlockchange",
        pointerLockChange,
        false,
      )
      document.addEventListener("mspointerlockchange", pointerLockChange, false)
      if (Module["elementPointerLock"]) {
        canvas.addEventListener(
          "click",
          (ev) => {
            if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
              Module["canvas"].requestPointerLock()
              ev.preventDefault()
            }
          },
          false,
        )
      }
    }
  },
  handledByPreloadPlugin: function (byteArray, fullname, finish, onerror) {
    Browser.init()
    var handled = false
    Module["preloadPlugins"].forEach(function (plugin) {
      if (handled) return
      if (plugin["canHandle"](fullname)) {
        plugin["handle"](byteArray, fullname, finish, onerror)
        handled = true
      }
    })
    return handled
  },
  createContext: function (
    canvas,
    useWebGL,
    setInModule,
    webGLContextAttributes,
  ) {
    if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx
    var ctx
    var contextHandle
    if (useWebGL) {
      var contextAttributes = {
        antialias: false,
        alpha: false,
        majorVersion: 1,
      }
      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute]
        }
      }
      if (typeof GL != "undefined") {
        contextHandle = GL.createContext(canvas, contextAttributes)
        if (contextHandle) {
          ctx = GL.getContext(contextHandle).GLctx
        }
      }
    } else {
      ctx = canvas.getContext("2d")
    }
    if (!ctx) return null
    if (setInModule) {
      if (!useWebGL)
        assert(
          typeof GLctx == "undefined",
          "cannot set in module if GLctx is used, but we are a non-GL context that would replace it",
        )
      Module.ctx = ctx
      if (useWebGL) GL.makeContextCurrent(contextHandle)
      Module.useWebGL = useWebGL
      Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
        callback()
      })
      Browser.init()
    }
    return ctx
  },
  destroyContext: function (canvas, useWebGL, setInModule) {},
  fullscreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullscreen: function (lockPointer, resizeCanvas) {
    Browser.lockPointer = lockPointer
    Browser.resizeCanvas = resizeCanvas
    if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true
    if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false
    var canvas = Module["canvas"]
    function fullscreenChange() {
      Browser.isFullscreen = false
      var canvasContainer = canvas.parentNode
      if (
        (document["fullscreenElement"] ||
          document["mozFullScreenElement"] ||
          document["msFullscreenElement"] ||
          document["webkitFullscreenElement"] ||
          document["webkitCurrentFullScreenElement"]) === canvasContainer
      ) {
        canvas.exitFullscreen = Browser.exitFullscreen
        if (Browser.lockPointer) canvas.requestPointerLock()
        Browser.isFullscreen = true
        if (Browser.resizeCanvas) {
          Browser.setFullscreenCanvasSize()
        } else {
          Browser.updateCanvasDimensions(canvas)
        }
      } else {
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer)
        canvasContainer.parentNode.removeChild(canvasContainer)
        if (Browser.resizeCanvas) {
          Browser.setWindowedCanvasSize()
        } else {
          Browser.updateCanvasDimensions(canvas)
        }
      }
      if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen)
      if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen)
    }
    if (!Browser.fullscreenHandlersInstalled) {
      Browser.fullscreenHandlersInstalled = true
      document.addEventListener("fullscreenchange", fullscreenChange, false)
      document.addEventListener("mozfullscreenchange", fullscreenChange, false)
      document.addEventListener(
        "webkitfullscreenchange",
        fullscreenChange,
        false,
      )
      document.addEventListener("MSFullscreenChange", fullscreenChange, false)
    }
    var canvasContainer = document.createElement("div")
    canvas.parentNode.insertBefore(canvasContainer, canvas)
    canvasContainer.appendChild(canvas)
    canvasContainer.requestFullscreen =
      canvasContainer["requestFullscreen"] ||
      canvasContainer["mozRequestFullScreen"] ||
      canvasContainer["msRequestFullscreen"] ||
      (canvasContainer["webkitRequestFullscreen"]
        ? () =>
            canvasContainer["webkitRequestFullscreen"](
              Element["ALLOW_KEYBOARD_INPUT"],
            )
        : null) ||
      (canvasContainer["webkitRequestFullScreen"]
        ? () =>
            canvasContainer["webkitRequestFullScreen"](
              Element["ALLOW_KEYBOARD_INPUT"],
            )
        : null)
    canvasContainer.requestFullscreen()
  },
  exitFullscreen: function () {
    if (!Browser.isFullscreen) {
      return false
    }
    var CFS =
      document["exitFullscreen"] ||
      document["cancelFullScreen"] ||
      document["mozCancelFullScreen"] ||
      document["msExitFullscreen"] ||
      document["webkitCancelFullScreen"] ||
      function () {}
    CFS.apply(document, [])
    return true
  },
  nextRAF: 0,
  fakeRequestAnimationFrame: function (func) {
    var now = Date.now()
    if (Browser.nextRAF === 0) {
      Browser.nextRAF = now + 1e3 / 60
    } else {
      while (now + 2 >= Browser.nextRAF) {
        Browser.nextRAF += 1e3 / 60
      }
    }
    var delay = Math.max(Browser.nextRAF - now, 0)
    setTimeout(func, delay)
  },
  requestAnimationFrame: function (func) {
    if (typeof requestAnimationFrame == "function") {
      requestAnimationFrame(func)
      return
    }
    var RAF = Browser.fakeRequestAnimationFrame
    RAF(func)
  },
  safeSetTimeout: function (func, timeout) {
    return safeSetTimeout(func, timeout)
  },
  safeRequestAnimationFrame: function (func) {
    runtimeKeepalivePush()
    return Browser.requestAnimationFrame(function () {
      runtimeKeepalivePop()
      callUserCallback(func)
    })
  },
  getMimetype: function (name) {
    return {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      bmp: "image/bmp",
      ogg: "audio/ogg",
      wav: "audio/wav",
      mp3: "audio/mpeg",
    }[name.substr(name.lastIndexOf(".") + 1)]
  },
  getUserMedia: function (func) {
    if (!window.getUserMedia) {
      window.getUserMedia =
        navigator["getUserMedia"] || navigator["mozGetUserMedia"]
    }
    window.getUserMedia(func)
  },
  getMovementX: function (event) {
    return (
      event["movementX"] ||
      event["mozMovementX"] ||
      event["webkitMovementX"] ||
      0
    )
  },
  getMovementY: function (event) {
    return (
      event["movementY"] ||
      event["mozMovementY"] ||
      event["webkitMovementY"] ||
      0
    )
  },
  getMouseWheelDelta: function (event) {
    var delta = 0
    switch (event.type) {
      case "DOMMouseScroll":
        delta = event.detail / 3
        break
      case "mousewheel":
        delta = event.wheelDelta / 120
        break
      case "wheel":
        delta = event.deltaY
        switch (event.deltaMode) {
          case 0:
            delta /= 100
            break
          case 1:
            delta /= 3
            break
          case 2:
            delta *= 80
            break
          default:
            throw "unrecognized mouse wheel delta mode: " + event.deltaMode
        }
        break
      default:
        throw "unrecognized mouse wheel event: " + event.type
    }
    return delta
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseEvent: function (event) {
    if (Browser.pointerLock) {
      if (event.type != "mousemove" && "mozMovementX" in event) {
        Browser.mouseMovementX = Browser.mouseMovementY = 0
      } else {
        Browser.mouseMovementX = Browser.getMovementX(event)
        Browser.mouseMovementY = Browser.getMovementY(event)
      }
      if (typeof SDL != "undefined") {
        Browser.mouseX = SDL.mouseX + Browser.mouseMovementX
        Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
      } else {
        Browser.mouseX += Browser.mouseMovementX
        Browser.mouseY += Browser.mouseMovementY
      }
    } else {
      var rect = Module["canvas"].getBoundingClientRect()
      var cw = Module["canvas"].width
      var ch = Module["canvas"].height
      var scrollX =
        typeof window.scrollX != "undefined"
          ? window.scrollX
          : window.pageXOffset
      var scrollY =
        typeof window.scrollY != "undefined"
          ? window.scrollY
          : window.pageYOffset
      if (
        event.type === "touchstart" ||
        event.type === "touchend" ||
        event.type === "touchmove"
      ) {
        var touch = event.touch
        if (touch === undefined) {
          return
        }
        var adjustedX = touch.pageX - (scrollX + rect.left)
        var adjustedY = touch.pageY - (scrollY + rect.top)
        adjustedX = adjustedX * (cw / rect.width)
        adjustedY = adjustedY * (ch / rect.height)
        var coords = { x: adjustedX, y: adjustedY }
        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords
          Browser.touches[touch.identifier] = coords
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier]
          if (!last) last = coords
          Browser.lastTouches[touch.identifier] = last
          Browser.touches[touch.identifier] = coords
        }
        return
      }
      var x = event.pageX - (scrollX + rect.left)
      var y = event.pageY - (scrollY + rect.top)
      x = x * (cw / rect.width)
      y = y * (ch / rect.height)
      Browser.mouseMovementX = x - Browser.mouseX
      Browser.mouseMovementY = y - Browser.mouseY
      Browser.mouseX = x
      Browser.mouseY = y
    }
  },
  resizeListeners: [],
  updateResizeListeners: function () {
    var canvas = Module["canvas"]
    Browser.resizeListeners.forEach(function (listener) {
      listener(canvas.width, canvas.height)
    })
  },
  setCanvasSize: function (width, height, noUpdates) {
    var canvas = Module["canvas"]
    Browser.updateCanvasDimensions(canvas, width, height)
    if (!noUpdates) Browser.updateResizeListeners()
  },
  windowedWidth: 0,
  windowedHeight: 0,
  setFullscreenCanvasSize: function () {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2]
      flags = flags | 8388608
      HEAP32[SDL.screen >> 2] = flags
    }
    Browser.updateCanvasDimensions(Module["canvas"])
    Browser.updateResizeListeners()
  },
  setWindowedCanvasSize: function () {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2]
      flags = flags & ~8388608
      HEAP32[SDL.screen >> 2] = flags
    }
    Browser.updateCanvasDimensions(Module["canvas"])
    Browser.updateResizeListeners()
  },
  updateCanvasDimensions: function (canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative
      canvas.heightNative = hNative
    } else {
      wNative = canvas.widthNative
      hNative = canvas.heightNative
    }
    var w = wNative
    var h = hNative
    if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
      if (w / h < Module["forcedAspectRatio"]) {
        w = Math.round(h * Module["forcedAspectRatio"])
      } else {
        h = Math.round(w / Module["forcedAspectRatio"])
      }
    }
    if (
      (document["fullscreenElement"] ||
        document["mozFullScreenElement"] ||
        document["msFullscreenElement"] ||
        document["webkitFullscreenElement"] ||
        document["webkitCurrentFullScreenElement"]) === canvas.parentNode &&
      typeof screen != "undefined"
    ) {
      var factor = Math.min(screen.width / w, screen.height / h)
      w = Math.round(w * factor)
      h = Math.round(h * factor)
    }
    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w
      if (canvas.height != h) canvas.height = h
      if (typeof canvas.style != "undefined") {
        canvas.style.removeProperty("width")
        canvas.style.removeProperty("height")
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative
      if (canvas.height != hNative) canvas.height = hNative
      if (typeof canvas.style != "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important")
          canvas.style.setProperty("height", h + "px", "important")
        } else {
          canvas.style.removeProperty("width")
          canvas.style.removeProperty("height")
        }
      }
    }
  },
}
var RA = {
  BUFFER_SIZE: 2048,
  context: null,
  buffers: [],
  numBuffers: 0,
  bufIndex: 0,
  bufOffset: 0,
  startTime: 0,
  nonblock: false,
  currentTimeWorkaround: false,
  setStartTime: function () {
    if (RA.context.currentTime) {
      RA.startTime =
        window["performance"]["now"]() - RA.context.currentTime * 1e3
      Module["resumeMainLoop"]()
    } else window["setTimeout"](RA.setStartTime, 0)
  },
  getCurrentPerfTime: function () {
    if (RA.startTime)
      return (window["performance"]["now"]() - RA.startTime) / 1e3
    else return 0
  },
  process: function (queueBuffers) {
    var currentTime = RA.getCurrentPerfTime()
    for (var i = 0; i < RA.bufIndex; i++) {
      if (RA.buffers[i].endTime !== 0 && RA.buffers[i].endTime < currentTime) {
        RA.buffers[i].endTime = 0
        var buf = RA.buffers.splice(i, 1)
        RA.buffers[RA.numBuffers - 1] = buf[0]
        i--
        RA.bufIndex--
      }
    }
  },
  fillBuffer: function (buf, samples) {
    var count = 0
    const leftBuffer = RA.buffers[RA.bufIndex].getChannelData(0)
    const rightBuffer = RA.buffers[RA.bufIndex].getChannelData(1)
    while (samples && RA.bufOffset !== RA.BUFFER_SIZE) {
      leftBuffer[RA.bufOffset] = HEAPF32[(buf + count * 8) >> 2]
      rightBuffer[RA.bufOffset] = HEAPF32[(buf + (count * 8 + 4)) >> 2]
      RA.bufOffset++
      count++
      samples--
    }
    return count
  },
  queueAudio: function () {
    var index = RA.bufIndex
    var startTime
    if (RA.bufIndex) startTime = RA.buffers[RA.bufIndex - 1].endTime
    else startTime = RA.context.currentTime
    RA.buffers[index].endTime = startTime + RA.buffers[index].duration
    const bufferSource = RA.context.createBufferSource()
    bufferSource.buffer = RA.buffers[index]
    bufferSource.connect(RA.context.destination)
    bufferSource.connect(RA.xdest)
    bufferSource.start(startTime)
    RA.bufIndex++
    RA.bufOffset = 0
  },
  block: function () {
    do {
      RA.process()
    } while (RA.bufIndex === RA.numBuffers)
  },
}
function _RWebAudioBufferSize() {
  return RA.numBuffers * RA.BUFFER_SIZE * 8
}
function _RWebAudioFree() {
  RA.bufIndex = 0
  RA.bufOffset = 0
}
function _RWebAudioInit(latency) {
  var ac = window["AudioContext"] || window["webkitAudioContext"]
  if (!ac) return 0
  RA.context = new ac()
  RA.xdest = RA.context.createMediaStreamDestination()
  RA.numBuffers =
    ((latency * RA.context.sampleRate) / (1e3 * RA.BUFFER_SIZE)) | 0
  if (RA.numBuffers < 2) RA.numBuffers = 2
  for (var i = 0; i < RA.numBuffers; i++) {
    RA.buffers[i] = RA.context.createBuffer(
      2,
      RA.BUFFER_SIZE,
      RA.context.sampleRate,
    )
    RA.buffers[i].endTime = 0
  }
  RA.nonblock = false
  RA.startTime = 0
  RA.context.createGain()
  window["setTimeout"](RA.setStartTime, 0)
  Module["pauseMainLoop"]()
  return 1
}
function _RWebAudioRecalibrateTime() {
  if (RA.startTime) {
    RA.startTime = window["performance"]["now"]() - RA.context.currentTime * 1e3
  }
}
function _RWebAudioSampleRate() {
  return RA.context.sampleRate
}
function _RWebAudioSetNonblockState(state) {
  RA.nonblock = state
}
function _RWebAudioStart() {
  return true
}
function _RWebAudioStop() {
  RA.bufIndex = 0
  RA.bufOffset = 0
  return true
}
function _RWebAudioWrite(buf, size) {
  RA.process()
  var samples = size / 8
  var count = 0
  while (samples) {
    if (RA.bufIndex === RA.numBuffers) {
      if (RA.nonblock) break
      else RA.block()
    }
    var fill = RA.fillBuffer(buf, samples)
    samples -= fill
    count += fill
    buf += fill * 8
    if (RA.bufOffset === RA.BUFFER_SIZE) {
      RA.queueAudio()
    }
  }
  return count * 8
}
function _RWebAudioWriteAvail() {
  RA.process()
  return ((RA.numBuffers - RA.bufIndex) * RA.BUFFER_SIZE - RA.bufOffset) * 8
}
var RWC = {
  RETRO_CAMERA_BUFFER_OPENGL_TEXTURE: 0,
  RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER: 1,
  tmp: null,
  contexts: [],
  counter: 0,
  ready: function (data) {
    return (
      RWC.contexts[data].runMode == 2 &&
      !RWC.contexts[data].videoElement.paused &&
      RWC.contexts[data].videoElement.videoWidth != 0 &&
      RWC.contexts[data].videoElement.videoHeight != 0
    )
  },
}
function _RWebCamFree(data) {
  RWC.contexts[data].videoElement.pause()
  URL.revokeObjectURL(RWC.contexts[data].videoElement.src)
  RWC.contexts[data].videoElement = null
  RWC.contexts[data] = null
}
function _RWebCamInit(caps1, caps2, width, height) {
  if (!navigator) return 0
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  if (!navigator.getMedia) return 0
  var c = ++RWC.counter
  RWC.contexts[c] = []
  RWC.contexts[c].videoElement = document.createElement("video")
  if (width !== 0 && height !== 0) {
    RWC.contexts[c].videoElement.width = width
    RWC.contexts[c].videoElement.height = height
  }
  RWC.contexts[c].runMode = 1
  RWC.contexts[c].glTex = caps1 & (1 << RWC.RETRO_CAMERA_BUFFER_OPENGL_TEXTURE)
  RWC.contexts[c].rawFb = caps1 & (1 << RWC.RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER)
  navigator.getMedia(
    { video: true, audio: false },
    function (stream) {
      RWC.contexts[c].videoElement.autoplay = true
      RWC.contexts[c].videoElement.src = URL.createObjectURL(stream)
      RWC.contexts[c].runMode = 2
    },
    function (err) {
      console.log("webcam request failed", err)
      RWC.runMode = 0
    },
  )
  if (!RWC.tmp) RWC.tmp = _malloc(4)
  return c
}
function __webgl_enable_ANGLE_instanced_arrays(ctx) {
  var ext = ctx.getExtension("ANGLE_instanced_arrays")
  if (ext) {
    ctx["vertexAttribDivisor"] = function (index, divisor) {
      ext["vertexAttribDivisorANGLE"](index, divisor)
    }
    ctx["drawArraysInstanced"] = function (mode, first, count, primcount) {
      ext["drawArraysInstancedANGLE"](mode, first, count, primcount)
    }
    ctx["drawElementsInstanced"] = function (
      mode,
      count,
      type,
      indices,
      primcount,
    ) {
      ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount)
    }
    return 1
  }
}
function __webgl_enable_OES_vertex_array_object(ctx) {
  var ext = ctx.getExtension("OES_vertex_array_object")
  if (ext) {
    ctx["createVertexArray"] = function () {
      return ext["createVertexArrayOES"]()
    }
    ctx["deleteVertexArray"] = function (vao) {
      ext["deleteVertexArrayOES"](vao)
    }
    ctx["bindVertexArray"] = function (vao) {
      ext["bindVertexArrayOES"](vao)
    }
    ctx["isVertexArray"] = function (vao) {
      return ext["isVertexArrayOES"](vao)
    }
    return 1
  }
}
function __webgl_enable_WEBGL_draw_buffers(ctx) {
  var ext = ctx.getExtension("WEBGL_draw_buffers")
  if (ext) {
    ctx["drawBuffers"] = function (n, bufs) {
      ext["drawBuffersWEBGL"](n, bufs)
    }
    return 1
  }
}
function __webgl_enable_WEBGL_multi_draw(ctx) {
  return !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"))
}
var GL = {
  counter: 1,
  buffers: [],
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  shaders: [],
  vaos: [],
  contexts: [],
  offscreenCanvases: {},
  queries: [],
  byteSizeByTypeRoot: 5120,
  byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
  stringCache: {},
  unpackAlignment: 4,
  recordError: function recordError(errorCode) {
    if (!GL.lastError) {
      GL.lastError = errorCode
    }
  },
  getNewId: function (table) {
    var ret = GL.counter++
    for (var i = table.length; i < ret; i++) {
      table[i] = null
    }
    return ret
  },
  MAX_TEMP_BUFFER_SIZE: 2097152,
  numTempVertexBuffersPerSize: 64,
  log2ceilLookup: function (i) {
    return 32 - Math.clz32(i === 0 ? 0 : i - 1)
  },
  generateTempBuffers: function (quads, context) {
    var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE)
    context.tempVertexBufferCounters1 = []
    context.tempVertexBufferCounters2 = []
    context.tempVertexBufferCounters1.length =
      context.tempVertexBufferCounters2.length = largestIndex + 1
    context.tempVertexBuffers1 = []
    context.tempVertexBuffers2 = []
    context.tempVertexBuffers1.length = context.tempVertexBuffers2.length =
      largestIndex + 1
    context.tempIndexBuffers = []
    context.tempIndexBuffers.length = largestIndex + 1
    for (var i = 0; i <= largestIndex; ++i) {
      context.tempIndexBuffers[i] = null
      context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[
        i
      ] = 0
      var ringbufferLength = GL.numTempVertexBuffersPerSize
      context.tempVertexBuffers1[i] = []
      context.tempVertexBuffers2[i] = []
      var ringbuffer1 = context.tempVertexBuffers1[i]
      var ringbuffer2 = context.tempVertexBuffers2[i]
      ringbuffer1.length = ringbuffer2.length = ringbufferLength
      for (var j = 0; j < ringbufferLength; ++j) {
        ringbuffer1[j] = ringbuffer2[j] = null
      }
    }
    if (quads) {
      context.tempQuadIndexBuffer = GLctx.createBuffer()
      context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer)
      var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1
      var quadIndexes = new Uint16Array(numIndexes)
      var i = 0,
        v = 0
      while (1) {
        quadIndexes[i++] = v
        if (i >= numIndexes) break
        quadIndexes[i++] = v + 1
        if (i >= numIndexes) break
        quadIndexes[i++] = v + 2
        if (i >= numIndexes) break
        quadIndexes[i++] = v
        if (i >= numIndexes) break
        quadIndexes[i++] = v + 2
        if (i >= numIndexes) break
        quadIndexes[i++] = v + 3
        if (i >= numIndexes) break
        v += 4
      }
      context.GLctx.bufferData(34963, quadIndexes, 35044)
      context.GLctx.bindBuffer(34963, null)
    }
  },
  getTempVertexBuffer: function getTempVertexBuffer(sizeBytes) {
    var idx = GL.log2ceilLookup(sizeBytes)
    var ringbuffer = GL.currentContext.tempVertexBuffers1[idx]
    var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx]
    GL.currentContext.tempVertexBufferCounters1[idx] =
      (GL.currentContext.tempVertexBufferCounters1[idx] + 1) &
      (GL.numTempVertexBuffersPerSize - 1)
    var vbo = ringbuffer[nextFreeBufferIndex]
    if (vbo) {
      return vbo
    }
    var prevVBO = GLctx.getParameter(34964)
    ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer()
    GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex])
    GLctx.bufferData(34962, 1 << idx, 35048)
    GLctx.bindBuffer(34962, prevVBO)
    return ringbuffer[nextFreeBufferIndex]
  },
  getTempIndexBuffer: function getTempIndexBuffer(sizeBytes) {
    var idx = GL.log2ceilLookup(sizeBytes)
    var ibo = GL.currentContext.tempIndexBuffers[idx]
    if (ibo) {
      return ibo
    }
    var prevIBO = GLctx.getParameter(34965)
    GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer()
    GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx])
    GLctx.bufferData(34963, 1 << idx, 35048)
    GLctx.bindBuffer(34963, prevIBO)
    return GL.currentContext.tempIndexBuffers[idx]
  },
  newRenderingFrameStarted: function newRenderingFrameStarted() {
    if (!GL.currentContext) {
      return
    }
    var vb = GL.currentContext.tempVertexBuffers1
    GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2
    GL.currentContext.tempVertexBuffers2 = vb
    vb = GL.currentContext.tempVertexBufferCounters1
    GL.currentContext.tempVertexBufferCounters1 =
      GL.currentContext.tempVertexBufferCounters2
    GL.currentContext.tempVertexBufferCounters2 = vb
    var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE)
    for (var i = 0; i <= largestIndex; ++i) {
      GL.currentContext.tempVertexBufferCounters1[i] = 0
    }
  },
  getSource: function (shader, count, string, length) {
    var source = ""
    for (var i = 0; i < count; ++i) {
      var len = length ? HEAP32[(length + i * 4) >> 2] : -1
      source += UTF8ToString(
        HEAP32[(string + i * 4) >> 2],
        len < 0 ? undefined : len,
      )
    }
    return source
  },
  calcBufLength: function calcBufLength(size, type, stride, count) {
    if (stride > 0) {
      return count * stride
    }
    var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot]
    return size * typeSize * count
  },
  usedTempBuffers: [],
  preDrawHandleClientVertexAttribBindings:
    function preDrawHandleClientVertexAttribBindings(count) {
      GL.resetBufferBinding = false
      for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
        var cb = GL.currentContext.clientBuffers[i]
        if (!cb.clientside || !cb.enabled) continue
        GL.resetBufferBinding = true
        var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count)
        var buf = GL.getTempVertexBuffer(size)
        GLctx.bindBuffer(34962, buf)
        GLctx.bufferSubData(34962, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size))
        cb.vertexAttribPointerAdaptor.call(
          GLctx,
          i,
          cb.size,
          cb.type,
          cb.normalized,
          cb.stride,
          0,
        )
      }
    },
  postDrawHandleClientVertexAttribBindings:
    function postDrawHandleClientVertexAttribBindings() {
      if (GL.resetBufferBinding) {
        GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding])
      }
    },
  createContext: function (canvas, webGLContextAttributes) {
    if (!canvas.getContextSafariWebGL2Fixed) {
      canvas.getContextSafariWebGL2Fixed = canvas.getContext
      function fixedGetContext(ver, attrs) {
        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs)
        return (ver == "webgl") == gl instanceof WebGLRenderingContext
          ? gl
          : null
      }
      canvas.getContext = fixedGetContext
    }
    var ctx = canvas.getContext("webgl", webGLContextAttributes)
    if (!ctx) return 0
    var handle = GL.registerContext(ctx, webGLContextAttributes)
    return handle
  },
  registerContext: function (ctx, webGLContextAttributes) {
    var handle = GL.getNewId(GL.contexts)
    var context = {
      handle: handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx,
    }
    if (ctx.canvas) ctx.canvas.GLctxObject = context
    GL.contexts[handle] = context
    if (
      typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" ||
      webGLContextAttributes.enableExtensionsByDefault
    ) {
      GL.initExtensions(context)
    }
    context.maxVertexAttribs = context.GLctx.getParameter(34921)
    context.clientBuffers = []
    for (var i = 0; i < context.maxVertexAttribs; i++) {
      context.clientBuffers[i] = {
        enabled: false,
        clientside: false,
        size: 0,
        type: 0,
        normalized: 0,
        stride: 0,
        ptr: 0,
        vertexAttribPointerAdaptor: null,
      }
    }
    GL.generateTempBuffers(false, context)
    return handle
  },
  makeContextCurrent: function (contextHandle) {
    GL.currentContext = GL.contexts[contextHandle]
    Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx
    return !(contextHandle && !GLctx)
  },
  getContext: function (contextHandle) {
    return GL.contexts[contextHandle]
  },
  deleteContext: function (contextHandle) {
    if (GL.currentContext === GL.contexts[contextHandle])
      GL.currentContext = null
    if (typeof JSEvents == "object")
      JSEvents.removeAllHandlersOnTarget(
        GL.contexts[contextHandle].GLctx.canvas,
      )
    if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined
    GL.contexts[contextHandle] = null
  },
  initExtensions: function (context) {
    if (!context) context = GL.currentContext
    if (context.initExtensionsDone) return
    context.initExtensionsDone = true
    var GLctx = context.GLctx
    __webgl_enable_ANGLE_instanced_arrays(GLctx)
    __webgl_enable_OES_vertex_array_object(GLctx)
    __webgl_enable_WEBGL_draw_buffers(GLctx)
    {
      GLctx.disjointTimerQueryExt = GLctx.getExtension(
        "EXT_disjoint_timer_query",
      )
    }
    __webgl_enable_WEBGL_multi_draw(GLctx)
    var exts = GLctx.getSupportedExtensions() || []
    exts.forEach(function (ext) {
      if (!ext.includes("lose_context") && !ext.includes("debug")) {
        GLctx.getExtension(ext)
      }
    })
  },
}
function _glBindTexture(target, texture) {
  GLctx.bindTexture(target, GL.textures[texture])
}
function writeI53ToI64(ptr, num) {
  HEAPU32[ptr >> 2] = num
  HEAPU32[(ptr + 4) >> 2] = (num - HEAPU32[ptr >> 2]) / 4294967296
}
function emscriptenWebGLGet(name_, p, type) {
  if (!p) {
    GL.recordError(1281)
    return
  }
  var ret = undefined
  switch (name_) {
    case 36346:
      ret = 1
      break
    case 36344:
      if (type != 0 && type != 1) {
        GL.recordError(1280)
      }
      return
    case 36345:
      ret = 0
      break
    case 34466:
      var formats = GLctx.getParameter(34467)
      ret = formats ? formats.length : 0
      break
  }
  if (ret === undefined) {
    var result = GLctx.getParameter(name_)
    switch (typeof result) {
      case "number":
        ret = result
        break
      case "boolean":
        ret = result ? 1 : 0
        break
      case "string":
        GL.recordError(1280)
        return
      case "object":
        if (result === null) {
          switch (name_) {
            case 34964:
            case 35725:
            case 34965:
            case 36006:
            case 36007:
            case 32873:
            case 34229:
            case 34068: {
              ret = 0
              break
            }
            default: {
              GL.recordError(1280)
              return
            }
          }
        } else if (
          result instanceof Float32Array ||
          result instanceof Uint32Array ||
          result instanceof Int32Array ||
          result instanceof Array
        ) {
          for (var i = 0; i < result.length; ++i) {
            switch (type) {
              case 0:
                HEAP32[(p + i * 4) >> 2] = result[i]
                break
              case 2:
                HEAPF32[(p + i * 4) >> 2] = result[i]
                break
              case 4:
                HEAP8[(p + i) >> 0] = result[i] ? 1 : 0
                break
            }
          }
          return
        } else {
          try {
            ret = result.name | 0
          } catch (e) {
            GL.recordError(1280)
            err(
              "GL_INVALID_ENUM in glGet" +
                type +
                "v: Unknown object returned from WebGL getParameter(" +
                name_ +
                ")! (error: " +
                e +
                ")",
            )
            return
          }
        }
        break
      default:
        GL.recordError(1280)
        err(
          "GL_INVALID_ENUM in glGet" +
            type +
            "v: Native code calling glGet" +
            type +
            "v(" +
            name_ +
            ") and it returns " +
            result +
            " of type " +
            typeof result +
            "!",
        )
        return
    }
  }
  switch (type) {
    case 1:
      writeI53ToI64(p, ret)
      break
    case 0:
      HEAP32[p >> 2] = ret
      break
    case 2:
      HEAPF32[p >> 2] = ret
      break
    case 4:
      HEAP8[p >> 0] = ret ? 1 : 0
      break
  }
}
function _glGetIntegerv(name_, p) {
  emscriptenWebGLGet(name_, p, 0)
}
function _RWebCamPoll(data, frame_raw_cb, frame_gl_cb) {
  if (!RWC.ready(data)) return 0
  var ret = 0
  if (RWC.contexts[data].glTexId !== 0 && frame_gl_cb !== 0) {
    _glGetIntegerv(32873, RWC.tmp)
    var prev = HEAP32[RWC.tmp >> 2]
    _glBindTexture(3553, RWC.contexts[data].glTexId)
    if (RWC.contexts[data].glFirstFrame) {
      Module.ctx.texImage2D(
        Module.ctx.TEXTURE_2D,
        0,
        Module.ctx.RGB,
        Module.ctx.RGB,
        Module.ctx.UNSIGNED_BYTE,
        RWC.contexts[data].videoElement,
      )
      RWC.contexts[data].glFirstFrame = false
    } else {
      Module.ctx.texSubImage2D(
        Module.ctx.TEXTURE_2D,
        0,
        0,
        0,
        Module.ctx.RGB,
        Module.ctx.UNSIGNED_BYTE,
        RWC.contexts[data].videoElement,
      )
    }
    _glBindTexture(3553, prev)
    Runtime.dynCall("viii", frame_gl_cb, [RWC.contexts[data].glTexId, 3553, 0])
    ret = 1
  }
  if (RWC.contexts[data].rawFbCanvas && frame_raw_cb !== 0) {
    if (!RWC.contexts[data].rawFbCanvasCtx) {
      RWC.contexts[data].rawFbCanvas.width =
        RWC.contexts[data].videoElement.videoWidth
      RWC.contexts[data].rawFbCanvas.height =
        RWC.contexts[data].videoElement.videoHeight
      RWC.contexts[data].rawFbCanvasCtx =
        RWC.contexts[data].rawFbCanvas.getContext("2d")
      RWC.contexts[data].rawBuffer = _malloc(
        RWC.contexts[data].videoElement.videoWidth *
          RWC.contexts[data].videoElement.videoHeight *
          4,
      )
    }
    RWC.contexts[data].rawFbCanvasCtx.drawImage(
      RWC.contexts[data].videoElement,
      0,
      0,
      RWC.contexts[data].rawFbCanvas.width,
      RWC.contexts[data].rawFbCanvas.height,
    )
    var image = RWC.contexts[data].rawFbCanvasCtx.getImageData(
      0,
      0,
      RWC.contexts[data].videoElement.videoWidth,
      RWC.contexts[data].videoElement.videoHeight,
    )
    Module.HEAPU8.set(image.data, RWC.contexts[data].rawBuffer)
    Runtime.dynCall("viiii", frame_raw_cb, [
      RWC.contexts[data].rawBuffer,
      RWC.contexts[data].videoElement.videoWidth,
      RWC.contexts[data].videoElement.videoHeight,
      RWC.contexts[data].videoElement.videoWidth * 4,
    ])
    ret = 1
  }
  return ret
}
function __glGenObject(n, buffers, createFunction, objectTable) {
  for (var i = 0; i < n; i++) {
    var buffer = GLctx[createFunction]()
    var id = buffer && GL.getNewId(objectTable)
    if (buffer) {
      buffer.name = id
      objectTable[id] = buffer
    } else {
      GL.recordError(1282)
    }
    HEAP32[(buffers + i * 4) >> 2] = id
  }
}
function _glGenTextures(n, textures) {
  __glGenObject(n, textures, "createTexture", GL.textures)
}
function _glTexParameteri(x0, x1, x2) {
  GLctx["texParameteri"](x0, x1, x2)
}
function _RWebCamStart(data) {
  var ret = 0
  if (RWC.contexts[data].glTex) {
    _glGenTextures(1, RWC.tmp)
    RWC.contexts[data].glTexId = HEAP32[RWC.tmp >> 2]
    if (RWC.contexts[data].glTexId !== 0) {
      _glGetIntegerv(32873, RWC.tmp)
      var prev = HEAP32[RWC.tmp >> 2]
      _glBindTexture(3553, RWC.contexts[data].glTexId)
      _glTexParameteri(3553, 10240, 9729)
      _glTexParameteri(3553, 10241, 9729)
      _glTexParameteri(3553, 10242, 33071)
      _glTexParameteri(3553, 10243, 33071)
      _glBindTexture(3553, prev)
      RWC.contexts[data].glFirstFrame = true
      ret = 1
    }
  }
  if (RWC.contexts[data].rawFb) {
    RWC.contexts[data].rawFbCanvas = document.createElement("canvas")
    ret = 1
  }
  return ret
}
function _glDeleteTextures(n, textures) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(textures + i * 4) >> 2]
    var texture = GL.textures[id]
    if (!texture) continue
    GLctx.deleteTexture(texture)
    texture.name = 0
    GL.textures[id] = null
  }
}
function _RWebCamStop(data) {
  if (RWC.contexts[data].glTexId) {
    _glDeleteTextures(1, RWC.contexts[data].glTexId)
  }
  if (RWC.contexts[data].rawFbCanvas) {
    if (RWC.contexts[data].rawBuffer) {
      _free(RWC.contexts[data].rawBuffer)
      RWC.contexts[data].rawBuffer = 0
      RWC.contexts[data].rawFbCanvasCtx = null
    }
    RWC.contexts[data].rawFbCanvas = null
  }
}
function ___assert_fail(condition, filename, line, func) {
  abort(
    "Assertion failed: " +
      UTF8ToString(condition) +
      ", at: " +
      [
        filename ? UTF8ToString(filename) : "unknown filename",
        line,
        func ? UTF8ToString(func) : "unknown function",
      ],
  )
}
function ___cxa_allocate_exception(size) {
  return _malloc(size + 24) + 24
}
function ExceptionInfo(excPtr) {
  this.excPtr = excPtr
  this.ptr = excPtr - 24
  this.set_type = function (type) {
    HEAPU32[(this.ptr + 4) >> 2] = type
  }
  this.get_type = function () {
    return HEAPU32[(this.ptr + 4) >> 2]
  }
  this.set_destructor = function (destructor) {
    HEAPU32[(this.ptr + 8) >> 2] = destructor
  }
  this.get_destructor = function () {
    return HEAPU32[(this.ptr + 8) >> 2]
  }
  this.set_refcount = function (refcount) {
    HEAP32[this.ptr >> 2] = refcount
  }
  this.set_caught = function (caught) {
    caught = caught ? 1 : 0
    HEAP8[(this.ptr + 12) >> 0] = caught
  }
  this.get_caught = function () {
    return HEAP8[(this.ptr + 12) >> 0] != 0
  }
  this.set_rethrown = function (rethrown) {
    rethrown = rethrown ? 1 : 0
    HEAP8[(this.ptr + 13) >> 0] = rethrown
  }
  this.get_rethrown = function () {
    return HEAP8[(this.ptr + 13) >> 0] != 0
  }
  this.init = function (type, destructor) {
    this.set_adjusted_ptr(0)
    this.set_type(type)
    this.set_destructor(destructor)
    this.set_refcount(0)
    this.set_caught(false)
    this.set_rethrown(false)
  }
  this.add_ref = function () {
    var value = HEAP32[this.ptr >> 2]
    HEAP32[this.ptr >> 2] = value + 1
  }
  this.release_ref = function () {
    var prev = HEAP32[this.ptr >> 2]
    HEAP32[this.ptr >> 2] = prev - 1
    return prev === 1
  }
  this.set_adjusted_ptr = function (adjustedPtr) {
    HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr
  }
  this.get_adjusted_ptr = function () {
    return HEAPU32[(this.ptr + 16) >> 2]
  }
  this.get_exception_ptr = function () {
    var isPointer = ___cxa_is_pointer_type(this.get_type())
    if (isPointer) {
      return HEAPU32[this.excPtr >> 2]
    }
    var adjusted = this.get_adjusted_ptr()
    if (adjusted !== 0) return adjusted
    return this.excPtr
  }
}
var exceptionLast = 0
var uncaughtExceptionCount = 0
function ___cxa_throw(ptr, type, destructor) {
  var info = new ExceptionInfo(ptr)
  info.init(type, destructor)
  exceptionLast = ptr
  uncaughtExceptionCount++
  throw ptr
}
function setErrNo(value) {
  HEAP32[___errno_location() >> 2] = value
  return value
}
function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    switch (cmd) {
      case 0: {
        var arg = SYSCALLS.get()
        if (arg < 0) {
          return -28
        }
        var newStream
        newStream = FS.createStream(stream, arg)
        return newStream.fd
      }
      case 1:
      case 2:
        return 0
      case 3:
        return stream.flags
      case 4: {
        var arg = SYSCALLS.get()
        stream.flags |= arg
        return 0
      }
      case 5: {
        var arg = SYSCALLS.get()
        var offset = 0
        HEAP16[(arg + offset) >> 1] = 2
        return 0
      }
      case 6:
      case 7:
        return 0
      case 16:
      case 8:
        return -28
      case 9:
        setErrNo(28)
        return -1
      default: {
        return -28
      }
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function convertI32PairToI53Checked(lo, hi) {
  return (hi + 2097152) >>> 0 < 4194305 - !!lo
    ? (lo >>> 0) + hi * 4294967296
    : NaN
}
function ___syscall_ftruncate64(fd, length_low, length_high) {
  try {
    var length = convertI32PairToI53Checked(length_low, length_high)
    if (isNaN(length)) return -61
    FS.ftruncate(fd, length)
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_getcwd(buf, size) {
  try {
    if (size === 0) return -28
    var cwd = FS.cwd()
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1
    if (size < cwdLengthInBytes) return -68
    stringToUTF8(cwd, buf, size)
    return cwdLengthInBytes
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_getdents64(fd, dirp, count) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    if (!stream.getdents) {
      stream.getdents = FS.readdir(stream.path)
    }
    var struct_size = 280
    var pos = 0
    var off = FS.llseek(stream, 0, 1)
    var idx = Math.floor(off / struct_size)
    while (idx < stream.getdents.length && pos + struct_size <= count) {
      var id
      var type
      var name = stream.getdents[idx]
      if (name === ".") {
        id = stream.node.id
        type = 4
      } else if (name === "..") {
        var lookup = FS.lookupPath(stream.path, { parent: true })
        id = lookup.node.id
        type = 4
      } else {
        var child = FS.lookupNode(stream.node, name)
        id = child.id
        type = FS.isChrdev(child.mode)
          ? 2
          : FS.isDir(child.mode)
          ? 4
          : FS.isLink(child.mode)
          ? 10
          : 8
      }
      ;(tempI64 = [
        id >>> 0,
        ((tempDouble = id),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
        (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1])
      ;(tempI64 = [
        ((idx + 1) * struct_size) >>> 0,
        ((tempDouble = (idx + 1) * struct_size),
        +Math.abs(tempDouble) >= 1
          ? tempDouble > 0
            ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) |
                0) >>>
              0
            : ~~+Math.ceil(
                (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
              ) >>> 0
          : 0),
      ]),
        (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
        (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1])
      HEAP16[(dirp + pos + 16) >> 1] = 280
      HEAP8[(dirp + pos + 18) >> 0] = type
      stringToUTF8(name, dirp + pos + 19, 256)
      pos += struct_size
      idx += 1
    }
    FS.llseek(stream, idx * struct_size, 0)
    return pos
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    switch (op) {
      case 21509:
      case 21505: {
        if (!stream.tty) return -59
        return 0
      }
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59
        return 0
      }
      case 21519: {
        if (!stream.tty) return -59
        var argp = SYSCALLS.get()
        HEAP32[argp >> 2] = 0
        return 0
      }
      case 21520: {
        if (!stream.tty) return -59
        return -28
      }
      case 21531: {
        var argp = SYSCALLS.get()
        return FS.ioctl(stream, op, argp)
      }
      case 21523: {
        if (!stream.tty) return -59
        return 0
      }
      case 21524: {
        if (!stream.tty) return -59
        return 0
      }
      default:
        return -28
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_mkdirat(dirfd, path, mode) {
  try {
    path = SYSCALLS.getStr(path)
    path = SYSCALLS.calculateAt(dirfd, path)
    path = PATH.normalize(path)
    if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1)
    FS.mkdir(path, mode, 0)
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs
  try {
    path = SYSCALLS.getStr(path)
    path = SYSCALLS.calculateAt(dirfd, path)
    var mode = varargs ? SYSCALLS.get() : 0
    return FS.open(path, flags, mode).fd
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  try {
    path = SYSCALLS.getStr(path)
    path = SYSCALLS.calculateAt(dirfd, path)
    if (bufsize <= 0) return -28
    var ret = FS.readlink(path)
    var len = Math.min(bufsize, lengthBytesUTF8(ret))
    var endChar = HEAP8[buf + len]
    stringToUTF8(ret, buf, bufsize + 1)
    HEAP8[buf + len] = endChar
    return len
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
  try {
    oldpath = SYSCALLS.getStr(oldpath)
    newpath = SYSCALLS.getStr(newpath)
    oldpath = SYSCALLS.calculateAt(olddirfd, oldpath)
    newpath = SYSCALLS.calculateAt(newdirfd, newpath)
    FS.rename(oldpath, newpath)
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_rmdir(path) {
  try {
    path = SYSCALLS.getStr(path)
    FS.rmdir(path)
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_stat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path)
    return SYSCALLS.doStat(FS.stat, path, buf)
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
function ___syscall_unlinkat(dirfd, path, flags) {
  try {
    path = SYSCALLS.getStr(path)
    path = SYSCALLS.calculateAt(dirfd, path)
    if (flags === 0) {
      FS.unlink(path)
    } else if (flags === 512) {
      FS.rmdir(path)
    } else {
      abort("Invalid flags passed to unlinkat")
    }
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return -e.errno
  }
}
var nowIsMonotonic = true
function __emscripten_get_now_is_monotonic() {
  return nowIsMonotonic
}
function __emscripten_throw_longjmp() {
  throw Infinity
}
function readI53FromI64(ptr) {
  return HEAPU32[ptr >> 2] + HEAP32[(ptr + 4) >> 2] * 4294967296
}
function __localtime_js(time, tmPtr) {
  var date = new Date(readI53FromI64(time) * 1e3)
  HEAP32[tmPtr >> 2] = date.getSeconds()
  HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
  HEAP32[(tmPtr + 8) >> 2] = date.getHours()
  HEAP32[(tmPtr + 12) >> 2] = date.getDate()
  HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
  HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
  HEAP32[(tmPtr + 24) >> 2] = date.getDay()
  var start = new Date(date.getFullYear(), 0, 1)
  var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
  HEAP32[(tmPtr + 28) >> 2] = yday
  HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  var winterOffset = start.getTimezoneOffset()
  var dst =
    (summerOffset != winterOffset &&
      date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
  HEAP32[(tmPtr + 32) >> 2] = dst
}
function __mktime_js(tmPtr) {
  var date = new Date(
    HEAP32[(tmPtr + 20) >> 2] + 1900,
    HEAP32[(tmPtr + 16) >> 2],
    HEAP32[(tmPtr + 12) >> 2],
    HEAP32[(tmPtr + 8) >> 2],
    HEAP32[(tmPtr + 4) >> 2],
    HEAP32[tmPtr >> 2],
    0,
  )
  var dst = HEAP32[(tmPtr + 32) >> 2]
  var guessedOffset = date.getTimezoneOffset()
  var start = new Date(date.getFullYear(), 0, 1)
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  var winterOffset = start.getTimezoneOffset()
  var dstOffset = Math.min(winterOffset, summerOffset)
  if (dst < 0) {
    HEAP32[(tmPtr + 32) >> 2] = Number(
      summerOffset != winterOffset && dstOffset == guessedOffset,
    )
  } else if (dst > 0 != (dstOffset == guessedOffset)) {
    var nonDstOffset = Math.max(winterOffset, summerOffset)
    var trueOffset = dst > 0 ? dstOffset : nonDstOffset
    date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
  }
  HEAP32[(tmPtr + 24) >> 2] = date.getDay()
  var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
  HEAP32[(tmPtr + 28) >> 2] = yday
  HEAP32[tmPtr >> 2] = date.getSeconds()
  HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
  HEAP32[(tmPtr + 8) >> 2] = date.getHours()
  HEAP32[(tmPtr + 12) >> 2] = date.getDate()
  HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
  HEAP32[(tmPtr + 20) >> 2] = date.getYear()
  return (date.getTime() / 1e3) | 0
}
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1
  var ret = _malloc(size)
  if (ret) stringToUTF8Array(str, HEAP8, ret, size)
  return ret
}
function _tzset_impl(timezone, daylight, tzname) {
  var currentYear = new Date().getFullYear()
  var winter = new Date(currentYear, 0, 1)
  var summer = new Date(currentYear, 6, 1)
  var winterOffset = winter.getTimezoneOffset()
  var summerOffset = summer.getTimezoneOffset()
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset)
  HEAP32[timezone >> 2] = stdTimezoneOffset * 60
  HEAP32[daylight >> 2] = Number(winterOffset != summerOffset)
  function extractZone(date) {
    var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
    return match ? match[1] : "GMT"
  }
  var winterName = extractZone(winter)
  var summerName = extractZone(summer)
  var winterNamePtr = allocateUTF8(winterName)
  var summerNamePtr = allocateUTF8(summerName)
  if (summerOffset < winterOffset) {
    HEAPU32[tzname >> 2] = winterNamePtr
    HEAPU32[(tzname + 4) >> 2] = summerNamePtr
  } else {
    HEAPU32[tzname >> 2] = summerNamePtr
    HEAPU32[(tzname + 4) >> 2] = winterNamePtr
  }
}
function __tzset_js(timezone, daylight, tzname) {
  if (__tzset_js.called) return
  __tzset_js.called = true
  _tzset_impl(timezone, daylight, tzname)
}
function _abort() {
  abort("")
}
var ERRNO_CODES = {}
function _dummyErrnoCodes() {
  if (!ERRNO_CODES) {
    console.error("ERRNO_CODES not imported!")
  }
}
var EGL = {
  errorCode: 12288,
  defaultDisplayInitialized: false,
  currentContext: 0,
  currentReadSurface: 0,
  currentDrawSurface: 0,
  contextAttributes: {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
  },
  stringCache: {},
  setErrorCode: function (code) {
    EGL.errorCode = code
  },
  chooseConfig: function (
    display,
    attribList,
    config,
    config_size,
    numConfigs,
  ) {
    if (display != 62e3) {
      EGL.setErrorCode(12296)
      return 0
    }
    if (attribList) {
      for (;;) {
        var param = HEAP32[attribList >> 2]
        if (param == 12321) {
          var alphaSize = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.alpha = alphaSize > 0
        } else if (param == 12325) {
          var depthSize = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.depth = depthSize > 0
        } else if (param == 12326) {
          var stencilSize = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.stencil = stencilSize > 0
        } else if (param == 12337) {
          var samples = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.antialias = samples > 0
        } else if (param == 12338) {
          var samples = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.antialias = samples == 1
        } else if (param == 12544) {
          var requestedPriority = HEAP32[(attribList + 4) >> 2]
          EGL.contextAttributes.lowLatency = requestedPriority != 12547
        } else if (param == 12344) {
          break
        }
        attribList += 8
      }
    }
    if ((!config || !config_size) && !numConfigs) {
      EGL.setErrorCode(12300)
      return 0
    }
    if (numConfigs) {
      HEAP32[numConfigs >> 2] = 1
    }
    if (config && config_size > 0) {
      HEAP32[config >> 2] = 62002
    }
    EGL.setErrorCode(12288)
    return 1
  },
}
function _eglBindAPI(api) {
  if (api == 12448) {
    EGL.setErrorCode(12288)
    return 1
  }
  EGL.setErrorCode(12300)
  return 0
}
function _eglChooseConfig(
  display,
  attrib_list,
  configs,
  config_size,
  numConfigs,
) {
  return EGL.chooseConfig(
    display,
    attrib_list,
    configs,
    config_size,
    numConfigs,
  )
}
function _eglCreateContext(display, config, hmm, contextAttribs) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  var glesContextVersion = 1
  for (;;) {
    var param = HEAP32[contextAttribs >> 2]
    if (param == 12440) {
      glesContextVersion = HEAP32[(contextAttribs + 4) >> 2]
    } else if (param == 12344) {
      break
    } else {
      EGL.setErrorCode(12292)
      return 0
    }
    contextAttribs += 8
  }
  if (glesContextVersion != 2) {
    EGL.setErrorCode(12293)
    return 0
  }
  EGL.contextAttributes.majorVersion = glesContextVersion - 1
  EGL.contextAttributes.minorVersion = 0
  EGL.context = GL.createContext(Module["canvas"], EGL.contextAttributes)
  if (EGL.context != 0) {
    EGL.setErrorCode(12288)
    GL.makeContextCurrent(EGL.context)
    Module.useWebGL = true
    Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
      callback()
    })
    GL.makeContextCurrent(null)
    return 62004
  } else {
    EGL.setErrorCode(12297)
    return 0
  }
}
function _eglCreateWindowSurface(display, config, win, attrib_list) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (config != 62002) {
    EGL.setErrorCode(12293)
    return 0
  }
  EGL.setErrorCode(12288)
  return 62006
}
function _eglDestroyContext(display, context) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (context != 62004) {
    EGL.setErrorCode(12294)
    return 0
  }
  GL.deleteContext(EGL.context)
  EGL.setErrorCode(12288)
  if (EGL.currentContext == context) {
    EGL.currentContext = 0
  }
  return 1
}
function _eglDestroySurface(display, surface) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (surface != 62006) {
    EGL.setErrorCode(12301)
    return 1
  }
  if (EGL.currentReadSurface == surface) {
    EGL.currentReadSurface = 0
  }
  if (EGL.currentDrawSurface == surface) {
    EGL.currentDrawSurface = 0
  }
  EGL.setErrorCode(12288)
  return 1
}
function _eglGetConfigs(display, configs, config_size, numConfigs) {
  return EGL.chooseConfig(display, 0, configs, config_size, numConfigs)
}
function _eglGetCurrentContext() {
  return EGL.currentContext
}
function _eglGetDisplay(nativeDisplayType) {
  EGL.setErrorCode(12288)
  return 62e3
}
function _eglGetError() {
  return EGL.errorCode
}
function _eglInitialize(display, majorVersion, minorVersion) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (majorVersion) {
    HEAP32[majorVersion >> 2] = 1
  }
  if (minorVersion) {
    HEAP32[minorVersion >> 2] = 4
  }
  EGL.defaultDisplayInitialized = true
  EGL.setErrorCode(12288)
  return 1
}
function _eglMakeCurrent(display, draw, read, context) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (context != 0 && context != 62004) {
    EGL.setErrorCode(12294)
    return 0
  }
  if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006)) {
    EGL.setErrorCode(12301)
    return 0
  }
  GL.makeContextCurrent(context ? EGL.context : null)
  EGL.currentContext = context
  EGL.currentDrawSurface = draw
  EGL.currentReadSurface = read
  EGL.setErrorCode(12288)
  return 1
}
function _eglQuerySurface(display, surface, attribute, value) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  if (surface != 62006) {
    EGL.setErrorCode(12301)
    return 0
  }
  if (!value) {
    EGL.setErrorCode(12300)
    return 0
  }
  EGL.setErrorCode(12288)
  switch (attribute) {
    case 12328:
      HEAP32[value >> 2] = 62002
      return 1
    case 12376:
      return 1
    case 12375:
      HEAP32[value >> 2] = Module["canvas"].width
      return 1
    case 12374:
      HEAP32[value >> 2] = Module["canvas"].height
      return 1
    case 12432:
      HEAP32[value >> 2] = -1
      return 1
    case 12433:
      HEAP32[value >> 2] = -1
      return 1
    case 12434:
      HEAP32[value >> 2] = -1
      return 1
    case 12422:
      HEAP32[value >> 2] = 12420
      return 1
    case 12441:
      HEAP32[value >> 2] = 12442
      return 1
    case 12435:
      HEAP32[value >> 2] = 12437
      return 1
    case 12416:
    case 12417:
    case 12418:
    case 12419:
      return 1
    default:
      EGL.setErrorCode(12292)
      return 0
  }
}
function _eglSwapBuffers() {
  if (!EGL.defaultDisplayInitialized) {
    EGL.setErrorCode(12289)
  } else if (!Module.ctx) {
    EGL.setErrorCode(12290)
  } else if (Module.ctx.isContextLost()) {
    EGL.setErrorCode(12302)
  } else {
    EGL.setErrorCode(12288)
    return 1
  }
  return 0
}
function _eglTerminate(display) {
  if (display != 62e3) {
    EGL.setErrorCode(12296)
    return 0
  }
  EGL.currentContext = 0
  EGL.currentReadSurface = 0
  EGL.currentDrawSurface = 0
  EGL.defaultDisplayInitialized = false
  EGL.setErrorCode(12288)
  return 1
}
function _emscripten_date_now() {
  return Date.now()
}
var JSEvents = {
  inEventHandler: 0,
  removeAllEventListeners: function () {
    for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
      JSEvents._removeHandler(i)
    }
    JSEvents.eventHandlers = []
    JSEvents.deferredCalls = []
  },
  registerRemoveEventListeners: function () {
    if (!JSEvents.removeEventListenersRegistered) {
      __ATEXIT__.push(JSEvents.removeAllEventListeners)
      JSEvents.removeEventListenersRegistered = true
    }
  },
  deferredCalls: [],
  deferCall: function (targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false
      for (var i in arrA) {
        if (arrA[i] != arrB[i]) return false
      }
      return true
    }
    for (var i in JSEvents.deferredCalls) {
      var call = JSEvents.deferredCalls[i]
      if (
        call.targetFunction == targetFunction &&
        arraysHaveEqualContent(call.argsList, argsList)
      ) {
        return
      }
    }
    JSEvents.deferredCalls.push({
      targetFunction: targetFunction,
      precedence: precedence,
      argsList: argsList,
    })
    JSEvents.deferredCalls.sort(function (x, y) {
      return x.precedence < y.precedence
    })
  },
  removeDeferredCalls: function (targetFunction) {
    for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
      if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
        JSEvents.deferredCalls.splice(i, 1)
        --i
      }
    }
  },
  canPerformEventHandlerRequests: function () {
    return (
      JSEvents.inEventHandler &&
      JSEvents.currentEventHandler.allowsDeferredCalls
    )
  },
  runDeferredCalls: function () {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return
    }
    for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
      var call = JSEvents.deferredCalls[i]
      JSEvents.deferredCalls.splice(i, 1)
      --i
      call.targetFunction.apply(null, call.argsList)
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: function (target, eventTypeString) {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (
        JSEvents.eventHandlers[i].target == target &&
        (!eventTypeString ||
          eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
      ) {
        JSEvents._removeHandler(i--)
      }
    }
  },
  _removeHandler: function (i) {
    var h = JSEvents.eventHandlers[i]
    h.target.removeEventListener(
      h.eventTypeString,
      h.eventListenerFunc,
      h.useCapture,
    )
    JSEvents.eventHandlers.splice(i, 1)
  },
  registerOrRemoveHandler: function (eventHandler) {
    var jsEventHandler = function jsEventHandler(event) {
      ++JSEvents.inEventHandler
      JSEvents.currentEventHandler = eventHandler
      JSEvents.runDeferredCalls()
      eventHandler.handlerFunc(event)
      JSEvents.runDeferredCalls()
      --JSEvents.inEventHandler
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = jsEventHandler
      eventHandler.target.addEventListener(
        eventHandler.eventTypeString,
        jsEventHandler,
        eventHandler.useCapture,
      )
      JSEvents.eventHandlers.push(eventHandler)
      JSEvents.registerRemoveEventListeners()
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (
          JSEvents.eventHandlers[i].target == eventHandler.target &&
          JSEvents.eventHandlers[i].eventTypeString ==
            eventHandler.eventTypeString
        ) {
          JSEvents._removeHandler(i--)
        }
      }
    }
  },
  getNodeNameForTarget: function (target) {
    if (!target) return ""
    if (target == window) return "#window"
    if (target == screen) return "#screen"
    return target && target.nodeName ? target.nodeName : ""
  },
  fullscreenEnabled: function () {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled
  },
}
function requestPointerLock(target) {
  if (target.requestPointerLock) {
    target.requestPointerLock()
  } else if (target.msRequestPointerLock) {
    target.msRequestPointerLock()
  } else {
    if (
      document.body.requestPointerLock ||
      document.body.msRequestPointerLock
    ) {
      return -3
    }
    return -1
  }
  return 0
}
function _emscripten_exit_pointerlock() {
  JSEvents.removeDeferredCalls(requestPointerLock)
  if (document.exitPointerLock) {
    document.exitPointerLock()
  } else if (document.msExitPointerLock) {
    document.msExitPointerLock()
  } else {
    return -1
  }
  return 0
}
function _emscripten_force_exit(status) {
  noExitRuntime = false
  runtimeKeepaliveCounter = 0
  _exit(status)
}
function maybeCStringToJsString(cString) {
  return cString > 2 ? UTF8ToString(cString) : cString
}
var specialHTMLTargets = [0, document, window]
function findEventTarget(target) {
  target = maybeCStringToJsString(target)
  var domElement = specialHTMLTargets[target] || document.querySelector(target)
  return domElement
}
function findCanvasEventTarget(target) {
  return findEventTarget(target)
}
function _emscripten_get_canvas_element_size(target, width, height) {
  var canvas = findCanvasEventTarget(target)
  if (!canvas) return -4
  HEAP32[width >> 2] = canvas.width
  HEAP32[height >> 2] = canvas.height
}
function fillFullscreenChangeEventData(eventStruct) {
  var fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  var isFullscreen = !!fullscreenElement
  HEAP32[eventStruct >> 2] = isFullscreen
  HEAP32[(eventStruct + 4) >> 2] = JSEvents.fullscreenEnabled()
  var reportedElement = isFullscreen
    ? fullscreenElement
    : JSEvents.previousFullscreenElement
  var nodeName = JSEvents.getNodeNameForTarget(reportedElement)
  var id = reportedElement && reportedElement.id ? reportedElement.id : ""
  stringToUTF8(nodeName, eventStruct + 8, 128)
  stringToUTF8(id, eventStruct + 136, 128)
  HEAP32[(eventStruct + 264) >> 2] = reportedElement
    ? reportedElement.clientWidth
    : 0
  HEAP32[(eventStruct + 268) >> 2] = reportedElement
    ? reportedElement.clientHeight
    : 0
  HEAP32[(eventStruct + 272) >> 2] = screen.width
  HEAP32[(eventStruct + 276) >> 2] = screen.height
  if (isFullscreen) {
    JSEvents.previousFullscreenElement = fullscreenElement
  }
}
function _emscripten_get_fullscreen_status(fullscreenStatus) {
  if (!JSEvents.fullscreenEnabled()) return -1
  fillFullscreenChangeEventData(fullscreenStatus)
  return 0
}
function fillGamepadEventData(eventStruct, e) {
  HEAPF64[eventStruct >> 3] = e.timestamp
  for (var i = 0; i < e.axes.length; ++i) {
    HEAPF64[(eventStruct + i * 8 + 16) >> 3] = e.axes[i]
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i].value
    } else {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i]
    }
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i].pressed
    } else {
      HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i] == 1
    }
  }
  HEAP32[(eventStruct + 1296) >> 2] = e.connected
  HEAP32[(eventStruct + 1300) >> 2] = e.index
  HEAP32[(eventStruct + 8) >> 2] = e.axes.length
  HEAP32[(eventStruct + 12) >> 2] = e.buttons.length
  stringToUTF8(e.id, eventStruct + 1304, 64)
  stringToUTF8(e.mapping, eventStruct + 1368, 64)
}
function _emscripten_get_gamepad_status(index, gamepadState) {
  if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5
  if (!JSEvents.lastGamepadState[index]) return -7
  fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index])
  return 0
}
function getHeapMax() {
  return 2147483648
}
function _emscripten_get_heap_max() {
  return getHeapMax()
}
function _emscripten_glActiveTexture(x0) {
  GLctx["activeTexture"](x0)
}
function _emscripten_glAttachShader(program, shader) {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader])
}
function _emscripten_glBeginQueryEXT(target, id) {
  GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id])
}
function _emscripten_glBindAttribLocation(program, index, name) {
  GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
}
function _emscripten_glBindBuffer(target, buffer) {
  if (target == 34962) {
    GLctx.currentArrayBufferBinding = buffer
  } else if (target == 34963) {
    GLctx.currentElementArrayBufferBinding = buffer
  }
  GLctx.bindBuffer(target, GL.buffers[buffer])
}
function _emscripten_glBindFramebuffer(target, framebuffer) {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
}
function _emscripten_glBindRenderbuffer(target, renderbuffer) {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
}
function _emscripten_glBindTexture(target, texture) {
  GLctx.bindTexture(target, GL.textures[texture])
}
function _emscripten_glBindVertexArrayOES(vao) {
  GLctx["bindVertexArray"](GL.vaos[vao])
  var ibo = GLctx.getParameter(34965)
  GLctx.currentElementArrayBufferBinding = ibo ? ibo.name | 0 : 0
}
function _emscripten_glBlendColor(x0, x1, x2, x3) {
  GLctx["blendColor"](x0, x1, x2, x3)
}
function _emscripten_glBlendEquation(x0) {
  GLctx["blendEquation"](x0)
}
function _emscripten_glBlendEquationSeparate(x0, x1) {
  GLctx["blendEquationSeparate"](x0, x1)
}
function _emscripten_glBlendFunc(x0, x1) {
  GLctx["blendFunc"](x0, x1)
}
function _emscripten_glBlendFuncSeparate(x0, x1, x2, x3) {
  GLctx["blendFuncSeparate"](x0, x1, x2, x3)
}
function _emscripten_glBufferData(target, size, data, usage) {
  GLctx.bufferData(
    target,
    data ? HEAPU8.subarray(data, data + size) : size,
    usage,
  )
}
function _emscripten_glBufferSubData(target, offset, size, data) {
  GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
}
function _emscripten_glCheckFramebufferStatus(x0) {
  return GLctx["checkFramebufferStatus"](x0)
}
function _emscripten_glClear(x0) {
  GLctx["clear"](x0)
}
function _emscripten_glClearColor(x0, x1, x2, x3) {
  GLctx["clearColor"](x0, x1, x2, x3)
}
function _emscripten_glClearDepthf(x0) {
  GLctx["clearDepth"](x0)
}
function _emscripten_glClearStencil(x0) {
  GLctx["clearStencil"](x0)
}
function _emscripten_glColorMask(red, green, blue, alpha) {
  GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
}
function _emscripten_glCompileShader(shader) {
  GLctx.compileShader(GL.shaders[shader])
}
function _emscripten_glCompressedTexImage2D(
  target,
  level,
  internalFormat,
  width,
  height,
  border,
  imageSize,
  data,
) {
  GLctx["compressedTexImage2D"](
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    data ? HEAPU8.subarray(data, data + imageSize) : null,
  )
}
function _emscripten_glCompressedTexSubImage2D(
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  imageSize,
  data,
) {
  GLctx["compressedTexSubImage2D"](
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    data ? HEAPU8.subarray(data, data + imageSize) : null,
  )
}
function _emscripten_glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
  GLctx["copyTexImage2D"](x0, x1, x2, x3, x4, x5, x6, x7)
}
function _emscripten_glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
  GLctx["copyTexSubImage2D"](x0, x1, x2, x3, x4, x5, x6, x7)
}
function _emscripten_glCreateProgram() {
  var id = GL.getNewId(GL.programs)
  var program = GLctx.createProgram()
  program.name = id
  program.maxUniformLength =
    program.maxAttributeLength =
    program.maxUniformBlockNameLength =
      0
  program.uniformIdCounter = 1
  GL.programs[id] = program
  return id
}
function _emscripten_glCreateShader(shaderType) {
  var id = GL.getNewId(GL.shaders)
  GL.shaders[id] = GLctx.createShader(shaderType)
  return id
}
function _emscripten_glCullFace(x0) {
  GLctx["cullFace"](x0)
}
function _emscripten_glDeleteBuffers(n, buffers) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(buffers + i * 4) >> 2]
    var buffer = GL.buffers[id]
    if (!buffer) continue
    GLctx.deleteBuffer(buffer)
    buffer.name = 0
    GL.buffers[id] = null
    if (id == GLctx.currentArrayBufferBinding)
      GLctx.currentArrayBufferBinding = 0
    if (id == GLctx.currentElementArrayBufferBinding)
      GLctx.currentElementArrayBufferBinding = 0
  }
}
function _emscripten_glDeleteFramebuffers(n, framebuffers) {
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(framebuffers + i * 4) >> 2]
    var framebuffer = GL.framebuffers[id]
    if (!framebuffer) continue
    GLctx.deleteFramebuffer(framebuffer)
    framebuffer.name = 0
    GL.framebuffers[id] = null
  }
}
function _emscripten_glDeleteProgram(id) {
  if (!id) return
  var program = GL.programs[id]
  if (!program) {
    GL.recordError(1281)
    return
  }
  GLctx.deleteProgram(program)
  program.name = 0
  GL.programs[id] = null
}
function _emscripten_glDeleteQueriesEXT(n, ids) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(ids + i * 4) >> 2]
    var query = GL.queries[id]
    if (!query) continue
    GLctx.disjointTimerQueryExt["deleteQueryEXT"](query)
    GL.queries[id] = null
  }
}
function _emscripten_glDeleteRenderbuffers(n, renderbuffers) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(renderbuffers + i * 4) >> 2]
    var renderbuffer = GL.renderbuffers[id]
    if (!renderbuffer) continue
    GLctx.deleteRenderbuffer(renderbuffer)
    renderbuffer.name = 0
    GL.renderbuffers[id] = null
  }
}
function _emscripten_glDeleteShader(id) {
  if (!id) return
  var shader = GL.shaders[id]
  if (!shader) {
    GL.recordError(1281)
    return
  }
  GLctx.deleteShader(shader)
  GL.shaders[id] = null
}
function _emscripten_glDeleteTextures(n, textures) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(textures + i * 4) >> 2]
    var texture = GL.textures[id]
    if (!texture) continue
    GLctx.deleteTexture(texture)
    texture.name = 0
    GL.textures[id] = null
  }
}
function _emscripten_glDeleteVertexArraysOES(n, vaos) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(vaos + i * 4) >> 2]
    GLctx["deleteVertexArray"](GL.vaos[id])
    GL.vaos[id] = null
  }
}
function _emscripten_glDepthFunc(x0) {
  GLctx["depthFunc"](x0)
}
function _emscripten_glDepthMask(flag) {
  GLctx.depthMask(!!flag)
}
function _emscripten_glDepthRangef(x0, x1) {
  GLctx["depthRange"](x0, x1)
}
function _emscripten_glDetachShader(program, shader) {
  GLctx.detachShader(GL.programs[program], GL.shaders[shader])
}
function _emscripten_glDisable(x0) {
  GLctx["disable"](x0)
}
function _emscripten_glDisableVertexAttribArray(index) {
  var cb = GL.currentContext.clientBuffers[index]
  cb.enabled = false
  GLctx.disableVertexAttribArray(index)
}
function _emscripten_glDrawArrays(mode, first, count) {
  GL.preDrawHandleClientVertexAttribBindings(first + count)
  GLctx.drawArrays(mode, first, count)
  GL.postDrawHandleClientVertexAttribBindings()
}
function _emscripten_glDrawArraysInstancedANGLE(mode, first, count, primcount) {
  GLctx["drawArraysInstanced"](mode, first, count, primcount)
}
var tempFixedLengthArray = []
function _emscripten_glDrawBuffersWEBGL(n, bufs) {
  var bufArray = tempFixedLengthArray[n]
  for (var i = 0; i < n; i++) {
    bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
  }
  GLctx["drawBuffers"](bufArray)
}
function _emscripten_glDrawElements(mode, count, type, indices) {
  var buf
  if (!GLctx.currentElementArrayBufferBinding) {
    var size = GL.calcBufLength(1, type, 0, count)
    buf = GL.getTempIndexBuffer(size)
    GLctx.bindBuffer(34963, buf)
    GLctx.bufferSubData(34963, 0, HEAPU8.subarray(indices, indices + size))
    indices = 0
  }
  GL.preDrawHandleClientVertexAttribBindings(count)
  GLctx.drawElements(mode, count, type, indices)
  GL.postDrawHandleClientVertexAttribBindings(count)
  if (!GLctx.currentElementArrayBufferBinding) {
    GLctx.bindBuffer(34963, null)
  }
}
function _emscripten_glDrawElementsInstancedANGLE(
  mode,
  count,
  type,
  indices,
  primcount,
) {
  GLctx["drawElementsInstanced"](mode, count, type, indices, primcount)
}
function _emscripten_glEnable(x0) {
  GLctx["enable"](x0)
}
function _emscripten_glEnableVertexAttribArray(index) {
  var cb = GL.currentContext.clientBuffers[index]
  cb.enabled = true
  GLctx.enableVertexAttribArray(index)
}
function _emscripten_glEndQueryEXT(target) {
  GLctx.disjointTimerQueryExt["endQueryEXT"](target)
}
function _emscripten_glFinish() {
  GLctx["finish"]()
}
function _emscripten_glFlush() {
  GLctx["flush"]()
}
function _emscripten_glFramebufferRenderbuffer(
  target,
  attachment,
  renderbuffertarget,
  renderbuffer,
) {
  GLctx.framebufferRenderbuffer(
    target,
    attachment,
    renderbuffertarget,
    GL.renderbuffers[renderbuffer],
  )
}
function _emscripten_glFramebufferTexture2D(
  target,
  attachment,
  textarget,
  texture,
  level,
) {
  GLctx.framebufferTexture2D(
    target,
    attachment,
    textarget,
    GL.textures[texture],
    level,
  )
}
function _emscripten_glFrontFace(x0) {
  GLctx["frontFace"](x0)
}
function _emscripten_glGenBuffers(n, buffers) {
  __glGenObject(n, buffers, "createBuffer", GL.buffers)
}
function _emscripten_glGenFramebuffers(n, ids) {
  __glGenObject(n, ids, "createFramebuffer", GL.framebuffers)
}
function _emscripten_glGenQueriesEXT(n, ids) {
  for (var i = 0; i < n; i++) {
    var query = GLctx.disjointTimerQueryExt["createQueryEXT"]()
    if (!query) {
      GL.recordError(1282)
      while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0
      return
    }
    var id = GL.getNewId(GL.queries)
    query.name = id
    GL.queries[id] = query
    HEAP32[(ids + i * 4) >> 2] = id
  }
}
function _emscripten_glGenRenderbuffers(n, renderbuffers) {
  __glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers)
}
function _emscripten_glGenTextures(n, textures) {
  __glGenObject(n, textures, "createTexture", GL.textures)
}
function _emscripten_glGenVertexArraysOES(n, arrays) {
  __glGenObject(n, arrays, "createVertexArray", GL.vaos)
}
function _emscripten_glGenerateMipmap(x0) {
  GLctx["generateMipmap"](x0)
}
function __glGetActiveAttribOrUniform(
  funcName,
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) {
  program = GL.programs[program]
  var info = GLctx[funcName](program, index)
  if (info) {
    var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize)
    if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    if (size) HEAP32[size >> 2] = info.size
    if (type) HEAP32[type >> 2] = info.type
  }
}
function _emscripten_glGetActiveAttrib(
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) {
  __glGetActiveAttribOrUniform(
    "getActiveAttrib",
    program,
    index,
    bufSize,
    length,
    size,
    type,
    name,
  )
}
function _emscripten_glGetActiveUniform(
  program,
  index,
  bufSize,
  length,
  size,
  type,
  name,
) {
  __glGetActiveAttribOrUniform(
    "getActiveUniform",
    program,
    index,
    bufSize,
    length,
    size,
    type,
    name,
  )
}
function _emscripten_glGetAttachedShaders(program, maxCount, count, shaders) {
  var result = GLctx.getAttachedShaders(GL.programs[program])
  var len = result.length
  if (len > maxCount) {
    len = maxCount
  }
  HEAP32[count >> 2] = len
  for (var i = 0; i < len; ++i) {
    var id = GL.shaders.indexOf(result[i])
    HEAP32[(shaders + i * 4) >> 2] = id
  }
}
function _emscripten_glGetAttribLocation(program, name) {
  return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name))
}
function _emscripten_glGetBooleanv(name_, p) {
  emscriptenWebGLGet(name_, p, 4)
}
function _emscripten_glGetBufferParameteriv(target, value, data) {
  if (!data) {
    GL.recordError(1281)
    return
  }
  HEAP32[data >> 2] = GLctx.getBufferParameter(target, value)
}
function _emscripten_glGetError() {
  var error = GLctx.getError() || GL.lastError
  GL.lastError = 0
  return error
}
function _emscripten_glGetFloatv(name_, p) {
  emscriptenWebGLGet(name_, p, 2)
}
function _emscripten_glGetFramebufferAttachmentParameteriv(
  target,
  attachment,
  pname,
  params,
) {
  var result = GLctx.getFramebufferAttachmentParameter(
    target,
    attachment,
    pname,
  )
  if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
    result = result.name | 0
  }
  HEAP32[params >> 2] = result
}
function _emscripten_glGetIntegerv(name_, p) {
  emscriptenWebGLGet(name_, p, 0)
}
function _emscripten_glGetProgramInfoLog(program, maxLength, length, infoLog) {
  var log = GLctx.getProgramInfoLog(GL.programs[program])
  if (log === null) log = "(unknown error)"
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}
function _emscripten_glGetProgramiv(program, pname, p) {
  if (!p) {
    GL.recordError(1281)
    return
  }
  if (program >= GL.counter) {
    GL.recordError(1281)
    return
  }
  program = GL.programs[program]
  if (pname == 35716) {
    var log = GLctx.getProgramInfoLog(program)
    if (log === null) log = "(unknown error)"
    HEAP32[p >> 2] = log.length + 1
  } else if (pname == 35719) {
    if (!program.maxUniformLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
        program.maxUniformLength = Math.max(
          program.maxUniformLength,
          GLctx.getActiveUniform(program, i).name.length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxUniformLength
  } else if (pname == 35722) {
    if (!program.maxAttributeLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
        program.maxAttributeLength = Math.max(
          program.maxAttributeLength,
          GLctx.getActiveAttrib(program, i).name.length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxAttributeLength
  } else if (pname == 35381) {
    if (!program.maxUniformBlockNameLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
        program.maxUniformBlockNameLength = Math.max(
          program.maxUniformBlockNameLength,
          GLctx.getActiveUniformBlockName(program, i).length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxUniformBlockNameLength
  } else {
    HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname)
  }
}
function _emscripten_glGetQueryObjecti64vEXT(id, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  var query = GL.queries[id]
  var param
  {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname)
  }
  var ret
  if (typeof param == "boolean") {
    ret = param ? 1 : 0
  } else {
    ret = param
  }
  writeI53ToI64(params, ret)
}
function _emscripten_glGetQueryObjectivEXT(id, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  var query = GL.queries[id]
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname)
  var ret
  if (typeof param == "boolean") {
    ret = param ? 1 : 0
  } else {
    ret = param
  }
  HEAP32[params >> 2] = ret
}
function _emscripten_glGetQueryObjectui64vEXT(id, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  var query = GL.queries[id]
  var param
  {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname)
  }
  var ret
  if (typeof param == "boolean") {
    ret = param ? 1 : 0
  } else {
    ret = param
  }
  writeI53ToI64(params, ret)
}
function _emscripten_glGetQueryObjectuivEXT(id, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  var query = GL.queries[id]
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname)
  var ret
  if (typeof param == "boolean") {
    ret = param ? 1 : 0
  } else {
    ret = param
  }
  HEAP32[params >> 2] = ret
}
function _emscripten_glGetQueryivEXT(target, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](
    target,
    pname,
  )
}
function _emscripten_glGetRenderbufferParameteriv(target, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname)
}
function _emscripten_glGetShaderInfoLog(shader, maxLength, length, infoLog) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader])
  if (log === null) log = "(unknown error)"
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}
function _emscripten_glGetShaderPrecisionFormat(
  shaderType,
  precisionType,
  range,
  precision,
) {
  var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType)
  HEAP32[range >> 2] = result.rangeMin
  HEAP32[(range + 4) >> 2] = result.rangeMax
  HEAP32[precision >> 2] = result.precision
}
function _emscripten_glGetShaderSource(shader, bufSize, length, source) {
  var result = GLctx.getShaderSource(GL.shaders[shader])
  if (!result) return
  var numBytesWrittenExclNull =
    bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}
function _emscripten_glGetShaderiv(shader, pname, p) {
  if (!p) {
    GL.recordError(1281)
    return
  }
  if (pname == 35716) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader])
    if (log === null) log = "(unknown error)"
    var logLength = log ? log.length + 1 : 0
    HEAP32[p >> 2] = logLength
  } else if (pname == 35720) {
    var source = GLctx.getShaderSource(GL.shaders[shader])
    var sourceLength = source ? source.length + 1 : 0
    HEAP32[p >> 2] = sourceLength
  } else {
    HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
  }
}
function stringToNewUTF8(jsString) {
  var length = lengthBytesUTF8(jsString) + 1
  var cString = _malloc(length)
  stringToUTF8(jsString, cString, length)
  return cString
}
function _emscripten_glGetString(name_) {
  var ret = GL.stringCache[name_]
  if (!ret) {
    switch (name_) {
      case 7939:
        var exts = GLctx.getSupportedExtensions() || []
        exts = exts.concat(
          exts.map(function (e) {
            return "GL_" + e
          }),
        )
        ret = stringToNewUTF8(exts.join(" "))
        break
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        var s = GLctx.getParameter(name_)
        if (!s) {
          GL.recordError(1280)
        }
        ret = s && stringToNewUTF8(s)
        break
      case 7938:
        var glVersion = GLctx.getParameter(7938)
        {
          glVersion = "OpenGL ES 2.0 (" + glVersion + ")"
        }
        ret = stringToNewUTF8(glVersion)
        break
      case 35724:
        var glslVersion = GLctx.getParameter(35724)
        var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
        var ver_num = glslVersion.match(ver_re)
        if (ver_num !== null) {
          if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0"
          glslVersion =
            "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")"
        }
        ret = stringToNewUTF8(glslVersion)
        break
      default:
        GL.recordError(1280)
    }
    GL.stringCache[name_] = ret
  }
  return ret
}
function _emscripten_glGetTexParameterfv(target, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname)
}
function _emscripten_glGetTexParameteriv(target, pname, params) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  HEAP32[params >> 2] = GLctx.getTexParameter(target, pname)
}
function jstoi_q(str) {
  return parseInt(str)
}
function webglGetLeftBracePos(name) {
  return name.slice(-1) == "]" && name.lastIndexOf("[")
}
function webglPrepareUniformLocationsBeforeFirstUse(program) {
  var uniformLocsById = program.uniformLocsById,
    uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,
    i,
    j
  if (!uniformLocsById) {
    program.uniformLocsById = uniformLocsById = {}
    program.uniformArrayNamesById = {}
    for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
      var u = GLctx.getActiveUniform(program, i)
      var nm = u.name
      var sz = u.size
      var lb = webglGetLeftBracePos(nm)
      var arrayName = lb > 0 ? nm.slice(0, lb) : nm
      var id = program.uniformIdCounter
      program.uniformIdCounter += sz
      uniformSizeAndIdsByName[arrayName] = [sz, id]
      for (j = 0; j < sz; ++j) {
        uniformLocsById[id] = j
        program.uniformArrayNamesById[id++] = arrayName
      }
    }
  }
}
function _emscripten_glGetUniformLocation(program, name) {
  name = UTF8ToString(name)
  if ((program = GL.programs[program])) {
    webglPrepareUniformLocationsBeforeFirstUse(program)
    var uniformLocsById = program.uniformLocsById
    var arrayIndex = 0
    var uniformBaseName = name
    var leftBrace = webglGetLeftBracePos(name)
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0
      uniformBaseName = name.slice(0, leftBrace)
    }
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName]
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1]
      if (
        (uniformLocsById[arrayIndex] =
          uniformLocsById[arrayIndex] ||
          GLctx.getUniformLocation(program, name))
      ) {
        return arrayIndex
      }
    }
  } else {
    GL.recordError(1281)
  }
  return -1
}
function webglGetUniformLocation(location) {
  var p = GLctx.currentProgram
  if (p) {
    var webglLoc = p.uniformLocsById[location]
    if (typeof webglLoc == "number") {
      p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(
        p,
        p.uniformArrayNamesById[location] +
          (webglLoc > 0 ? "[" + webglLoc + "]" : ""),
      )
    }
    return webglLoc
  } else {
    GL.recordError(1282)
  }
}
function emscriptenWebGLGetUniform(program, location, params, type) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  program = GL.programs[program]
  webglPrepareUniformLocationsBeforeFirstUse(program)
  var data = GLctx.getUniform(program, webglGetUniformLocation(location))
  if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data
        break
      case 2:
        HEAPF32[params >> 2] = data
        break
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i]
          break
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i]
          break
      }
    }
  }
}
function _emscripten_glGetUniformfv(program, location, params) {
  emscriptenWebGLGetUniform(program, location, params, 2)
}
function _emscripten_glGetUniformiv(program, location, params) {
  emscriptenWebGLGetUniform(program, location, params, 0)
}
function _emscripten_glGetVertexAttribPointerv(index, pname, pointer) {
  if (!pointer) {
    GL.recordError(1281)
    return
  }
  if (GL.currentContext.clientBuffers[index].enabled) {
    err(
      "glGetVertexAttribPointer on client-side array: not supported, bad data returned",
    )
  }
  HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname)
}
function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
  if (!params) {
    GL.recordError(1281)
    return
  }
  if (GL.currentContext.clientBuffers[index].enabled) {
    err(
      "glGetVertexAttrib*v on client-side array: not supported, bad data returned",
    )
  }
  var data = GLctx.getVertexAttrib(index, pname)
  if (pname == 34975) {
    HEAP32[params >> 2] = data && data["name"]
  } else if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data
        break
      case 2:
        HEAPF32[params >> 2] = data
        break
      case 5:
        HEAP32[params >> 2] = Math.fround(data)
        break
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i]
          break
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i]
          break
        case 5:
          HEAP32[(params + i * 4) >> 2] = Math.fround(data[i])
          break
      }
    }
  }
}
function _emscripten_glGetVertexAttribfv(index, pname, params) {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 2)
}
function _emscripten_glGetVertexAttribiv(index, pname, params) {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 5)
}
function _emscripten_glHint(x0, x1) {
  GLctx["hint"](x0, x1)
}
function _emscripten_glIsBuffer(buffer) {
  var b = GL.buffers[buffer]
  if (!b) return 0
  return GLctx.isBuffer(b)
}
function _emscripten_glIsEnabled(x0) {
  return GLctx["isEnabled"](x0)
}
function _emscripten_glIsFramebuffer(framebuffer) {
  var fb = GL.framebuffers[framebuffer]
  if (!fb) return 0
  return GLctx.isFramebuffer(fb)
}
function _emscripten_glIsProgram(program) {
  program = GL.programs[program]
  if (!program) return 0
  return GLctx.isProgram(program)
}
function _emscripten_glIsQueryEXT(id) {
  var query = GL.queries[id]
  if (!query) return 0
  return GLctx.disjointTimerQueryExt["isQueryEXT"](query)
}
function _emscripten_glIsRenderbuffer(renderbuffer) {
  var rb = GL.renderbuffers[renderbuffer]
  if (!rb) return 0
  return GLctx.isRenderbuffer(rb)
}
function _emscripten_glIsShader(shader) {
  var s = GL.shaders[shader]
  if (!s) return 0
  return GLctx.isShader(s)
}
function _emscripten_glIsTexture(id) {
  var texture = GL.textures[id]
  if (!texture) return 0
  return GLctx.isTexture(texture)
}
function _emscripten_glIsVertexArrayOES(array) {
  var vao = GL.vaos[array]
  if (!vao) return 0
  return GLctx["isVertexArray"](vao)
}
function _emscripten_glLineWidth(x0) {
  GLctx["lineWidth"](x0)
}
function _emscripten_glLinkProgram(program) {
  program = GL.programs[program]
  GLctx.linkProgram(program)
  program.uniformLocsById = 0
  program.uniformSizeAndIdsByName = {}
}
function _emscripten_glPixelStorei(pname, param) {
  if (pname == 3317) {
    GL.unpackAlignment = param
  }
  GLctx.pixelStorei(pname, param)
}
function _emscripten_glPolygonOffset(x0, x1) {
  GLctx["polygonOffset"](x0, x1)
}
function _emscripten_glQueryCounterEXT(id, target) {
  GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target)
}
function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
  function roundedToNextMultipleOf(x, y) {
    return (x + y - 1) & -y
  }
  var plainRowSize = width * sizePerPixel
  var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment)
  return height * alignedRowSize
}
function __colorChannelsInGlTextureFormat(format) {
  var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 }
  return colorChannels[format - 6402] || 1
}
function heapObjectForWebGLType(type) {
  type -= 5120
  if (type == 1) return HEAPU8
  if (type == 4) return HEAP32
  if (type == 6) return HEAPF32
  if (type == 5 || type == 28922) return HEAPU32
  return HEAPU16
}
function heapAccessShiftForWebGLHeap(heap) {
  return 31 - Math.clz32(heap.BYTES_PER_ELEMENT)
}
function emscriptenWebGLGetTexPixelData(
  type,
  format,
  width,
  height,
  pixels,
  internalFormat,
) {
  var heap = heapObjectForWebGLType(type)
  var shift = heapAccessShiftForWebGLHeap(heap)
  var byteSize = 1 << shift
  var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize
  var bytes = computeUnpackAlignedImageSize(
    width,
    height,
    sizePerPixel,
    GL.unpackAlignment,
  )
  return heap.subarray(pixels >> shift, (pixels + bytes) >> shift)
}
function _emscripten_glReadPixels(x, y, width, height, format, type, pixels) {
  var pixelData = emscriptenWebGLGetTexPixelData(
    type,
    format,
    width,
    height,
    pixels,
    format,
  )
  if (!pixelData) {
    GL.recordError(1280)
    return
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData)
}
function _emscripten_glReleaseShaderCompiler() {}
function _emscripten_glRenderbufferStorage(x0, x1, x2, x3) {
  GLctx["renderbufferStorage"](x0, x1, x2, x3)
}
function _emscripten_glSampleCoverage(value, invert) {
  GLctx.sampleCoverage(value, !!invert)
}
function _emscripten_glScissor(x0, x1, x2, x3) {
  GLctx["scissor"](x0, x1, x2, x3)
}
function _emscripten_glShaderBinary() {
  GL.recordError(1280)
}
function _emscripten_glShaderSource(shader, count, string, length) {
  var source = GL.getSource(shader, count, string, length)
  GLctx.shaderSource(GL.shaders[shader], source)
}
function _emscripten_glStencilFunc(x0, x1, x2) {
  GLctx["stencilFunc"](x0, x1, x2)
}
function _emscripten_glStencilFuncSeparate(x0, x1, x2, x3) {
  GLctx["stencilFuncSeparate"](x0, x1, x2, x3)
}
function _emscripten_glStencilMask(x0) {
  GLctx["stencilMask"](x0)
}
function _emscripten_glStencilMaskSeparate(x0, x1) {
  GLctx["stencilMaskSeparate"](x0, x1)
}
function _emscripten_glStencilOp(x0, x1, x2) {
  GLctx["stencilOp"](x0, x1, x2)
}
function _emscripten_glStencilOpSeparate(x0, x1, x2, x3) {
  GLctx["stencilOpSeparate"](x0, x1, x2, x3)
}
function _emscripten_glTexImage2D(
  target,
  level,
  internalFormat,
  width,
  height,
  border,
  format,
  type,
  pixels,
) {
  GLctx.texImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    format,
    type,
    pixels
      ? emscriptenWebGLGetTexPixelData(
          type,
          format,
          width,
          height,
          pixels,
          internalFormat,
        )
      : null,
  )
}
function _emscripten_glTexParameterf(x0, x1, x2) {
  GLctx["texParameterf"](x0, x1, x2)
}
function _emscripten_glTexParameterfv(target, pname, params) {
  var param = HEAPF32[params >> 2]
  GLctx.texParameterf(target, pname, param)
}
function _emscripten_glTexParameteri(x0, x1, x2) {
  GLctx["texParameteri"](x0, x1, x2)
}
function _emscripten_glTexParameteriv(target, pname, params) {
  var param = HEAP32[params >> 2]
  GLctx.texParameteri(target, pname, param)
}
function _emscripten_glTexSubImage2D(
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  type,
  pixels,
) {
  var pixelData = null
  if (pixels)
    pixelData = emscriptenWebGLGetTexPixelData(
      type,
      format,
      width,
      height,
      pixels,
      0,
    )
  GLctx.texSubImage2D(
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    type,
    pixelData,
  )
}
function _emscripten_glUniform1f(location, v0) {
  GLctx.uniform1f(webglGetUniformLocation(location), v0)
}
var miniTempWebGLFloatBuffers = []
function _emscripten_glUniform1fv(location, count, value) {
  if (count <= 288) {
    var view = miniTempWebGLFloatBuffers[count - 1]
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2)
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform1i(location, v0) {
  GLctx.uniform1i(webglGetUniformLocation(location), v0)
}
var __miniTempWebGLIntBuffers = []
function _emscripten_glUniform1iv(location, count, value) {
  if (count <= 288) {
    var view = __miniTempWebGLIntBuffers[count - 1]
    for (var i = 0; i < count; ++i) {
      view[i] = HEAP32[(value + 4 * i) >> 2]
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 4) >> 2)
  }
  GLctx.uniform1iv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform2f(location, v0, v1) {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1)
}
function _emscripten_glUniform2fv(location, count, value) {
  if (count <= 144) {
    var view = miniTempWebGLFloatBuffers[2 * count - 1]
    for (var i = 0; i < 2 * count; i += 2) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2)
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform2i(location, v0, v1) {
  GLctx.uniform2i(webglGetUniformLocation(location), v0, v1)
}
function _emscripten_glUniform2iv(location, count, value) {
  if (count <= 144) {
    var view = __miniTempWebGLIntBuffers[2 * count - 1]
    for (var i = 0; i < 2 * count; i += 2) {
      view[i] = HEAP32[(value + 4 * i) >> 2]
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 8) >> 2)
  }
  GLctx.uniform2iv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform3f(location, v0, v1, v2) {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2)
}
function _emscripten_glUniform3fv(location, count, value) {
  if (count <= 96) {
    var view = miniTempWebGLFloatBuffers[3 * count - 1]
    for (var i = 0; i < 3 * count; i += 3) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2)
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform3i(location, v0, v1, v2) {
  GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2)
}
function _emscripten_glUniform3iv(location, count, value) {
  if (count <= 96) {
    var view = __miniTempWebGLIntBuffers[3 * count - 1]
    for (var i = 0; i < 3 * count; i += 3) {
      view[i] = HEAP32[(value + 4 * i) >> 2]
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2]
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 12) >> 2)
  }
  GLctx.uniform3iv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform4f(location, v0, v1, v2, v3) {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3)
}
function _emscripten_glUniform4fv(location, count, value) {
  if (count <= 72) {
    var view = miniTempWebGLFloatBuffers[4 * count - 1]
    var heap = HEAPF32
    value >>= 2
    for (var i = 0; i < 4 * count; i += 4) {
      var dst = value + i
      view[i] = heap[dst]
      view[i + 1] = heap[dst + 1]
      view[i + 2] = heap[dst + 2]
      view[i + 3] = heap[dst + 3]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniform4i(location, v0, v1, v2, v3) {
  GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3)
}
function _emscripten_glUniform4iv(location, count, value) {
  if (count <= 72) {
    var view = __miniTempWebGLIntBuffers[4 * count - 1]
    for (var i = 0; i < 4 * count; i += 4) {
      view[i] = HEAP32[(value + 4 * i) >> 2]
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2]
      view[i + 3] = HEAP32[(value + (4 * i + 12)) >> 2]
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 16) >> 2)
  }
  GLctx.uniform4iv(webglGetUniformLocation(location), view)
}
function _emscripten_glUniformMatrix2fv(location, count, transpose, value) {
  if (count <= 72) {
    var view = miniTempWebGLFloatBuffers[4 * count - 1]
    for (var i = 0; i < 4 * count; i += 4) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
  }
  GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view)
}
function _emscripten_glUniformMatrix3fv(location, count, transpose, value) {
  if (count <= 32) {
    var view = miniTempWebGLFloatBuffers[9 * count - 1]
    for (var i = 0; i < 9 * count; i += 9) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2]
      view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2]
      view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2]
      view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2]
      view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2]
      view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2)
  }
  GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view)
}
function _emscripten_glUniformMatrix4fv(location, count, transpose, value) {
  if (count <= 18) {
    var view = miniTempWebGLFloatBuffers[16 * count - 1]
    var heap = HEAPF32
    value >>= 2
    for (var i = 0; i < 16 * count; i += 16) {
      var dst = value + i
      view[i] = heap[dst]
      view[i + 1] = heap[dst + 1]
      view[i + 2] = heap[dst + 2]
      view[i + 3] = heap[dst + 3]
      view[i + 4] = heap[dst + 4]
      view[i + 5] = heap[dst + 5]
      view[i + 6] = heap[dst + 6]
      view[i + 7] = heap[dst + 7]
      view[i + 8] = heap[dst + 8]
      view[i + 9] = heap[dst + 9]
      view[i + 10] = heap[dst + 10]
      view[i + 11] = heap[dst + 11]
      view[i + 12] = heap[dst + 12]
      view[i + 13] = heap[dst + 13]
      view[i + 14] = heap[dst + 14]
      view[i + 15] = heap[dst + 15]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2)
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view)
}
function _emscripten_glUseProgram(program) {
  program = GL.programs[program]
  GLctx.useProgram(program)
  GLctx.currentProgram = program
}
function _emscripten_glValidateProgram(program) {
  GLctx.validateProgram(GL.programs[program])
}
function _emscripten_glVertexAttrib1f(x0, x1) {
  GLctx["vertexAttrib1f"](x0, x1)
}
function _emscripten_glVertexAttrib1fv(index, v) {
  GLctx.vertexAttrib1f(index, HEAPF32[v >> 2])
}
function _emscripten_glVertexAttrib2f(x0, x1, x2) {
  GLctx["vertexAttrib2f"](x0, x1, x2)
}
function _emscripten_glVertexAttrib2fv(index, v) {
  GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2])
}
function _emscripten_glVertexAttrib3f(x0, x1, x2, x3) {
  GLctx["vertexAttrib3f"](x0, x1, x2, x3)
}
function _emscripten_glVertexAttrib3fv(index, v) {
  GLctx.vertexAttrib3f(
    index,
    HEAPF32[v >> 2],
    HEAPF32[(v + 4) >> 2],
    HEAPF32[(v + 8) >> 2],
  )
}
function _emscripten_glVertexAttrib4f(x0, x1, x2, x3, x4) {
  GLctx["vertexAttrib4f"](x0, x1, x2, x3, x4)
}
function _emscripten_glVertexAttrib4fv(index, v) {
  GLctx.vertexAttrib4f(
    index,
    HEAPF32[v >> 2],
    HEAPF32[(v + 4) >> 2],
    HEAPF32[(v + 8) >> 2],
    HEAPF32[(v + 12) >> 2],
  )
}
function _emscripten_glVertexAttribDivisorANGLE(index, divisor) {
  GLctx["vertexAttribDivisor"](index, divisor)
}
function _emscripten_glVertexAttribPointer(
  index,
  size,
  type,
  normalized,
  stride,
  ptr,
) {
  var cb = GL.currentContext.clientBuffers[index]
  if (!GLctx.currentArrayBufferBinding) {
    cb.size = size
    cb.type = type
    cb.normalized = normalized
    cb.stride = stride
    cb.ptr = ptr
    cb.clientside = true
    cb.vertexAttribPointerAdaptor = function (
      index,
      size,
      type,
      normalized,
      stride,
      ptr,
    ) {
      this.vertexAttribPointer(index, size, type, normalized, stride, ptr)
    }
    return
  }
  cb.clientside = false
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
}
function _emscripten_glViewport(x0, x1, x2, x3) {
  GLctx["viewport"](x0, x1, x2, x3)
}
function _emscripten_html5_remove_all_event_listeners() {
  JSEvents.removeAllEventListeners()
}
function _emscripten_memcpy_big(dest, src, num) {
  HEAPU8.copyWithin(dest, src, src + num)
}
function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
  target = findEventTarget(target)
  if (!target) return -4
  if (!target.requestPointerLock && !target.msRequestPointerLock) {
    return -1
  }
  var canPerformRequests = JSEvents.canPerformEventHandlerRequests()
  if (!canPerformRequests) {
    if (deferUntilInEventHandler) {
      JSEvents.deferCall(requestPointerLock, 2, [target])
      return 1
    }
    return -2
  }
  return requestPointerLock(target)
}
function emscripten_realloc_buffer(size) {
  try {
    wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16)
    updateGlobalBufferAndViews(wasmMemory.buffer)
    return 1
  } catch (e) {}
}
function _emscripten_resize_heap(requestedSize) {
  var oldSize = HEAPU8.length
  requestedSize = requestedSize >>> 0
  var maxHeapSize = getHeapMax()
  if (requestedSize > maxHeapSize) {
    return false
  }
  let alignUp = (x, multiple) => x + ((multiple - (x % multiple)) % multiple)
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown)
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296)
    var newSize = Math.min(
      maxHeapSize,
      alignUp(Math.max(requestedSize, overGrownHeapSize), 65536),
    )
    var replacement = emscripten_realloc_buffer(newSize)
    if (replacement) {
      return true
    }
  }
  return false
}
function _emscripten_sample_gamepad_data() {
  return (JSEvents.lastGamepadState = navigator.getGamepads
    ? navigator.getGamepads()
    : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads()
    : null)
    ? 0
    : -1
}
function _emscripten_set_canvas_element_size(target, width, height) {
  var canvas = findCanvasEventTarget(target)
  if (!canvas) return -4
  canvas.width = width
  canvas.height = height
  return 0
}
function _emscripten_set_element_css_size(target, width, height) {
  target = findEventTarget(target)
  if (!target) return -4
  target.style.width = width + "px"
  target.style.height = height + "px"
  return 0
}
var wasmTableMirror = []
function getWasmTableEntry(funcPtr) {
  var func = wasmTableMirror[funcPtr]
  if (!func) {
    if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1
    wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
  }
  return func
}
function registerGamepadEventCallback(
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) {
  if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc(1432)
  var gamepadEventHandlerFunc = function (ev) {
    var e = ev || event
    var gamepadEvent = JSEvents.gamepadEvent
    fillGamepadEventData(gamepadEvent, e["gamepad"])
    if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData))
      e.preventDefault()
  }
  var eventHandler = {
    target: findEventTarget(target),
    allowsDeferredCalls: true,
    eventTypeString: eventTypeString,
    callbackfunc: callbackfunc,
    handlerFunc: gamepadEventHandlerFunc,
    useCapture: useCapture,
  }
  JSEvents.registerOrRemoveHandler(eventHandler)
}
function _emscripten_set_gamepadconnected_callback_on_thread(
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1
  registerGamepadEventCallback(
    2,
    userData,
    useCapture,
    callbackfunc,
    26,
    "gamepadconnected",
    targetThread,
  )
  return 0
}
function _emscripten_set_gamepaddisconnected_callback_on_thread(
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1
  registerGamepadEventCallback(
    2,
    userData,
    useCapture,
    callbackfunc,
    27,
    "gamepaddisconnected",
    targetThread,
  )
  return 0
}
function registerKeyEventCallback(
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) {
  if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(176)
  var keyEventHandlerFunc = function (e) {
    var keyEventData = JSEvents.keyEvent
    HEAPF64[keyEventData >> 3] = e.timeStamp
    var idx = keyEventData >> 2
    HEAP32[idx + 2] = e.location
    HEAP32[idx + 3] = e.ctrlKey
    HEAP32[idx + 4] = e.shiftKey
    HEAP32[idx + 5] = e.altKey
    HEAP32[idx + 6] = e.metaKey
    HEAP32[idx + 7] = e.repeat
    HEAP32[idx + 8] = e.charCode
    HEAP32[idx + 9] = e.keyCode
    HEAP32[idx + 10] = e.which
    stringToUTF8(e.key || "", keyEventData + 44, 32)
    stringToUTF8(e.code || "", keyEventData + 76, 32)
    stringToUTF8(e.char || "", keyEventData + 108, 32)
    stringToUTF8(e.locale || "", keyEventData + 140, 32)
    if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData))
      e.preventDefault()
  }
  var eventHandler = {
    target: findEventTarget(target),
    allowsDeferredCalls: true,
    eventTypeString: eventTypeString,
    callbackfunc: callbackfunc,
    handlerFunc: keyEventHandlerFunc,
    useCapture: useCapture,
  }
  JSEvents.registerOrRemoveHandler(eventHandler)
}
function _emscripten_set_keydown_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    2,
    "keydown",
    targetThread,
  )
  return 0
}
function _emscripten_set_keypress_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    1,
    "keypress",
    targetThread,
  )
  return 0
}
function _emscripten_set_keyup_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerKeyEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    3,
    "keyup",
    targetThread,
  )
  return 0
}
function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop) {
  var browserIterationFunc = getWasmTableEntry(func)
  setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop)
}
function getBoundingClientRect(e) {
  return specialHTMLTargets.indexOf(e) < 0
    ? e.getBoundingClientRect()
    : { left: 0, top: 0 }
}
function fillMouseEventData(eventStruct, e, target) {
  HEAPF64[eventStruct >> 3] = e.timeStamp
  var idx = eventStruct >> 2
  HEAP32[idx + 2] = e.screenX
  HEAP32[idx + 3] = e.screenY
  HEAP32[idx + 4] = e.clientX
  HEAP32[idx + 5] = e.clientY
  HEAP32[idx + 6] = e.ctrlKey
  HEAP32[idx + 7] = e.shiftKey
  HEAP32[idx + 8] = e.altKey
  HEAP32[idx + 9] = e.metaKey
  HEAP16[idx * 2 + 20] = e.button
  HEAP16[idx * 2 + 21] = e.buttons
  HEAP32[idx + 11] = e["movementX"]
  HEAP32[idx + 12] = e["movementY"]
  var rect = getBoundingClientRect(target)
  HEAP32[idx + 13] = e.clientX - rect.left
  HEAP32[idx + 14] = e.clientY - rect.top
}
function registerMouseEventCallback(
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) {
  if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(72)
  target = findEventTarget(target)
  var mouseEventHandlerFunc = function (ev) {
    var e = ev || event
    fillMouseEventData(JSEvents.mouseEvent, e, target)
    if (
      getWasmTableEntry(callbackfunc)(
        eventTypeId,
        JSEvents.mouseEvent,
        userData,
      )
    )
      e.preventDefault()
  }
  var eventHandler = {
    target: target,
    allowsDeferredCalls:
      eventTypeString != "mousemove" &&
      eventTypeString != "mouseenter" &&
      eventTypeString != "mouseleave",
    eventTypeString: eventTypeString,
    callbackfunc: callbackfunc,
    handlerFunc: mouseEventHandlerFunc,
    useCapture: useCapture,
  }
  JSEvents.registerOrRemoveHandler(eventHandler)
}
function _emscripten_set_mousedown_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    5,
    "mousedown",
    targetThread,
  )
  return 0
}
function _emscripten_set_mousemove_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    8,
    "mousemove",
    targetThread,
  )
  return 0
}
function _emscripten_set_mouseup_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  registerMouseEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    6,
    "mouseup",
    targetThread,
  )
  return 0
}
function registerWheelEventCallback(
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread,
) {
  if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104)
  var wheelHandlerFunc = function (ev) {
    var e = ev || event
    var wheelEvent = JSEvents.wheelEvent
    fillMouseEventData(wheelEvent, e, target)
    HEAPF64[(wheelEvent + 72) >> 3] = e["deltaX"]
    HEAPF64[(wheelEvent + 80) >> 3] = e["deltaY"]
    HEAPF64[(wheelEvent + 88) >> 3] = e["deltaZ"]
    HEAP32[(wheelEvent + 96) >> 2] = e["deltaMode"]
    if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData))
      e.preventDefault()
  }
  var eventHandler = {
    target: target,
    allowsDeferredCalls: true,
    eventTypeString: eventTypeString,
    callbackfunc: callbackfunc,
    handlerFunc: wheelHandlerFunc,
    useCapture: useCapture,
  }
  JSEvents.registerOrRemoveHandler(eventHandler)
}
function _emscripten_set_wheel_callback_on_thread(
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread,
) {
  target = findEventTarget(target)
  if (typeof target.onwheel != "undefined") {
    registerWheelEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      9,
      "wheel",
      targetThread,
    )
    return 0
  } else {
    return -1
  }
}
var ENV = {}
function getExecutableName() {
  return thisProgram || "./this.program"
}
function getEnvStrings() {
  if (!getEnvStrings.strings) {
    var lang =
      (
        (typeof navigator == "object" &&
          navigator.languages &&
          navigator.languages[0]) ||
        "C"
      ).replace("-", "_") + ".UTF-8"
    var env = {
      USER: "web_user",
      LOGNAME: "web_user",
      PATH: "/",
      PWD: "/",
      HOME: "/home/web_user",
      LANG: lang,
      _: getExecutableName(),
    }
    for (var x in ENV) {
      if (ENV[x] === undefined) delete env[x]
      else env[x] = ENV[x]
    }
    var strings = []
    for (var x in env) {
      strings.push(x + "=" + env[x])
    }
    getEnvStrings.strings = strings
  }
  return getEnvStrings.strings
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[buffer++ >> 0] = str.charCodeAt(i)
  }
  if (!dontAddNull) HEAP8[buffer >> 0] = 0
}
function _environ_get(__environ, environ_buf) {
  var bufSize = 0
  getEnvStrings().forEach(function (string, i) {
    var ptr = environ_buf + bufSize
    HEAPU32[(__environ + i * 4) >> 2] = ptr
    writeAsciiToMemory(string, ptr)
    bufSize += string.length + 1
  })
  return 0
}
function _environ_sizes_get(penviron_count, penviron_buf_size) {
  var strings = getEnvStrings()
  HEAPU32[penviron_count >> 2] = strings.length
  var bufSize = 0
  strings.forEach(function (string) {
    bufSize += string.length + 1
  })
  HEAPU32[penviron_buf_size >> 2] = bufSize
  return 0
}
function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    FS.close(stream)
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return e.errno
  }
}
function doReadv(stream, iov, iovcnt, offset) {
  var ret = 0
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2]
    var len = HEAPU32[(iov + 4) >> 2]
    iov += 8
    var curr = FS.read(stream, HEAP8, ptr, len, offset)
    if (curr < 0) return -1
    ret += curr
    if (curr < len) break
  }
  return ret
}
function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var num = doReadv(stream, iov, iovcnt)
    HEAPU32[pnum >> 2] = num
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return e.errno
  }
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
    var offset = convertI32PairToI53Checked(offset_low, offset_high)
    if (isNaN(offset)) return 61
    var stream = SYSCALLS.getStreamFromFD(fd)
    FS.llseek(stream, offset, whence)
    ;(tempI64 = [
      stream.position >>> 0,
      ((tempDouble = stream.position),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0),
    ]),
      (HEAP32[newOffset >> 2] = tempI64[0]),
      (HEAP32[(newOffset + 4) >> 2] = tempI64[1])
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return e.errno
  }
}
function doWritev(stream, iov, iovcnt, offset) {
  var ret = 0
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2]
    var len = HEAPU32[(iov + 4) >> 2]
    iov += 8
    var curr = FS.write(stream, HEAP8, ptr, len, offset)
    if (curr < 0) return -1
    ret += curr
  }
  return ret
}
function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var num = doWritev(stream, iov, iovcnt)
    HEAPU32[pnum >> 2] = num
    return 0
  } catch (e) {
    if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e
    return e.errno
  }
}
function _glActiveTexture(x0) {
  GLctx["activeTexture"](x0)
}
function _glAttachShader(program, shader) {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader])
}
function _glBindBuffer(target, buffer) {
  if (target == 34962) {
    GLctx.currentArrayBufferBinding = buffer
  } else if (target == 34963) {
    GLctx.currentElementArrayBufferBinding = buffer
  }
  GLctx.bindBuffer(target, GL.buffers[buffer])
}
function _glBindFramebuffer(target, framebuffer) {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
}
function _glBindRenderbuffer(target, renderbuffer) {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
}
function _glBlendEquation(x0) {
  GLctx["blendEquation"](x0)
}
function _glBlendFunc(x0, x1) {
  GLctx["blendFunc"](x0, x1)
}
function _glBufferData(target, size, data, usage) {
  GLctx.bufferData(
    target,
    data ? HEAPU8.subarray(data, data + size) : size,
    usage,
  )
}
function _glCheckFramebufferStatus(x0) {
  return GLctx["checkFramebufferStatus"](x0)
}
function _glClear(x0) {
  GLctx["clear"](x0)
}
function _glClearColor(x0, x1, x2, x3) {
  GLctx["clearColor"](x0, x1, x2, x3)
}
function _glCompileShader(shader) {
  GLctx.compileShader(GL.shaders[shader])
}
function _glCreateProgram() {
  var id = GL.getNewId(GL.programs)
  var program = GLctx.createProgram()
  program.name = id
  program.maxUniformLength =
    program.maxAttributeLength =
    program.maxUniformBlockNameLength =
      0
  program.uniformIdCounter = 1
  GL.programs[id] = program
  return id
}
function _glCreateShader(shaderType) {
  var id = GL.getNewId(GL.shaders)
  GL.shaders[id] = GLctx.createShader(shaderType)
  return id
}
function _glDeleteBuffers(n, buffers) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(buffers + i * 4) >> 2]
    var buffer = GL.buffers[id]
    if (!buffer) continue
    GLctx.deleteBuffer(buffer)
    buffer.name = 0
    GL.buffers[id] = null
    if (id == GLctx.currentArrayBufferBinding)
      GLctx.currentArrayBufferBinding = 0
    if (id == GLctx.currentElementArrayBufferBinding)
      GLctx.currentElementArrayBufferBinding = 0
  }
}
function _glDeleteFramebuffers(n, framebuffers) {
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(framebuffers + i * 4) >> 2]
    var framebuffer = GL.framebuffers[id]
    if (!framebuffer) continue
    GLctx.deleteFramebuffer(framebuffer)
    framebuffer.name = 0
    GL.framebuffers[id] = null
  }
}
function _glDeleteProgram(id) {
  if (!id) return
  var program = GL.programs[id]
  if (!program) {
    GL.recordError(1281)
    return
  }
  GLctx.deleteProgram(program)
  program.name = 0
  GL.programs[id] = null
}
function _glDeleteRenderbuffers(n, renderbuffers) {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(renderbuffers + i * 4) >> 2]
    var renderbuffer = GL.renderbuffers[id]
    if (!renderbuffer) continue
    GLctx.deleteRenderbuffer(renderbuffer)
    renderbuffer.name = 0
    GL.renderbuffers[id] = null
  }
}
function _glDeleteShader(id) {
  if (!id) return
  var shader = GL.shaders[id]
  if (!shader) {
    GL.recordError(1281)
    return
  }
  GLctx.deleteShader(shader)
  GL.shaders[id] = null
}
function _glDisable(x0) {
  GLctx["disable"](x0)
}
function _glDisableVertexAttribArray(index) {
  var cb = GL.currentContext.clientBuffers[index]
  cb.enabled = false
  GLctx.disableVertexAttribArray(index)
}
function _glDrawArrays(mode, first, count) {
  GL.preDrawHandleClientVertexAttribBindings(first + count)
  GLctx.drawArrays(mode, first, count)
  GL.postDrawHandleClientVertexAttribBindings()
}
function _glEnable(x0) {
  GLctx["enable"](x0)
}
function _glEnableVertexAttribArray(index) {
  var cb = GL.currentContext.clientBuffers[index]
  cb.enabled = true
  GLctx.enableVertexAttribArray(index)
}
function _glFinish() {
  GLctx["finish"]()
}
function _glFlush() {
  GLctx["flush"]()
}
function _glFramebufferRenderbuffer(
  target,
  attachment,
  renderbuffertarget,
  renderbuffer,
) {
  GLctx.framebufferRenderbuffer(
    target,
    attachment,
    renderbuffertarget,
    GL.renderbuffers[renderbuffer],
  )
}
function _glFramebufferTexture2D(
  target,
  attachment,
  textarget,
  texture,
  level,
) {
  GLctx.framebufferTexture2D(
    target,
    attachment,
    textarget,
    GL.textures[texture],
    level,
  )
}
function _glGenBuffers(n, buffers) {
  __glGenObject(n, buffers, "createBuffer", GL.buffers)
}
function _glGenFramebuffers(n, ids) {
  __glGenObject(n, ids, "createFramebuffer", GL.framebuffers)
}
function _glGenRenderbuffers(n, renderbuffers) {
  __glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers)
}
function _glGenerateMipmap(x0) {
  GLctx["generateMipmap"](x0)
}
function _glGetAttribLocation(program, name) {
  return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name))
}
function _glGetError() {
  var error = GLctx.getError() || GL.lastError
  GL.lastError = 0
  return error
}
function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
  var log = GLctx.getProgramInfoLog(GL.programs[program])
  if (log === null) log = "(unknown error)"
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}
function _glGetProgramiv(program, pname, p) {
  if (!p) {
    GL.recordError(1281)
    return
  }
  if (program >= GL.counter) {
    GL.recordError(1281)
    return
  }
  program = GL.programs[program]
  if (pname == 35716) {
    var log = GLctx.getProgramInfoLog(program)
    if (log === null) log = "(unknown error)"
    HEAP32[p >> 2] = log.length + 1
  } else if (pname == 35719) {
    if (!program.maxUniformLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
        program.maxUniformLength = Math.max(
          program.maxUniformLength,
          GLctx.getActiveUniform(program, i).name.length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxUniformLength
  } else if (pname == 35722) {
    if (!program.maxAttributeLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
        program.maxAttributeLength = Math.max(
          program.maxAttributeLength,
          GLctx.getActiveAttrib(program, i).name.length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxAttributeLength
  } else if (pname == 35381) {
    if (!program.maxUniformBlockNameLength) {
      for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
        program.maxUniformBlockNameLength = Math.max(
          program.maxUniformBlockNameLength,
          GLctx.getActiveUniformBlockName(program, i).length + 1,
        )
      }
    }
    HEAP32[p >> 2] = program.maxUniformBlockNameLength
  } else {
    HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname)
  }
}
function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader])
  if (log === null) log = "(unknown error)"
  var numBytesWrittenExclNull =
    maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
}
function _glGetShaderiv(shader, pname, p) {
  if (!p) {
    GL.recordError(1281)
    return
  }
  if (pname == 35716) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader])
    if (log === null) log = "(unknown error)"
    var logLength = log ? log.length + 1 : 0
    HEAP32[p >> 2] = logLength
  } else if (pname == 35720) {
    var source = GLctx.getShaderSource(GL.shaders[shader])
    var sourceLength = source ? source.length + 1 : 0
    HEAP32[p >> 2] = sourceLength
  } else {
    HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
  }
}
function _glGetString(name_) {
  var ret = GL.stringCache[name_]
  if (!ret) {
    switch (name_) {
      case 7939:
        var exts = GLctx.getSupportedExtensions() || []
        exts = exts.concat(
          exts.map(function (e) {
            return "GL_" + e
          }),
        )
        ret = stringToNewUTF8(exts.join(" "))
        break
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        var s = GLctx.getParameter(name_)
        if (!s) {
          GL.recordError(1280)
        }
        ret = s && stringToNewUTF8(s)
        break
      case 7938:
        var glVersion = GLctx.getParameter(7938)
        {
          glVersion = "OpenGL ES 2.0 (" + glVersion + ")"
        }
        ret = stringToNewUTF8(glVersion)
        break
      case 35724:
        var glslVersion = GLctx.getParameter(35724)
        var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
        var ver_num = glslVersion.match(ver_re)
        if (ver_num !== null) {
          if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0"
          glslVersion =
            "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")"
        }
        ret = stringToNewUTF8(glslVersion)
        break
      default:
        GL.recordError(1280)
    }
    GL.stringCache[name_] = ret
  }
  return ret
}
function _glGetUniformLocation(program, name) {
  name = UTF8ToString(name)
  if ((program = GL.programs[program])) {
    webglPrepareUniformLocationsBeforeFirstUse(program)
    var uniformLocsById = program.uniformLocsById
    var arrayIndex = 0
    var uniformBaseName = name
    var leftBrace = webglGetLeftBracePos(name)
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0
      uniformBaseName = name.slice(0, leftBrace)
    }
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName]
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1]
      if (
        (uniformLocsById[arrayIndex] =
          uniformLocsById[arrayIndex] ||
          GLctx.getUniformLocation(program, name))
      ) {
        return arrayIndex
      }
    }
  } else {
    GL.recordError(1281)
  }
  return -1
}
function _glIsProgram(program) {
  program = GL.programs[program]
  if (!program) return 0
  return GLctx.isProgram(program)
}
function _glLinkProgram(program) {
  program = GL.programs[program]
  GLctx.linkProgram(program)
  program.uniformLocsById = 0
  program.uniformSizeAndIdsByName = {}
}
function _glPixelStorei(pname, param) {
  if (pname == 3317) {
    GL.unpackAlignment = param
  }
  GLctx.pixelStorei(pname, param)
}
function _glReadPixels(x, y, width, height, format, type, pixels) {
  var pixelData = emscriptenWebGLGetTexPixelData(
    type,
    format,
    width,
    height,
    pixels,
    format,
  )
  if (!pixelData) {
    GL.recordError(1280)
    return
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData)
}
function _glRenderbufferStorage(x0, x1, x2, x3) {
  GLctx["renderbufferStorage"](x0, x1, x2, x3)
}
function _glScissor(x0, x1, x2, x3) {
  GLctx["scissor"](x0, x1, x2, x3)
}
function _glShaderSource(shader, count, string, length) {
  var source = GL.getSource(shader, count, string, length)
  GLctx.shaderSource(GL.shaders[shader], source)
}
function _glTexImage2D(
  target,
  level,
  internalFormat,
  width,
  height,
  border,
  format,
  type,
  pixels,
) {
  GLctx.texImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    format,
    type,
    pixels
      ? emscriptenWebGLGetTexPixelData(
          type,
          format,
          width,
          height,
          pixels,
          internalFormat,
        )
      : null,
  )
}
function _glTexSubImage2D(
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  type,
  pixels,
) {
  var pixelData = null
  if (pixels)
    pixelData = emscriptenWebGLGetTexPixelData(
      type,
      format,
      width,
      height,
      pixels,
      0,
    )
  GLctx.texSubImage2D(
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    type,
    pixelData,
  )
}
function _glUniform1f(location, v0) {
  GLctx.uniform1f(webglGetUniformLocation(location), v0)
}
function _glUniform1fv(location, count, value) {
  if (count <= 288) {
    var view = miniTempWebGLFloatBuffers[count - 1]
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2)
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view)
}
function _glUniform1i(location, v0) {
  GLctx.uniform1i(webglGetUniformLocation(location), v0)
}
function _glUniform2f(location, v0, v1) {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1)
}
function _glUniform2fv(location, count, value) {
  if (count <= 144) {
    var view = miniTempWebGLFloatBuffers[2 * count - 1]
    for (var i = 0; i < 2 * count; i += 2) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2)
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view)
}
function _glUniform3f(location, v0, v1, v2) {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2)
}
function _glUniform3fv(location, count, value) {
  if (count <= 96) {
    var view = miniTempWebGLFloatBuffers[3 * count - 1]
    for (var i = 0; i < 3 * count; i += 3) {
      view[i] = HEAPF32[(value + 4 * i) >> 2]
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2]
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2)
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view)
}
function _glUniform4f(location, v0, v1, v2, v3) {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3)
}
function _glUniform4fv(location, count, value) {
  if (count <= 72) {
    var view = miniTempWebGLFloatBuffers[4 * count - 1]
    var heap = HEAPF32
    value >>= 2
    for (var i = 0; i < 4 * count; i += 4) {
      var dst = value + i
      view[i] = heap[dst]
      view[i + 1] = heap[dst + 1]
      view[i + 2] = heap[dst + 2]
      view[i + 3] = heap[dst + 3]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2)
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view)
}
function _glUniformMatrix4fv(location, count, transpose, value) {
  if (count <= 18) {
    var view = miniTempWebGLFloatBuffers[16 * count - 1]
    var heap = HEAPF32
    value >>= 2
    for (var i = 0; i < 16 * count; i += 16) {
      var dst = value + i
      view[i] = heap[dst]
      view[i + 1] = heap[dst + 1]
      view[i + 2] = heap[dst + 2]
      view[i + 3] = heap[dst + 3]
      view[i + 4] = heap[dst + 4]
      view[i + 5] = heap[dst + 5]
      view[i + 6] = heap[dst + 6]
      view[i + 7] = heap[dst + 7]
      view[i + 8] = heap[dst + 8]
      view[i + 9] = heap[dst + 9]
      view[i + 10] = heap[dst + 10]
      view[i + 11] = heap[dst + 11]
      view[i + 12] = heap[dst + 12]
      view[i + 13] = heap[dst + 13]
      view[i + 14] = heap[dst + 14]
      view[i + 15] = heap[dst + 15]
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2)
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view)
}
function _glUseProgram(program) {
  program = GL.programs[program]
  GLctx.useProgram(program)
  GLctx.currentProgram = program
}
function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
  var cb = GL.currentContext.clientBuffers[index]
  if (!GLctx.currentArrayBufferBinding) {
    cb.size = size
    cb.type = type
    cb.normalized = normalized
    cb.stride = stride
    cb.ptr = ptr
    cb.clientside = true
    cb.vertexAttribPointerAdaptor = function (
      index,
      size,
      type,
      normalized,
      stride,
      ptr,
    ) {
      this.vertexAttribPointer(index, size, type, normalized, stride, ptr)
    }
    return
  }
  cb.clientside = false
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
}
function _glViewport(x0, x1, x2, x3) {
  GLctx["viewport"](x0, x1, x2, x3)
}
function __isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}
function __arraySum(array, index) {
  var sum = 0
  for (var i = 0; i <= index; sum += array[i++]) {}
  return sum
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function __addDays(date, days) {
  var newDate = new Date(date.getTime())
  while (days > 0) {
    var leap = __isLeapYear(newDate.getFullYear())
    var currentMonth = newDate.getMonth()
    var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[
      currentMonth
    ]
    if (days > daysInCurrentMonth - newDate.getDate()) {
      days -= daysInCurrentMonth - newDate.getDate() + 1
      newDate.setDate(1)
      if (currentMonth < 11) {
        newDate.setMonth(currentMonth + 1)
      } else {
        newDate.setMonth(0)
        newDate.setFullYear(newDate.getFullYear() + 1)
      }
    } else {
      newDate.setDate(newDate.getDate() + days)
      return newDate
    }
  }
  return newDate
}
function writeArrayToMemory(array, buffer) {
  HEAP8.set(array, buffer)
}
function _strftime(s, maxsize, format, tm) {
  var tm_zone = HEAP32[(tm + 40) >> 2]
  var date = {
    tm_sec: HEAP32[tm >> 2],
    tm_min: HEAP32[(tm + 4) >> 2],
    tm_hour: HEAP32[(tm + 8) >> 2],
    tm_mday: HEAP32[(tm + 12) >> 2],
    tm_mon: HEAP32[(tm + 16) >> 2],
    tm_year: HEAP32[(tm + 20) >> 2],
    tm_wday: HEAP32[(tm + 24) >> 2],
    tm_yday: HEAP32[(tm + 28) >> 2],
    tm_isdst: HEAP32[(tm + 32) >> 2],
    tm_gmtoff: HEAP32[(tm + 36) >> 2],
    tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
  }
  var pattern = UTF8ToString(format)
  var EXPANSION_RULES_1 = {
    "%c": "%a %b %d %H:%M:%S %Y",
    "%D": "%m/%d/%y",
    "%F": "%Y-%m-%d",
    "%h": "%b",
    "%r": "%I:%M:%S %p",
    "%R": "%H:%M",
    "%T": "%H:%M:%S",
    "%x": "%m/%d/%y",
    "%X": "%H:%M:%S",
    "%Ec": "%c",
    "%EC": "%C",
    "%Ex": "%m/%d/%y",
    "%EX": "%H:%M:%S",
    "%Ey": "%y",
    "%EY": "%Y",
    "%Od": "%d",
    "%Oe": "%e",
    "%OH": "%H",
    "%OI": "%I",
    "%Om": "%m",
    "%OM": "%M",
    "%OS": "%S",
    "%Ou": "%u",
    "%OU": "%U",
    "%OV": "%V",
    "%Ow": "%w",
    "%OW": "%W",
    "%Oy": "%y",
  }
  for (var rule in EXPANSION_RULES_1) {
    pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule])
  }
  var WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  function leadingSomething(value, digits, character) {
    var str = typeof value == "number" ? value.toString() : value || ""
    while (str.length < digits) {
      str = character[0] + str
    }
    return str
  }
  function leadingNulls(value, digits) {
    return leadingSomething(value, digits, "0")
  }
  function compareByDay(date1, date2) {
    function sgn(value) {
      return value < 0 ? -1 : value > 0 ? 1 : 0
    }
    var compare
    if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
      if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
        compare = sgn(date1.getDate() - date2.getDate())
      }
    }
    return compare
  }
  function getFirstWeekStartDate(janFourth) {
    switch (janFourth.getDay()) {
      case 0:
        return new Date(janFourth.getFullYear() - 1, 11, 29)
      case 1:
        return janFourth
      case 2:
        return new Date(janFourth.getFullYear(), 0, 3)
      case 3:
        return new Date(janFourth.getFullYear(), 0, 2)
      case 4:
        return new Date(janFourth.getFullYear(), 0, 1)
      case 5:
        return new Date(janFourth.getFullYear() - 1, 11, 31)
      case 6:
        return new Date(janFourth.getFullYear() - 1, 11, 30)
    }
  }
  function getWeekBasedYear(date) {
    var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
    var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
    var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
    var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
    var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
    if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
      if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
        return thisDate.getFullYear() + 1
      }
      return thisDate.getFullYear()
    }
    return thisDate.getFullYear() - 1
  }
  var EXPANSION_RULES_2 = {
    "%a": function (date) {
      return WEEKDAYS[date.tm_wday].substring(0, 3)
    },
    "%A": function (date) {
      return WEEKDAYS[date.tm_wday]
    },
    "%b": function (date) {
      return MONTHS[date.tm_mon].substring(0, 3)
    },
    "%B": function (date) {
      return MONTHS[date.tm_mon]
    },
    "%C": function (date) {
      var year = date.tm_year + 1900
      return leadingNulls((year / 100) | 0, 2)
    },
    "%d": function (date) {
      return leadingNulls(date.tm_mday, 2)
    },
    "%e": function (date) {
      return leadingSomething(date.tm_mday, 2, " ")
    },
    "%g": function (date) {
      return getWeekBasedYear(date).toString().substring(2)
    },
    "%G": function (date) {
      return getWeekBasedYear(date)
    },
    "%H": function (date) {
      return leadingNulls(date.tm_hour, 2)
    },
    "%I": function (date) {
      var twelveHour = date.tm_hour
      if (twelveHour == 0) twelveHour = 12
      else if (twelveHour > 12) twelveHour -= 12
      return leadingNulls(twelveHour, 2)
    },
    "%j": function (date) {
      return leadingNulls(
        date.tm_mday +
          __arraySum(
            __isLeapYear(date.tm_year + 1900)
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            date.tm_mon - 1,
          ),
        3,
      )
    },
    "%m": function (date) {
      return leadingNulls(date.tm_mon + 1, 2)
    },
    "%M": function (date) {
      return leadingNulls(date.tm_min, 2)
    },
    "%n": function () {
      return "\n"
    },
    "%p": function (date) {
      if (date.tm_hour >= 0 && date.tm_hour < 12) {
        return "AM"
      }
      return "PM"
    },
    "%S": function (date) {
      return leadingNulls(date.tm_sec, 2)
    },
    "%t": function () {
      return "\t"
    },
    "%u": function (date) {
      return date.tm_wday || 7
    },
    "%U": function (date) {
      var days = date.tm_yday + 7 - date.tm_wday
      return leadingNulls(Math.floor(days / 7), 2)
    },
    "%V": function (date) {
      var val = Math.floor((date.tm_yday + 7 - ((date.tm_wday + 6) % 7)) / 7)
      if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
        val++
      }
      if (!val) {
        val = 52
        var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7
        if (
          dec31 == 4 ||
          (dec31 == 5 && __isLeapYear((date.tm_year % 400) - 1))
        ) {
          val++
        }
      } else if (val == 53) {
        var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7
        if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year))) val = 1
      }
      return leadingNulls(val, 2)
    },
    "%w": function (date) {
      return date.tm_wday
    },
    "%W": function (date) {
      var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7)
      return leadingNulls(Math.floor(days / 7), 2)
    },
    "%y": function (date) {
      return (date.tm_year + 1900).toString().substring(2)
    },
    "%Y": function (date) {
      return date.tm_year + 1900
    },
    "%z": function (date) {
      var off = date.tm_gmtoff
      var ahead = off >= 0
      off = Math.abs(off) / 60
      off = (off / 60) * 100 + (off % 60)
      return (ahead ? "+" : "-") + String("0000" + off).slice(-4)
    },
    "%Z": function (date) {
      return date.tm_zone
    },
    "%%": function () {
      return "%"
    },
  }
  pattern = pattern.replace(/%%/g, "\0\0")
  for (var rule in EXPANSION_RULES_2) {
    if (pattern.includes(rule)) {
      pattern = pattern.replace(
        new RegExp(rule, "g"),
        EXPANSION_RULES_2[rule](date),
      )
    }
  }
  pattern = pattern.replace(/\0\0/g, "%")
  var bytes = intArrayFromString(pattern, false)
  if (bytes.length > maxsize) {
    return 0
  }
  writeArrayToMemory(bytes, s)
  return bytes.length - 1
}
function _strftime_l(s, maxsize, format, tm, loc) {
  return _strftime(s, maxsize, format, tm)
}
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1
  var ret = stackAlloc(size)
  stringToUTF8Array(str, HEAP8, ret, size)
  return ret
}
Module["requestFullscreen"] = function Module_requestFullscreen(
  lockPointer,
  resizeCanvas,
) {
  Browser.requestFullscreen(lockPointer, resizeCanvas)
}
Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
  Browser.requestAnimationFrame(func)
}
Module["setCanvasSize"] = function Module_setCanvasSize(
  width,
  height,
  noUpdates,
) {
  Browser.setCanvasSize(width, height, noUpdates)
}
Module["pauseMainLoop"] = function Module_pauseMainLoop() {
  Browser.mainLoop.pause()
}
Module["resumeMainLoop"] = function Module_resumeMainLoop() {
  Browser.mainLoop.resume()
}
Module["getUserMedia"] = function Module_getUserMedia() {
  Browser.getUserMedia()
}
Module["createContext"] = function Module_createContext(
  canvas,
  useWebGL,
  setInModule,
  webGLContextAttributes,
) {
  return Browser.createContext(
    canvas,
    useWebGL,
    setInModule,
    webGLContextAttributes,
  )
}
var preloadedImages = {}
var preloadedAudios = {}
var FSNode = function (parent, name, mode, rdev) {
  if (!parent) {
    parent = this
  }
  this.parent = parent
  this.mount = parent.mount
  this.mounted = null
  this.id = FS.nextInode++
  this.name = name
  this.mode = mode
  this.node_ops = {}
  this.stream_ops = {}
  this.rdev = rdev
}
var readMode = 292 | 73
var writeMode = 146
Object.defineProperties(FSNode.prototype, {
  read: {
    get: function () {
      return (this.mode & readMode) === readMode
    },
    set: function (val) {
      val ? (this.mode |= readMode) : (this.mode &= ~readMode)
    },
  },
  write: {
    get: function () {
      return (this.mode & writeMode) === writeMode
    },
    set: function (val) {
      val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
    },
  },
  isFolder: {
    get: function () {
      return FS.isDir(this.mode)
    },
  },
  isDevice: {
    get: function () {
      return FS.isChrdev(this.mode)
    },
  },
})
FS.FSNode = FSNode
FS.staticInit()
var GLctx
ERRNO_CODES = {
  EPERM: 63,
  ENOENT: 44,
  ESRCH: 71,
  EINTR: 27,
  EIO: 29,
  ENXIO: 60,
  E2BIG: 1,
  ENOEXEC: 45,
  EBADF: 8,
  ECHILD: 12,
  EAGAIN: 6,
  EWOULDBLOCK: 6,
  ENOMEM: 48,
  EACCES: 2,
  EFAULT: 21,
  ENOTBLK: 105,
  EBUSY: 10,
  EEXIST: 20,
  EXDEV: 75,
  ENODEV: 43,
  ENOTDIR: 54,
  EISDIR: 31,
  EINVAL: 28,
  ENFILE: 41,
  EMFILE: 33,
  ENOTTY: 59,
  ETXTBSY: 74,
  EFBIG: 22,
  ENOSPC: 51,
  ESPIPE: 70,
  EROFS: 69,
  EMLINK: 34,
  EPIPE: 64,
  EDOM: 18,
  ERANGE: 68,
  ENOMSG: 49,
  EIDRM: 24,
  ECHRNG: 106,
  EL2NSYNC: 156,
  EL3HLT: 107,
  EL3RST: 108,
  ELNRNG: 109,
  EUNATCH: 110,
  ENOCSI: 111,
  EL2HLT: 112,
  EDEADLK: 16,
  ENOLCK: 46,
  EBADE: 113,
  EBADR: 114,
  EXFULL: 115,
  ENOANO: 104,
  EBADRQC: 103,
  EBADSLT: 102,
  EDEADLOCK: 16,
  EBFONT: 101,
  ENOSTR: 100,
  ENODATA: 116,
  ETIME: 117,
  ENOSR: 118,
  ENONET: 119,
  ENOPKG: 120,
  EREMOTE: 121,
  ENOLINK: 47,
  EADV: 122,
  ESRMNT: 123,
  ECOMM: 124,
  EPROTO: 65,
  EMULTIHOP: 36,
  EDOTDOT: 125,
  EBADMSG: 9,
  ENOTUNIQ: 126,
  EBADFD: 127,
  EREMCHG: 128,
  ELIBACC: 129,
  ELIBBAD: 130,
  ELIBSCN: 131,
  ELIBMAX: 132,
  ELIBEXEC: 133,
  ENOSYS: 52,
  ENOTEMPTY: 55,
  ENAMETOOLONG: 37,
  ELOOP: 32,
  EOPNOTSUPP: 138,
  EPFNOSUPPORT: 139,
  ECONNRESET: 15,
  ENOBUFS: 42,
  EAFNOSUPPORT: 5,
  EPROTOTYPE: 67,
  ENOTSOCK: 57,
  ENOPROTOOPT: 50,
  ESHUTDOWN: 140,
  ECONNREFUSED: 14,
  EADDRINUSE: 3,
  ECONNABORTED: 13,
  ENETUNREACH: 40,
  ENETDOWN: 38,
  ETIMEDOUT: 73,
  EHOSTDOWN: 142,
  EHOSTUNREACH: 23,
  EINPROGRESS: 26,
  EALREADY: 7,
  EDESTADDRREQ: 17,
  EMSGSIZE: 35,
  EPROTONOSUPPORT: 66,
  ESOCKTNOSUPPORT: 137,
  EADDRNOTAVAIL: 4,
  ENETRESET: 39,
  EISCONN: 30,
  ENOTCONN: 53,
  ETOOMANYREFS: 141,
  EUSERS: 136,
  EDQUOT: 19,
  ESTALE: 72,
  ENOTSUP: 138,
  ENOMEDIUM: 148,
  EILSEQ: 25,
  EOVERFLOW: 61,
  ECANCELED: 11,
  ENOTRECOVERABLE: 56,
  EOWNERDEAD: 62,
  ESTRPIPE: 135,
}
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i))
var miniTempWebGLFloatBuffersStorage = new Float32Array(288)
for (var i = 0; i < 288; ++i) {
  miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(
    0,
    i + 1,
  )
}
var __miniTempWebGLIntBuffersStorage = new Int32Array(288)
for (var i = 0; i < 288; ++i) {
  __miniTempWebGLIntBuffers[i] = __miniTempWebGLIntBuffersStorage.subarray(
    0,
    i + 1,
  )
}
var asmLibraryArg = {
  Ta: _RWebAudioBufferSize,
  Va: _RWebAudioFree,
  $a: _RWebAudioInit,
  bf: _RWebAudioRecalibrateTime,
  _a: _RWebAudioSampleRate,
  Wa: _RWebAudioSetNonblockState,
  Xa: _RWebAudioStart,
  Ya: _RWebAudioStop,
  Za: _RWebAudioWrite,
  Ua: _RWebAudioWriteAvail,
  Sa: _RWebCamFree,
  cb: _RWebCamInit,
  Pa: _RWebCamPoll,
  Ra: _RWebCamStart,
  Qa: _RWebCamStop,
  z: ___assert_fail,
  a: ___cxa_allocate_exception,
  b: ___cxa_throw,
  ia: ___syscall_fcntl64,
  bb: ___syscall_ftruncate64,
  sb: ___syscall_getcwd,
  nb: ___syscall_getdents64,
  tb: ___syscall_ioctl,
  ob: ___syscall_mkdirat,
  ja: ___syscall_openat,
  mb: ___syscall_readlinkat,
  jb: ___syscall_renameat,
  kb: ___syscall_rmdir,
  ib: ___syscall_stat64,
  lb: ___syscall_unlinkat,
  ub: __emscripten_get_now_is_monotonic,
  fb: __emscripten_throw_longjmp,
  xb: __localtime_js,
  yb: __mktime_js,
  zb: __tzset_js,
  c: _abort,
  we: _dummyErrnoCodes,
  Ha: _eglBindAPI,
  Ca: _eglChooseConfig,
  Y: _eglCreateContext,
  Aa: _eglCreateWindowSurface,
  _: _eglDestroyContext,
  Ga: _eglDestroySurface,
  Da: _eglGetConfigs,
  Ea: _eglGetCurrentContext,
  Ba: _eglGetDisplay,
  Ka: _eglGetError,
  Ia: _eglInitialize,
  O: _eglMakeCurrent,
  Z: _eglQuerySurface,
  Fa: _eglSwapBuffers,
  Ja: _eglTerminate,
  vb: _emscripten_date_now,
  Qb: _emscripten_exit_pointerlock,
  xd: _emscripten_force_exit,
  aa: _emscripten_get_canvas_element_size,
  La: _emscripten_get_fullscreen_status,
  F: _emscripten_get_gamepad_status,
  hb: _emscripten_get_heap_max,
  V: _emscripten_get_now,
  se: _emscripten_glActiveTexture,
  re: _emscripten_glAttachShader,
  Je: _emscripten_glBeginQueryEXT,
  qe: _emscripten_glBindAttribLocation,
  pe: _emscripten_glBindBuffer,
  oe: _emscripten_glBindFramebuffer,
  ne: _emscripten_glBindRenderbuffer,
  me: _emscripten_glBindTexture,
  Be: _emscripten_glBindVertexArrayOES,
  le: _emscripten_glBlendColor,
  ke: _emscripten_glBlendEquation,
  je: _emscripten_glBlendEquationSeparate,
  ie: _emscripten_glBlendFunc,
  he: _emscripten_glBlendFuncSeparate,
  ge: _emscripten_glBufferData,
  fe: _emscripten_glBufferSubData,
  ee: _emscripten_glCheckFramebufferStatus,
  de: _emscripten_glClear,
  ce: _emscripten_glClearColor,
  be: _emscripten_glClearDepthf,
  ae: _emscripten_glClearStencil,
  $d: _emscripten_glColorMask,
  _d: _emscripten_glCompileShader,
  Zd: _emscripten_glCompressedTexImage2D,
  Yd: _emscripten_glCompressedTexSubImage2D,
  Xd: _emscripten_glCopyTexImage2D,
  Wd: _emscripten_glCopyTexSubImage2D,
  Vd: _emscripten_glCreateProgram,
  Ud: _emscripten_glCreateShader,
  Sd: _emscripten_glCullFace,
  Rd: _emscripten_glDeleteBuffers,
  Qd: _emscripten_glDeleteFramebuffers,
  Pd: _emscripten_glDeleteProgram,
  Le: _emscripten_glDeleteQueriesEXT,
  Od: _emscripten_glDeleteRenderbuffers,
  Nd: _emscripten_glDeleteShader,
  Md: _emscripten_glDeleteTextures,
  Ae: _emscripten_glDeleteVertexArraysOES,
  Ld: _emscripten_glDepthFunc,
  Kd: _emscripten_glDepthMask,
  Jd: _emscripten_glDepthRangef,
  Hd: _emscripten_glDetachShader,
  Gd: _emscripten_glDisable,
  Fd: _emscripten_glDisableVertexAttribArray,
  Ed: _emscripten_glDrawArrays,
  ve: _emscripten_glDrawArraysInstancedANGLE,
  xe: _emscripten_glDrawBuffersWEBGL,
  Dd: _emscripten_glDrawElements,
  ue: _emscripten_glDrawElementsInstancedANGLE,
  Cd: _emscripten_glEnable,
  Bd: _emscripten_glEnableVertexAttribArray,
  Ie: _emscripten_glEndQueryEXT,
  Ad: _emscripten_glFinish,
  zd: _emscripten_glFlush,
  yd: _emscripten_glFramebufferRenderbuffer,
  vd: _emscripten_glFramebufferTexture2D,
  ud: _emscripten_glFrontFace,
  td: _emscripten_glGenBuffers,
  rd: _emscripten_glGenFramebuffers,
  Me: _emscripten_glGenQueriesEXT,
  qd: _emscripten_glGenRenderbuffers,
  pd: _emscripten_glGenTextures,
  ze: _emscripten_glGenVertexArraysOES,
  sd: _emscripten_glGenerateMipmap,
  od: _emscripten_glGetActiveAttrib,
  nd: _emscripten_glGetActiveUniform,
  md: _emscripten_glGetAttachedShaders,
  kd: _emscripten_glGetAttribLocation,
  jd: _emscripten_glGetBooleanv,
  id: _emscripten_glGetBufferParameteriv,
  hd: _emscripten_glGetError,
  gd: _emscripten_glGetFloatv,
  fd: _emscripten_glGetFramebufferAttachmentParameteriv,
  ed: _emscripten_glGetIntegerv,
  cd: _emscripten_glGetProgramInfoLog,
  dd: _emscripten_glGetProgramiv,
  De: _emscripten_glGetQueryObjecti64vEXT,
  Fe: _emscripten_glGetQueryObjectivEXT,
  Ce: _emscripten_glGetQueryObjectui64vEXT,
  Ee: _emscripten_glGetQueryObjectuivEXT,
  Ge: _emscripten_glGetQueryivEXT,
  bd: _emscripten_glGetRenderbufferParameteriv,
  _c: _emscripten_glGetShaderInfoLog,
  Zc: _emscripten_glGetShaderPrecisionFormat,
  Yc: _emscripten_glGetShaderSource,
  $c: _emscripten_glGetShaderiv,
  Xc: _emscripten_glGetString,
  Wc: _emscripten_glGetTexParameterfv,
  Vc: _emscripten_glGetTexParameteriv,
  Sc: _emscripten_glGetUniformLocation,
  Uc: _emscripten_glGetUniformfv,
  Tc: _emscripten_glGetUniformiv,
  Oc: _emscripten_glGetVertexAttribPointerv,
  Qc: _emscripten_glGetVertexAttribfv,
  Pc: _emscripten_glGetVertexAttribiv,
  Nc: _emscripten_glHint,
  Mc: _emscripten_glIsBuffer,
  Lc: _emscripten_glIsEnabled,
  Kc: _emscripten_glIsFramebuffer,
  Jc: _emscripten_glIsProgram,
  Ke: _emscripten_glIsQueryEXT,
  Ic: _emscripten_glIsRenderbuffer,
  Hc: _emscripten_glIsShader,
  Fc: _emscripten_glIsTexture,
  ye: _emscripten_glIsVertexArrayOES,
  Ec: _emscripten_glLineWidth,
  Dc: _emscripten_glLinkProgram,
  Cc: _emscripten_glPixelStorei,
  Bc: _emscripten_glPolygonOffset,
  He: _emscripten_glQueryCounterEXT,
  Ac: _emscripten_glReadPixels,
  zc: _emscripten_glReleaseShaderCompiler,
  yc: _emscripten_glRenderbufferStorage,
  xc: _emscripten_glSampleCoverage,
  wc: _emscripten_glScissor,
  uc: _emscripten_glShaderBinary,
  tc: _emscripten_glShaderSource,
  sc: _emscripten_glStencilFunc,
  rc: _emscripten_glStencilFuncSeparate,
  qc: _emscripten_glStencilMask,
  pc: _emscripten_glStencilMaskSeparate,
  oc: _emscripten_glStencilOp,
  nc: _emscripten_glStencilOpSeparate,
  mc: _emscripten_glTexImage2D,
  lc: _emscripten_glTexParameterf,
  jc: _emscripten_glTexParameterfv,
  ic: _emscripten_glTexParameteri,
  hc: _emscripten_glTexParameteriv,
  gc: _emscripten_glTexSubImage2D,
  fc: _emscripten_glUniform1f,
  ec: _emscripten_glUniform1fv,
  dc: _emscripten_glUniform1i,
  cc: _emscripten_glUniform1iv,
  bc: _emscripten_glUniform2f,
  ac: _emscripten_glUniform2fv,
  _b: _emscripten_glUniform2i,
  Zb: _emscripten_glUniform2iv,
  Yb: _emscripten_glUniform3f,
  Xb: _emscripten_glUniform3fv,
  Wb: _emscripten_glUniform3i,
  Vb: _emscripten_glUniform3iv,
  Ub: _emscripten_glUniform4f,
  Tb: _emscripten_glUniform4fv,
  Sb: _emscripten_glUniform4i,
  Rb: _emscripten_glUniform4iv,
  Pb: _emscripten_glUniformMatrix2fv,
  Ob: _emscripten_glUniformMatrix3fv,
  Nb: _emscripten_glUniformMatrix4fv,
  Mb: _emscripten_glUseProgram,
  Lb: _emscripten_glValidateProgram,
  Kb: _emscripten_glVertexAttrib1f,
  Jb: _emscripten_glVertexAttrib1fv,
  Ib: _emscripten_glVertexAttrib2f,
  Hb: _emscripten_glVertexAttrib2fv,
  Gb: _emscripten_glVertexAttrib3f,
  Fb: _emscripten_glVertexAttrib3fv,
  Eb: _emscripten_glVertexAttrib4f,
  Db: _emscripten_glVertexAttrib4fv,
  te: _emscripten_glVertexAttribDivisorANGLE,
  Cb: _emscripten_glVertexAttribPointer,
  Bb: _emscripten_glViewport,
  kc: _emscripten_html5_remove_all_event_listeners,
  Ab: _emscripten_memcpy_big,
  $b: _emscripten_request_pointerlock,
  gb: _emscripten_resize_heap,
  la: _emscripten_sample_gamepad_data,
  na: _emscripten_set_canvas_element_size,
  ma: _emscripten_set_element_css_size,
  wb: _emscripten_set_gamepadconnected_callback_on_thread,
  qb: _emscripten_set_gamepaddisconnected_callback_on_thread,
  Id: _emscripten_set_keydown_callback_on_thread,
  ld: _emscripten_set_keypress_callback_on_thread,
  wd: _emscripten_set_keyup_callback_on_thread,
  Td: _emscripten_set_main_loop,
  $: _emscripten_set_main_loop_timing,
  ad: _emscripten_set_mousedown_callback_on_thread,
  Gc: _emscripten_set_mousemove_callback_on_thread,
  Rc: _emscripten_set_mouseup_callback_on_thread,
  vc: _emscripten_set_wheel_callback_on_thread,
  pb: _environ_get,
  rb: _environ_sizes_get,
  za: _exit,
  N: _fd_close,
  ha: _fd_read,
  ab: _fd_seek,
  U: _fd_write,
  H: _glActiveTexture,
  wa: _glAttachShader,
  qa: _glBindBuffer,
  n: _glBindFramebuffer,
  K: _glBindRenderbuffer,
  d: _glBindTexture,
  J: _glBlendEquation,
  t: _glBlendFunc,
  Se: _glBufferData,
  C: _glCheckFramebufferStatus,
  y: _glClear,
  T: _glClearColor,
  Oe: _glCompileShader,
  We: _glCreateProgram,
  xa: _glCreateShader,
  S: _glDeleteBuffers,
  s: _glDeleteFramebuffers,
  sa: _glDeleteProgram,
  ea: _glDeleteRenderbuffers,
  ua: _glDeleteShader,
  k: _glDeleteTextures,
  l: _glDisable,
  W: _glDisableVertexAttribArray,
  o: _glDrawArrays,
  x: _glEnable,
  Re: _glEnableVertexAttribArray,
  Na: _glFinish,
  Oa: _glFlush,
  P: _glFramebufferRenderbuffer,
  D: _glFramebufferTexture2D,
  X: _glGenBuffers,
  R: _glGenFramebuffers,
  Ma: _glGenRenderbuffers,
  q: _glGenTextures,
  L: _glGenerateMipmap,
  ra: _glGetAttribLocation,
  ga: _glGetError,
  Q: _glGetIntegerv,
  Ue: _glGetProgramInfoLog,
  va: _glGetProgramiv,
  Ne: _glGetShaderInfoLog,
  oa: _glGetShaderiv,
  h: _glGetString,
  B: _glGetUniformLocation,
  ta: _glIsProgram,
  Ve: _glLinkProgram,
  w: _glPixelStorei,
  fa: _glReadPixels,
  da: _glRenderbufferStorage,
  ba: _glScissor,
  Pe: _glShaderSource,
  I: _glTexImage2D,
  g: _glTexParameteri,
  M: _glTexSubImage2D,
  ya: _glUniform1f,
  Ze: _glUniform1fv,
  r: _glUniform1i,
  af: _glUniform2f,
  m: _glUniform2fv,
  $e: _glUniform3f,
  Ye: _glUniform3fv,
  _e: _glUniform4f,
  Xe: _glUniform4fv,
  Te: _glUniformMatrix4fv,
  A: _glUseProgram,
  Qe: _glVertexAttribPointer,
  p: _glViewport,
  ka: invoke_i,
  u: invoke_ii,
  i: invoke_iii,
  E: invoke_iiii,
  pa: invoke_iiiii,
  ca: invoke_iiiiii,
  db: invoke_j,
  f: invoke_v,
  j: invoke_vi,
  e: invoke_vii,
  G: invoke_viii,
  v: _strftime,
  eb: _strftime_l,
}
var asm = createWasm()
var ___wasm_call_ctors = (Module["___wasm_call_ctors"] = function () {
  return (___wasm_call_ctors = Module["___wasm_call_ctors"] =
    Module["asm"]["df"]).apply(null, arguments)
})
var _free = (Module["_free"] = function () {
  return (_free = Module["_free"] = Module["asm"]["ff"]).apply(null, arguments)
})
var _malloc = (Module["_malloc"] = function () {
  return (_malloc = Module["_malloc"] = Module["asm"]["gf"]).apply(
    null,
    arguments,
  )
})
var _fflush = (Module["_fflush"] = function () {
  return (_fflush = Module["_fflush"] = Module["asm"]["hf"]).apply(
    null,
    arguments,
  )
})
var ___errno_location = (Module["___errno_location"] = function () {
  return (___errno_location = Module["___errno_location"] =
    Module["asm"]["jf"]).apply(null, arguments)
})
var _cmd_savefiles = (Module["_cmd_savefiles"] = function () {
  return (_cmd_savefiles = Module["_cmd_savefiles"] =
    Module["asm"]["kf"]).apply(null, arguments)
})
var _cmd_save_state = (Module["_cmd_save_state"] = function () {
  return (_cmd_save_state = Module["_cmd_save_state"] =
    Module["asm"]["lf"]).apply(null, arguments)
})
var _cmd_load_state = (Module["_cmd_load_state"] = function () {
  return (_cmd_load_state = Module["_cmd_load_state"] =
    Module["asm"]["mf"]).apply(null, arguments)
})
var _cmd_take_screenshot = (Module["_cmd_take_screenshot"] = function () {
  return (_cmd_take_screenshot = Module["_cmd_take_screenshot"] =
    Module["asm"]["nf"]).apply(null, arguments)
})
var _main = (Module["_main"] = function () {
  return (_main = Module["_main"] = Module["asm"]["of"]).apply(null, arguments)
})
var ___funcs_on_exit = (Module["___funcs_on_exit"] = function () {
  return (___funcs_on_exit = Module["___funcs_on_exit"] =
    Module["asm"]["pf"]).apply(null, arguments)
})
var _setThrew = (Module["_setThrew"] = function () {
  return (_setThrew = Module["_setThrew"] = Module["asm"]["qf"]).apply(
    null,
    arguments,
  )
})
var stackSave = (Module["stackSave"] = function () {
  return (stackSave = Module["stackSave"] = Module["asm"]["rf"]).apply(
    null,
    arguments,
  )
})
var stackRestore = (Module["stackRestore"] = function () {
  return (stackRestore = Module["stackRestore"] = Module["asm"]["sf"]).apply(
    null,
    arguments,
  )
})
var stackAlloc = (Module["stackAlloc"] = function () {
  return (stackAlloc = Module["stackAlloc"] = Module["asm"]["tf"]).apply(
    null,
    arguments,
  )
})
var ___cxa_is_pointer_type = (Module["___cxa_is_pointer_type"] = function () {
  return (___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] =
    Module["asm"]["uf"]).apply(null, arguments)
})
var dynCall_j = (Module["dynCall_j"] = function () {
  return (dynCall_j = Module["dynCall_j"] = Module["asm"]["vf"]).apply(
    null,
    arguments,
  )
})
function invoke_i(index) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)()
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_ii(index, a1) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)(a1)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_vii(index, a1, a2) {
  var sp = stackSave()
  try {
    getWasmTableEntry(index)(a1, a2)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_iiii(index, a1, a2, a3) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)(a1, a2, a3)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_v(index) {
  var sp = stackSave()
  try {
    getWasmTableEntry(index)()
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_vi(index, a1) {
  var sp = stackSave()
  try {
    getWasmTableEntry(index)(a1)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_viii(index, a1, a2, a3) {
  var sp = stackSave()
  try {
    getWasmTableEntry(index)(a1, a2, a3)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_iii(index, a1, a2) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)(a1, a2)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_iiiii(index, a1, a2, a3, a4) {
  var sp = stackSave()
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
function invoke_j(index) {
  var sp = stackSave()
  try {
    return dynCall_j(index)
  } catch (e) {
    stackRestore(sp)
    if (e !== e + 0) throw e
    _setThrew(1, 0)
  }
}
Module["callMain"] = callMain
var calledRun
dependenciesFulfilled = function runCaller() {
  if (!calledRun) run()
  if (!calledRun) dependenciesFulfilled = runCaller
}
function callMain(args) {
  var entryFunction = Module["_main"]
  args = args || []
  args.unshift(thisProgram)
  var argc = args.length
  var argv = stackAlloc((argc + 1) * 4)
  var argv_ptr = argv >> 2
  args.forEach((arg) => {
    HEAP32[argv_ptr++] = allocateUTF8OnStack(arg)
  })
  HEAP32[argv_ptr] = 0
  try {
    var ret = entryFunction(argc, argv)
    exitJS(ret, true)
    return ret
  } catch (e) {
    return handleException(e)
  }
}
function run(args) {
  args = args || arguments_
  if (runDependencies > 0) {
    return
  }
  preRun()
  if (runDependencies > 0) {
    return
  }
  function doRun() {
    if (calledRun) return
    calledRun = true
    Module["calledRun"] = true
    if (ABORT) return
    initRuntime()
    preMain()
    if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]()
    if (shouldRunNow) callMain(args)
    postRun()
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...")
    setTimeout(function () {
      setTimeout(function () {
        Module["setStatus"]("")
      }, 1)
      doRun()
    }, 1)
  } else {
    doRun()
  }
}
if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function")
    Module["preInit"] = [Module["preInit"]]
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()()
  }
}
var shouldRunNow = true
if (Module["noInitialRun"]) shouldRunNow = false
run()
