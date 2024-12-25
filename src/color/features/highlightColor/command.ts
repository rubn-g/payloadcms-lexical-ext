import { createCommand, type LexicalCommand } from '@payloadcms/richtext-lexical/lexical';

export const UPDATE_HL_COLOR: LexicalCommand<{ color: string }> = createCommand('UPDATE_HL_COLOR');
