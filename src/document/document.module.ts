import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempModule } from 'src/Templates/templateGenerator.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentEntity } from './Entity/Document.entity';
import { DocumentSubsectionEntity } from './Entity/DocumentSubsection.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DocumentEntity,DocumentSubsectionEntity])],
  controllers: [DocumentController],
  providers: [DocumentService]
})
export class DocumentModule {}
