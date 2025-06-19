import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Application } from 'src/models/application.model';
import { Status } from './dto/ApplyJob.dto';
import { Job } from 'src/models/job.model';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private ApplicationModel: mongoose.Model<Application>,
    @InjectModel(Job.name) private JobModal: mongoose.Model<Job>,
  ) {}

  async applyJob(jobId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(jobId) || !Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid job ID or user ID');
      }
      if (!jobId) {
        return new NotFoundException('Job Id is Required');
      }
      //check if the user has already applied for this job
      const existingApplication = await this.ApplicationModel.findOne({
        job: jobId,
        applicant: userId,
      });
      if (existingApplication) {
        return new BadRequestException('You have already Apply for this job');
      }

      const job = await this.JobModal.findById(jobId).exec();
      if (!job) {
        return new NotFoundException('Job Not Found');
      }
      //Create A new application
      const newApplication = await this.ApplicationModel.create({
        job: jobId,
        applicant: userId,
      });
      //   job.applications.push(newApplication._id);
      //   await job.save();
      job.applications.push(
        newApplication._id as unknown as mongoose.Schema.Types.ObjectId,
      );
      await job.save();
      return {
        message: 'Application submitted successfully',
        applicationId: newApplication._id,
        jobTitle: job.title,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAppliedJobs(userId: string) {
    try {
      const application = await this.ApplicationModel.find({
        applicant: userId,
      })
        .sort({ createdAt: -1 })
        .populate({
          path: 'job',
          options: { sort: { createdAt: -1 } },
          populate: { path: 'company' },
        });

      if (!application) {
        return new NotFoundException('No application Found');
      }
      return {
        data: application,
        message: 'Getting all the Application',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //   admin how many user has apply
  async getApplicants(applicationId: string) {
    try {
      const job = await this.JobModal.findById(applicationId).populate({
        path: 'applications',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'applicant',
        },
      });
      if (!job) {
        return new NotFoundException('No Application has Found');
      }
      return {
        data: job,
        success: true,
        message: 'Getting all the Application',
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(applicationId: string, statusbody: Status) {
    try {
      const { status } = statusbody;
      if (!status) {
        return new NotFoundException('Status is Required');
      }
      const application = await this.ApplicationModel.findById({
        _id: applicationId,
      });
      if (!application) {
        return new NotFoundException('Application not Found');
      }
      application.status = status.toLowerCase();
      await application.save();
      return {
        data: application,
        message: 'Application Updated',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
