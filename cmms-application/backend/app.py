from flask import Flask, jsonify, request
from .database import init_db
from .models import Equipment, Intervention, Maintenance, Stock, Personnel

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the CMMS Application!"

init_db(app)

@app.route('/equipment', methods=['GET', 'POST'])
def manage_equipment():
    if request.method == 'POST':
        data = request.json
        new_equipment = Equipment(name=data['name'], description=data.get('description'), documents=data.get('documents'))
        db.session.add(new_equipment)
        db.session.commit()
        return jsonify({'message': 'Equipment added!'}), 201
    else:
        equipment_list = Equipment.query.all()
        return jsonify([{'id': eq.id, 'name': eq.name, 'description': eq.description} for eq in equipment_list])

@app.route('/interventions', methods=['GET', 'POST'])
def manage_interventions():
    if request.method == 'POST':
        data = request.json
        new_intervention = Intervention(equipment_id=data['equipment_id'], description=data['description'], date=data['date'])
        db.session.add(new_intervention)
        db.session.commit()
        return jsonify({'message': 'Intervention added!'}), 201
    else:
        interventions = Intervention.query.all()
        return jsonify([{'id': intv.id, 'equipment_id': intv.equipment_id, 'description': intv.description} for intv in interventions])

@app.route('/maintenance', methods=['GET', 'POST'])
def manage_maintenance():
    if request.method == 'POST':
        data = request.json
        new_maintenance = Maintenance(equipment_id=data['equipment_id'], schedule_date=data['schedule_date'])
        db.session.add(new_maintenance)
        db.session.commit()
        return jsonify({'message': 'Maintenance scheduled!'}), 201
    else:
        maintenance_list = Maintenance.query.all()
        return jsonify([{'id': mnt.id, 'equipment_id': mnt.equipment_id, 'schedule_date': mnt.schedule_date} for mnt in maintenance_list])

@app.route('/stock', methods=['GET', 'POST'])
def manage_stock():
    if request.method == 'POST':
        data = request.json
        new_stock = Stock(part_name=data['part_name'], quantity=data['quantity'])
        db.session.add(new_stock)
        db.session.commit()
        return jsonify({'message': 'Stock item added!'}), 201
    else:
        stock_items = Stock.query.all()
        return jsonify([{'id': stock.id, 'part_name': stock.part_name, 'quantity': stock.quantity} for stock in stock_items])

@app.route('/personnel', methods=['GET', 'POST'])
def manage_personnel():
    if request.method == 'POST':
        data = request.json
        new_personnel = Personnel(name=data['name'], certifications=data.get('certifications'))
        db.session.add(new_personnel)
        db.session.commit()
        return jsonify({'message': 'Personnel added!'}), 201
    else:
        personnel_list = Personnel.query.all()
        return jsonify([{'id': p.id, 'name': p.name, 'certifications': p.certifications} for p in personnel_list])
    app.run(debug=True)
