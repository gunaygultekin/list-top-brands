import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrandsService } from "./brands.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [BrandsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
