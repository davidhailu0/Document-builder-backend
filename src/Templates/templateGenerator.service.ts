import { UpdateSectionDto } from './dto/updateSection.dto';
import { CreateSectionDto } from './dto/createSection.dto';
import { SectionEntity } from './entity/section.entity';
import { Like, Repository } from 'typeorm';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/Templet.entity';
import { CreateSubsectionDto } from './dto/createSubsection.dto';
import { SubsectionEntity } from './entity/subsection.entity';

@Injectable()
export class TemGenService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly temRepository: Repository<TemplateEntity>,
    @InjectRepository(SectionEntity)
    private readonly sectionRepository: Repository<SectionEntity>,
    @InjectRepository(SubsectionEntity)
    private readonly subsection:Repository<SubsectionEntity>
  ) {}

  async getTemplate(templateName: string) {
    const template = await this.temRepository.findOne({
      select: { templateName: true, templateAuthor: true, IsApproved: true },
      where: { templateName: templateName },
      relations: ['sectionEntity'],
    });
    console.log();
    if (!template) {
      throw new HttpException('Templet Does not exist', HttpStatus.NOT_FOUND);
    }
    return template;
  }

  async createdTemplate(authorID: string){
    const createdTemplate = await this.temRepository.find({where:{authorID}});
    return createdTemplate?createdTemplate:[];
  }

  async getWrittenTemplates(authorID:string){
    const templateList = await this.temRepository.find({where:{authorID}})
    return templateList?templateList:[];
  }
  async checkAvailability(templateName:string){
    const foundTemplate = await this.temRepository.findOne({where:{templateName}});
    return foundTemplate?true:false;
  }
  
  async searchTemplate(searchTerm: string) {
    const templates = await this.temRepository.find({
      where:{templateName:Like(`${searchTerm}%`)}
    });
    return templates?templates:[];
  }

  async getTopTemplates(){
    const topTemplates = await this.temRepository.find({take:12})
    return topTemplates?topTemplates:[];
  }

  async createOrUpdateTemplate(template: any) {
    const { id } = template;
    if (id === '0') {
      delete template.id;
      const newTemplet = new TemplateEntity();
      Object.assign(newTemplet, template);
      return await this.temRepository.save(newTemplet);
    }
    const oldTemplate = await this.temRepository.findOne({
      where: { id:id},
    });
    Object.assign(oldTemplate, template);
    return await this.temRepository.save(oldTemplate);
  }

  async deleteTemplate(id: any) {
    const template = await this.temRepository.findOne(id);
    if (!template) {
      throw new HttpException('Templet Does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.temRepository.delete(id);
  }

  async addSection(section: CreateSectionDto) {
    const newsection = new SectionEntity();
      Object.assign(newsection, section);
      return await this.sectionRepository.save(newsection);
  }

  async addSubsection(subsectionBody:CreateSubsectionDto){
    const newSubsection = new SubsectionEntity();
      Object.assign(newSubsection,subsectionBody);
      return await this.subsection.save(newSubsection);
  }

  async getSelectedTemplateSection(templateName: string){
    const selectedTemplateSection = await this.sectionRepository.find({where:{templateName}})
    return selectedTemplateSection;
  }

  async getSelectedTemplateSubsection(templateName: string){
    const selectedTemplateSubsection = await this.subsection.find({where:{templateName}})
    return selectedTemplateSubsection;
  }

  async updateSection(sectionNum: string,templateName:string,updateSection: UpdateSectionDto) {
    const section = await this.sectionRepository.findOne({
      where: { sectionNumber: sectionNum, templateName: templateName },
    });
    Object.assign(section, updateSection);
    return await this.sectionRepository.save(section);
  }

  async updateSectionNumber(sectionNumber:string, newSectionNumber: string ,templateName:string){
    const oldSection = await this.sectionRepository.findOne({where:{sectionNumber:sectionNumber,templateName:templateName}});
    oldSection.sectionNumber = newSectionNumber;
    return this.sectionRepository.save(oldSection);
  }

  async updateSubsection(
    subsectionNum: string,
    templateName: string,
    updateSubsectionBody,
  ) {
    const subsection = await this.subsection.findOne({
      where: { subsectionNumber: subsectionNum, templateName: templateName },
    });
    Object.assign(subsection, updateSubsectionBody);
    const updatedTemplate = await this.subsection.save(subsection);
    return updatedTemplate;
  }
  async updateSubsectionNumber(
    subsectionNumber,
    newSubsectionNumber,
    templateName,
  ) {
    const oldSubsection = await this.subsection.findOne({where:{subsectionNumber:subsectionNumber,templateName:templateName}})
    oldSubsection.subsectionNumber = newSubsectionNumber;
    return await this.subsection.save(oldSubsection);
  }
  async deleteSection(sectionNum: string,templateName: string) {
    const section = await this.sectionRepository.find({ where: { sectionNumber:sectionNum,templateName } });
    if (section) {
      await this.sectionRepository.delete({
        sectionNumber:sectionNum,
        templateName
      });
    } else {
      throw new HttpException('Section Does not exist', HttpStatus.BAD_REQUEST);
    }

    return { msg: 'section deleted' };
  }
  async deleteSubsection(subsectionNum: string, templateName: string) {
    this.subsection.delete({
      subsectionNumber: Like(`${subsectionNum}%`),
      templateName: templateName,
    });
    return 'Subsection Deleted';
  }
}
