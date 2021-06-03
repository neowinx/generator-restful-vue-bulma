# generator-restful-vue-bulma [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generates a Vue.js application based on a basic RESTful API definition

## Installation

First, install [Yeoman](http://yeoman.io) and generator-restful-vue-bulma using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-restful-vue-bulma
```

Then generate your new project:

```bash
yo restful-vue-bulma
```

## CRUD sub-generator

As yeoman generators can include sub-generators to scaffold specific parts of an application project, the restful-vue-bulma generator has a sub-generator called _crud_ that generates CRUD views.

#### Usage:

```bash
yo restful-vue-bulma:crud
```

This sub-generator takes a service endpoint to generate all views and code required for crud operations, based on JSON attributes of items returned in the service response.

Therefore, the crud sub-generator requires the following information:

- The endpoint URL of a RESTful Service. i.e. http://localhost:5000/user

- The attribute name of items list if the response is a paginated result.

- Authentication info if it's required.

- A service's name for code and files generated.

  

It is worth mentioning that code customization can be achieved through config files related to each service endpoint. These files, called internally as **meta json**, contain configurations that modify how code is generated, such as what fields are available to edit or how data is displayed based on the data type. 

The configuration file is optional. If a path is not provided, the sub-generator will search for a file named as _serviceName_.meta.json.

The list of available options for customization are:

- **no_list**(*array*): list of attribute names that determined if a data column related to an attribute name is generated or not.
- **no_edit**(*array*):  list of attribute names that determined if a field, related to an attribute name, is included or not in create/update forms.
- **search**(*array*): list of attribute names used to generate search fields.
- **currency_fields**(*array*):  list of attribute names that contain currency values. Used to generate Currency Fields and apply a Currency format.
- **date_fields**(*array*): list of attribute names that contain date values. Used to generate Date Fields and apply a Date format. 
- **image_fields**(*array*): list of attribute names that contain image values. Used to generate Image Upload Fields.
- **titles**(*dict*): dictionary used to customize the text of table headers and field labels. The key is an attribute name and the value es the custom text.
- **max_length**(*dict*): dictionary used to set the max length of characters that a field can contain. The key is an attribute name and the value es the max length.
- **main_title**(*string*): custom text used as the main title for views.
- **edit_columns**(*number*): number of columns considered in the layout of create/update forms.



## Example of meta json config file:

***Service response:*** 

```json
{
  "page": 1,
  "pages": 1,
  "items": [
    {
      "id": 1,
      "product_name": "product 1",
      "product_origin": "origin 1",
      "product_desc": "desc 1",
      "product_cost": 1000.5,
      "shipping_date": "2021-05-25T00:00:00",
      "stock": 10
    },

  ]
}
```



***Service meta json:***

```json
{
  "edit_columns": 4,
  "no_list": [
    "id"
  ],
  "no_edit": [
    "id",
    "shipping_date"
  ],
  "currency_fields": [
    "product_cost"
  ],
  "date_fields": [
    "shipping_date"
  ],
  "search": [
    "product_name",
    "product_origin"
  ],
  "titles": {
    "product_name": "Product Name",
    "product_origin": "Origin",
    "product_desc": "Product Desc",
    "shipping_date": "Ship. Date"
  },
  "max_length": {
    "product_name": 50,
    "product_origin": 10
  },
  "main_title": "Products"
}
```


## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Pedro Flores]()


[npm-image]: https://badge.fury.io/js/generator-restful-vue-bulma.svg
[npm-url]: https://npmjs.org/package/generator-restful-vue-bulma
[travis-image]: https://travis-ci.org/neowinx/generator-restful-vue-bulma.svg?branch=master
[travis-url]: https://travis-ci.org/neowinx/generator-restful-vue-bulma
[daviddm-image]: https://david-dm.org/neowinx/generator-restful-vue-bulma.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/neowinx/generator-restful-vue-bulma
[coveralls-image]: https://coveralls.io/repos/neowinx/generator-restful-vue-bulma/badge.svg
[coveralls-url]: https://coveralls.io/r/neowinx/generator-restful-vue-bulma
