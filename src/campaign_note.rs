use actix_web::{web, HttpResponse, Result};
use serde::Deserialize;

use crate::queries::{execute, Query, QueryResponse};

#[derive(Deserialize)]
pub struct CreateCampaignNoteReqBody {
    message: String,
}

pub async fn create_campaign_note(
    params: web::Path<(usize,)>,
    body: web::Json<CreateCampaignNoteReqBody>,
) -> Result<HttpResponse> {
    let (character_id,) = params.into_inner();

    let CreateCampaignNoteReqBody { message } = body.into_inner();

    match execute(Query::CreateCampaginNote(character_id, message))? {
        QueryResponse::CampaignNote(note) => {
            Ok(HttpResponse::Created().json(note))
        }
        _ => Ok(HttpResponse::NoContent().finish()),
    }
}

#[derive(Deserialize)]
pub struct UpdateCampaignNoteReqBody {
    message: String,
}

pub async fn update_campaign_note(
    params: web::Path<(usize,)>,
    body: web::Json<UpdateCampaignNoteReqBody>,
) -> Result<HttpResponse> {
    let (note_id,) = params.into_inner();

    let UpdateCampaignNoteReqBody { message } = body.into_inner();

    match execute(Query::UpdateCampaignNote(note_id, message))? {
        QueryResponse::CampaignNote(note) => {
            Ok(HttpResponse::Created().json(note))
        }
        _ => Ok(HttpResponse::NoContent().finish()),
    }
}

pub async fn get_campaign_note_list(params: web::Path<(usize,)>) -> Result<HttpResponse> {
    let (character_id,) = params.into_inner();

    match execute(Query::ListCampaignNotes(character_id))? {
        QueryResponse::CampaignNoteList(note_list) => {
            Ok(HttpResponse::Created().json(note_list))
        }
        _ => Ok(HttpResponse::NoContent().finish()),
    }
}
