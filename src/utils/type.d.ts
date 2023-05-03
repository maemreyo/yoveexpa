export type NotMatch = false;

export type TranslationId = string;

export type Url = string;

export interface BibleInfo {
    translationId: string;
    bookId: string;
    bookName: string;
    chapter: number;
    verse: number;
}

export interface BibleVerse {
    language: string;
    chapter: number;
    verse: number;
    content: string;
    translation_id: string;
    book_id: string;
    book_name: string;
}
