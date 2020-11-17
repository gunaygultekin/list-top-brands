import { Component, OnInit } from "@angular/core";
import { BrandsService } from "./brands.service";
import { User } from "./user";
import { Brand } from "./brand";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public brands: Array<string> = [];

  constructor(private brandsService: BrandsService) {}

  async ngOnInit() {
    this.brands = await this.solution({ id: 1, gender: "MALE" }, 5);
  }

  /*
   * available calls:
   * this.brandsService.getLikedBrands(user.id)
   * user.id can be in range from 1 to 5, id = 3 will cause promise to reject
   * this.brandsService.getTopBrandsForGender(user.gender)
   * gender can be 'MALE', 'FEMALE' or 'REJECT'. last value will cause promise to reject
   */
  async solution(user: User, suggestionsCount: number): Promise<Array<string>> {
    // your code is here
    let result = [];
    let listOfLikedBrandsOfUser = null;
    let listOfUserTopBrandsForGender = null;
    await this.brandsService
      .getLikedBrands(user.id)
      .then((result) => {
        listOfLikedBrandsOfUser = result;
      })
      .catch((err) => {
        console.log(err);
      });
    await this.brandsService
      .getTopBrandsForGender(user.gender)
      .then((result) => {
        listOfUserTopBrandsForGender = result;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("n", suggestionsCount);
    console.log("x", listOfLikedBrandsOfUser);
    console.log("y", listOfUserTopBrandsForGender);

    // logic 1
    let count = 0;
    if (listOfLikedBrandsOfUser.length > suggestionsCount) {
      console.log("Not enough brands");
    } else {
      let size = listOfLikedBrandsOfUser.length;
      if (size <= suggestionsCount) {
        for (let i = 0; i < size; i++) {
          count += 1;
          result.push(listOfLikedBrandsOfUser[i]);
        }
      }
      let sizeGender = listOfUserTopBrandsForGender.length;
      let itemsToGet = suggestionsCount - count;
      if (itemsToGet > 0 && sizeGender !== 0) {
        for (let i = 0; i < sizeGender; i++) {
          let indx = result.findIndex(
            (r) =>
              r.name === listOfUserTopBrandsForGender[i].name &&
              r.id === listOfUserTopBrandsForGender[i].id
          );
          if (indx > -1) {
            i += 1;
          } else {
            result.push(listOfUserTopBrandsForGender[i]);
          }

          if (result.length === suggestionsCount) {
            break;
          }
        }
      }
    }
    console.log("result: ", result);
    return result.map((r) => r.name);
  }
}
