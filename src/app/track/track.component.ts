import {Component, Input, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private id: string;

  @Input() track: any;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private location: Location) {
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
