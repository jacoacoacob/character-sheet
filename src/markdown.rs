use actix_web::{web, HttpResponse, Result};
use serde::Deserialize;

pub fn html_from_markdown(source: &str) -> String {
    let mut options = comrak::ComrakOptions::default();

    options.extension.table = true;

    println!("HTML_FROM_MARKDOWN");

    comrak::markdown_to_html(&source, &options)
}

#[derive(Deserialize)]
pub struct MdPreviewReqBody {
    source: String,
}

pub async fn create_md_preview(body: web::Json<MdPreviewReqBody>) -> Result<HttpResponse> {
    let MdPreviewReqBody { source } = body.into_inner();

    let html = html_from_markdown(&source);

    let response_json = serde_json::json!({
        "html": html,
    });

    Ok(HttpResponse::Ok().json(response_json))
}
