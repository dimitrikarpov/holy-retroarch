const moduleLogger = (analyzer) => {
  const printLogs = []
  const printErrLogs = []

  return {
    print: (message) => printLogs.push(message),
    printErr: (message) => printErrLogs.push(message),
  }
}
