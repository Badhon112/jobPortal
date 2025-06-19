import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Job } from 'src/models/job.model';
import { CreateJobDto } from './dto/createjob.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private JobModal: mongoose.Model<Job>) {}

  async postJob(CreateJobDto: CreateJobDto, userId: string) {
    try {
      const {
        title,
        description,
        requirement,
        salary,
        location,
        jobType,
        experience,
        position,
        company,
      } = CreateJobDto;

      if (
        !title ||
        !description ||
        !requirement ||
        !salary ||
        !location ||
        !jobType ||
        !experience ||
        !position ||
        !company
      ) {
        return new BadRequestException('Something is Missing');
      }
      const job = await this.JobModal.create({
        title,
        description,
        requirement: requirement.split(', '),
        salary,
        location,
        jobType,
        experience,
        position,
        company,
        created_by: userId,
      });
      return {
        data: job,
        message: 'Succefully Create A New Job Post',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //Student Section
  async getAllJobs(keyword?: string) {
    try {
      const query = {
        $or: [
          { title: { $regex: String(keyword), $options: 'i' } },
          { description: { $regex: String(keyword), $options: 'i' } },
        ],
      };
      if (!keyword) {
        return await this.JobModal.find()
          .populate('company')
          .sort({ createdAt: -1 });
      }
      const job = await this.JobModal.find(query)
        .populate({ path: 'company' })
        .populate({ path: 'User' })
        .sort({ createdAt: -1 });
      if (!job) {
        return new NotFoundException('Job Not Found');
      }
      return {
        data: job,
        message: 'Job Found',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //Student Section
  async getJobById(id: string) {
    try {
      const job = await this.JobModal.findById(id);
      if (!job) {
        return new NotFoundException('Job Not Found');
      }
      return {
        data: job,
        message: 'Getting single Job',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //Get Admin Job
  async getAdminJob(userId: string) {
    try {
      const jobs = await this.JobModal.find({ created_by: userId });
      if (!jobs) {
        return new NotFoundException('Job Not Found');
      }
      return {
        data: jobs,
        message: 'Getting all Admin Created Job',
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
