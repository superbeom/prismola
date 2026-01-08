import { Locale } from './locale';
import { ContentItem } from './content';

export interface AudioSegments {
    [speaker: string]: string[];
}

export interface Post {
    id: string;
    expression: string;
    content: Record<Locale, ContentItem>;
    summary: Record<Locale, string>;
    tags: string[];
    audio_segments: AudioSegments;
    created_at: string;
    updated_at: string;
}
