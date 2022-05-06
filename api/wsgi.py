from app.main import *  # Importing migrate for flask_migrate

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
