use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteResponse {
    pub id: String,
}

#[derive(Serialize, Deserialize)]
pub struct CreateUserResponse {
    pub id: String,
}

#[derive(Serialize, Deserialize)]
pub struct GetWebsiteResponse {
    pub url: String,
}
