import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionEntity } from './entity/section.entity';
import { SubsectionEntity } from './entity/subsection.entity';
import { TemplateEntity } from './entity/Templet.entity';
import { TemGenController } from './templateGenerator.controller';
import { TemGenService } from './templateGenerator.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity, TemplateEntity, SubsectionEntity])],
  controllers: [TemGenController],
  providers: [TemGenService],
})
export class TempModule {}
