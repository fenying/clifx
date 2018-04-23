import * as $fs from "fs";

export const PLATFORM = process.platform;

export const ARCHITECTURE = process.arch;

export const IS_X86_64 = ARCHITECTURE === "x64";

export const IS_X86 = ARCHITECTURE === "x86";

/**
 * Tell if it's now running on Android OS.
 */
export const IS_ANDROID = PLATFORM === "android";

/**
 * Tell if it's now running on Windows OS.
 */
export const IS_WINDOWS = PLATFORM === "win32";

/**
 * Tell if it's now running on Linux OS.
 */
export const IS_LINUX = PLATFORM === "linux";

/**
 * Tell if it's now running on Sun OS.
 */
export const IS_SUN_OS = PLATFORM === "sunos";

/**
 * Tell if it's now running on OpenBSD OS.
 */
export const IS_OPEN_BSD = PLATFORM === "openbsd";

/**
 * Tell if it's now running on FreeBSD OS.
 */
export const IS_FREE_BSD = PLATFORM === "freebsd";

/**
 * Tell if it's now running on AIX OS.
 */
export const IS_AIX = PLATFORM === "aix";

/**
 * Tell if it's now running on Mac OS.
 */
export const IS_MAC = PLATFORM === "darwin";

/**
 * The ID of current process.
 */
export const PID = process.pid;

/**
 * The ID of parent process.
 */
export const PARENT_PID = process.ppid;

export function switchUser(user: string, group?: string): void {

    if (group) {

        process.setgid(group);
    }

    process.setuid(user);
}

export function redirectOutputToFile(file: string): void {

    process.stdout.pipe($fs.createWriteStream(file, {
        "flags": "a"
    }));
}

export function redirectErrorToFile(file: string): void {

    process.stderr.pipe($fs.createWriteStream(file, {
        "flags": "a"
    }));
}

export const STARTED_AT = Date.now() - process.uptime() * 1000;

export interface App {

    main(args: string[]): Promise<void>;
}

export interface AppConstructor {

    new (): App;
}

export function run(appClass: AppConstructor): void {

    let app = new appClass();

    app.main(process.argv).catch((e) => {

        // tslint:disable-next-line:no-console
        console.error(e);
    });
}
