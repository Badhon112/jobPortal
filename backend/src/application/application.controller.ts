import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Request } from 'express';
import { ApiParam } from '@nestjs/swagger';
import { Status } from './dto/ApplyJob.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @ApiParam({ name: 'jobId', example: '6853a6cbc25a20a3d44905e6' })
  @Post('applyjob/:jobId')
  applyJob(@Param('jobId') jobId: string, @Req() req: Request) {
    return this.applicationService.applyJob(jobId, req['userId']);
  }

  @Get('getapplyjobs')
  getapplyjob(@Req() req: Request) {
    return this.applicationService.getAppliedJobs(req['userId']);
  }
  @ApiParam({ name: 'jobId', example: '6853a6cbc25a20a3d44905e6' })
  @Get('getapplication/:jobId')
  getApplicants(@Param('jobId') jobId: string) {
    return this.applicationService.getApplicants(jobId);
  }
  @ApiParam({ name: 'applicationId', example: '6853c95b281c1e89eee5f5a7' })
  @Patch('updateStatus/:applicationId')
  updateStatus(
    @Param('applicationId') applicationId: string,
    @Body() status: Status,
  ) {
    return this.applicationService.updateStatus(applicationId, status);
  }
}
