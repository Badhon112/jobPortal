import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { IsAuthenticationMiddleware } from './middleware/IsAuthentication.middleware';
// import { isAuthentication } from './middleware/IsAuthentication.middleware';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBURL!),
    UserModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthenticationMiddleware)
      .forRoutes(
        'user/updateProfile',
        'company/register',
        'company/getusercompany',
        'company/getcompanybyid/:id',
        'company/update/:id',
        'job/upload',
        'job/getadmincreatedjob',
        'application/applyjob/:id',
        'application/getapplyjobs',
      );
  }
}
