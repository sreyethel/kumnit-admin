import { Component, OnInit } from '@angular/core';
import { Bookstore } from '../../../stores/bookstore';
import { Product } from '../../../stores/product.store';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-select-books',
  templateUrl: './select-books.component.html',
  styleUrls: ['./select-books.component.scss']
})
export class SelectBooksComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  selectedBook: Array<any> = [];

  inputText: string = ''
  constructor(public store: Bookstore, public product: Product, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.fetchAllBook()

  }

  async onSelection(e, v) {
    this.selectedBook = v.selected
  }

  _onSearch() {
    this.store.filterBook(this.inputText)
  }

  _onAddBook() {
    this.product.getSelectedBook(this.selectedBook)
  }


}
