import { $getSelection, $isRangeSelection, BaseSelection } from '@payloadcms/richtext-lexical/lexical';
import { $isTableSelection } from '@lexical/table';

export default (selection: BaseSelection | null = null) => {
	selection ||= $getSelection()

	if ($isRangeSelection(selection) || $isTableSelection(selection)) {
		return selection
	}

	return null;
}
