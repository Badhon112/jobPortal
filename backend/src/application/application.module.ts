import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from 'src/models/job.model';
import { Application, ApplicationSchema } from 'src/models/application.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
