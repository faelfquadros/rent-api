import { rename, stat, unlink } from "fs/promises";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filePath = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await stat(filePath);
    } catch (error) {
      return;
    }

    await unlink(filePath);
  }
}

export { LocalStorageProvider };
