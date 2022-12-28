import { Injectable } from "@angular/core";

@Injectable()
export class Konum{
  private _lat: number;
  public get lat(): number {
    return this._lat;
  }
  public set lat(value: number) {
    this._lat = value;
    console.log(this._lat+"lat")
  }
  private _lng: number;
  public get lng(): number {
    return this._lng;
  }
  public set lng(value: number) {

    this._lng = value;
    console.log(this._lng+"lng")
  }
}

