import type { Query } from "mongoose";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  public newQuery: Record<string, unknown>;

  constructor(
    modelQuery: Query<T[], T>,
    query: Record<string, unknown>,
    newQuery: Record<string, unknown>,
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.newQuery = newQuery;
  }

  search(allowedSearchableFields: Array<string>) {
    if (
      typeof this?.query.search === "string" &&
      this?.query?.search.trim() &&
      this?.query?.search.length <= 100
    ) {
      this.modelQuery = this.modelQuery.find({
        $or: allowedSearchableFields.map((field) => ({
          [field]: { regex: this.query.search, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter(allowedFilterFields: Array<string>, excludedFields: Array<string>) {
    allowedFilterFields.forEach((field) => {
      if (this.query[field] !== undefined) {
        this.newQuery[field] = this.query[field];
      }
    });
    excludedFields.forEach((element) => delete this.newQuery[element]);
    this.modelQuery = this.modelQuery.find(this.newQuery);

    return this;
  }

  sort() {
    const sortValue = (this?.query?.sort as string) || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortValue);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields = (this?.query?.fields as string).split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
