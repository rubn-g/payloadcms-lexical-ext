import { createCommand, type LexicalCommand } from '@payloadcms/richtext-lexical/lexical';

export const INSERT_YOUTUBE_EMBED: LexicalCommand<{ replace: boolean }> = createCommand('INSERT_YOUTUBE_EMBED');
