import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './resources/authentication/authentication.module';
import { CategoryModule } from './resources/category/category.module';
import { ProductModule } from './resources/product/product.module';

@Module({
  imports: [
    AuthenticationModule,
    CategoryModule,
    ProductModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
