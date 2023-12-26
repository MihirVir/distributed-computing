FROM jupyter/pyspark-notebook

WORKDIR /app

RUN pip install --no-cache-dir Flask
RUN pip install pymongo
RUN pip install bcrypt

ENV PYTHONUNBUFFERED=1
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
