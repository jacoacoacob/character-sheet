#![allow(non_snake_case)]

use actix_web::{middleware, web, App, HttpServer};

mod queries;
mod models;
mod page;
mod sheet_detail_page;
mod sheet_listing_page;

use sheet_detail_page::{create_sheet_detail_page, get_sheet_detail_page};
use sheet_listing_page::get_sheet_listing_page;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");
    env_logger::init();

    let TEMPLATES_DIR = concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*");

    let tera = tera::Tera::new(TEMPLATES_DIR).expect("Create Tera instance");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(tera.clone()))
            .wrap(middleware::Logger::default())
            .service(actix_files::Files::new("/static", "./static"))
            .service(
                web::resource("/")
                    .route(web::get().to(get_sheet_listing_page))
                    .route(web::post().to(create_sheet_detail_page)),
            )
            .service(web::resource("/{sheet_id}").route(web::get().to(get_sheet_detail_page)))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
