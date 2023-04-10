#![allow(non_snake_case)]

use actix_web::{middleware, web, App, HttpServer};

mod character_detail_page;
mod character_listing_page;
mod models;
mod page;
mod queries;

use character_detail_page::{
    create_character_detail_page, get_character_detail_page, update_character_detail_page,
};
use character_listing_page::get_character_listing_page;

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
                    .route(web::get().to(get_character_listing_page))
                    .route(web::post().to(create_character_detail_page)),
            )
            .service(
                web::resource("/{character_id}")
                    .route(web::get().to(get_character_detail_page))
                    .route(web::put().to(update_character_detail_page)),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
