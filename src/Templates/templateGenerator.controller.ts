import { UpdateSectionDto } from './dto/updateSection.dto';
import { TemGenService } from './templateGenerator.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSubsectionDto } from './dto/createSubsection.dto';

@Controller('templete')
export class TemGenController {
  constructor(private readonly temService: TemGenService) {}
  
  @Get('checkAvailability')
  async checkAvailability(@Query() templateInfo){
    const {templateName} = templateInfo;
    return this.temService.checkAvailability(templateName);
  }

  @Post('createTemplate')
  async createTemplet(@Body() template: any) {
    return await this.temService.createOrUpdateTemplate(template);
  }

  @Get('getTemplate/:templateName')
  async getTemplate(@Param() params) {
    console.log(params);
    const templateName = params.templateName;
    return await this.temService.getTemplate(templateName);
  }
  @Get('getTopTemplates')
  async getTopTemplate(){
    return this.temService.getTopTemplates();
  }
  @Get('searchTemplate')
  async searchTemplate(@Query() searchTemplateInfo) {
    const {templateName} = searchTemplateInfo;
    return await this.temService.searchTemplate(templateName);
  }
 
  @Get('createdTemplate')
  async createdTemplate(@Query() createdTemplateInfo) {
    const {authorEmail} = createdTemplateInfo;
    return await this.temService.createdTemplate(authorEmail);
  }

  @Delete('deleteTemplate')
  async deleteTemplate(@Body() id: any) {
    return await this.temService.deleteTemplate(id);
  }

  @Post('addSection')
  async addSection(@Body() SectionData: any) {
    return await this.temService.addSection(SectionData);
  }
  @Post('addSubsection')
  async addSubsection(@Body('subsection') subsectionData){
    const subsection: CreateSubsectionDto = subsectionData;
    return this.temService.addSubsection(subsection);
  }
  @Patch('updateSection')
  async updateSection(
    @Body() updateSection: any,
  ) {
    const {sectionNum,templateName} = updateSection;
    delete updateSection.sectionNum;
    delete updateSection.templateName; 
    const updateSectionBody: UpdateSectionDto = updateSection;
    return await this.temService.updateSection(sectionNum,templateName,updateSectionBody);
  }

  @Patch('updateSectionNumber')
  async updateSectionNumber(@Body() sectionBody:any){
     const {sectionNumber,newSectionNumber,templateName} = sectionBody;
     this.temService.updateSectionNumber(sectionNumber,newSectionNumber,templateName);
  }

  @Patch('updateSubsection')
  async updateSubsection(@Body() subsectionBody){
    const {templateName, subsectionNumber} = subsectionBody;
    delete subsectionBody.templateName;
    delete subsectionBody.subsectionNumber;
    return this.temService.updateSubsection(subsectionNumber,templateName,subsectionBody);
  }
  @Patch('updateSubsectionNumber')
  async updateSubsectionNumber(@Body() subsectionBody){
    const { subsectionNumber, newSubsectionNumber, templateName } =
      subsectionBody;
    return this.temService.updateSubsectionNumber(subsectionNumber,newSubsectionNumber,templateName)
  }
  
  @Delete('deleteSection')
  async deleteSection(@Query() sectionInfo) {
    const { sectionNumber, templateName } = sectionInfo;
    console.log(sectionInfo);
    return await this.temService.deleteSection(sectionNumber, templateName);
  }
  @Delete('deleteSubsection')
  async deleteSubsection(@Query() subsectionBody){
    const { subsectionNumber, templateName } = subsectionBody;
    return this.temService.deleteSubsection(subsectionNumber, templateName);
  }
}
