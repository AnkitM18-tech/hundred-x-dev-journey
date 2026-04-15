use poem::{
    Route, Server, get, handler,
    listener::TcpListener,
    post,
    web::{Json, Path},
};
use store::store::Store;

use crate::{
    request_input::{CreateUser, CreateWebsite},
    request_output::{CreateUserResponse, CreateWebsiteResponse, GetWebsiteResponse},
};

pub mod request_input;
pub mod request_output;

#[handler]
fn get_website(Path(website_id): Path<String>) -> Json<GetWebsiteResponse> {
    let mut s = Store::new().unwrap();
    let website = s.get_website(website_id).unwrap();
    Json(GetWebsiteResponse { url: website.url })
}

#[handler]
fn create_website(Json(data): Json<CreateWebsite>) -> Json<CreateWebsiteResponse> {
    let mut s = Store::new().unwrap();
    let id = s.create_website(String::from("asd"), data.url).unwrap();
    Json(CreateWebsiteResponse { id })
}

#[handler]
fn sign_up(Json(data): Json<CreateUser>) -> Json<CreateUserResponse> {
    let mut s = Store::new().unwrap();
    let id = s.sign_up(data.username, data.password).unwrap();
    Json(CreateUserResponse { id })
}

#[handler]
fn sign_in(Json(data): Json<CreateUser>) -> Json<CreateUserResponse> {
    let mut s = Store::new().unwrap();
    let id = s.sign_in(data.username, data.password).unwrap();
    Json(CreateUserResponse { id })
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new()
        .at("/status/:website_id", get(get_website))
        .at("/website", post(create_website))
        .at("/signup", post(sign_up))
        .at("/signin", post(sign_in));
    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .run(app)
        .await
}
