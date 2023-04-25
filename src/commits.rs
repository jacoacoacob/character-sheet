use actix_web::{web, HttpResponse, Result, error};
use serde::Deserialize;

use crate::queries::{execute, Query, QueryResponse};

pub async fn get_commit_history(params: web::Path<(usize,)>) -> Result<HttpResponse> {
    let (character_id,) = params.into_inner();

    let query_response = execute(Query::ListCommits(character_id)).map_err(error::ErrorInternalServerError)?;

    match query_response {
        QueryResponse::CommitList(commits) => {
            Ok(HttpResponse::Ok().json(commits))
        }
        _ => Ok(HttpResponse::NoContent().finish())
    }
}

#[derive(Deserialize)]
pub struct UpdateCommitMessageReqBody {
    message: String,
}

pub async fn update_commit_message(
    params: web::Path<(usize,)>,
    body: web::Json<UpdateCommitMessageReqBody>
) -> Result<HttpResponse> {
    let (commit_id,) = params.into_inner();

    let UpdateCommitMessageReqBody { message } = body.into_inner();

    match execute(Query::UpdateCommitMessage(commit_id, message))? {
        QueryResponse::Commit(commit) => {
            Ok(HttpResponse::Ok().json(commit))
        }
        _ => Ok(HttpResponse::NoContent().finish())
    }
}