import {Component, Input, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private route: ActivatedRoute;
  private spotifyService: SpotifyService;
  private location: Location;
  private id: string;

  @Input() track: any;

  constructor(route: ActivatedRoute, spotifyService: SpotifyService, location: Location) {
    this.route = route;
    this.spotifyService = spotifyService;
    this.location = location;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.spotifyService.getTrack(this.id).subscribe((res: any) => this.renderTrack(res));
  }

  renderTrack(res: any): void {
    this.track = res;
  }

  back(): void {
    this.location.back();
  }

}
