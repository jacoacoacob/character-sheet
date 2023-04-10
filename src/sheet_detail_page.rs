use actix_web::{web, error};
use tera::Tera;

use crate::page::{redirect, Page, PageResponse};
use crate::queries::{execute, Query, QueryResponse};


#[derive(Default)]
struct SheetDetailPage {
    sheet_id: String,
}

impl Page for SheetDetailPage {
    fn context(&self) -> tera::Context {
        let mut ctx = tera::Context::new();
        ctx.insert("sheet_id", &self.sheet_id);
        ctx
    }

    fn template(&self) -> String {
        "sheet-detail.html".to_string()
    }
}

pub async fn get_sheet_detail_page(
    tmpl: web::Data<Tera>,
    params: web::Path<(String,)>,
) -> PageResponse {
    let (sheet_id,) = params.into_inner();

    let page = SheetDetailPage { sheet_id };

    page.render(&tmpl)
}

pub async fn create_sheet_detail_page() -> PageResponse {
    let response = execute(Query::CreateCharacter)?;

    match response {
        QueryResponse::Character(character) => {
            redirect(&format!("/{}", character.id))
        }
    }
}
