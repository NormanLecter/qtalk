import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from '../shared-services.service';
import { History } from './history.interface';
import { MatTableDataSource } from '@angular/material';
import { RoomsHistoryService } from './rooms-history.service';

@Component({
  selector: 'app-rooms-history',
  templateUrl: './rooms-history.component.html',
  styleUrls: ['./rooms-history.component.css']
})
export class RoomsHistoryComponent implements OnInit {

  // TODO: wrzucic dane z bazy - strzal do API
  ELEMENTS: History[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  displayedColumns: string[];

  dataSource: any;

  constructor( private sharedServicesService: SharedServicesService,
  private roomsHistoryService: RoomsHistoryService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataSource = new MatTableDataSource(this.ELEMENTS);
    // TODO: zmiana nazw kolumn tu i w HTML
    this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
    this.loadHistory();
  }

  backToStart() {
    this.sharedServicesService.navigateToHomePage();
  }

  loadHistory() {
    this.roomsHistoryService.getHistory().subscribe((res => {
      // TODO: wpisanie danych do dataSource
    }));
  }

  deleteRoomsHistory() {
    this.roomsHistoryService.deleteHistory().subscribe(res => {
        this.dataSource = [];
      }
    );
  }

}
