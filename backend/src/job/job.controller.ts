import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateJobDto } from './dto/createjob.dto';
import { Request } from 'express';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private readonly JobService: JobService) {}
  @Post('upload')
  postjob(@Body() CreateJobDto: CreateJobDto, @Req() req: Request) {
    return this.JobService.postJob(CreateJobDto, req['userId']);
  }
  @ApiParam({ name: 'keyword', example: '6853a6cbc25a20a3d44905e6' })
  @Get('getalljobs')
  getAllJobs(@Query('keyword') keyword: string) {
    return this.JobService.getAllJobs(keyword);
  }
  @ApiParam({ name: 'id', example: '6853a6cbc25a20a3d44905e6' })
  @Get('getjobById/:id')
  getJobById(@Param('id') id: string) {
    return this.JobService.getJobById(id);
  }

  @Get('getadmincreatedjob')
  getAdminCreatedJob(@Req() req: Request) {
    return this.JobService.getAdminJob(req['userId']);
  }
}
