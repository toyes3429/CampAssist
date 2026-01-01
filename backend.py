import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, methods=["GET", "POST", "PATCH", "OPTIONS"])

DB = "campus.db"

# -------- INIT DATABASES --------

def init_db():
    con = sqlite3.connect(DB)
    cur = con.cursor()

    # Users Table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

    # Requests Table
    cur.execute("""
    CREATE TABLE IF NOT EXISTS requests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_name TEXT NOT NULL,
        price TEXT NOT NULL,
        tip TEXT NOT NULL,
        status TEXT DEFAULT 'OPEN',
        requester_email TEXT,
        accepted_by TEXT
    )
    """)

    con.commit()
    con.close()

init_db()

# -------- AUTH ROUTES --------

@app.route("/api/users", methods=["GET"])
def get_users():
    con = sqlite3.connect(DB)
    cur = con.cursor()
    cur.execute("SELECT * FROM users")
    rows = cur.fetchall()
    con.close()

    return jsonify([
        {"id": r[0], "name": r[1], "email": r[2], "password": r[3]} for r in rows
    ])


@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return {"message": "All fields are required"}, 400

    con = sqlite3.connect(DB)
    cur = con.cursor()

    try:
        cur.execute("INSERT INTO users(name, email, password) VALUES(?,?,?)", (name, email, password))
        con.commit()
        con.close()
        return {"message": "Account created successfully!"}, 201

    except sqlite3.IntegrityError:
        con.close()
        return {"message": "Account already exists with this email"}, 409


@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"message": "Missing email or password"}, 400

    con = sqlite3.connect(DB)
    cur = con.cursor()
    cur.execute("SELECT * FROM users WHERE email=?", (email,))
    user = cur.fetchone()
    con.close()

    if not user:
        return {"message": "Account does not exist"}, 404

    if user[3] != password:
        return {"message": "Incorrect password"}, 401

    return {"message": "Login successful!", "id": user[0], "name": user[1], "email": user[2]}, 200

# -------- BUYER REQUEST ROUTES --------

@app.route("/api/requests", methods=["POST"])
def place_request():
    data = request.json
    item = data.get("item_name")
    price = data.get("price")
    tip = data.get("tip")
    email = data.get("requester_email")

    if not item or not price or not tip:
        return {"message": "All fields are required"}, 400

    con = sqlite3.connect(DB)
    cur = con.cursor()
    cur.execute("INSERT INTO requests(item_name, price, tip, requester_email) VALUES(?,?,?,?)",
                (item, price, tip, email))
    con.commit()
    con.close()

    return {"message": "Request placed!"}, 201


@app.route("/api/requests/<string:emid>", methods=["GET"])
def fetch_requests(emid):
    con = sqlite3.connect(DB)
    cur = con.cursor()
    cur.execute("SELECT * FROM requests WHERE requester_email = ?", (emid,))
    rows = cur.fetchall()
    con.close()
    return jsonify([
        {
            "id": r[0],
            "item_name": r[1],
            "price": r[2],
            "tip": r[3],
            "status": r[4],
            "requester_email": r[5],
            "accepted_by": r[6]
        }
        for r in rows
    ])


@app.route("/api/requests/<int:rid>/accept", methods=["PATCH"])
def accept_task(rid):
    runner_email = request.json.get("runner_email")

    con = sqlite3.connect(DB)
    cur = con.cursor()
    cur.execute("SELECT status FROM requests WHERE id=?", (rid,))
    row = cur.fetchone()

    if not row:
        con.close()
        return {"message": "Request not found"}, 404

    if row[0] != "OPEN":
        con.close()
        return {"message": "Task already taken or processed"}, 409

    cur.execute("UPDATE requests SET status='ACCEPTED', accepted_by=? WHERE id=?", (runner_email, rid))
    con.commit()
    con.close()

    return {"message": "Task accepted!"}, 200


@app.route("/api/requests/<int:rid>/complete", methods=["PATCH"])
def mark_delivered(rid):
    con = sqlite3.connect(DB)
    cur = con.cursor()

    cur.execute("SELECT status FROM requests WHERE id=?", (rid,))
    row = cur.fetchone()
    if not row:
        con.close()
        return {"message": "Request not found"}, 404

    if row[0] == "COMPLETED":
        con.close()
        return {"message": "Already delivered"}, 409
    cur.execute("DELETE FROM requests WHERE id=?", (rid,))
    con.commit()
    con.close()

    return {"message": "Marked as delivered!"}, 200


# Fallback route to handle CORS preflight
@app.route("/", methods=["OPTIONS"])
def cors_root():
    return {"message": "ok"}, 200


if __name__ == "__main__":
    app.run(debug=True)
