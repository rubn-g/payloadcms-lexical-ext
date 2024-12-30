import { VimeoJSXConverter } from "./VimeoJSXConverter";
import { YoutubeJSXConverter } from "./YoutubeJSXConverter";

export default {
	...YoutubeJSXConverter,
	...VimeoJSXConverter
}
