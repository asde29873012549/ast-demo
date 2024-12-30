import { jest } from '@jest/globals';
import { Union } from "unionfs";
import { createFsFromVolume, vol } from "memfs";
import * as fs from "fs";

const memfs = createFsFromVolume(vol);
const union = new Union();
union.use(memfs).use(fs);

jest.unstable_mockModule('fs', () => union);

await import('fs');

export { vol };
