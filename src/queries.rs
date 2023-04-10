use std::collections::HashMap;

use actix_web::{error, Error};
use chrono::{DateTime, Utc};
use rusqlite::{named_params, params, Connection, Result};

use crate::models::character::Character;
use crate::models::character_data::CharacterData;
use crate::models::character_delta::CharacterDelta;
use crate::models::field_diff::FieldDiffs;

type DbResult<T> = Result<T>;

pub enum Query {
    ListCharacters,
    CreateCharacter,
    GetCharacter(usize),
    // ArchiveCharacter(usize),
    UpdateCharacter(usize, String, CharacterData),
}

pub enum QueryResponse {
    Character(Character),
    CharacterList(Vec<Character>),
}

pub fn execute(query: Query) -> Result<QueryResponse, Error> {
    let db_path = std::env::var("DB_PATH").unwrap_or("./db/data.db".to_string());

    let conn = Connection::open(db_path).map_err(error::ErrorInternalServerError)?;

    let result = match query {
        Query::CreateCharacter => create_character(&conn),
        Query::ListCharacters => list_characters(&conn),
        Query::GetCharacter(character_id) => get_character(&conn, character_id),
        Query::UpdateCharacter(character_id, message, new_data) => {
            update_character(&conn, character_id, &message, new_data)
        }
    };

    result.map_err(error::ErrorInternalServerError)
}

fn map_character_delta(row: &rusqlite::Row) -> rusqlite::Result<CharacterDelta> {
    let id = row.get(0)?;
    let created = row.get(1)?;
    let character_id = row.get(2)?;
    let message = row.get(3)?;
    let field_diffs = row.get::<_, String>(4)?;
    let field_diffs = serde_json::from_str(&field_diffs).expect("Deserialize field_diffs");
    Ok(CharacterDelta {
        id,
        created,
        character_id,
        message,
        field_diffs,
    })
}

fn get_most_recent_timestamp_from(deltas: &Vec<CharacterDelta>) -> DateTime<Utc> {
    let mut timestamps = deltas.iter().map(|x| x.created).collect::<Vec<DateTime<Utc>>>();

    timestamps.sort_by(|a, b| b.cmp(&a));

    timestamps.first().unwrap().clone()
} 

fn list_characters(conn: &Connection) -> DbResult<QueryResponse> {
    let mut stmt = conn.prepare(
        "SELECT * FROM character_delta
        ORDER BY created ASC",
    )?;

    let mut character_list = stmt
        .query_map([], map_character_delta)?
        .map(|row| row.unwrap())
        .fold(
            HashMap::<usize, Vec<CharacterDelta>>::new(),
            |mut accum, row| {
                accum
                    .entry(row.character_id)
                    .and_modify(|e| e.push(row.clone()))
                    .or_insert(vec![row]);
                accum
            },
        )
        .iter()
        .fold(
            Vec::<Character>::new(),
            |mut accum, (character_id, character_deltas)| {
                accum.push(Character {
                    id: character_id.to_string(),
                    updated: get_most_recent_timestamp_from(character_deltas),
                    data: CharacterData::from(character_deltas.clone()),
                });
                accum
            },
        );
    
    character_list.sort_by(|a, b| b.updated.cmp(&a.updated));

    Ok(QueryResponse::CharacterList(character_list))
}

fn get_character(conn: &Connection, character_id: usize) -> DbResult<QueryResponse> {
    let mut stmt = conn.prepare(
        "SELECT * FROM character_delta
        WHERE character_id = ?1
        ORDER BY created ASC",
    )?;

    let rows: Vec<CharacterDelta> = stmt
        .query_map([character_id], map_character_delta)?
        .map(|row| row.unwrap())
        .collect();

    if rows.is_empty() {
        return Err(rusqlite::Error::QueryReturnedNoRows);
    }

    let character = Character {
        id: character_id.to_string(),
        updated: get_most_recent_timestamp_from(&rows),
        data: CharacterData::from(rows),
    };

    Ok(QueryResponse::Character(character))
}

fn create_character(conn: &Connection) -> DbResult<QueryResponse> {
    let mut stmt_insert_character =
        conn.prepare("INSERT INTO character DEFAULT VALUES RETURNING id")?;

    let rows: Vec<usize> = stmt_insert_character
        .query_map([], |row| row.get(0))?
        .map(|row| row.unwrap())
        .collect();

    let mut stmt_insert_character_delta = conn.prepare(
        "INSERT INTO character_delta
            (character_id, message, field_diffs)
        VALUES
            (:character_id, :message, :field_diffs)
        RETURNING *",
    )?;

    let character_id = rows.first().expect("Character ID");
    let message = String::from("first commit");
    let field_diffs = FieldDiffs::from((None, Some(CharacterData::default())));

    let rows: Vec<CharacterDelta> = stmt_insert_character_delta
        .query_map(
            named_params! {
                ":character_id": character_id,
                ":message": message,
                ":field_diffs": serde_json::to_string(&field_diffs).expect("Serialize field_diffs"),
            },
            map_character_delta,
        )?
        .map(|row| row.unwrap())
        .collect();

    let character = Character {
        id: character_id.to_string(),
        updated: get_most_recent_timestamp_from(&rows),
        data: CharacterData::from(rows),
    };

    Ok(QueryResponse::Character(character))
}

fn update_character(
    conn: &Connection,
    character_id: usize,
    message: &str,
    new_data: CharacterData,
) -> DbResult<QueryResponse> {
    match get_character(conn, character_id)? {
        QueryResponse::Character(current) => {
            let field_diffs = FieldDiffs::from((Some(current.data), Some(new_data)));

            conn.execute(
                "INSERT INTO character_delta (character_id, message, field_diffs)
                VALUES (?1, ?2, ?3)",
                params![
                    character_id,
                    message,
                    serde_json::to_string(&field_diffs).expect("Serialize FieldDiffs")
                ],
            )?;

            get_character(conn, character_id)
        }
        _ => Err(rusqlite::Error::QueryReturnedNoRows),
    }
}
