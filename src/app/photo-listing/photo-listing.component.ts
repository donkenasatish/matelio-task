import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Photo } from '../models/photo-model';

@Component({
  selector: 'app-photo-listing',
  templateUrl: './photo-listing.component.html',
  styleUrls: ['./photo-listing.component.css']
})
export class PhotoListingComponent implements OnInit {
  listOfPhotos: Photo[] = [];
  comparisionTable: Photo[] = [];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getPhotosList()
      .subscribe(
        (data: any) => {
          // This is dummy data we are getting large records so we are displaying only 50 records.
          this.listOfPhotos = data.slice(0, 50);
          this.listOfPhotos.map((item:Photo) => {
            item.isCompared = false;
          });
        }, err => {
          console.log(err);
        }
      )
  }
  addToTable(record: Photo){
    this.listOfPhotos.map((item:Photo) => {
      if(item.id === record.id){
        item.isCompared = true;
      }
    });
    if(!this.comparisionTable.includes(record)){
      this.comparisionTable.push(record)
    }
  }
  removeFromTable(index: number){
    this.listOfPhotos[index].isCompared = false;
    this.comparisionTable.splice(this.comparisionTable.findIndex(item => item.id === this.listOfPhotos[index].id), 1)
  }
}
