from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MiningLocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    type_of_mining = db.Column(db.String(100), nullable=False)
    tenure = db.Column(db.Integer)
    affect_radius = db.Column(db.Float)
    impact_scale = db.Column(db.Float, nullable=True) 
    water_quality = db.Column(db.Float)
    air_quality = db.Column(db.Float)
    soil_quality = db.Column(db.Float)
    biodiversity = db.Column(db.Text)
    socioeconomic_index = db.Column(db.Text)
    job_count_index = db.Column(db.Integer)
    description = db.Column(db.Text)
    cycle_status = db.Column(db.String(50))
    assessment = db.Column(db.Text)
    location_coords = db.Column(db.String(50), nullable=False)

