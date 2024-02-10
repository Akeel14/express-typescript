export interface QueryString {
  [key: string]: string | undefined
  page?: string
  sort?: string
  limit?: string
  fields?: string
}

export class APIFeatures {
  query: any
  queryString: QueryString

  constructor(query: any, queryString: QueryString) {
    this.query = query
    this.queryString = queryString
  }

  filter(): this {
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    const queryObj = Object.keys(this.queryString)
      .filter((key) => !excludedFields.includes(key))
      .reduce<QueryString>((obj, key) => {
        obj[key] = this.queryString[key]
        return obj
      }, {})

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  sort(): this {
    if (this.queryString.sort != null) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }

  limitFields(): this {
    if (
      this.queryString.fields != null &&
      this.queryString.fields.trim() !== ''
    ) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }

    return this
  }

  paginate(): this {
    const defaultLimit = 100
    const defaultPage = 1

    const page = parseInt(this.queryString.page ?? '1', 10)
    const limit = parseInt(this.queryString.limit ?? '100', 10)

    // Correcting NaN cases
    const safePage = isNaN(page) || page <= 0 ? defaultPage : page
    const safeLimit = isNaN(limit) || limit <= 0 ? defaultLimit : limit

    const skip = (safePage - 1) * safeLimit

    this.query = this.query.skip(skip).limit(safeLimit)

    return this
  }
}
