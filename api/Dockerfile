FROM python:3.10-buster

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

RUN flask db migrate && flask db upgrade head

CMD ["gunicorn", "-w", "3", "--bind", "0.0.0.0:5000", "wsgi:app"]