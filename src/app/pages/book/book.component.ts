import { BOOK_OPTIONS, BOOK_OPTIONS_OBJ } from "./../../dummy/status";
import { AddNewCoverBookComponent } from "./add-new-cover-book/add-new-cover-book.component";
import { AddNewBookComponent } from "./add-new-book/add-new-book.component";
import { DeleteComponent } from "./../../components/delete/delete.component";
import { DataService } from "src/app/services/data.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { Bookstore } from "./../../stores/bookstore";
import { tabs } from "./../../dummy/tabs";
import { Component, OnInit } from "@angular/core";
import { IGenre, IBook } from "src/app/interfaces/bookstore";
import { AddNewPdfBookComponent } from "./add-new-pdf-book/add-new-pdf-book.component";
import { EditBookComponent } from "./edit-book/edit-book.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AddSoundComponent } from "./add-sound/add-sound.component";
import { AddPreviewComponent } from "./add-preview/add-preview.component";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit {
  tabs = tabs.books;
  id: string;
  constructor(
    public store: Bookstore,
    // public category:
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public Route: Router
  ) {}

  ngOnInit() {
    this.tabs = [];
    this.tabs.push({ path: "/app/books/data", label: "Data" });
    BOOK_OPTIONS.map((m) => {
      this.tabs.push({ path: `/app/books/${m.route}`, label: m.text });
    });
    this.store.fetchData(this.ds.genreRef());
    this.route.params.subscribe((param) => {
      this.id = param["id"];
      const type = this.id;
      if (type) {
        this.store.fetchBook(type);
      } else {
        this.store.fetchBook();
      }
    });
  }

  create() {
    let dialogRef = this.dialog.open(AddNewBookComponent, {
      data: null,
      width: "35vw",
      height: "100vh",
      role: "dialog",
      disableClose: true,
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  cover_upload(item) {
    let dialogRef = this.dialog.open(AddNewCoverBookComponent, {
      data: item,
      width: "35vw",
      height: "100vh",
      role: "dialog",
      disableClose: true,
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  preview_upload(item) {
    let dialogRef = this.dialog.open(AddPreviewComponent, {
      data: item,
      width: "35vw",
      height: "100vh",
      role: "dialog",
      disableClose: true,
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  pdf_upload(item) {
    let dialogRef = this.dialog.open(AddNewPdfBookComponent, {
      data: item,
      width: "35vw",
      height: "100vh",
      role: "dialog",
      disableClose: true,
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  sound_upload(item) {
    let dialogRef = this.dialog.open(AddSoundComponent, {
      data: item,
      width: "35vw",
      height: "100vh",
      role: "dialog",
      disableClose: true,
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  edit(item: IGenre) {
    let dialogRef = this.dialog.open(EditBookComponent, {
      data: item,
      width: "35vw",
      height: "100vh",
      role: "dialog",
    });
    dialogRef.updatePosition({ top: "0", right: "0", bottom: "0" });
  }

  delete(item: IBook) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        title: "Delete Book",
        memo:
          "If book is using by other function in system you cannot delete it.",
        name: item.title,
      },
      width: "35vw",
      role: "dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "yes") {
        this.store.delete(this.ds.bookRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open("Genre has been deleted.", "done", {
              duration: 2000,
            });
          } else {
            this.snackBar.open(error, "Error");
          }
        });
      }
    });
  }

  onSelectCategory(event: any) {
    this.Route.navigate(["/app/books/" + event.value.key]);
  }
}
