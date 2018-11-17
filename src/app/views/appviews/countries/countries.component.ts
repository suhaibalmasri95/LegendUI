
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Country } from '../../../entities/organization/Country';
import { CountryService } from './../../../_services/_organization/Country.service';
import { CityService } from './../../../_services/_organization/City.service';
import { AreaService } from './../../../_services/_organization/Area.service';
import { City } from '../../../entities/organization/City';
import { Area } from '../../../entities/organization/Area';
import { Currency } from '../../../entities/organization/Currency';
import { LockUp } from '../../../entities/organization/LockUp';
import { CommonService } from './../../../_services/Common.service';

@Component({
  selector: 'app-countries',
  templateUrl: 'countries.component.html'
})

export class CountriesComponent implements OnInit {
  countryForm: Country;
  countries: Country[];
  cityForm: City;
  cities: City[];
  areaForm: Area;
  areas: Area[];
  LockUps: LockUp[];
  currencies: Currency[];
  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  countryTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'NATIONALITY', 'ST_CUR_CODE', 'PHONE_CODE', 'LOC_STATUS', 'FLAG', 'actions'];
  countriesDataSource: MatTableDataSource<Country>;

  cityTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ST_CNT_ID', 'actions'];
  citiesDataSource: MatTableDataSource<City>;

  areaTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ST_CNT_ID', 'ST_CTY_ID', 'actions'];
  areasDataSource: MatTableDataSource<Area>;
  AddUpdateUrl: string;
  selection: SelectionModel<Country>;
  selection2: SelectionModel<City>;
  selection3: SelectionModel<Area>;

  uploader: FileUploader;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute ,
    private countryService: CountryService , private cityService: CityService , private areaService: AreaService
     , private commonService: CommonService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Country>(true, []);
    this.selection2 = new SelectionModel<City>(true, []);
    this.selection3 = new SelectionModel<Area>(true, []);

    this.countryForm = new Country();
    this.cityForm = new City();
    this.areaForm = new Area();
    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;
    this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl});


    this.route.data.subscribe(data => {
      this.countries = data.country;
      this.LockUps = data.lockUp;
      this.currencies = data.currencies;
      this.renderCountryTable(data.country);
    });

  }



  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.countriesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'city':
        this.citiesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'area':
        this.areasDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  showCityAreaForm($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.countriesDataSource.paginator = this.countriesDataSource.paginator ? this.countriesDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'city';
          this.reloadCityTable(this.countryForm.ID ? this.countryForm.ID : null);
          this.cityForm.CountryID = this.countryForm.ID;
          break;
        case 2:
          this.extraForm = 'area';
          this.reloadAreaTable(this.cityForm.ID ? this.cityForm.ID : null, this.cityForm.CountryID ? this.cityForm.CountryID : null);
          this.areaForm.CityID = this.cityForm.ID;
          this.areaForm.CountryID = this.cityForm.CountryID;
          break;
      }
    });
  }

  renderCountryTable(data) {
    this.countries = data;
    this.countriesDataSource = new MatTableDataSource<Country>(data);
    this.countriesDataSource.paginator = this.paginator;
    this.countriesDataSource.sort = this.sort;
    this.selection = new SelectionModel<Country>(true, []);
    this.countriesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderCityTable(data) {
    this.cities = data;
    this.citiesDataSource = new MatTableDataSource<City>(data);
    this.citiesDataSource.paginator = this.paginator2;
    this.citiesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<City>(true, []);
    this.citiesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }
  renderAreaTable(data) {
    this.areas = data;
    this.areasDataSource = new MatTableDataSource<Area>(data);
    this.areasDataSource.paginator = this.paginator3;
    this.areasDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Area>(true, []);
    this.areasDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  reloadCountryTable() {
    this.countryService.loadCountries().subscribe(data => {
      this.renderCountryTable(data);
    });
  }

  reloadCityTable(countryId = null) {
    this.cityService.loadCities(countryId, null, 1).subscribe(data => {
      this.renderCityTable(data);
    });
  }

  reloadAreaTable(countryId = null, cityId = null) {
    this.areaService.loadAreas(null, cityId, countryId, 1).subscribe(data => {
      this.renderAreaTable(data);
    });
  }


  UploadFlag(form) {
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.countryForm.Flag = response;
        if (this.countryForm.selected) {
          this.AddUpdateUrl = this.countryService.countryApiUrl + 'Update';
        } else {
          this.AddUpdateUrl = this.countryService.countryApiUrl + 'Create';
        }

        this.http.post(this.AddUpdateUrl, this.countryForm).subscribe(res => {
          this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl });
          this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCountryTable();
          this.countryForm = new Country;
          this.submit = false;
          form.resetForm();
        });
      }
    };
  }



  // add update delete country

  saveCountry(form) {
    if (form.invalid) {
      return;
    }

    this.countryForm = this.countryForm.selected ? this.countryForm : Object.assign({}, form.value);
    if (this.uploader.queue.length > 0) {
      this.UploadFlag(form);
    } else {
      if (this.countryForm.selected) {
        this.AddUpdateUrl = this.countryService.countryApiUrl + 'Update';
      } else {
        this.AddUpdateUrl = this.countryService.countryApiUrl + 'Create';
      }

      this.http.post(this.AddUpdateUrl, this.countryForm).subscribe(res => {
        this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
        this.reloadCountryTable();
        this.countryForm = new Country;
        this.submit = false;
        form.resetForm();
      });
    }
  }

  deleteCountry(id) {
    this.http.post(this.countryService.countryApiUrl + 'Delete' , {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCountryTable();
    });
   /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteCountry?countryID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCountryTable();
    });*/
  }

  updateCountry(country: Country) {
    window.scroll(0, 0);
    this.countryForm = new Country;
    this.countryForm.ID = country.ID;
    this.countryForm.Name = country.Name;
    this.countryForm.Name2 = country.Name2;
    this.countryForm.Nationality = country.Nationality;
    this.countryForm.CurrencyCode = country.CurrencyCode;
    this.countryForm.ReferenceNo = country.ReferenceNo;
    this.countryForm.Status = country.Status;
    this.countryForm.PhoneCode = country.PhoneCode;
    this.countryForm.Flag = country.Flag;
    this.countryForm.selected = true;
  }


  // add update delete city

  saveCity(form) {
    if (form.invalid) { return; }
    this.cityForm = this.cityForm.selected ? this.cityForm : Object.assign({}, form.value);

    if (this.cityForm.selected) {
      this.AddUpdateUrl = this.cityService.cityApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.cityService.cityApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.cityForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCityTable(this.countryForm.ID ? this.countryForm.ID : null);
      this.cityForm = new City;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteCity(id) {
    this.http.post(this.cityService.cityApiUrl + 'Delete' , {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCityTable(this.countryForm.ID ? this.countryForm.ID : null);
    });
   /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteCity?cityID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCityTable(this.countryForm.ID ? this.countryForm.ID : null);
    });*/
  }

  updateCity(city: City) {
    window.scroll(0, 1000);
    this.cityForm = new City;
    this.cityForm.ID = city.ID;
    this.cityForm.Name = city.Name;
    this.cityForm.Name2 = city.Name2;
    this.cityForm.CountryID = city.CountryID;
    this.cityForm.ReferenceNo = city.ReferenceNo;
    this.cityForm.Status = city.Status;
    this.cityForm.selected = true;
  }




  // add update delete Area

  saveArea(form) {
    if (form.invalid) { return; }

    this.areaForm = this.areaForm.selected ? this.areaForm : Object.assign({}, form.value);
    if (this.areaForm.selected) {
      this.AddUpdateUrl = this.areaService.areaApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.areaService.areaApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.areaForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAreaTable(this.cityForm.ID ? this.cityForm.ID : null, this.cityForm.CountryID ? this.cityForm.CountryID : null);
      this.areaForm = new Area;
      form.resetForm();
      this.submit3 = false;
    });
  }

  deleteArea(id) {
    this.http.post(this.areaService.areaApiUrl + 'Delete' , {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAreaTable(this.cityForm.ID ? this.cityForm.ID : null, this.cityForm.CountryID ? this.cityForm.CountryID : null);
    });
    /*this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteArea?areaID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAreaTable(this.cityForm.ID ? this.cityForm.ID : null, this.cityForm.ST_CNT_ID ? this.cityForm.ST_CNT_ID : null);
    });*/
  }

  updateArea(area: Area) {
    window.scroll(0, 1000);
    this.areaForm = new Area;
    this.areaForm.ID = area.ID;
    this.areaForm.Name = area.Name;
    this.areaForm.Name2 = area.Name2;
    this.areaForm.CityID = area.CityID;
    this.areaForm.CountryID = area.CountryID;
    this.areaForm.ReferenceNo = area.ReferenceNo;
    this.areaForm.Status = area.Status;
    this.areaForm.selected = true;
  }



  loadCities() {
    this.cityService.loadCities(this.countryForm.ID ? this.countryForm.ID : null, null, 1).subscribe(data => {
      this.cities = data;
      this.citiesDataSource = new MatTableDataSource<City>(this.cities);
    }, error => {

    });
  }


  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Images')) : '';
  }

  export(type, data) {
    switch (type) {
      case 'pdf':
       // this.coreService.ExportToPdf(data, data);
        break;
      case 'csv':
       // this.coreService.ExportToCsv(data, data);
        break;
      case 'excel':
        // this.coreService.ExportToExcel(data, data);
        break;
    }

  }



  getCityName(id: number) {
    if (this.cities) {
      for (let index = 0; index < this.cities.length; index++) {
        if (this.cities[index].ID === id) {
          return this.cities[index].Name;
        }
      }
    }
  }


  getCountryName(id: number) {
    for (let index = 0; index < this.countries.length; index++) {
      if (this.countries[index].ID === id) {
        return this.countries[index].Name;
      }
    }
  }

  getStatusName(id: number) {
    for (let index = 0; index < this.LockUps.length; index++) {
      if (this.LockUps[index].ID === id) {
        return this.LockUps[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.countriesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.countriesDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.citiesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.citiesDataSource.data.forEach(row => this.selection2.select(row));
  }


  isAllSelected3() {
    return this.selection3.selected.length === this.areasDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.areasDataSource.data.forEach(row => this.selection3.select(row));
  }

  resetForm(form) {
    form.reset();
  }










deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.countryService.countryApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCountryTable();
        });
        break;
        case 'city':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.cityService.cityApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCityTable();
        });
        break;
        case 'area':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.areaService.areaApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAreaTable();
        });
        break;
    }
  }







}
