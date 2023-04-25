use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct CampaignNote {
    pub id: usize,
    pub created: DateTime<Utc>,
    pub character_id: usize,
    pub message: String,
}
