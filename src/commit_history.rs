use actix_web::{web, HttpResponse, Result, error};

use crate::queries::{execute, Query, QueryResponse};

pub async fn get_commit_history(params: web::Path<(usize,)>) -> Result<HttpResponse> {
    let (character_id,) = params.into_inner();

    let query_response = execute(Query::ListCommits(character_id)).map_err(error::ErrorInternalServerError)?;

    match query_response {
        QueryResponse::CommitHistory(commits) => {
            Ok(HttpResponse::Ok().json(commits))
        }
        _ => Ok(HttpResponse::NoContent().finish())
    }
}
