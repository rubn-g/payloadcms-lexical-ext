import { createCommand, type LexicalCommand } from '@payloadcms/richtext-lexical/lexical';

export const UPDATE_TEXT_COLOR: LexicalCommand<{ color: string }> = createCommand('UPDATE_TEXT_COLOR');
