import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  id: string;
  @Input() artist: any;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private location: Location) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] || null;
    });
  }

  ngOnInit() {
    this.spotifyService.getArtist(this.id).subscribe((res: any) => this.renderArtist(res));
  }

  renderArtist(res: any): void {
    this.artist = res;
  }

  back(): void {
    this.location.back();
  }
}
