use actix_web::web;
use tera::Tera;

use crate::page::{Page, PageResponse};

#[derive(Default)]
struct SheetListingPage;

impl Page for SheetListingPage {
    fn template(&self) -> String {
        "sheet-listing.html".to_string()
    }
}

pub async fn get_sheet_listing_page(tmpl: web::Data<Tera>) -> PageResponse {
    SheetListingPage::default().render(&tmpl)
}
