import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './config/database-config';
import { AuthModule } from './auth/auth.module';
import {TempModule} from './Templates/templateGenerator.module'
import { DocumentModule } from './document/document.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeormConfig), AuthModule,TempModule, DocumentModule, AdminModule],
})
export class AppModule {}
