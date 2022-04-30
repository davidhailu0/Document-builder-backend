import { IsNotEmpty } from 'class-validator';

export class CreateDocumentSubsection {
    
    documentID:string;

    documentSectionNumber: string;

    content: string;
}