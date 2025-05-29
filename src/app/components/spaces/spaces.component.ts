import { Gallery } from './../../models/gallery.model';
import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../../services/space.service';
import { Space, SpaceDTO } from '../../models/space.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { SpaceTypes } from '../../models/space.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spaces',
  imports: [CommonModule, RouterLink],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.css'
})
export class SpacesComponent implements OnInit{
  spaces!: Space[];
  SpaceType = SpaceTypes;
  photos: { id:number, url:string }[] = [];
  selectedType: string | null = null;
  spaceTypes = Object.keys(SpaceTypes).filter(key => isNaN(Number(key)));
  image:string[] = [];

  constructor(private service: SpaceService,private galleryService: GalleryService){}
  ngOnInit(): void{
    this.service.getSpaces().subscribe((response)=>{
      this.spaces = response;
      this.spaces.forEach(space=>{
        console.log(space);
        if (space.galleries?.[0]) {
          const baseUrl = "http://localhost:17102/";
          const currentUrl = space.galleries[0].imageUrl;
          space.galleries[0].imageUrl = baseUrl + currentUrl;
          console.log(space.galleries[0].imageUrl);
        }
      });
      // this.galleryService.getAll().subscribe((response) => {
      // response.forEach(photo => {
      //   if (!this.photos[photo.spaceId]) {
      //     //this.photos[photo.spaceId] = {id:photo.spaceId, url: 'http://localhost:17102/'+photo.imageUrl};
      //     this.image.push('http://localhost:17102/'+photo.imageUrl);
      //     console.log(this.photos[photo.spaceId]);
      //   }
      // });
     
    // });
    });
  }

get filteredSpaces() {
  if (this.selectedType === null) {
    return this.spaces;
  }
  return this.spaces.filter(space => SpaceTypes[space.spaceType] === this.selectedType);
}

filterByType(type: string | null) {
  this.selectedType = type;
}
}
