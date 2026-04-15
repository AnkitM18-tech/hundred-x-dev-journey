use std::env::{self};

use dotenvy::dotenv;

pub struct Config {
    pub database_url: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let database_url = env::var("DATABASE_URL")
            .unwrap_or_else(|_| panic!("DATABASE_URL environment variable not set"));
        Self { database_url }
    }
}
