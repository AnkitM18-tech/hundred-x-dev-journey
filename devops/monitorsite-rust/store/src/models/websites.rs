use crate::store::Store;
use chrono::NaiveDateTime;
use diesel::{prelude::*, result::Error};

#[derive(Queryable, Insertable, Selectable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Website {
    pub id: String,
    pub url: String,
    pub time_added: NaiveDateTime,
    pub user_id: String,
}

impl Store {
    pub fn create_website(&mut self, url: String, user_id: String) -> Result<String, Error> {
        let id = uuid::Uuid::new_v4().to_string();
        let new_website = Website {
            id,
            url,
            time_added: chrono::Local::now().naive_local(),
            user_id,
        };
        diesel::insert_into(crate::schema::website::table)
            .values(&new_website)
            .returning(Website::as_returning())
            .get_result(&mut self.conn)
            .expect("Error in creating website!");

        Ok(new_website.id)
    }

    pub fn get_website(&mut self, input_id: String) -> Result<Website, Error> {
        use crate::schema::website::dsl::*;
        let existing_website = website
            .filter(id.eq(input_id))
            .select(Website::as_select())
            .first(&mut self.conn)
            .expect("Not Found!");

        Ok(existing_website)
    }
}
