import { Injectable } from "@angular/core";
import { Brand } from "./brand";

@Injectable()
export class BrandsService {
  likedBrandTimeout = 100;
  topBrandTimeout = 1000;

  getLikedBrandsResolveMarker() {}
  getTopBrandsForGenderResolveMarker() {}

  getLikedBrands(id: number): Promise<Array<Brand>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getLikedBrandsResolveMarker();
        switch (id) {
          case 1:
            resolve([
              { id: 1, name: "First Brand" },
              { id: 2, name: "Second Brand" },
              { id: 3, name: "Third Brand" }
            ]);
            break;
          case 2:
            resolve([{ id: 10, name: "One Brand" }]);
            break;
          case 3:
            reject();
            break;
          case 4:
            resolve([
              { id: 1, name: "First Brand" },
              { id: 2, name: "Second Brand" },
              { id: 3, name: "Third Brand" },
              { id: 15, name: "Adidas" },
              { id: 20, name: "Nike" }
            ]);
            break;
        }
      }, this.likedBrandTimeout);
    });
  }

  getTopBrandsForGender(
    gender: "MALE" | "FEMALE" | "REJECT"
  ): Promise<Array<Brand>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getTopBrandsForGenderResolveMarker();
        switch (gender) {
          case "MALE":
            resolve([
              { id: 1, name: "First Brand" },
              { id: 2, name: "Second Brand" },
              { id: 4, name: "Another Brand" },
              { id: 5, name: "Brand M1" },
              { id: 6, name: "Brand M2" }
            ]);
            break;
          case "FEMALE":
            resolve([
              { id: 11, name: "Another Brand" },
              { id: 12, name: "Brand F1" },
              { id: 13, name: "Brand F2" }
            ]);
            break;
          case "REJECT":
            reject();
            break;
        }
      }, this.topBrandTimeout);
    });
  }
}
