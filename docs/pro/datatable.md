# DataTable (Pro)

Advanced data table with sort, filter, and pagination.

::: warning
This is a Pro component. [Get a license](/pro-purchase) to unlock.
:::

## Preview

| Name | Age | Role |
|------|-----|------|
| John | 30 | Developer |
| Jane | 25 | Designer |

## Features

- Column sorting
- Text filtering
- Pagination
- Custom cell rendering

## JavaScript

```javascript
import { DataTable } from '@fv-ui/pro'

const table = DataTable({
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ],
  data: [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ],
  sortable: true,
  paginated: true,
  pageSize: 10
})

document.body.appendChild(table)
```
