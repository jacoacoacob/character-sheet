# Dungeons & Dragons Digital Character Sheet


## Running Locally

_The below steps assume that you have [rustup](https://www.rust-lang.org/tools/install) and [sqlite](https://sqlite.org/index.html) available on your system._

1. Clone or download the repo and cd into the project root

2. Create the database 
    ```
    sqlite3 db/data.db < db/schema.sql
    ```

3. Start the dev server
    ```
    cargo run
    ```
    _if you plan on making code changes, [`cargo-watch`](https://crates.io/crates/cargo-watch) makes things real nice with hot reloading_