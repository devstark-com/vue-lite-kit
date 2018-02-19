# ReactiveGrid component
The component for rendering tables with sortings, pagination and filtering of data at the server-side

# Props

> Properties with bold names are required

| Name            |Types allowed | Values  | Default      | Description|
|-----------------|--------------|---------|--------------|------------|
|`options`        |*Object*      |         |[here](#options)| General table configuration options. [Details](#options) |
|**`cols`**       |*Array*       |         |                | An array of columns configs. [Details](#cols) |
|`data`           |*Array*       |         |`[]`            | An array of rows objects |

#### options
Options object properties

|Name         | Values | Default| Description|
|-------------|--------|--------|------------|
|`separator`  |`'horizontal'`, `'vertical'`, `'cell'`, `false`|`false`||
|`stripe`     |`'odd'`, `'even'`, `false`|`false`||
|`flipped`    |*Boolean*|`false`||
|`responsive` |*Boolean*|`false`||
|`gutter`     |`'loose'`, `'compact'`, `false`|`false`||
|`bordered`   |*Boolean*|`false`||
|`highlight`  |*Boolean*|`false`||
|`rowHeight`  |*String*|`30px`||
|`selection`  |`'single'`, `'multiple'`, `no`|`no`|Rows selection mode|
|`idField`|*String*|`id`|name of a field with row uid|
|`initialSortField`|*String*|`null`|`idField` will be used if `null`|
|`initialSortOrder`|*String*|`30px`||
|`pagination`  |*Object*|`{ perPage: 15, options: [5, 10, 15, 20, 30, 50, 100, 500] }`||


#### cols
Column object properties

|Name       | Values  | Default| Description|
|-----------|---------|--------|------------|
|`label`    |*Boolean*|`null`|Will be rendered in a column header|
|`field`    |*Boolean*|`null`|Name of a property with data in a row object. Value will be rendered inside a table cell|
|`sortable` |*Boolean*|`false`|Adds the indication that field is sortable and sortinf direction indication into column heading and makes heading clickable|
|`width`    |*String* |`auto`||
|`thAlign`  |`'left'`, `'center'`, `'right'`|`left`||
|`tdAlign`  |`'left'`, `'center'`, `'right'`|`left`||
|`hidden`   |*Boolean*|`false`||

#### data
You're free to deal with any objects you need

#### selection
`single` adds a column with radio buttons for single row selection, `multiple` adds a column with checkboxes for multiple rows selection. Omitting the property will result in no selection column at all.

