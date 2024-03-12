/** @format */

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SYSTEM_TITE: string;
	readonly VITE_OPEN: boolean;
	readonly VITE_API_PATH: string;
	readonly VITE_SYSTEM_PORT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
