import { container } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);
