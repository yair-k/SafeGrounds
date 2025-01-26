from app import app
from models import db, LandLocation
from routes import generate_assessment_for_location

# Initialize the app context
with app.app_context():
    # Drop and recreate the database tables
    db.drop_all()
    db.create_all()

    # Placeholder locations for demo purposes
    location1 = LandLocation(
        location="Cedar Valley Nature Reserve",
        type_of_land="Conservation Area",
        tenure=50,
        affect_radius=20.0,
        water_quality=8.2,
        air_quality=7.8,
        soil_quality=8.5,
        biodiversity="Home to over 200 species of plants and animals, including some endangered species.",
        socioeconomic_index="Attracts over 100,000 visitors annually, contributing $5M to the local economy.",
        description="Cedar Valley Nature Reserve is a key conservation area protecting unique ecosystems and endangered species. It also provides eco-tourism opportunities and educational outreach.",
        job_count_index=120,
        cycle_status="Active Conservation",
        location_coords="44.2312,-76.4860"
    )

    location2 = LandLocation(
        location="Sacred Heart Grasslands",
        type_of_land="Indigenous Heritage Site",
        tenure=75,
        affect_radius=15.0,
        water_quality=7.0,
        air_quality=6.5,
        soil_quality=7.2,
        biodiversity="A critical habitat for migratory birds and native wildflowers, with cultural significance to the local Indigenous community.",
        socioeconomic_index="Supports Indigenous tourism initiatives and cultural education programs.",
        description="The Sacred Heart Grasslands are a protected heritage site with strong cultural ties to local Indigenous peoples. The area supports sustainable eco-tourism and educational events.",
        job_count_index=50,
        cycle_status="Heritage Conservation",
        location_coords="44.2234,-76.4912"
    )

    location3 = LandLocation(
        location="Kingston Wetlands",
        type_of_land="Wetlands Restoration Area",
        tenure=30,
        affect_radius=12.0,
        water_quality=8.5,
        air_quality=7.9,
        soil_quality=8.0,
        biodiversity="The wetlands are a key filtration system for local water sources and are rich in amphibian and bird populations.",
        socioeconomic_index="Provides $2M in ecosystem services annually, including water filtration and flood control.",
        description="The Kingston Wetlands are undergoing active restoration to improve water quality and biodiversity. The site also serves as an educational center for local schools.",
        job_count_index=80,
        cycle_status="Restoration",
        location_coords="44.2451,-76.4801"
    )

    location4 = LandLocation(
        location="Oakridge Forest",
        type_of_land="Recreational Forest",
        tenure=60,
        affect_radius=25.0,
        water_quality=7.5,
        air_quality=8.2,
        soil_quality=7.8,
        biodiversity="Rich in biodiversity, with deer, foxes, and over 50 bird species observed.",
        socioeconomic_index="Supports local recreation and generates $1.5M annually through permits and tourism.",
        description="Oakridge Forest offers hiking, camping, and wildlife observation opportunities. It's managed to ensure long-term ecological health while providing public access.",
        job_count_index=60,
        cycle_status="Active Use",
        location_coords="44.2500,-76.4700"
    )

    location5 = LandLocation(
        location="Crystal Creek Preserve",
        type_of_land="Water Conservation Area",
        tenure=40,
        affect_radius=18.0,
        water_quality=9.0,
        air_quality=8.8,
        soil_quality=8.9,
        biodiversity="Known for its pristine water sources and fish habitats, the preserve also hosts unique aquatic plants.",
        socioeconomic_index="Provides clean water for nearby communities and supports $3M in water-related industries.",
        description="Crystal Creek Preserve protects critical freshwater ecosystems while supplying clean water to local communities. The area is also popular for eco-tourism.",
        job_count_index=40,
        cycle_status="Conservation",
        location_coords="44.2105,-76.5001"
    )

    location6 = LandLocation(
        location="Harmony Ridge",
        type_of_land="Community Farmland",
        tenure=25,
        affect_radius=10.0,
        water_quality=6.8,
        air_quality=7.0,
        soil_quality=7.5,
        biodiversity="Low impact farming practices allow co-existence with local bird species and pollinators.",
        socioeconomic_index="Produces organic crops sold in local markets, supporting 25 family-owned farms.",
        description="Harmony Ridge uses sustainable farming techniques to grow organic crops, supporting the local food system and economy.",
        job_count_index=200,
        cycle_status="Operational",
        location_coords="44.2503,-76.5012"
    )

    location7 = LandLocation(
        location="Willow Springs Prairie",
        type_of_land="Restoration Grassland",
        tenure=20,
        affect_radius=8.0,
        water_quality=6.0,
        air_quality=6.5,
        soil_quality=7.2,
        biodiversity="Native prairie grasses and wildflowers are being reintroduced to this historic grassland area.",
        socioeconomic_index="Educational programs attract hundreds of students and researchers annually.",
        description="Willow Springs Prairie is part of a restoration project to bring back native grasses and biodiversity to this historic grassland.",
        job_count_index=30,
        cycle_status="Restoration",
        location_coords="44.2300,-76.5100"
    )

    # Add land locations to the session
    db.session.add(location1)
    db.session.add(location2)
    db.session.add(location3)
    db.session.add(location4)
    db.session.add(location5)
    db.session.add(location6)
    db.session.add(location7)

    # Commit changes to the database
    db.session.commit()

    # Generate assessments for the land locations
    generate_assessment_for_location(location1.id)
    generate_assessment_for_location(location2.id)
    generate_assessment_for_location(location3.id)

    print("Database initialized with land locations and assessments generated!")
