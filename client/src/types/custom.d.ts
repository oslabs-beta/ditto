declare module '*.jpg';

declare module '*.png' {
	const value: any;
	export = value;
}
