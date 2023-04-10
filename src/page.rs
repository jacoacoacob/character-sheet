use actix_web::{error, http::header, HttpResponse};

pub type PageResponse = actix_web::Result<HttpResponse>;

pub fn redirect(path: &str) -> PageResponse {
    Ok(HttpResponse::Found()
        .insert_header((header::LOCATION, path))
        .finish())
}

pub trait Page {
    fn template(&self) -> String;

    fn context(&self) -> actix_web::Result<tera::Context> {
        Ok(tera::Context::new())
    }

    fn template_root(&self) -> String {
        "pages".to_string()
    }

    fn render(&self, tmpl: &tera::Tera) -> PageResponse {
        let mut template = self.template();
        if template.starts_with("/") {
            template = template[1..].to_string();
        }
        let template = format!("{}/{}", self.template_root(), template);
        match tmpl.render(&template, &self.context()?) {
            Ok(body) => Ok(HttpResponse::Ok().body(body)),
            Err(err) => {
                println!("{:#?}", err);
                Err(error::ErrorInternalServerError("Couldn't render template!"))
            }
        }
    }
}
