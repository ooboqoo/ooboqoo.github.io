# PrimeNG

## Input

### AutoComplete 智能提示

根据输入内容给出智能提示。

AutoComplete uses ngModel for two-way binding, requires a list of suggestions and a completeMethod to query for the results. The completeMethod gets the query text as event.query property and should update the suggestions with the search results.

```ts
import { AutoCompleteModule } from 'primeng/primeng';
```

```ts
export class AutoCompleteDemo {
    country: any;
    countries: any[];
    filteredCountriesSingle: any[];
    filteredCountriesMultiple: any[];

    constructor(private countryService: CountryService) { }

    filterCountrySingle(event) {
        let query = event.query;        
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }
    
    filterCountryMultiple(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesMultiple = this.filterCountry(query, countries);
        });
    }
    
    filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

        //mimic remote call
        setTimeout(() => {
            this.filteredBrands = this.brands;
        }, 100)
}
```


### Calendar
### Checkbox
### Dropdown
### Editor
### FileUpload
### InputSwitch
### InputText
### InputTextArea
### Listbox
### Mask
### MultiSelect
### Password
### RadioButton
### Rating
### Slider
### Spinner
### SelectButton
### ToggleButton

## Button

### Button
### SplitButton

## Data


### Carousel
### DataGrid
### DataList
### DataScroller
### DataTable
### OrderList
### GMap
### Paginator
### PickList
### Schedule
### Tree
### TreeTable

## Panel


### Accordion
### Fieldset
### Panel
### Grid
### TabView
### Toolbar

## Overlay

### ConfirmDialog
### Dialog
### Lightbox
### OverlayPanel
### Tooltip

## Menu

### MenuModel
### Breadcrumb
### ContextMenu
### MegaMenu
### Menu
### Menubar
### PanelMenu
### SlideMenu
### TabMenu
### TieredMenu

## Charts

### ChartModel
### Bar
### Doughnut
### Line
### PolarArea
### Pie
### Radar

## Messages

### Messages
### Growl

## Multimedia

### Galleria

## DragDrop

### Drag&Drop

## Misc

### Responsive
### Validation
### Theming
### ProgressBar
### CodeHighlighter
### Terminal

