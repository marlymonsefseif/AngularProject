import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { SpaceService } from '../../services/space.service';
import { Space, SpaceTypes } from './../../models/space.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-space-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './space-details.component.html',
  styleUrl: './space-details.component.css'
})
export class SpaceDetailsComponent implements OnInit{
    id!:string| null;
    space!:Space;
    SpaceType = SpaceTypes;
    photo!:string;
    constructor(private service: SpaceService,private galleryService: GalleryService, private activerouter:ActivatedRoute){}
    ngOnInit(): void{
      this.id = this.activerouter.snapshot.paramMap.get('id'),
      this.service.getById(this.id).subscribe((response)=>{
        this.space = response;
        console.log(response);

      //   this.galleryService.getBySpace(this.space.id).subscribe((response) => {
      //   this.photo = response.imageUrl;
      // });
      });
    }
}
