import { Controller, Get } from '@nestjs/common';
import { PullRequest, PullRequestsService } from './pull-requests.service';

@Controller('pull-requests')
export class PullRequestsController {
  constructor(private readonly pullRequestsService: PullRequestsService) {}

  @Get()
  getPullRequests(): Promise<PullRequest[]> {
    return this.pullRequestsService.getPullRequests();
  }
}
