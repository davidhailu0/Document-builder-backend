import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentSubsection } from './dto/SubsectionCreateBody.dto';
import { CreateDocumentSection } from './dto/SectionCreateBody.dto';
import { DocumentSubsectionEntity } from './Entity/DocumentSubsection.entity';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService){}

    @Post('createDocument')
    async createDocument(@Body() documentBody:CreateDocumentSection){
        return this.documentService.createDocument(documentBody);
    }
    @Get('documentId/:documentId')
    async getSelectedDocument(@Param('documentId') documentId: string){
        return this.documentService.getSelectedDocument(documentId);
    }
    @Get('authorID/:authorID')
    async getAllDocumentWrittenByAuthor(@Param('authorID') authorID){
        return this.documentService.getAllDocumentWrittenByAuthor(authorID);
    }
    @Post('createSubsection')
    async createSubsection(@Body() subsectionBody:any){
        const newSubsection = new DocumentSubsectionEntity();
        Object.assign(newSubsection,subsectionBody);
        return await this.documentService.createSubsection(subsectionBody);
    }

    @Get('writtenSubsection/:documentID')
    async getWrittenSubsection(@Param() documentInfo){
        const documentID = documentInfo['documentID']
        return await this.documentService.getDocumentSubsections(documentID);
    }
}
