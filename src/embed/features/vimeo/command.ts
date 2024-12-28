import { createCommand, type LexicalCommand } from '@payloadcms/richtext-lexical/lexical';

export const INSERT_VIMEO_EMBED: LexicalCommand<{ replace: boolean }> = createCommand('INSERT_VIMEO_EMBED');
