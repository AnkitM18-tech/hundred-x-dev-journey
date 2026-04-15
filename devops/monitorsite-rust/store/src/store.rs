use crate::config::Config;
use diesel::prelude::*;

pub struct Store {
    pub conn: PgConnection,
}

impl Store {
    pub fn new() -> Result<Self, ConnectionError> {
        let config = Config::default();
        let connection = PgConnection::establish(&config.database_url)
            .unwrap_or_else(|_| panic!("Failed to connect to database: {}", config.database_url));
        Ok(Self { conn: connection })
    }
}
