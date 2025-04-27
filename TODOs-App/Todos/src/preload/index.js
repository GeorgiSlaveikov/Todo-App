import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

contextBridge.exposeInMainWorld('electronAPI', {
  exitApp: () => ipcRenderer.send('app-exit'),
  pickDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
  createJsonFile: (dir, fileName) => ipcRenderer.invoke("file:create", dir, fileName),
  openFileDialog: () => ipcRenderer.invoke("dialog:openFile"),
  writeJsonFile: (path, jsonData) => ipcRenderer.invoke('writeJsonFile', path, jsonData),
  readJsonFile: (filePath) => ipcRenderer.invoke("file:readJson", filePath)
});
