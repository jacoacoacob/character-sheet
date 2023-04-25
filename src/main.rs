#![allow(non_snake_case)]

use actix_web::{middleware, web, App, HttpServer};

mod character_detail_page;
mod character_listing_page;
mod commit_history;
mod markdown;
mod migration;
mod models;
mod page;
mod queries;

use character_detail_page::{
    create_character_detail_page, get_character_detail_page, update_character_detail_page,
};
use character_listing_page::get_character_listing_page;
use markdown::create_md_preview;
use commit_history::get_commit_history;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=debug");
    env_logger::init();

    let TEMPLATES_DIR = concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*");

    let tera = tera::Tera::new(TEMPLATES_DIR).expect("Create Tera instance");

    println!("Character Sheet available at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(tera.clone()))
            .wrap(middleware::Logger::default())
            .service(actix_files::Files::new("/static", "./static"))
            .service(
                web::resource("/")
                    .route(web::get().to(get_character_listing_page))
                    .route(web::post().to(create_character_detail_page)),
            )
            .service(
                web::resource("/character/{character_id}")
                    .route(web::get().to(get_character_detail_page))
                    .route(web::put().to(update_character_detail_page)),
            )
            .route("/commits/{character_id}", web::get().to(get_commit_history))
            .route("/md-preview", web::post().to(create_md_preview))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
