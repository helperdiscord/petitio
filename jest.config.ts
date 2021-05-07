import type { Config } from "@jest/types";

// eslint-disable-next-line @typescript-eslint/require-await
export default async (): Promise<Config.InitialOptions> => ({
	coverageProvider: "v8",
	displayName: "unit test",
	preset: "ts-jest",
	testEnvironment: "node",
	testRunner: "jest-circus/runner",
	testMatch: ["<rootDir>/tests/**/*.test.ts"],
	globalSetup: "<rootDir>/tests/global-setup.ts",
	globalTeardown: "<rootDir>/tests/global-teardown.ts",
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tests/tsconfig.json"
		}
	}
});
