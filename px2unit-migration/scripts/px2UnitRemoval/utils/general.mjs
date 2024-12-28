import fs from "fs";
import path from "path";

import { AVAILABLE_EXTENSIONS } from "../constants.mjs";

const isDirectory = (filePath) => fs.statSync(filePath).isDirectory();

// filter hidden files
const filterInvalidFiles = (files) =>
  files.filter((file) => !file.startsWith(".") && !file.startsWith("_"));

const getSubDirectoriesFromFilePath = (filePath) =>
  filterInvalidFiles(fs.readdirSync(filePath));

export const getAbsolutePath = (relativePath) => {
  return path.resolve(process.cwd(), relativePath);
};

export const getAllFiles = (basePath) => {
  const filePaths = [];

  const recursiveScan = (currentPath) => {
    const directoryList = getSubDirectoriesFromFilePath(currentPath);

    directoryList.forEach((item) => {
      const itemPath = path.join(currentPath, item);

      if (isDirectory(itemPath)) {
        recursiveScan(itemPath);
      } else if (AVAILABLE_EXTENSIONS.some((ext) => item.endsWith(ext))) {
        filePaths.push(itemPath);
      }
    });
  };

  recursiveScan(basePath);

  return filePaths;
};


export const checkDirectoriesExist = (paths) => {
  if (!paths || paths.length === 0) return false;

  return paths.every((path) => {
    const absolutePath = getAbsolutePath(path);
    return fs.existsSync(absolutePath) && isDirectory(absolutePath);
  });
};