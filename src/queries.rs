use std::{collections::HashMap, hash::Hash};

use actix_web::{error, Error};
use rusqlite::{params, Connection, Result, named_params};
use serde::{Serialize, Deserialize};

// use super::models::{
//     Character,
//     CharacterData,
//     CharacterDelta,
//     // FieldChanges,
// };
use crate::models::character::Character;
use crate::models::field_diff::FieldDiffs;
use crate::models::character_data::CharacterData;
use crate::models::character_delta::CharacterDelta;


type DbResult<T> = Result<T>;

pub enum Query {
    // ListCharacters,
    CreateCharacter,
    // GetCharacter(usize),
    // ArchiveCharacter(usize),
    // UpdateCharacter(CharacterDelta),
}

pub enum QueryResponse {
    Character(Character),
}

pub fn execute(query: Query) -> Result<QueryResponse, Error> {
    let db_path = std::env::var("DB_PATH").unwrap_or("./db/data.db".to_string());

    let conn = Connection::open(db_path)
        .map_err(error::ErrorInternalServerError)?;

    let result = match query {
        Query::CreateCharacter => create_character(conn),
    };

    result.map_err(error::ErrorInternalServerError)
}

fn create_character(conn: Connection) -> DbResult<QueryResponse> {
    let mut stmt_insert_character = conn.prepare(
        "INSERT INTO character DEFAULT VALUES RETURNING id"
    )?;

    let rows: Vec<usize> = stmt_insert_character
        .query_map([], |row| row.get(0))?
        .map(|row| row.unwrap())
        .collect();

    let mut stmt_insert_character_delta = conn.prepare(
        "INSERT INTO character_delta (character_id, message, field_diffs)
        VALUES (:character_id, :message, :field_diffs)
        RETURNING *"
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
            |row| {
                let id = row.get(0)?;
                let character_id = row.get(1)?;
                let message = row.get(2)?;
                let field_diffs = row.get::<_, String>(3)?;
                let field_diffs = serde_json::from_str(&field_diffs).expect("Deserialize field_diffs");
                Ok(CharacterDelta { id, character_id, message, field_diffs })
            }
        )?
        .map(|row| row.unwrap())
        .collect();

    let character = Character {
        id: *character_id,
        data: CharacterData::from(rows)
    };

    Ok(QueryResponse::Character(character))
}
