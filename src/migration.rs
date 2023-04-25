use std::env;
use std::fs;
use std::io;

use rusqlite::Batch;
use rusqlite::Connection;
use rusqlite::params;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct ManifestItem {
    name: String,
    deps: Vec<String>,
}

fn read_manifest() -> io::Result<Vec<ManifestItem>> {
    let text = fs::read_to_string(
        concat!(env!("CARGO_MANIFEST_DIR"), "/db/migrations/manifest.json")
    )?;

    let manifest: Vec<ManifestItem> = serde_json::from_str(&text).expect("Parse manifest.json");

    Ok(manifest)
}

fn init_migrations(conn: &Connection) {
    let mut stmt = conn.prepare("
        SELECT COUNT(*) FROM sqlite_schema
        WHERE type = 'table' AND name = 'migrations'
    ").unwrap();

    let row_count = stmt.query_row([], |row| row.get::<_, usize>(0)).unwrap();

    if row_count == 0 {
        conn.execute(
            "CREATE TABLE migrations (
                name TEXT
            )",
            []
        ).unwrap();
    }
}

fn get_applied_migrations(conn: &Connection) -> Vec<String> {
    let mut stmt = conn.prepare("SELECT * FROM migrations").unwrap();

    stmt.
        query_map([], |row| row.get::<_, String>(0))
        .unwrap()
        .map(|row| row.unwrap())
        .collect()
}

fn apply_migration(conn: &Connection, migration_name: &str) {
    let mut up_sql_path = env!("CARGO_MANIFEST_DIR").to_string();
    up_sql_path.push_str("/db/migrations/");
    up_sql_path.push_str(migration_name);
    up_sql_path.push_str("/up.sql");

    let up_sql = fs::read_to_string(&up_sql_path).expect(
        &format!("read file {}", up_sql_path)
    );

    let mut batch = Batch::new(conn, &up_sql);

    while let Some(mut stmt) = batch.next().expect("Batch next statement") {
        stmt.execute([]).expect("Batch execute statement");
    }

    conn.execute(
        "INSERT INTO migrations (name) VALUES (?1)",
        params![migration_name]
    ).expect("Insert into migrations");
}

pub fn run(conn: &Connection) -> io::Result<()> {
    init_migrations(conn);

    for item in read_manifest()? {
        let applied_migrations = get_applied_migrations(conn);

        for migration in item.deps {
            if !applied_migrations.contains(&migration) {
                apply_migration(conn, &migration);
            }
        }
        
        if !applied_migrations.contains(&item.name) {
            apply_migration(conn, &item.name);
        }
    }

    Ok(())
}