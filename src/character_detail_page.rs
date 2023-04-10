use actix_web::{error, web, HttpResponse, Result};
use serde::Deserialize;
use tera::{Context, Tera};

use crate::models::character_data::CharacterData;
use crate::page::{redirect, Page, PageResponse};
use crate::queries::{execute, Query, QueryResponse};

#[derive(Default)]
struct CharacterDetailPage {
    character_id: usize,
}

impl Page for CharacterDetailPage {
    fn context(&self) -> Result<Context> {
        let mut ctx = Context::new();

        let character = execute(Query::GetCharacter(self.character_id))
            .map_err(error::ErrorInternalServerError)?;

        match character {
            QueryResponse::Character(character) => {
                ctx.insert("character", &character);
            }
            _ => {}
        }

        Ok(ctx)
    }

    fn template(&self) -> String {
        "character-detail.html".to_string()
    }
}

pub async fn get_character_detail_page(
    tmpl: web::Data<Tera>,
    params: web::Path<(usize,)>,
) -> PageResponse {
    let (character_id,) = params.into_inner();

    let page = CharacterDetailPage { character_id };

    page.render(&tmpl)
}

pub async fn create_character_detail_page() -> PageResponse {
    let response = execute(Query::CreateCharacter)?;

    match response {
        QueryResponse::Character(character) => redirect(&format!("/{}", character.id)),
        _ => redirect("/"),
    }
}

#[derive(Deserialize)]
pub struct UpdateCharacterReqBody {
    message: String,
    new_data: CharacterData,
}

pub async fn update_character_detail_page(
    params: web::Path<(usize,)>,
    body: web::Json<UpdateCharacterReqBody>,
) -> PageResponse {
    let (character_id,) = params.into_inner();

    let UpdateCharacterReqBody { message, new_data } = body.into_inner();

    let response = execute(Query::UpdateCharacter(character_id, message, new_data))?;

    match response {
        QueryResponse::Character(character) => Ok(HttpResponse::Ok().json(character)),
        _ => Err(error::ErrorInternalServerError("Internal Server Error")),
    }
}
