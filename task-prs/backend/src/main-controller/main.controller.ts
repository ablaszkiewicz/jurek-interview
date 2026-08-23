import { Controller, Get } from '@nestjs/common';
import { PullRequest, PullRequestsService } from '../pull-requests/pull-requests.service';

/**
 * The public face of the service. Every route the frontend calls lives here; the modules behind it
 * only expose services.
 */
@Controller()
export class MainController {
  constructor(private readonly pullRequestsService: PullRequestsService) {}

  @Get('pull-requests')
  getPullRequests(): Promise<PullRequest[]> {
    return this.pullRequestsService.getPullRequests();
  }
}
