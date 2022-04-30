import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentSubsection } from './dto/SubsectionCreateBody.dto';
import { CreateDocumentSection } from './dto/SectionCreateBody.dto';
import { DocumentEntity } from './Entity/Document.entity';
import { DocumentSubsectionEntity } from './Entity/DocumentSubsection.entity';
import { TemplateEntity } from 'src/Templates/entity/Templet.entity';

@Injectable()
export class DocumentService {
    constructor(@InjectRepository(DocumentEntity) private documentRepository:Repository<DocumentEntity>,@InjectRepository(DocumentSubsectionEntity) private documentSubsectionRepository:Repository<DocumentSubsectionEntity>){}

    async createDocument(subsectionBody:CreateDocumentSection){
        const oldDocument = await this.documentRepository.findOne({where:{documentTitle:subsectionBody.documentTitle}});
        if(!oldDocument){
            const newSection = new DocumentEntity();
            Object.assign(newSection,subsectionBody);
            return await this.documentRepository.save(newSection);
        }
        Object.assign(oldDocument,subsectionBody);
        return await this.documentRepository.save(oldDocument);
    }

    async getSelectedDocument(documentSubsectionID: string){
        const selectedDocument = await this.documentSubsectionRepository.findOne({where:{documentSubsectionID}});
        return selectedDocument;
    }

    async getAllDocumentWrittenByAuthor(authorID){
        authorID = parseInt(authorID);
        const allWrittenDocument = await this.documentRepository.find({where:authorID});
        console.log(allWrittenDocument)
        return allWrittenDocument?allWrittenDocument:[];
    }
    async createSubsection(subsectionBody:CreateDocumentSubsection){
        const oldSubsection = await this.documentSubsectionRepository.findOne({where:{documentSectionNumber:subsectionBody.documentSectionNumber}})
        if(!oldSubsection){
            const newSubsection = new DocumentSubsectionEntity();
            Object.assign(newSubsection,subsectionBody);
            return await this.documentSubsectionRepository.save(newSubsection);
        }
        Object.assign(oldSubsection,subsectionBody);
        return await this.documentSubsectionRepository.save(oldSubsection);
    }

    async getDocumentSubsections(documentID: string){
        const subsectionsList = await this.documentSubsectionRepository.find({where:{documentID}});
        return subsectionsList?subsectionsList:[];
    }
}
