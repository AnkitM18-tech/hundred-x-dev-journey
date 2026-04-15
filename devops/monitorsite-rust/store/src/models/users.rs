use crate::store::Store;
use diesel::{prelude::*, result::Error};

#[derive(Queryable, Insertable, Selectable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: String,
    pub username: String,
    pub password: String,
}

impl Store {
    pub fn sign_up(
        &mut self,
        input_username: String,
        input_password: String,
    ) -> Result<String, Error> {
        let new_user = User {
            id: uuid::Uuid::new_v4().to_string(),
            username: input_username,
            password: input_password,
        };
        diesel::insert_into(crate::schema::user::table)
            .values(&new_user)
            .returning(User::as_returning())
            .get_result(&mut self.conn)
            .expect("Error creating user!");

        Ok(new_user.id)
    }

    pub fn sign_in(
        &mut self,
        input_username: String,
        input_password: String,
    ) -> Result<String, Error> {
        use crate::schema::user::dsl::*;
        let existing_user = user
            .filter(username.eq(input_username))
            .select(User::as_select())
            .first(&mut self.conn)?;

        if existing_user.password != input_password {
            return Ok(String::from("Not Found!"));
        }

        Ok(existing_user.id)
    }
}
