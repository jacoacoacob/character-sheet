use actix_web::{web, error, Result};
use tera::{Context, Tera};

use crate::page::{Page, PageResponse};
use crate::queries::{execute, Query, QueryResponse};

#[derive(Default)]
struct SheetListingPage;

impl Page for SheetListingPage {
    fn context(&self) -> Result<Context> {
        let mut ctx = Context::new();

        let character_list = execute(Query::ListCharacters)
            .map_err(error::ErrorInternalServerError)?;

        match character_list {
            QueryResponse::CharacterList(character_list) => {
                ctx.insert("character_list", &character_list);
            }
            _ => {}
        }

        Ok(ctx)
    }

    fn template(&self) -> String {
        "sheet-listing.html".to_string()
    }
}

pub async fn get_sheet_listing_page(tmpl: web::Data<Tera>) -> PageResponse {
    SheetListingPage::default().render(&tmpl)
}
