import { IsNotEmpty } from 'class-validator';

export class CreateDocumentSection {

    documentTitle: string;

    templateAuthor: string;

    documentGeneratorID: string;
}