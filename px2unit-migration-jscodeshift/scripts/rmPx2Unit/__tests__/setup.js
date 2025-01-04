const fs = require("fs")
const { Union } = require("unionfs")
const { createFsFromVolume, vol } = require("memfs")

// Mock the 'fs' module with the union filesystem
jest.mock("fs", () => {
  const memfs = createFsFromVolume(vol)
  const union = new Union()
  union.use(memfs).use(fs)
  
  return union
})

jest.mock("enquirer", () => ({
  prompt: jest.fn().mockResolvedValue({ confirm: true })
}))

let consoleLogSpy

beforeEach(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  consoleLogSpy.mockRestore()
})

module.exports = { vol }
