import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private spotifyService: SpotifyService;
  private router: Router;
  private route: ActivatedRoute;

  query: string;
  results: any[];

  constructor(spotifyService: SpotifyService, router: Router, route: ActivatedRoute) {
    this.spotifyService = spotifyService;
    this.router = router;
    this.route = route;
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
    });
  }

  ngOnInit() {
    this.search();
  }

  submit(query: string) {
    this.router.navigate(['search'], { queryParams: { query: query }})
      .then(_ => this.search());
  }

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotifyService.searchTrack(this.query).subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any) {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
