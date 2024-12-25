import { createCommand, type LexicalCommand } from '@payloadcms/richtext-lexical/lexical';

export const UPDATE_BG_COLOR: LexicalCommand<{ color: string }> = createCommand('UPDATE_BG_COLOR');
