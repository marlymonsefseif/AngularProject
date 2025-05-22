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
  photosMap: { [spaceId: number]: string } = {};
  selectedType: string | null = null;
  spaceTypes = Object.keys(SpaceTypes).filter(key => isNaN(Number(key)));

  constructor(private service: SpaceService,private galleryService: GalleryService){}
  ngOnInit(): void{
    this.service.getSpaces().subscribe((response)=>{
      this.spaces = response;
      this.galleryService.getAll().subscribe((response) => {
      response.forEach(photo => {
        if (!this.photosMap[photo.spaceId]) {
          this.photosMap[photo.spaceId] = photo.imageUrl;
        }
      });
    });
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
