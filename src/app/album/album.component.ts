import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id: string;
  @Input() album: any;

  constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService, private location: Location) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] || null;
    });
  }

  ngOnInit() {
    this.spotifyService.getAlbum(this.id).subscribe((res: any) => this.renderAlbum(res));
  }

  renderAlbum(res: any): void {
    this.album = res;
  }

  back(): void {
    this.location.back();
  }

  showTrack(id: string): void {
    this.router.navigate(['tracks', id]);
  }
}
