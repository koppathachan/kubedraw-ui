
/**
 * Color Palette defines color theme
 * TODO: use the color enum for default values
 */
export class ColorPalette {
	constructor(
		private primary: string,
		private secondary: string,
		private background: string,
		private onSecondary: string,
		private onBackground: string,
		private onSurface: string,
		private onError: string,
	) { }
}
